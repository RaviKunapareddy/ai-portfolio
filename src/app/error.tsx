'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to monitoring here
    // console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] bg-white text-slate-800 flex items-center">
      <main className="container mx-auto px-4 py-12 w-full">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-200 mb-6">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
          <p className="text-slate-600 mb-6">
            An unexpected error occurred. You can try again or go back to the homepage.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Go home
            </Link>
          </div>
          {process.env.NODE_ENV !== 'production' && (
            <pre className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded text-left overflow-auto text-xs text-slate-600">
              {error.message}
              {error.digest ? `\nDigest: ${error.digest}` : ''}
            </pre>
          )}
        </div>
      </main>
    </div>
  );
}
