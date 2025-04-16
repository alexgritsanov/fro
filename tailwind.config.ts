
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Unidoc custom colors - consistent blue palette
				unidoc: {
					'primary-blue': '#0EA5E9', // Main brand blue
					'deep-blue': '#0C4A6E', // Deep blue for strong elements
					'light-blue': '#7DD3FC', // Light blue for highlights
					'cyan-blue': '#22D3EE', // Cyan tone for vibrant accents
					'teal-blue': '#0891B2', // Teal blue for accent variety
					'secondary-orange': '#FB923C', // Complementary orange
					'dark': '#1A1F36', // Text and headings
					'medium': '#6E7891', // Secondary text
					'light-gray': '#E9ECF2', // Borders, dividers
					'extra-light': '#F7F9FC', // Backgrounds
					'success': '#10B981', // Success states
					'warning': '#FBBF24', // Warning states
					'error': '#F43F5E', // Error states
					'info': '#0EA5E9', // Info states (matches primary-blue)
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(100%)' }
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'reveal': {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'scale-out': 'scale-out 0.3s ease-out',
				'reveal': 'reveal 0.6s ease-out',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite linear'
			},
			backgroundImage: {
				// Primary gradient system with consistent blue tones
				'primary-gradient': 'linear-gradient(90deg, #0EA5E9 0%, #0891B2 100%)', 
				'primary-hover-gradient': 'linear-gradient(90deg, #0EA5E9 20%, #0891B2 120%)',
				
				// Secondary and functional gradients
				'secondary-gradient': 'linear-gradient(135deg, #FB923C 0%, #FDBA74 100%)',
				'success-gradient': 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
				'info-gradient': 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
				'warning-gradient': 'linear-gradient(135deg, #FBBF24 0%, #FCD34D 100%)',
				'error-gradient': 'linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)',
				
				// Blue family gradients - consistent palette
				'blue-teal-gradient': 'linear-gradient(90deg, #0EA5E9 0%, #0891B2 100%)',
				'blue-cyan-gradient': 'linear-gradient(135deg, #0C4A6E 0%, #22D3EE 100%)',
				'cyan-sky-gradient': 'linear-gradient(to right, #22D3EE 0%, #7DD3FC 100%)',
				'deep-ocean-gradient': 'linear-gradient(to right, #0C4A6E 0%, #0EA5E9 100%)',
				
				// Utility and effect gradients
				'glass-morphism': 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
				'sidebar-gradient': 'linear-gradient(180deg, #075985 0%, #0891B2 100%)',
				'card-hover-gradient': 'linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(14,165,233,0.05) 100%)',
				'shimmer-gradient': 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0) 40%)',
				
				// Card gradients
				'card-gradient-blue': 'linear-gradient(to bottom right, #f0f9ff 0%, #e0f2fe 100%)',
				'card-gradient-success': 'linear-gradient(to bottom right, #f0fdf4 0%, #dcfce7 100%)',
				'card-gradient-warning': 'linear-gradient(to bottom right, #fffbeb 0%, #fef3c7 100%)',
				'card-gradient-error': 'linear-gradient(to bottom right, #fff1f2 0%, #ffe4e6 100%)',
				'card-gradient-info': 'linear-gradient(to bottom right, #eff6ff 0%, #dbeafe 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
