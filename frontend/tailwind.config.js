/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors
        bgPrimary: "#121212",       // Use as `bg-bgPrimary`
        bgSecondary: "#1E1E1E",    // Use as `bg-bgSecondary`
        bgTertiary: "#242424",     // Use as `bg-bgTertiary`
        bgCard: "#2d2d2d",           // Use as `bg-card`

        // Text Colors
        textPrimary: "#FFFFFF",    // Use as `text-textPrimary`
        textSecondary: "#B3B3B3",  // Use as `text-textSecondary`
        textPlaceholder: "#757575",// Use as `text-textPlaceholder`

        // Border Colors
        borderLight: "#333333",    // Use as `border-borderLight`
        borderHover: "#444444",    // Use as `border-borderHover`

        // Button Colors
        buttonPrimary: "#1E90FF",  // Use as `bg-buttonPrimary`
        buttonPrimaryHover: "#1C86EE", // Use as `hover:bg-buttonPrimaryHover`
        buttonSecondary: "#3E3E3E", // Use as `bg-buttonSecondary`
        buttonSecondaryHover: "#4A4A4A", // Use as `hover:bg-buttonSecondaryHover`

        // Link Colors
        linkDefault: "#1E90FF",    // Use as `text-linkDefault`
        linkHover: "#4A90E2",      // Use as `hover:text-linkHover`

        // Input Colors
        inputBg: "#1E1E1E",        // Use as `bg-inputBg`
        inputText: "#FFFFFF",      // Use as `text-inputText`
        inputPlaceholder: "#757575", // Use as `text-inputPlaceholder`
        inputFocus: "#1E90FF",     // Use as `focus:ring-inputFocus`

        // Error and Success
        error: "#FF4D4D",          // Use as `text-error` or `bg-error`
        success: "#28A745",        // Use as `text-success` or `bg-success`
      },
      height: {
        "89vh": "89%",
      },
    },
  },
  plugins: [],
};

