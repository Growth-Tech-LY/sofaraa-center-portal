/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'sofaraa-Hall': "url('../../src/assets/images/develop.PNG')",
        'sofaraa-newLogo': "url('../../src/assets/images/newLogo.PNG')",
        'sofaraa-slide': "url('../../src/assets/images/1.PNG')"
      },
      colors: {
        'custom-white': '#f8f0eb',
        'custom-darkCrimson': '#8e143c'
      }
    }
  },
  plugins: []
}
