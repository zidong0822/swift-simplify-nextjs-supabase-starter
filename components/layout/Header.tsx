"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-transparent">
      <header className="w-full max-w-7xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-200/20 dark:border-slate-700/50 rounded-b-2xl shadow-[0_4px_18px_0px_rgba(15,20,34,0.1)] dark:shadow-[0_8px_32px_0px_rgba(0,0,0,0.4)]">
        <div className="flex h-[64px] items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <h1 className="font-bold text-xl text-gray-900 dark:text-white">
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
                  className="text-[14px] font-medium text-gray-600 hover:text-primary transition-colors duration-200 dark:text-slate-300 dark:hover:text-primary relative group"
                >
                  {item.text}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100/80 dark:hover:bg-slate-800/80 rounded-lg transition-all duration-200 group"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                // Sun icon (light mode)
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-yellow-400 transition-colors duration-200"
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
              ) : (
                // Moon icon (dark mode)
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {loading ? (
              // Loading state
              <div className="w-8 h-8 animate-pulse bg-gray-200 dark:bg-slate-700 rounded-full"></div>
            ) : user ? (
              // Logged in state - show user menu
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || ""} alt={user.name} />
                      <AvatarFallback>
                        {user.name?.charAt(0)?.toUpperCase() ||
                          user.email?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Not logged in state - show login button
              <div>
                <Link
                  href="/login"
                  className="hidden md:inline-flex px-4 py-2 text-[14px] font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl dark:shadow-primary/20 dark:hover:shadow-primary/30"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
