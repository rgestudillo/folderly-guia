import Link from "next/link";
import { Leaf, Github, Star, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
      <div className="container mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-3 text-xl font-bold text-gray-800 dark:text-white transition-colors hover:text-green-600 dark:hover:text-green-400"
          >
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-lg shadow-sm">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="tracking-tight">
              {process.env.NEXT_PUBLIC_APP_NAME || "Folderly Guia"}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/documentation"
              className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-800/40 rounded-full py-2 px-4 transition-all duration-300 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800"
            >
              <BookOpen className="h-4 w-4" />
              <span className="font-medium text-xs hidden sm:inline">
                Documentation
              </span>
            </Link>

            <ThemeToggle />

            <Link
              href="https://github.com/rgestudillo/folderly-guia"
              target="_blank"
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full py-2 px-4 transition-all duration-300 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
            >
              <Github className="h-4 w-4" />
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-xs hidden sm:inline">
                Star on GitHub
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
