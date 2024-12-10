import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		open: 'index.html'
	},
	optimizeDeps: {
		exclude: ['@ckeditor/ckeditor5-build-classic']
	},
	build: {
		rollupOptions: {
			external: ['@ckeditor/ckeditor5-build-classic']
		}
	}
});
