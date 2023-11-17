import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        signIn: resolve(__dirname, "src/sign-in.html"),
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
