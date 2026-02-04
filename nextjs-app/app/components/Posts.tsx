import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/live";
import {
  morePostsQuery,
  allPostsQuery,
  searchPostsQuery,
} from "@/sanity/lib/queries";
import { Post as PostType } from "@/sanity.types";
import DateComponent from "@/app/components/Date";
import OnBoarding from "@/app/components/Onboarding";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, searchTerm?: string) => {
  if (!searchTerm) {
    return text;
  }

  const term = searchTerm.trim();
  if (!term) {
    return text;
  }

  const pattern = new RegExp(`(${escapeRegExp(term)})`, "ig");
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark key={`${part}-${index}`} className="bg-yellow-200 px-0.5 rounded-sm">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
};

const Post = ({ post, searchTerm }: { post: PostType; searchTerm?: string }) => {
  const { _id, title, slug, excerpt, date } = post;

  return (
    <article
      key={_id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="text-gray-500 text-sm">
        <DateComponent dateString={date} />
      </div>

      <h3 className="mt-3 text-2xl font-semibold">
        <Link
          className="hover:text-red-500 underline transition-colors"
          href={`/posts/${slug}`}
        >
          {highlightText(title ?? "Untitled", searchTerm)}
        </Link>
      </h3>
      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
        {highlightText(excerpt ?? "", searchTerm)}
      </p>
    </article>
  );
};

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode;
  heading?: string;
  subHeading?: string;
}) => (
  <div>
    {heading && (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>
    )}
    <div className="mt-6 pt-6 space-y-12 border-t border-gray-200">
      {children}
    </div>
  </div>
);

export const MorePosts = async ({
  skip,
  limit,
}: {
  skip: string;
  limit: number;
}) => {
  const { data } = await sanityFetch({
    query: morePostsQuery,
    params: { skip, limit },
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Posts heading={`Recent Posts (${data?.length})`}>
      {data?.map((post: any) => <Post key={post._id} post={post} />)}
    </Posts>
  );
};

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  return (
    <Posts
      heading="Recent Posts"
    >
      {data.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  );
};

export const SearchPosts = async ({ term }: { term: string }) => {
  const cleanTerm = term.trim();

  if (!cleanTerm) {
    return (
      <Posts heading="Search Posts" subHeading="Enter a term to search posts.">
        <p className="text-sm text-gray-600">Try keywords from a post title or excerpt.</p>
      </Posts>
    );
  }

  const { data } = await sanityFetch({
    query: searchPostsQuery,
    params: { searchPattern: `*${cleanTerm}*` },
  });

  if (!data || data.length === 0) {
    return (
      <Posts
        heading={`No results for "${cleanTerm}"`}
        subHeading="Try a different keyword or shorter phrase."
      >
        <p className="text-sm text-gray-600">Search checks post titles and excerpts.</p>
      </Posts>
    );
  }

  return (
    <Posts
      heading={`Search results (${data.length})`}
      subHeading={`Showing matches for "${cleanTerm}"`}
    >
      {data.map((post: any) => (
        <Post key={post._id} post={post} searchTerm={cleanTerm} />
      ))}
    </Posts>
  );
};
