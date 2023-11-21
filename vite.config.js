import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import Handlebars from "handlebars";
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
        signIn: resolve(root, "pages/sign-in/sign-in.html"),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, "components"),
      context: {
        username: "John",
      },
      helpers: {
        capitalize: (value) => value === undefined ? value : value.toUpperCase(),
        link: (text, url) => {
          const handleBarsUrl = Handlebars.escapeExpression(url)
          const handleBarsText = Handlebars.escapeExpression(text)

          return new Handlebars.SafeString("<a href='" + handleBarsUrl + "'>" + handleBarsText +"</a>");
        }
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
});
