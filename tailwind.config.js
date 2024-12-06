/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'app-bg': '#ffffff',
        'card-bg': '#f8fafd',
        'input-bg': '#eef2f6',
        'border': '#e6e8eb',
        'text-primary': '#1e2329',
        'text-secondary': '#707a8a',
        'accent': '#2962ff',
        'accent-hover': '#2251cc',
        'danger': '#d32f2f',
        'success': '#2e7d32',
        'warning': '#ed8a19'
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};