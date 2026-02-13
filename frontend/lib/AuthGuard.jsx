
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getUserFromToken } from "./currentUser";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    console.log("🛡️ AuthGuard mounted");

    if (typeof window === "undefined") {
      console.log("⚠️ Window is undefined (SSR phase)");
      return null;
    }

    console.log("🌐 Running on client side");

    const token = localStorage.getItem("token");
    console.log("🔑 Token from localStorage:", token);

    const user = getUserFromToken(token);
    console.log("👤 Decoded user:", user);

    const url = window.location.pathname;
    console.log("📍 Current URL:", url);

    const firstPathVariable = url.split("/").filter(Boolean)[0];
    console.log("🧭 First path variable:", firstPathVariable);

    if (firstPathVariable === "payment") {
      console.log("💳 Payment route detected — bypassing role check");
      setAuthorized(true);
      return;
    } else if (!user?.role?.includes(firstPathVariable.toUpperCase())) {
      console.log("🚫 Role mismatch — redirecting to login", user?.role?.includes(firstPathVariable.toUpperCase()));
      router.replace("/auth/login");
      return;
    }

    if (!token) {
      console.log("❌ No token found — redirecting to login");
      router.replace("/auth/login");
      return;
    }

    try {
      console.log("🔍 Decoding token...");
      const { exp } = jwtDecode(token);
      console.log("⏳ Token exp:", exp);

      if (Date.now() >= exp * 1000) {
        console.log("⌛ Token expired — clearing token");
        localStorage.removeItem("token");
        router.replace("/auth/register");
        return;
      }

      console.log("✅ Token valid — authorization granted");
      setAuthorized(true);
    } catch (err) {
      console.log("💥 Token decoding failed:", err);
      localStorage.removeItem("token");
      router.replace("/auth/register");
    }
  }, []);

  if (!authorized) {
    console.log("⛔ Not authorized — rendering null");
    return null;
  }

  console.log("🎉 Authorized — rendering children");
  return <>{children}</>;
}

export const isTokenValid = (token) => {
  console.log("🔎 Checking token validity...");

  if (!token) {
    console.log("❌ No token provided");
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("📦 Decoded token:", decoded);

    if (!decoded.exp) {
      console.log("⚠️ No exp field in token");
      return false;
    }

    console.log("⏳ Token expiration time (exp):", decoded.exp);

    const now = Date.now() / 1000;
    console.log("🕒 Current time:", now);

    const isValid = decoded.exp > now;
    console.log(isValid ? "✅ Token is valid" : "❌ Token expired");

    return isValid;
  } catch (err) {
    console.log("💥 Error decoding token:", err);
    return false;
  }
};
