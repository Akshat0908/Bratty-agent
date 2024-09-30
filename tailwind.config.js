module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#9F7AEA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          900: '#4C1D95',
        },
        gray: {
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        red: {
          600: '#DC2626',
        },
        blue: {
          600: '#2563EB',
        },
        green: {
          600: '#16A34A',
        },
        yellow: {
          600: '#CA8A04',
        },
        indigo: {
          600: '#4F46E5',
        },
      },
      scale: {
        '105': '1.05',
      },
      animation: {
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
}