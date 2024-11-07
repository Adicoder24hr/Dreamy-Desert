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
        text_color: "hsl(159, 69%, 38%)",
        red: "hsl(14, 86%, 42%)",
        light_red: "hsl(7, 20%, 60%)",
        rose_400: "hsl(7, 20%, 60%)",
        rose_50: "hsl(20, 50%, 98%)",
        rose_300: "hsl(14, 25%, 72%)",
        cart_color: "#8B7C77",
        Rose_500: "hsl(12, 20%, 44%)",
        rose_100: "hsl(13, 31%, 94%)",
        rose_900: "hsl(14, 65%, 9%)"
      },
    },
  },
  plugins: [],
};
export default config;
