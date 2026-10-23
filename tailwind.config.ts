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
        ayur: {
          forest: "#0F4C25",
          deep: "#0C3E1E",
          leaf: "#1E7E44",
          lightLeaf: "#E8F5E9",
          cream: "#FAF7F2",
          stone: "#F4EFE6",
          sand: "#EBE4D8",
          terracotta: "#C86D3B",
          gold: "#D4A359",
          amber: "#F59E0B",
          slate: "#1A2421",
          muted: "#5A6B63",
          border: "#E2DDD5",
        },
      },
      fontFamily: {
        sans: ["var(--font-jost)", "Jost", "system-ui", "sans-serif"],
        serif: ["var(--font-jost)", "Jost", "Georgia", "serif"],
        jost: ["var(--font-jost)", "Jost", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 76, 37, 0.06)",
        card: "0 10px 30px -5px rgba(15, 76, 37, 0.08)",
        elevated: "0 20px 40px -10px rgba(15, 76, 37, 0.12)",
      },
      borderRadius: {
        ayur: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
