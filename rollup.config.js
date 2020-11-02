import css from "rollup-plugin-css-only";
import image from "@rollup/plugin-image";
import svelte from "rollup-plugin-svelte";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import {terser} from "rollup-plugin-terser";

const production = process.env.NODE_ENV === "production";

export default {
  input: "index.js",
  output: {
    format: "iife",
    file: "../dist/index.js",
    sourcemap: true,
  },
  plugins: [
    css(),
    image(),
    nodeResolve(),
    svelte({
      css(css) {
        css.write("tutorial.css", true);
      },
    }),
    production && terser(),
  ],
};
