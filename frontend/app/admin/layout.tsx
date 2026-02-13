"use client";

import AuthGuard from "@/lib/AuthGuard";
// import Sidebar from "@/app/admin/components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
          <main>
            {children}
          </main>
    </AuthGuard>
  );
}
