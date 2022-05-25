module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "san-serif"],
      },
      colors: {
        primary: "#F62682",
        secondary: "#6F5CF1",
      },
      aspectRatio: {
        "2/3": "2 / 3",
        "3/4": "3 / 4",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
