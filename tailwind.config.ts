import type { Config } from 'tailwindcss'

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Montserrat',
  				'sans-serif'
  			],
  			montserrat: [
  				'Montserrat',
  				'sans-serif'
  			],
  			geist: [
  				'Geist',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			bgFadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			orbit: {
  				'0%': {
  					transform: 'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))'
  				},
  				'100%': {
  					transform: 'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))'
  				}
  			}
  		},
  		animation: {
  			float: 'float 3s ease-in-out infinite',
  			fadeIn: 'fadeIn 1.5s ease-in-out forwards',
  			bgFadeIn: 'bgFadeIn 0.8s ease-in-out forwards',
  			orbit: 'orbit calc(var(--duration)*1s) linear infinite'
  		}
  	}
  },
  plugins: [],
} satisfies Config