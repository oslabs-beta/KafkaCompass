import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';
const path = require('path');

export default defineConfig({
  // …
  root: path.resolve(__dirname),
  // build: {
  //   // Relative to the root
  //   outDir: './dist',
  // },
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          title: 'KafkaCompass',
        },
      },
    }),
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}',
    }),
  ],
});
