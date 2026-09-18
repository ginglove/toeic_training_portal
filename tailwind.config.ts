import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        border: "var(--border)",
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        emerald: {
          500: "#10b981",
          600: "#059669",
        },
        amber: {
          500: "#f59e0b",
          600: "#d97706",
        },
        rose: {
          500: "#f43f5e",
          600: "#e11d48",
        }
      },
      boxShadow: {
        '2.5d': '0 8px 0 rgba(0,0,0,0.12), 0 15px 25px rgba(0,0,0,0.15)',
        '2.5d-btn': '0 4px 0 rgba(0,0,0,0.2)',
        '2.5d-btn-active': '0 0 0 rgba(0,0,0,0.2)',
      }
    },
  },
  plugins: [],
};
export default config;
