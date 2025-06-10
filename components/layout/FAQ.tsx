'use client'

import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: 'What level of developers is this starter template suitable for?',
    answer: "Whether you're a beginner or an experienced developer, this template is suitable for you. For beginners, it provides a complete environment set up, allowing you to start learning and developing right away; for experienced developers, it saves a lot of configuration time and provides best practice architecture."
  },
  {
    question: 'How can I customize the authentication flow?',
    answer: 'This template uses Supabase authentication, and you can find related components in the app/auth directory. To customize, you can modify login and registration forms, adjust UI, or add additional authentication providers (such as GitHub, Google, etc.).'
  },
  {
    question: 'Can I use this template for commercial projects?',
    answer: 'Yes, this template is completely open source and uses the MIT license, so you are free to use it for both personal and commercial projects. You can modify, customize, and extend it without having to pay any fees.'
  },
  {
    question: 'How do I handle database migrations?',
    answer: "This template leverages Supabase's migration system. You can use the supabase/migrations directory to manage your database changes, ensuring that development and production environments stay in sync."
  },
  {
    question: 'How do I deploy this project?',
    answer: 'This template is designed to be easy to deploy. You can deploy your Next.js application to Vercel, Netlify, or any platform that supports Next.js, and the Supabase backend can use supabase.com services.'
  }
]

export default function FAQ() {
  return (
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
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-lg font-medium">
                    {faq.question}
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
                    {faq.answer}
                  </p>
                </div>
              </details>
            </div>
          ))}
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
  )
} 