/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        memo: {
          white: "#FFFFFF",
          navy: "#020381",
          blue: "#4255FF",
          gray: "#3A3A3A",
          lavender: "#d3d4f5",
          ocean: "#21618C",
          success: "#27AE60",
          warning: "#F39C12",
          error: "#C0392B"
        }
      },
      fontFamily: {
        sans: [
          'Poppins',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        heading: [
          'Montserrat',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      boxShadow: {
        'memo': '0 0 20px rgba(66, 85, 255, 0.15)',
        'memo-hover': '0 0 30px rgba(66, 85, 255, 0.25)',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        memoApp: {
          "primary": "#FFFFFF",          // Pure white
          "primary-focus": "#F8F9FA",    // Slightly off-white
          "primary-content": "#020381",   // Navy for content
          
          "secondary": "#020381",        // Navy blue
          "secondary-focus": "#03039c",  // Lighter navy
          "secondary-content": "#FFFFFF", // White text
          
          "accent": "#4255FF",           // Bright blue
          "accent-focus": "#2b3fff",     // Darker accent
          "accent-content": "#FFFFFF",    // White text
          
          "neutral": "#3A3A3A",          // Gray
          "neutral-focus": "#2A2A2A",    // Darker gray
          "neutral-content": "#FFFFFF",   // White text
          
          "base-100": "#d3d4f5",         // Lavender
          "base-200": "#c4c5e6",         // Darker lavender
          "base-300": "#b5b6d7",         // Even darker
          "base-content": "#1F2937",     // Dark gray text
          
          "info": "#21618C",             // Ocean blue
          "success": "#27AE60",          // Green
          "warning": "#F39C12",          // Orange
          "error": "#C0392B",            // Red

          // Custom properties
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.3rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
      // Dark theme variant
      {
        memoAppDark: {
          "primary": "#020381",
          "secondary": "#FFFFFF",
          "accent": "#4255FF",
          "neutral": "#1F2937",
          "base-100": "#111827",
          "info": "#21618C",
          "success": "#27AE60",
          "warning": "#F39C12",
          "error": "#C0392B",
        },
      }
    ],
    darkTheme: "memoAppDark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  }
}