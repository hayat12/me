import type { Config } from "tailwindcss";

// All values resolve to CSS variables declared in src/design-system/tokens/tokens.css
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "var(--color-bg)", raised: "var(--color-bg-raised)", sunken: "var(--color-bg-sunken)" },
        fg: { DEFAULT: "var(--color-fg)", muted: "var(--color-fg-muted)", subtle: "var(--color-fg-subtle)" },
        brand: { DEFAULT: "var(--color-brand)", strong: "var(--color-brand-strong)", soft: "var(--color-brand-soft)" },
        accent: "var(--color-accent)",
        line: "var(--color-line)",
        danger: "var(--color-danger)",
      },
      fontFamily: { sans: ["var(--font-sans)"], mono: ["var(--font-mono)"] },
      borderRadius: { pill: "var(--radius-pill)", card: "var(--radius-card)" },
      boxShadow: { glow: "var(--shadow-glow)", card: "var(--shadow-card)" },
      transitionTimingFunction: { out: "var(--ease-out)" },
    },
  },
  plugins: [],
};
export default config;
