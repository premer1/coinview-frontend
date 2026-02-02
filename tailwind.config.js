module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        button: 'var(--color-bg-button)',
      },
      textColor: {
        accent: 'var(--color-text-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        btnText: 'var(--color-bg-secondary)',
      },
      borderColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        input: 'var(--color-bg-input)',
        accent: 'var(--color-text-accent)',
      },
      colors: {
        // Add emerald for positive changes (calm green, not aggressive)
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [],
};