"use client";

import { BookOpenText, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-transparent">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-7xl bg-white dark:bg-gray-900 rounded-b-2xl shadow-[0_4px_18px_0px_rgba(15,20,34,0.1)] dark:shadow-[0_4px_18px_0px_rgba(0,0,0,0.3)]"
        >
          <div className="flex h-[64px] items-center justify-between px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Link href="/" className="flex items-center">
                <h1 className="font-bold text-xl">
                  <span className="text-primary">Swift</span>Simplify
                </h1>
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {[
                { href: "#features", text: "Features" },
                { href: "#target-users", text: "For Who" },
                { href: "#testimonials", text: "Reviews" },
                { href: "#pricing", text: "Pricing" },
                { href: "#faq", text: "FAQ" },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={item.href}
                    className="text-[14px] font-medium text-gray-600 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
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
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#get-started"
                  className="hidden md:inline-flex px-4 py-2 text-[14px] font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                >
                  Purchase Now
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.header>
      </div>
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-5">
                <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                  Launch Your Project Faster
                </span>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Ship Your Full-Stack App{" "}
                  <span className="text-primary">3x Faster</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  <span className="font-semibold">
                    Complete solution with authentication, database, and API
                  </span>{" "}
                  - Build high-performance applications without tedious
                  configuration. Go from idea to launch in minutes.
                </p>
              </div>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 mt-8 flex flex-col sm:flex-row items-center justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="#get-started">
                    <BookOpenText className="mr-2 h-5 w-5" />
                    Start Free
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href="https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter">
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <p className="text-sm text-gray-500">Developers Trust Us</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary">200%</div>
                  <p className="text-sm text-gray-500">Faster Development</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <p className="text-sm text-gray-500">Successful Startups</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500 flex-wrap">
                <div className="flex items-center">
                  <svg
                    className="mr-1 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Free and Open Source
                </div>
                <div className="flex items-center">
                  <svg
                    className="mr-1 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Enterprise Architecture
                </div>
                <div className="flex items-center">
                  <svg
                    className="mr-1 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Regularly Updated
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="target-users"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
              Target Users
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Tailored solutions for different types of developers and projects
            </p>

            <div className="grid gap-10 md:grid-cols-3">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Full-Stack Developers
                </h3>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Pain Point:
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Spending too much time on initial project setup, dealing
                    with authentication, database connections, and API routes.
                  </p>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Solution:
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Provides complete pre-configured environment including
                    authentication, database, and API integration, allowing you
                    to focus on core business logic.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Startup Teams</h3>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Pain Point:
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Limited resources, need to quickly build feature-complete
                    MVP, no time to build complex infrastructure.
                  </p>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Solution:
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Provides enterprise-grade starting point, significantly
                    reduces time-to-market, saves development costs, and quickly
                    validates business ideas.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Independent Developers
                </h3>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Pain Point:
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Challenges in managing both frontend and backend
                    development, need to simplify workflow for efficient project
                    delivery.
                  </p>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Solution:
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Provides seamlessly integrated development environment with
                    industry best practices and components, reducing repetitive
                    work and improving productivity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Features
            </h2>

            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  className="h-12 w-12 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
                <h3 className="text-xl font-bold">⚡ Next.js 13 App Router</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Leverage the latest Next.js features with the App Router
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  className="h-12 w-12 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <h3 className="text-xl font-bold">
                  ⚡ Supabase Authentication
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Pre-configured authentication with Supabase
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  className="h-12 w-12 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
                <h3 className="text-xl font-bold">⚡ Supabase Database</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Easy database setup and management with Supabase
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M8 8h8" />
                  <path d="M8 12h8" />
                  <path d="M8 16h8" />
                </svg>
                <h3 className="text-xl font-bold">
                  ⚡ Tailwind CSS & shadcn/ui
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Styled components ready to use.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                  <path d="M3 10h18" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h8" />
                  <path d="M16 18h.01" />
                  <path d="M10 6l2 2 4-4" />
                </svg>
                <h3 className="text-xl font-bold">⚡ React Hook Form</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Efficient and flexible form handling with ZOD validation
                  integrated.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                  <path d="M8 12h8" />
                  <path d="M10 8h4" />
                  <path d="M12 16v-8" />
                </svg>
                <h3 className="text-xl font-bold">⚡ TypeScript Support</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Type Safe with typescript error handling.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="M4.93 4.93l2.83 2.83" />
                  <path d="M16.24 16.24l2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="M4.93 19.07l2.83-2.83" />
                  <path d="M16.24 7.76l2.83-2.83" />
                </svg>
                <h3 className="text-xl font-bold">
                  ⚡ React Query Integration
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Efficient data fetching, caching, and synchronization.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M9 15l-3 3" />
                  <path d="M15 9l3-3" />
                  <path d="M9 9L6 6" />
                  <path d="M15 15l3 3" />
                  <path d="M3 12h3" />
                  <path d="M18 12h3" />
                </svg>
                <h3 className="text-xl font-bold">⚡ Built-in Hooks</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Custom hooks for fetching and mutating data with optimistic
                  updates.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                >
                  <path d="M3 12L12 3l9 9-9 9-9-9z" /> {/* Hexagon Shape */}
                  <path d="M12 3v18" /> {/* Vertical Divider */}
                  <path d="M6 9h4v6H6z" /> {/* Left Block */}
                  <path d="M14 9h4v6h-4z" /> {/* Right Block */}
                </svg>
                <h3 className="text-xl font-bold">⚡ Uses pnpm</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Using pnpm for faster installs and efficient dependency
                  handling.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
              Reviews
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              See how other developers use our starter template to accelerate
              their project development
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">ZL</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Zhang Lei</h4>
                    <p className="text-sm text-gray-500">
                      Full-Stack Developer @ Tech Innovation Co.
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-primary mb-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &quot;This template saved me at least a week of development
                    time. The seamless integration of authentication, database,
                    and API routes allowed me to immediately focus on building
                    the core functionality of my product.&quot;
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Used for building:{" "}
                  <span className="font-medium text-primary">
                    Enterprise Management System
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">WJ</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Wang Juan</h4>
                    <p className="text-sm text-gray-500">
                      Technical Co-Founder @ Startup
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-primary mb-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &quot;As a startup team, this template helped us quickly
                    build an MVP with limited resources. The built-in hooks and
                    components significantly reduced development complexity, and
                    user feedback has been very positive.&quot;
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Used for building:{" "}
                  <span className="font-medium text-primary">
                    SaaS Platform
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">LC</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Li Chen</h4>
                    <p className="text-sm text-gray-500">
                      Independent Developer
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-primary mb-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &quot;I&apos;ve built three e-commerce projects, each time
                    using this template. The combination of Tailwind and
                    shadcn/ui component library with Next.js and Supabase is
                    perfect, increasing development efficiency by 200%.&quot;
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Used for building:{" "}
                  <span className="font-medium text-primary">
                    E-commerce Platform
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild>
                <Link href="https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter/stargazers">
                  <Github className="mr-2 h-4 w-4" />
                  Star us on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section
          id="get-started"
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Get Started <span className="text-primary">in Minutes</span>
            </h2>
            <div className="space-y-4 max-w-[600px] mx-auto">
              <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
                Follow these simple steps to launch your full-stack project
                today
              </p>
              <ol className="list-decimal list-inside space-y-5 text-gray-500 dark:text-gray-400">
                <li>
                  Create a new project using the CLI:
                  <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded block">
                    npx create-swift-simplify-nextjs-supabase-starter my-project
                  </code>
                </li>
                <li>
                  Navigate to your project folder:
                  <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded block">
                    cd my-project
                  </code>
                </li>
                <li>
                  Set up your environment variables: Rename the{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded">
                    .env.example
                  </code>
                  file to{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded">
                    .env.local
                  </code>{" "}
                  and update it with your Supabase credentials.
                  <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded">
                    NEXT_PUBLIC_SUPABASE_URL
                  </code>{" "}
                  ,
                  <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded">
                    NEXT_PUBLIC_SUPABASE_ANON_KEY
                  </code>
                </li>
                <li>
                  Install dependencies using pnpm if it&apos;s skipped:
                  <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded block">
                    pnpm install
                  </code>
                </li>
                <li>
                  Run the development server:
                  <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded block">
                    pnpm dev
                  </code>
                </li>
              </ol>
              <p className="text-gray-500 dark:text-gray-400">
                Once the setup is complete, open{" "}
                <strong>http://localhost:3000</strong> in your browser to
                explore your project.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                For more detailed instructions, check out the README in the
                GitHub repository.
              </p>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
              FAQ
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Common questions about the Next.js and Supabase starter template
            </p>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">
                      What level of developers is this starter template suitable
                      for?
                    </h3>
                    <span className="ml-4 transition-transform group-open:rotate-180">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                    <p>
                      Whether you&apos;re a beginner or an experienced
                      developer, this template is suitable for you. For
                      beginners, it provides a complete environment set up,
                      allowing you to start learning and developing right away;
                      for experienced developers, it saves a lot of
                      configuration time and provides best practice
                      architecture.
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">
                      How can I customize the authentication flow?
                    </h3>
                    <span className="ml-4 transition-transform group-open:rotate-180">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                    <p>
                      This template uses Supabase authentication, and you can
                      find related components in the app/auth directory. To
                      customize, you can modify login and registration forms,
                      adjust UI, or add additional authentication providers
                      (such as GitHub, Google, etc.).
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">
                      Can I use this template for commercial projects?
                    </h3>
                    <span className="ml-4 transition-transform group-open:rotate-180">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                    <p>
                      Yes, this template is completely open source and uses the
                      MIT license, so you are free to use it for both personal
                      and commercial projects. You can modify, customize, and
                      extend it without having to pay any fees.
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">
                      How do I handle database migrations?
                    </h3>
                    <span className="ml-4 transition-transform group-open:rotate-180">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                    <p>
                      This template leverages Supabase&apos;s migration system.
                      You can use the supabase/migrations directory to manage
                      your database changes, ensuring that development and
                      production environments stay in sync.
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">
                      How do I deploy this project?
                    </h3>
                    <span className="ml-4 transition-transform group-open:rotate-180">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                    <p>
                      This template is designed to be easy to deploy. You can
                      deploy your Next.js application to Vercel, Netlify, or any
                      platform that supports Next.js, and the Supabase backend
                      can use supabase.com services.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Have more questions?
              </p>
              <Button asChild variant="outline">
                <Link href="https://github.com/Mohamed-4rarh/next-supabase-starter/issues">
                  <Github className="mr-2 h-4 w-4" />
                  Ask on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Choose the plan that works best for your project needs
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">Free</h3>
                  <div className="text-4xl font-bold mb-2">$0</div>
                  <p className="text-sm text-gray-500">
                    Perfect for personal projects
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Full access to starter template
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Community support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    MIT license
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full">
                  <Link href="#get-started">Get Started</Link>
                </Button>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg border-2 border-primary relative flex flex-col">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-3 rounded-full font-medium">
                  MOST POPULAR
                </div>
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">Pro</h3>
                  <div className="text-4xl font-bold mb-2">$49</div>
                  <p className="text-sm text-gray-500">
                    For professional developers
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Everything in Free
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Premium extensions
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Advanced components
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="#get-started">Get Started</Link>
                </Button>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold mb-2">$199</div>
                  <p className="text-sm text-gray-500">
                    For teams and businesses
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Team collaboration tools
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full">
                  <Link href="#get-started">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="w-full py-16 md:py-24 bg-white dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                Build Your App Now
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-[700px]">
                With the Next.js + Supabase template, you can launch a fully
                functional full-stack project in just minutes. From this moment
                on, focus on building great products instead of configuring
                infrastructure.
              </p>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Quick Start</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Time Saving</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Enterprise Architecture</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-base">
                    <Link href="#get-started">
                      <BookOpenText className="mr-2 h-5 w-5" />
                      Get Started
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-base"
                  >
                    <Link href="https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter">
                      <Github className="mr-2 h-5 w-5" />
                      View Source
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-primary/10 dark:bg-primary/30 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
                <p className="font-medium">
                  Over 1000+ developers are already using this template to
                  accelerate their project development!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-12 w-full border-t bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">SwiftSimplify</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The perfect starting point for full-stack development,
                integrating the latest tech stack and best practices.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter"
                  className="text-gray-500 hover:text-primary"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  className="text-gray-500 hover:text-primary"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://discord.com"
                  className="text-gray-500 hover:text-primary"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Products</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-gray-500 hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#get-started"
                    className="text-gray-500 hover:text-primary"
                  >
                    Get Started
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-500 hover:text-primary"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-500 hover:text-primary">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter/issues"
                    className="text-gray-500 hover:text-primary"
                  >
                    Report Issues
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter/blob/main/CONTRIBUTING.md"
                    className="text-gray-500 hover:text-primary"
                  >
                    Contribute
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:zidongchn@gmail.com"
                    className="text-gray-500 hover:text-primary"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <p>© 2025 SwiftShip. All rights reserved</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
