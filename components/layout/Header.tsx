"use client";

import Link from "next/link";

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-transparent">
      <header className="w-full max-w-7xl bg-white dark:bg-gray-900 rounded-b-2xl shadow-[0_4px_18px_0px_rgba(15,20,34,0.1)] dark:shadow-[0_4px_18px_0px_rgba(0,0,0,0.3)]">
        <div className="flex h-[64px] items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <h1 className="font-bold text-xl">
                <span className="text-primary">Swift</span>Simplify
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: "#features", text: "Features" },
              { href: "#target-users", text: "For Who" },
              { href: "#testimonials", text: "Reviews" },
              { href: "#pricing", text: "Pricing" },
              { href: "#faq", text: "FAQ" },
            ].map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="text-[14px] font-medium text-gray-600 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
                >
                  {item.text}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                />
              </svg>
            </button>
            <div>
              <Link
                href="#get-started"
                className="hidden md:inline-flex px-4 py-2 text-[14px] font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
              >
                Purchase Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
} 