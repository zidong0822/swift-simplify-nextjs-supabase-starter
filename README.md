# Swift Simplify Next.js + Supabase Starter Template

A modern Next.js 15 starter template with Supabase integration, Better Auth authentication, React Query data fetching, and built-in query and authentication wrappers. This template is designed to accelerate development by providing pre-configured hooks, utilities, and best practices.

## 🌟 Key Features

- **Next.js 15** - Latest version with optimized performance and developer experience
- **Better Auth** - Modern authentication system with email verification and social login
- **Supabase Integration** - Database operations and user session management
- **React Query** - Efficient data fetching and caching management
- **ShadCN Components** - Beautiful pre-built UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Stripe Integration** - Payment processing and subscription management
- **Zod Validation** - Schema-based form validation
- **Pre-built Hooks** - Custom hooks for data fetching and mutations
- **Type Safety** - Full TypeScript support
- **Docker Support** - Containerized deployment ready
- **Internationalization** - Multi-language support (EN, ZH, JA)

## 📦 Installation

### Quick Start with CLI (if available)

```bash
npx create-swift-simplify-starter@latest my-project
```

### Manual Installation

```bash
git clone https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter.git my-project
cd my-project
pnpm install
```

## ⚙️ Environment Setup

### 1. Environment Variables

Create a `.env.local` file and add the following configuration:

```bash
# Database Connection (using your existing Supabase database)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Better Auth Core Configuration (required - at least 32 characters)
BETTER_AUTH_SECRET="your-super-secret-key-here-must-be-at-least-32-characters-long-for-security"
BETTER_AUTH_URL="http://localhost:3000/api/auth"

# App URL Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # Development
# NEXT_PUBLIC_APP_URL="https://yourdomain.com"  # Production

# Resend Email Service (required)
RESEND_API_KEY="re_your_resend_api_key_here"
EMAIL_FROM="noreply@yourdomain.com"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Social Login (optional)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### 2. Database Setup

Run the database migrations:

```bash
# Install Supabase CLI if not already installed
pnpm supabase migration up
```

### 3. Start Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Usage Guide

### Authentication System

The project uses **Better Auth** for authentication with support for:

- Email/Password authentication with verification
- Social login (GitHub, Google)
- Session management
- User profile management

```tsx
import { useAuth } from "@/lib/auth-context";

const MyComponent = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>{user ? <p>Welcome, {user.name}!</p> : <p>Please log in</p>}</div>
  );
};
```

### Data Fetching

Use the `useClientFetch` hook for client-side data fetching:

```tsx
import { useClientFetch } from "@/hooks/use-client-fetch";

const Posts = () => {
  const { data, isLoading } = useClientFetch("posts", "posts");

  if (isLoading) return <div>Loading...</div>;

  return <ul>{data?.map((post) => <li key={post.id}>{post.title}</li>)}</ul>;
};
```

#### Advanced Filtering Example

```tsx
const FilteredUsers = () => {
  const { data, isLoading } = useClientFetch(
    "filtered-users", // Cache key
    "users", // Table name
    5000, // Cache time
    (query) => query.eq("role", "admin") // Supabase query filter
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>
          {user.name} ({user.role})
        </li>
      ))}
    </ul>
  );
};
```

### Data Mutations

Use the `useClientMutate` hook for data modifications:

```tsx
import { useClientMutate } from "@/hooks/use-client-mutation";

// Insert data
const AddPost = () => {
  const mutation = useClientMutate("posts", "insert");

  const handleSubmit = () => {
    mutation.mutate({ title: "New Post", content: "Content" });
  };

  return <button onClick={handleSubmit}>Add Post</button>;
};

// Update data
const UpdatePost = () => {
  const mutation = useClientMutate("posts", "update");

  const handleUpdate = () => {
    mutation.mutate({ id: 1, title: "Updated Post" });
  };

  return <button onClick={handleUpdate}>Update Post</button>;
};

// Delete data
const DeletePost = () => {
  const mutation = useClientMutate("posts", "delete");

  const handleDelete = () => {
    mutation.mutate({ id: 1 });
  };

  return <button onClick={handleDelete}>Delete Post</button>;
};
```

### Stripe Integration

For payment processing and subscriptions:

```tsx
import { useStripe } from "@/hooks/useStripe";
import { useUserPurchases } from "@/hooks/useUserPurchases";

