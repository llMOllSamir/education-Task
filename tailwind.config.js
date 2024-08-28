/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   primary: "#096cb4",
      //   HoverPrimary: "#0d3c5e",
      // },
      colors: {
        primary: "var(--primary)",
        HoverPrimary: "var(--hover-primary)",
      },
      fontFamily: {
        tajawal: ["Tajawal", "sans-serif"],
      },
    },
  },
  plugins: [],
};
