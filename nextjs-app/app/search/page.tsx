import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SearchPosts } from "@/app/components/Posts";

type SearchPageProps = {
  searchParams?: Promise<{ term?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const rawTerm = params.term;
  const term = Array.isArray(rawTerm) ? rawTerm[0] ?? "" : rawTerm ?? "";

  return (
    <div className="container py-20">
      <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter text-black">
              Search Posts
            </h1>
            <Link
              className="rounded-full inline-flex gap-2 items-center bg-black hover:bg-red-500 p-2 sm:py-3 sm:px-6 text-white transition-colors duration-200"
              href="/"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          <aside>
            <Suspense>{await SearchPosts({ term })}</Suspense>
          </aside>
        </div>
      </div>
    </div>
  );
}
