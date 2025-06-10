'use client'

const features = [
  {
    name: '⚡ Next.js 13 App Router',
    description: 'Leverage the latest Next.js features with the App Router',
    icon: (
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
    ),
  },
  {
    name: '⚡ Supabase Authentication',
    description: 'Pre-configured authentication with Supabase',
    icon: (
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
    ),
  },
  {
    name: '⚡ Supabase Database',
    description: 'Easy database setup and management with Supabase',
    icon: (
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
    ),
  },
  {
    name: '⚡ Tailwind CSS & shadcn/ui',
    description: 'Styled components ready to use.',
    icon: (
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
    ),
  },
  {
    name: '⚡ React Hook Form',
    description: 'Efficient and flexible form handling with ZOD validation integrated.',
    icon: (
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
    ),
  },
  {
    name: '⚡ TypeScript Support',
    description: 'Type Safe with typescript error handling.',
    icon: (
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
    ),
  },
  {
    name: '⚡ React Query Integration',
    description: 'Efficient data fetching, caching, and synchronization.',
    icon: (
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
    ),
  },
  {
    name: '⚡ Built-in Hooks',
    description: 'Custom hooks for fetching and mutating data with optimistic updates.',
    icon: (
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
    ),
  },
  {
    name: '⚡ Uses pnpm',
    description: 'Using pnpm for faster installs and efficient dependency handling.',
    icon: (
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
        <path d="M3 12L12 3l9 9-9 9-9-9z" />
        <path d="M12 3v18" />
        <path d="M6 9h4v6H6z" />
        <path d="M14 9h4v6h-4z" />
      </svg>
    ),
  }
]

export default function Features() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Features
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg"
            >
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 