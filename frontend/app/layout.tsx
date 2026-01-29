

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import ThemeProvider from "@/app/components/ThemeProvider";
// import { Providers } from "@/app/providers";
// import { ToastContainer } from "react-toastify";
// import { Menu } from "lucide-react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap", // Ensures no flash of unstyled text
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: {
//     default: "My Next.js App",
//     template: "%s | My Next.js App",
//   },
//   description: "A modern Next.js application built with the latest best practices.",
//   keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
//   authors: [{ name: "Your Name" }],
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://your-site.com",
//     siteName: "My Next.js App",
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@yourhandle",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
//       >
//         <Providers>
//         <ThemeProvider>
//           {children}
//           <ToastContainer
//             position="bottom-right"
//             autoClose={6000}
//             hideProgressBar={false}
//             closeOnClick
//             pauseOnHover
//             draggable
//             pauseOnFocusLoss
//             toastClassName="custom-toast"
//           />
//         </ThemeProvider>
//         </Providers>
//       </body>
//     </html>
//   );
// }



import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/app/admin/components/ThemeProvider";
import { Providers } from "@/app/providers";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/app/admin/components/sidebar";
import { Menu } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Next.js App",
    template: "%s | My Next.js App",
  },
  description: "A modern Next.js application built with the latest best practices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          <ThemeProvider>

            {/* ✅ DRAWER WRAPPER */}
            <div className="drawer lg:drawer-open">

              {/* Sidebar already contains drawer-toggle input */}
              {/* <Sidebar /> */}

              {/* Main content */}
              <div className="drawer-content flex flex-col min-h-screen">

                {/* Page Content */}
                <main className="flex-1">{children}</main>
              </div>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={6000}
              pauseOnHover
              draggable
              toastClassName="custom-toast"
            />

          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
