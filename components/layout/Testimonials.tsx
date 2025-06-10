'use client'

import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'

const testimonials = [
  {
    name: 'Zhang Lei',
    initials: 'ZL',
    role: 'Full-Stack Developer @ Tech Innovation Co.',
    content: 'This template saved me at least a week of development time. The seamless integration of authentication, database, and API routes allowed me to immediately focus on building the core functionality of my product.',
    project: 'Enterprise Management System'
  },
  {
    name: 'Wang Juan',
    initials: 'WJ',
    role: 'Technical Co-Founder @ Startup',
    content: 'As a startup team, this template helped us quickly build an MVP with limited resources. The built-in hooks and components significantly reduced development complexity, and user feedback has been very positive.',
    project: 'SaaS Platform'
  },
  {
    name: 'Li Chen',
    initials: 'LC',
    role: 'Independent Developer',
    content: "I've built three e-commerce projects, each time using this template. The combination of Tailwind and shadcn/ui component library with Next.js and Supabase is perfect, increasing development efficiency by 200%.",
    project: 'E-commerce Platform'
  }
]

export default function Testimonials() {
  return (
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
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">{testimonial.initials}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
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
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Used for building:{" "}
                <span className="font-medium text-primary">
                  {testimonial.project}
                </span>
              </div>
            </div>
          ))}
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
  )
} 