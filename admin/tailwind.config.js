/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: { 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca' },
                dark: { 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' }
            }
        }
    },
    plugins: []
}
