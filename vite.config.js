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
        signUp: resolve(root, "pages/sign-up/sign-up.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, "components"),
      context: {
        username: "John",
      },
      helpers: {
        LinkCommon: (text, options) => {
          const attributes = [];

          Object.keys(options.hash).forEach(key => {
              const escapedKey = Handlebars.escapeExpression(key);
              const escapedValue = Handlebars.escapeExpression(options.hash[key]);
              attributes.push(escapedKey + '="' + escapedValue + '"');
          })
          const escapedText = Handlebars.escapeExpression(text);
          
          const escapedOutput ="<a " + attributes.join(" ") + ">" + escapedText + "</a>";
          return new Handlebars.SafeString(escapedOutput);
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
