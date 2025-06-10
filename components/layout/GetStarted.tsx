'use client'

export default function GetStarted() {
  return (
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
  )
} 