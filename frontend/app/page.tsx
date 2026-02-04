"use client";

// import { isTokenValid } from "@/app/validations/AuthGuard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserFromToken } from "@/lib/currentUser";

export default function Home() {
  const router = useRouter();
  const user = getUserFromToken();
  const userRole = user?.role;
  console.log("User Role:", userRole);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or cookies if you're using them

    if (token && userRole) {
      switch (userRole) {
        case "ADMIN":
          router.replace("/admin");
          break;
        default:
          router.replace("/auth/login"); // fallback
      }
    } else {
      router.replace("/auth/login");
    }
  }, [router, userRole]);
  return (
    <>Loading...
    </>
  );
}
