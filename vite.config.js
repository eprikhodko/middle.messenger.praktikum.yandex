import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import postcssNesting from 'postcss-nesting';

const root = resolve(__dirname, "src");

export default defineConfig({
  server: {
    port: 3000,
  },
  root,
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        signIn: resolve(root, "pages/sign-in/sign-in.html"),
      },
    },
  },
  plugins: [
    handlebars({
      context: {
        username: "John",
      },
    }),
  ],
  css: {
    postcss: {
        plugins: [
            postcssNesting
        ],
    },
},
});
