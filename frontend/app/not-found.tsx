"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-white px-4 text-center">

      {/* 3D Delivery Box Image */}
      <Image
        src="/3d_delivery.jpg"
        alt="404 delivery box"
        width={260}
        height={260}
        className="mb-6 w-48 sm:w-64"
        priority
      />

      <p className="text-orange-500 text-lg font-semibold mb-2">
        Oops...
      </p>

      <h1 className="text-3xl text-orange-500  sm:text-4xl font-bold mb-2">
        Error 404
      </h1>

      <p className="text-gray-400 mb-6 max-w-xs sm:max-w-md">
        The page you requested could not be found.
      </p>

      <Link
        href="/auth/login"
        className="px-6 py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
      >
        Back to home
      </Link>
    </div>
  );
}

