/** @type {import('tailwindcss').Config} config */
const config = {
  content: ['./index.php', './app/**/*.php', './resources/**/*.{php,vue,js}'],
  theme: {
    extend: {
      colors: {
        "ritchiesblue": {
          50: "#DBE9FF",
          100: "#B8D3FF",
          200: "#6BA4FF",
          300: "#2478FF",
          400: "#0052D6",
          500: "#00388F",
          600: "#002B70",
          700: "#002157",
          800: "#001638",
          900: "#000C1F",
          950: "#00060F"
        },
        "ritchiesred": {
          50: "#FEE6EC",
          100: "#FDC9D4",
          200: "#FB93A9",
          300: "#F95D7F",
          400: "#F72654",
          500: "#DE0835",
          600: "#B1062B",
          700: "#850521",
          800: "#590316",
          900: "#2C020B",
          950: "#190106"
        }

      }, // Extend Tailwind's default colors
    },
  },
  plugins: [],
};

export default config;
