/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      },
      minHeight: {
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      maxHeight: {
        '24r': '24rem',
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      minWidth: {
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '33%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
    },
    fontFamily: {
      'body': [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji'
  ],
      'sans': [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji'
  ]
    }
  },
  plugins: [
    require('flowbite/plugin')
]
}

