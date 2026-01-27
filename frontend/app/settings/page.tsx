"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Palette, } from "lucide-react";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-base-content/70 mb-8">
        Manage your account preferences and appearance
      </p>

      <div className="space-y-10">
        {/* THEME */}
        <section className="card bg-base-100 shadow-xl rounded-2xl p-6 border border-base-200">
          <div className="flex items-center gap-3 mb-5">
            <Palette className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "light", label: "Light", icon: Sun },
              { id: "dark", label: "Dark", icon: Moon },
              { id: "system", label: "System", icon: Monitor },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className={`btn btn-outline flex flex-col items-center gap-2 h-auto py-6
                  ${theme === id ? "border-primary bg-primary/10 text-primary" : ""}
                `}
              >
                <Icon className="w-8 h-8" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}