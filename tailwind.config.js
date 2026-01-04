/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          red: '#C41E3A',
          gray: '#666666',
          'light-gray': '#F5F5F5',
          'off-white': '#FAFAFA',
          white: '#FFFFFF',
          'accent-green': '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['110px', { lineHeight: '1.1', fontWeight: '800' }],
        'display-lg': ['90px', { lineHeight: '1.1', fontWeight: '800' }],
        'display-md': ['70px', { lineHeight: '1.15', fontWeight: '700' }],
        'display-sm': ['60px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-xl': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-lg': ['36px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['28px', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-xl': ['24px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['20px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-md': ['18px', { lineHeight: '1.8', fontWeight: '400' }],
        'body-sm': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      spacing: {
        'section-sm': '80px',
        'section-md': '120px',
        'section-lg': '200px',
        'card-sm': '40px',
        'card-md': '60px',
        'card-lg': '80px',
      },
    },
  },
  plugins: [],
};
