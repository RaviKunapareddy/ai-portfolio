'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // console.error('Project route error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center">
      <div className="w-full max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 border border-red-200 mb-5">
          <span className="text-red-600 text-xl">!</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2">We hit a snag loading this project</h2>
        <p className="text-slate-600 mb-6">Please try again. If the issue persists, return to the portfolio.</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900"
          >
            Retry
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
        {process.env.NODE_ENV !== 'production' && (
          <pre className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded text-left overflow-auto text-xs text-slate-600">
            {error.message}
            {error.digest ? `\nDigest: ${error.digest}` : ''}
          </pre>
        )}
      </div>
    </div>
  );
}
