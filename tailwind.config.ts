import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      keyframes: {
        slider: {
          '0%': { transform: 'translateX(100%)' },  // Start off-screen (right)
          '10%': { transform: 'translateX(0)' },    // Slide in (500ms)
          '90%': { transform: 'translateX(0)' },    // Stay in place (visible for 2 seconds)
          '100%': { transform: 'translateX(100%)' },// Slide out (500ms)
        },

      },
      animation: {
        slider: 'slider 3500ms linear forwards',

      },
    },
  },
};

export default config;
