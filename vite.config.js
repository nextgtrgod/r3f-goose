import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
	resolve: {
		alias: {
			'@/': path.resolve('/'),
		},
	},
})