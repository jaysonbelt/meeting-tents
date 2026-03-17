import { resolve } from 'path';

export default {
  base: '/meeting-tents/',
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        partnership: resolve(__dirname, 'partnership.html'),
        fellowship: resolve(__dirname, 'fellowship.html'),
        shop: resolve(__dirname, 'shop.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
};
