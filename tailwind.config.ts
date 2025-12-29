import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      extend: {
        colors: {
          border: "oklch(var(--border))",
          input: "oklch(var(--input))",
          ring: "oklch(var(--ring))",
          background: "oklch(var(--background))",
          foreground: "oklch(var(--foreground))",
          primary: {
            DEFAULT: "oklch(var(--primary))",
            foreground: "oklch(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "oklch(var(--secondary))",
            foreground: "oklch(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "oklch(var(--destructive))",
            foreground: "oklch(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "oklch(var(--muted))",
            foreground: "oklch(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "oklch(var(--accent))",
            foreground: "oklch(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "oklch(var(--popover))",
            foreground: "oklch(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "oklch(var(--card))",
            foreground: "oklch(var(--card-foreground))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
} satisfies Config;