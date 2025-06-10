'use client'

import { Button } from '@/components/ui/button'
import { BookOpenText, Github } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
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
  )
} 