/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                Primary: '#161C24',
                PrimaryText: '#fff',
                border: '#5F5F5F',
                colorCard: '#212B36',
            },
        },
    },
    plugins: [require('daisyui')],
}
