/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const rotateY = plugin(function ({ addUtilities }) {
    addUtilities({
        '.rotate-Y-20': {
            transform: 'rotateX(20deg)',
        },
        '.rotate-Y-40': {
            transform: 'rotateX(40deg)',
        },
        '.rotate-Y-60': {
            transform: 'rotateX(60deg)',
        },
        '.rotate-Y-180': {
            transform: 'rotateY(180deg)',
        },
    })
})

module.exports = {
    important: true,
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
                default: '#201942',
                colorCard: '#212B36',
            },
            backgroundImage: {
                curved: "url('../src/assets/images/download.svg')",
            },
        },
    },
    plugins: [require('daisyui'), rotateY],
}