const PricingComponent = () => {
  const { redirectToCheckout, loading } = useStripe();
  const { hasValidPurchase, canPurchase } = useUserPurchases();

  const handlePurchase = (priceId: string) => {
    redirectToCheckout(priceId);
  };

  return (
    <div>
      {hasValidPurchase("pro-plan") ? (
        <p>You have access to Pro features!</p>
      ) : (
        <button onClick={() => handlePurchase("price_xyz")} disabled={loading}>
          {loading ? "Processing..." : "Upgrade to Pro"}
        </button>
      )}
    </div>
  );
};
```

## 📁 Project Structure

```
📦 swift-simplify-starter
├── 📂 app                    # Next.js App Router
│   ├── 📂 (auth)            # Authentication pages
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   └── actions.ts       # Auth actions
│   ├── 📂 (dashboard)       # Dashboard pages
│   │   ├── dashboard/       # Main dashboard
│   │   ├── profile/         # User profile
│   │   └── layout.tsx       # Dashboard layout
│   ├── 📂 api               # API routes
│   │   ├── auth/            # Better Auth API
│   │   └── stripe/          # Stripe webhooks
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── 📂 components            # Shared components
│   ├── 📂 ui                # ShadCN UI components
│   ├── 📂 layout            # Layout components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Features.tsx     # Features section
│   │   ├── Pricing.tsx      # Pricing section
│   │   └── FAQ.tsx          # FAQ section
│   └── 📂 user              # User-related components
├── 📂 hooks                 # Custom React hooks
│   ├── use-client-fetch.ts  # Data fetching hook
│   ├── use-client-mutation.ts # Data mutation hook
│   ├── useStripe.ts         # Stripe integration hook
│   └── useUserPurchases.ts  # User purchase management
├── 📂 lib                   # Utility functions
│   ├── auth.ts              # Better Auth configuration
│   ├── auth-client.ts       # Auth client setup
│   ├── auth-context.tsx     # Auth context provider
│   ├── stripe.ts            # Stripe client
│   └── utils.ts             # General utilities
├── 📂 supabase              # Supabase integration
│   ├── client.ts            # Client configuration
│   ├── server.ts            # Server utilities
│   └── migrations/          # Database migrations
├── 📂 messages              # Internationalization files
│   ├── en.json              # English translations
│   ├── zh.json              # Chinese translations
│   └── ja.json              # Japanese translations
├── 📂 config                # Configuration files
├── 📂 types                 # TypeScript type definitions
└── 📂 docs                  # Project documentation
    ├── 📂 landing-page      # Landing page documentation
    ├── 📂 design            # Design system docs
    ├── installation.md      # Installation guide
    ├── development.md       # Development guide
    ├── deployment.md        # Deployment guide
    └── contributing.md      # Contributing guide
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Better Auth
- **Payment**: Stripe
- **State Management**: React Query (TanStack Query)
- **UI Components**: ShadCN/UI + Radix UI
- **Styling**: Tailwind CSS
- **Form Validation**: Zod
- **Type System**: TypeScript
- **Email**: Resend
- **Deployment**: Docker + Vercel ready

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically

### Docker

```bash
# Build the image
docker build -t swift-simplify .

# Run the container
docker run -p 3000:3000 swift-simplify
```

### Self-hosted

```bash
# Build the project
pnpm build

# Start the server
pnpm start
```

## 📖 Documentation

Detailed documentation is available in the `docs` directory:

- [Installation Guide](./docs/installation.md)
- [Development Guide](./docs/development.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guide](./docs/contributing.md)
- [Better Auth Setup](./docs/better-auth.md)
- [Landing Page Documentation](./docs/landing-page/README.md)
- [Design System](./docs/design/README.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

## 📄 License

MIT © [Your Name]

---

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](./docs/)
2. Search [existing issues](https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter/issues)
3. Create a [new issue](https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter/issues/new)

## 🔗 Links

- [Live Demo](https://your-demo-url.com)
- [Documentation](./docs/)
- [GitHub Repository](https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter)
