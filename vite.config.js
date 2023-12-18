import { resolve } from "path";
import { defineConfig } from "vite";
import vitePluginHandlebarsPrecompile from "./vite-plugin-handelbars-precompile";
import postcssNesting from "postcss-nesting";

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
      },
    },
  },
  resolve: {
    alias: {
      "@src": root,
      "@components": resolve(__dirname, `${root}/components`),
      "@modules": resolve(__dirname, `${root}/modules`),
    },
  },
  plugins: [vitePluginHandlebarsPrecompile()],
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
});
