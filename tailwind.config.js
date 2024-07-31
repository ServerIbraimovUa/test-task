/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                mobile: "400px",
                tablet: "768px",
                desktop: "1280px",
            },

            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
};
