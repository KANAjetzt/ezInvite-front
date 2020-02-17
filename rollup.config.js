import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import builtins from "rollup-plugin-node-builtins";
import autoPreprocess from "svelte-preprocess";
import replace from "@rollup/plugin-replace";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  // external: ["MapboxGeocoder"],
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
    // globals: {
    //   MapboxGeocoder: "MapboxGeocoder"
    // }
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      preprocess: autoPreprocess({
        postcss: true
      })
    }),

    replace({
      // 2 level deep object should be stringify
      svelteEnv: JSON.stringify({
        isProd: production,
        APIUrl: "https://ezinvite.herokuapp.com/graphql"
      })
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    builtins(),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
