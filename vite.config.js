import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

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
        signIn: resolve(root, "sign-in.html"),
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
});
