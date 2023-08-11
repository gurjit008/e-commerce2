/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {

    extend: {
      
      animation: {
        'fadeInRight': 'fadeInRight 0.4s ease-in-out forwards',
        'fadeOutRight': 'fadeOutRight 2s  ease-in-out',
      },
      keyframes: {
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }, 
        fadeOutRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },

      },
    
      screens: {
        'xs': '240px',
        // => @media (min-width: 240px) { ... }

        'sm': '440px',
        // => @media (min-width: 640px) { ... }
  
        'md': '740px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1200px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
        backgroundImage: {
        'banner': "url('https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691478491/product_images/banner_b8hdqo.webp')"
     
      },
      colors: {
        earthy: '#685f58',
        'custom-gray': '#3a3a3a',
        'custom-green':'#008060',
      },
      boxShadow: {
        '3xl': '6px 12px 60px rgba(0,0,0,.2)',
      },
      imageStyle: {
        'custom': 'filter brightness-70 sepia-100 hue-rotate-150',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

