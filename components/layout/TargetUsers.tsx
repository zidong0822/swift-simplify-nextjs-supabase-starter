'use client'

const targetUsers = [
  {
    name: 'Full-Stack Developers',
    icon: (
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
    ),
    painPoint: 'Spending too much time on initial project setup, dealing with authentication, database connections, and API routes.',
    solution: 'Provides complete pre-configured environment including authentication, database, and API integration, allowing you to focus on core business logic.'
  },
  {
    name: 'Startup Teams',
    icon: (
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
    ),
    painPoint: 'Limited resources, need to quickly build feature-complete MVP, no time to build complex infrastructure.',
    solution: 'Provides enterprise-grade starting point, significantly reduces time-to-market, saves development costs, and quickly validates business ideas.'
  },
  {
    name: 'Independent Developers',
    icon: (
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
    ),
    painPoint: 'Challenges in managing both frontend and backend development, need to simplify workflow for efficient project delivery.',
    solution: 'Provides seamlessly integrated development environment with industry best practices and components, reducing repetitive work and improving productivity.'
  }
]

export default function TargetUsers() {
  return (
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
          {targetUsers.map((user) => (
            <div
              key={user.name}
              className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                {user.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">
                {user.name}
              </h3>
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-500 mb-1">
                  Pain Point:
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {user.painPoint}
                </p>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">
                  Solution:
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {user.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 