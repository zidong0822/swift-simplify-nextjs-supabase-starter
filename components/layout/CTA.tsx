'use client'

import { Button } from '@/components/ui/button'
import { BookOpenText, Github } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
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
  )
} 