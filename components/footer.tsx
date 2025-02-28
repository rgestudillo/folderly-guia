import Link from "next/link";
import { Github, Leaf } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-1.5 rounded-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-green-700 dark:text-green-500">
                GUIA
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
              Empowering sustainable development through innovative
              environmental assessments.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/rgestudillo/folderly-guia"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {currentYear} GUIA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
