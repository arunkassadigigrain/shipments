


import { jwtDecode } from "jwt-decode";

type DecodedUser = {
  id: string;
  email: string;
  name: string;
  role?: string;
  exp: number; // expiration in seconds
};

export const getUserFromToken = (): DecodedUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const decoded: DecodedUser = jwtDecode(token);

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (decoded.exp < currentTime) {
      // Token expired
      console.warn("🔒 Token has expired. Redirecting to home page.");
      localStorage.removeItem("token"); // Optional: clean up
      window.location.href = "/auth/login"; // Redirect to login
      return null;
    }

    return decoded;
  } catch (err) {
    console.error("🔥 getUserFromToken: Token decode error!", err);
    localStorage.removeItem("token"); // Optional: remove invalid token
    window.location.href = "/auth/login"; // Redirect to login
    return null;
  }
};
