"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4">
      {/* GIF */}
      {/* <img
        src="/404.gif"
        alt="Page not found"
        className="w-80 max-w-full mb-6"
      /> */}

      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-400 mb-6 text-center">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
