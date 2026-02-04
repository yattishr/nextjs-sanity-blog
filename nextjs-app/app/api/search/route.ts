import { NextResponse } from "next/server";

import { sanityFetch } from "@/sanity/lib/live";
import { searchPostsQuery } from "@/sanity/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term")?.trim() ?? "";
  const rawLimit = Number(searchParams.get("limit"));
  const limit = Number.isFinite(rawLimit)
    ? Math.max(1, Math.min(10, Math.floor(rawLimit)))
    : 5;

  if (!term) {
    return NextResponse.json({ results: [] });
  }

  const { data } = await sanityFetch({
    query: searchPostsQuery,
    params: { searchPattern: `*${term}*` },
  });

  const results = (data ?? []).slice(0, limit).map((post: any) => ({
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
  }));

  return NextResponse.json({ results });
}
