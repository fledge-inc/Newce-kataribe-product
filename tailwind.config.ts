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
        shu: "var(--shu)",
        kogane: "var(--kogane)",
        "map-ground": "var(--map-ground)",
        "map-shelf": "var(--map-shelf)",
        "map-block": "var(--map-block)",
        "map-line": "var(--map-line)",
        "map-frame": "var(--map-frame)"
      },
      fontFamily: {
        sans: ["var(--sans)"],
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
