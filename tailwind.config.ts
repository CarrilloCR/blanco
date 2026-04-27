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
        // All colors driven by CSS custom properties — theme-toggle safe
        volcan: {
          DEFAULT: "rgb(var(--color-volcan) / <alpha-value>)",
          50: "rgb(var(--color-volcan-50) / <alpha-value>)",
          100: "rgb(var(--color-volcan-100) / <alpha-value>)",
          900: "rgb(var(--color-volcan-900) / <alpha-value>)",
        },
        selva: {
          DEFAULT: "rgb(var(--color-selva) / <alpha-value>)",
          50: "rgb(var(--color-selva-50) / <alpha-value>)",
          100: "rgb(var(--color-selva-100) / <alpha-value>)",
          200: "rgb(var(--color-selva-200) / <alpha-value>)",
          300: "rgb(var(--color-selva-300) / <alpha-value>)",
          400: "rgb(var(--color-selva-400) / <alpha-value>)",
          500: "rgb(var(--color-selva-500) / <alpha-value>)",
          600: "rgb(var(--color-selva-600) / <alpha-value>)",
          700: "rgb(var(--color-selva-700) / <alpha-value>)",
          800: "rgb(var(--color-selva-800) / <alpha-value>)",
          900: "rgb(var(--color-selva-900) / <alpha-value>)",
        },
        hibisco: {
          DEFAULT: "rgb(var(--color-hibisco) / <alpha-value>)",
          50: "rgb(var(--color-hibisco-50) / <alpha-value>)",
          100: "rgb(var(--color-hibisco-100) / <alpha-value>)",
          400: "rgb(var(--color-hibisco-400) / <alpha-value>)",
          500: "rgb(var(--color-hibisco-500) / <alpha-value>)",
          600: "rgb(var(--color-hibisco-600) / <alpha-value>)",
          700: "rgb(var(--color-hibisco-700) / <alpha-value>)",
        },
        sol: {
          DEFAULT: "rgb(var(--color-sol) / <alpha-value>)",
          50: "rgb(var(--color-sol-50) / <alpha-value>)",
          100: "rgb(var(--color-sol-100) / <alpha-value>)",
          400: "rgb(var(--color-sol-400) / <alpha-value>)",
          500: "rgb(var(--color-sol-500) / <alpha-value>)",
          600: "rgb(var(--color-sol-600) / <alpha-value>)",
        },
        arena: {
          DEFAULT: "rgb(var(--color-arena) / <alpha-value>)",
          50: "rgb(var(--color-arena-50) / <alpha-value>)",
          100: "rgb(var(--color-arena-100) / <alpha-value>)",
          200: "rgb(var(--color-arena-200) / <alpha-value>)",
          400: "rgb(var(--color-arena-400) / <alpha-value>)",
          500: "rgb(var(--color-arena-500) / <alpha-value>)",
          600: "rgb(var(--color-arena-600) / <alpha-value>)",
        },
        marfil: {
          DEFAULT: "rgb(var(--color-marfil) / <alpha-value>)",
          50: "rgb(var(--color-marfil-50) / <alpha-value>)",
          100: "rgb(var(--color-marfil-100) / <alpha-value>)",
          200: "rgb(var(--color-marfil-200) / <alpha-value>)",
          300: "rgb(var(--color-marfil-300) / <alpha-value>)",
          400: "rgb(var(--color-marfil-400) / <alpha-value>)",
        },
        niebla: {
          DEFAULT: "rgb(var(--color-niebla) / <alpha-value>)",
          50: "rgb(var(--color-niebla-50) / <alpha-value>)",
          100: "rgb(var(--color-niebla-100) / <alpha-value>)",
          400: "rgb(var(--color-niebla-400) / <alpha-value>)",
          500: "rgb(var(--color-niebla-500) / <alpha-value>)",
          600: "rgb(var(--color-niebla-600) / <alpha-value>)",
          700: "rgb(var(--color-niebla-700) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "spin-slower": "spin 36s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
