import Link from "next/link";
import { BotIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg">
      <div className="container py-6 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <BotIcon />            
            <span className="hidden lg:block text-lg pl-2 font-semibold">
              Hey Harvey
            </span>
          </Link>

          <nav className="">
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-sm md:text-base tracking-tight font-normal"
            >
              <li>
                <Link href="/about" className="">
                  About
                </Link>
              </li>

              <li className="sm:before:w-[1px] sm:before:bg-gray-100 before:block flex sm:gap-4 md:gap-6">
                <Link
                  className="rounded-full flex gap-2 items-center bg-black hover:bg-red-500 focus:bg-cyan-500 p-1 sm:py-3 sm:px-6 text-white transition-colors duration-200"
                  href="https://github.com/sanity-io/sanity-template-nextjs-clean"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only sm:not-sr-only">Browse all articles</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
