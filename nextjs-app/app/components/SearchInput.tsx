"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SearchResult = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightMatch = (text: string, term: string) => {
  if (!term.trim()) {
    return text;
  }

  const pattern = new RegExp(`(${escapeRegExp(term)})`, "ig");
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark key={`${part}-${index}`} className="bg-yellow-200 rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
};

function SearchInput() {
  const searchParams = useSearchParams();
  const defaultTerm = searchParams.get("term") ?? "";
  const [term, setTerm] = useState(defaultTerm);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedTerm = term.trim();

  useEffect(() => {
    setTerm(defaultTerm);
  }, [defaultTerm]);

  useEffect(() => {
    if (!debouncedTerm) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      setIsLoading(true);

      fetch(`/api/search?term=${encodeURIComponent(debouncedTerm)}&limit=6`, {
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((payload) => {
          setResults(Array.isArray(payload.results) ? payload.results : []);
        })
        .catch((error: unknown) => {
          if (!(error instanceof Error) || error.name !== "AbortError") {
            setResults([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 350);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [debouncedTerm]);

  return (
    <Form
      action="/search"
      className="group relative w-full flex-1 max-w-[300px]"
      onSubmit={() => setShowDropdown(false)}
    >
      <input
        type="text"
        name="term"
        value={term}
        onChange={(event) => {
          setTerm(event.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => {
          setTimeout(() => setShowDropdown(false), 150);
        }}
        placeholder="Search blogs..."
        aria-label="Search posts"
        className="w-full rounded-full bg-secondary/80 px-4 py-2 pl-10 text-sm transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200 ease-out group-focus-within:text-gray-600" />
      {showDropdown && term.trim() && (
        <div className="search-dropdown absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
          {isLoading && <p className="px-3 py-2 text-xs text-gray-500">Searching...</p>}
          {!isLoading && results.length === 0 && (
            <p className="px-3 py-2 text-xs text-gray-500">No matches found.</p>
          )}
          {!isLoading &&
            results.map((result) => (
              <Link
                key={result._id}
                href={`/posts/${result.slug}`}
                className="block rounded-lg px-3 py-2 transition-colors duration-150 ease-out hover:bg-gray-50"
                onClick={() => setShowDropdown(false)}
              >
                <p className="text-sm font-medium text-gray-900">
                  {highlightMatch(result.title ?? "Untitled", term)}
                </p>
                {result.excerpt && (
                  <p className="mt-1 line-clamp-1 text-xs text-gray-600">
                    {highlightMatch(result.excerpt, term)}
                  </p>
                )}
              </Link>
            ))}
        </div>
      )}
    </Form>
  );
}

export default SearchInput;
