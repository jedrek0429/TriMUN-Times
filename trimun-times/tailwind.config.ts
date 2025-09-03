import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["ui-sans-serif", "system-ui", "Inter", "Arial"],
        display: ["ui-sans-serif", "system-ui", "Inter", "Arial"],
      },
      colors: {
        trimun: {
          purple: "#3c1d59",
          purpleDark: "#2a123f",
          gold: "#f0c24b",
          goldDark: "#d9a72a",
        },
      },
      boxShadow: { glass: "0 8px 30px rgba(0,0,0,.25)" },
    },
  },
  plugins: [],
} satisfies Config;