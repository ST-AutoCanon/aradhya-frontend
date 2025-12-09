// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#4B6CB7",
        customPurple: "#8E54E9",
        customPink: "#FF69B4",
      },
    },
  },
  plugins: [],
}
