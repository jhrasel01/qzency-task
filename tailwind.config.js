/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mob: "300px",
        // => @media (min-width: 640px) { ... }

        tab: "667px",
        // => @media (min-width: 768px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1500px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        "custom-text-1": "#0E1521",
        "custom-text-2": "#667085",
        "custom-text-orange": "#E46A11",

        "custom-blue": "#2166F0",
        "custom-blue-light": "#E5EFFF",

        "custom-sky-blue": "#4698AF",
        "custom-sky-blue-light": "#E2F9FF",

        "custom-green": "#0D894F",
        "custom-green-light": "#E5F5EB",

        "custom-red": "#FC0000",
        "custom-red-light": "#F9F0F0",

        "custom-yellow": "#DF9934",
        "custom-yellow-light": "#FFF6EA",

        "custom-border": "#EAECF0",
      },

      boxShadow: {
        "custom-shadow": "0px 3px 10px 0px #7777771A",
      },
    },
  },
  plugins: [],
};
