/** @type {import('tailwindcss').Config} */

/**@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');**/
/**@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:wght@100..900&display=swap');**/
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            "otp-page-bg" : "#3F72AF",
            "para" : "#BFBFBF",
            "blue-button" : "#112D4E",
            "success" : "#23CF9B",
            "error" : "#EB2D5B",
            "course-page-bg" : "#DBFFCE",
            "course-page-heading" : "#4F6F52",
            "batch-page-bg" : "#E2BBE9",
            "batch-page-heading" : "#444B79",
            "batch-page-button" : "#6C6BAF"

        },
        fontFamily: {
            inter: ["Inter", "sans-serif"],
            dmsans: ["DM Sans", "sans-serif"],
        },
      },
    },
    plugins: [],
  }