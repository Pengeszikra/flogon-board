import { defineConfig } from 'vite';
import cleanPlugin from 'vite-plugin-clean';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: 'webroot', // Set the output directory to 'webroot'
    emptyOutDir: false, // Vite will not clear the folder by itself
  },
  plugins: [
    cleanPlugin({
      targets: ['webroot'], // Clear the 'webroot' folder before each build
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'public/**/*', // Copy everything from the 'public' folder
          dest: '', // Copy directly into 'webroot'
        },
      ],
    }),
  ],
});
