import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta institucional (inspirada no protótipo admin, adaptada ao público)
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Tons da sidebar escura
        surface: {
          900: "#0b1220",
          800: "#111827",
          700: "#1f2937",
          600: "#374151",
        },
        // Tokens semânticos por status de proposição
        status: {
          tramitacao: "#2563eb", // azul — em tramitação
          pauta: "#d97706", // âmbar — pronta para pauta
          aprovada: "#059669", // verde — aprovada
          arquivada: "#4b5563", // cinza — arquivada
          rejeitada: "#dc2626", // vermelho — rejeitada
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
