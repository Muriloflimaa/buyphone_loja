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
    './src/utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        Primary: '#161C24',
        PrimaryText: '#fff',
        border: '#5F5F5F',
        default: '#201942',
      },
      backgroundImage: {
        curved: "url('../src/assets/images/download.svg')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#06002A',
          secondary: '#FFFFFF',
          info: '#0E9AFF',
          success: '#00A944',
          accent: '#ffffff',
          error: '#E26C6C',
          // 'base-300': '#004907',
          'neutral-content': '#00000073',
          'info-content': '#201942',
          '--glass-blur': '20px',
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#161C24',
          secondary: '#161C24',
          'base-100': '#161C24',
          'base-content': '#FFFFFF',
          accent: '#212B36',
          info: '#0E9AFF',
          success: '#00A944',
          error: '#E26C6C',
          'base-300': '#459C4E',
          'neutral-content': '#D2D2D2',
          'info-content': '#FFFFFF',
          '--glass-blur': '20px',
        },
      },
    ],
  },
  plugins: [require('daisyui'), rotateY],
}
