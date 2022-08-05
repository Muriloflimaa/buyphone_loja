/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],

    theme: {
        extend: {
            colors: {
                Primary: '#161C24',
                PrimaryText: '#fff',
                border: '#5F5F5F',
                default: '#201942',
                colorCard: '#212B36',
            },
            backgroundImage: {
                curved: "url('../src/assets/images/download.svg')",
            },
        },
    },
    plugins: [require('daisyui'), require('tw-elements/dist/plugin')],
}
