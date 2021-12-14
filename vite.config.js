import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [ react() ],
	root: './src',
	server: {
		port: 8080,
	},
	build: {
		outDir: '../dist',
		emptyOutDir: true,
	},
	publicDir: '../public',
})