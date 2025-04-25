import React, { Suspense } from "react";
import { AllPosts } from "@/app/components/Posts";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function PostsBrowse() {
  return (
    <div>
      <div className="container">
        <div className="mx-auto max-w-2xl py-20 lg:max-w-4xl lg:px-12 text-center">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="font-display text-3xl sm:text-6xl md:text-7xl lg:text-5xl font-bold tracking-tighter text-black">
              Browse All Posts
            </h1>
          </div>
        </div>
        <div>
          <div className="container">
            <aside className="py-12 sm:py-20">
              <Suspense>{await AllPosts()}</Suspense>
            </aside>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            className="rounded-full flex gap-2 items-center bg-black hover:bg-red-500 focus:bg-cyan-500 p-1 sm:py-3 sm:px-6 text-white transition-colors duration-200"
            href="/"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostsBrowse;
