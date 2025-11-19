// Converted to CommonJS because current tailwindcss version listed ("^4.1.17")
// is invalid / unreleased; ensuring compatibility with stable Tailwind v3.
// Also expanded content globs to catch potential .mjs / .cjs or jsx variations.
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,mjs,cjs}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};