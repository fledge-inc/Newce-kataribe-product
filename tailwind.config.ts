import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sumi: "var(--sumi)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        kinari: "var(--kinari)",
        washi: "var(--washi)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        shu: "var(--shu)"
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        mincho: ["var(--mincho)"]
      },
      letterSpacing: {
        jp: "0.14em",
        latin: "0.22em"
      }
    }
  },
  plugins: []
};

export default config;
