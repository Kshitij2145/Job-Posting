/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5c4ce5", // Main purple color
          dark: "#4736c0",    // Darker shade of purple
          light: "#8271ff",   // Lighter shade of purple
        },
        secondary: "#f5f7fa", // Light background color
        accent: "#ff6b6b",    // Accent color for highlights
        background: "#f0f3f8", // Page background
        success: "#28a745",   // Success color
        warning: "#ffc107",   // Warning color
        error: "#dc3545",     // Error color
      },
      textColor: {
        light: "#ffffff",      // Light text color
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '8px',
        'lg': '12px',
        'xl': '20px',
      },
    },
  },
  plugins: [],
} 