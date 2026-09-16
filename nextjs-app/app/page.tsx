import { Suspense } from "react";
import Link from "next/link";

import { AllPosts } from "@/app/components/Posts";

export default async function Page() {
  return (
    <>
      <div className="bg-gradient-to-r from-red-200 from-0% via-white via-40%  relative">
        <div className="bg-gradient-to-b from-white w-full h-40 absolute top-0"></div>
        <div className="bg-gradient-to-t from-white w-full h-40 absolute bottom-0"></div>
        <div className="container relative">
          <div className="mx-auto max-w-2xl py-20 lg:max-w-4xl lg:px-12 text-center">
            <div className="flex flex-col gap-4 items-center">
              <div className="section-label">The Hey Harvey Blog</div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black">
                <span className="text-red-500">Better customer</span>{" "}
                conversations
              </h1>
            </div>
            <div className="mt-6 space-y-6 prose sm:prose-lg md:prose-xl lg:prose-2xl text-gray-700">
              <p>
                Practical ideas for support leaders, QA managers, and teams who want
                to turn everyday customer conversations into better outcomes.
                Explore AI roleplay guides, realistic training scenarios, and coaching
                tips to help your team build confidence, communicate with empathy,
                and deliver consistent support.
              </p>
            </div>
            <div className="flex items-center flex-col gap-4">
              <Link
                href="https://heyharvey.me/ai-conversation-training"
                className="inline-flex text-red-500 text-xs md:text-sm refined-underline hover:text-gray-900 transition-colors duration-200 ease-out"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try the 2-minute live demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 ml-1 inline"
                  fill="currentColor"
                >
                  <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V12L17.206 8.207L11.2071 14.2071L9.79289 12.7929L15.792 6.793L12 3H21Z"></path>
                </svg>
              </Link>
              <p className="text-sm text-gray-600">No sign-in required. Get feedback on empathy, clarity, and resolution.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-10">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <div className="divider-ornament mb-6 sm:mb-8" aria-hidden="true">
              <span>✦</span>
            </div>
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
