const path = require("path");
const webpack = require("webpack");
const ClosureCompilerPlugin = require("webpack-closure-compiler");
const CSSPlugin = require("modular-css-webpack/plugin");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "modular-css-webpack/loader"
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ClosureCompilerPlugin({
      compiler: {
        compilation_level: "ADVANCED",
        language_in: "ECMASCRIPT_2016",
        language_out: "ECMASCRIPT5_STRICT",
        use_types_for_optimization: true,
        assume_function_wrapper: true,
        isolation_mode: "IIFE",
        summary_detail_level: 3,
        warning_level: "QUIET",
        rewrite_polyfills: false,
        // jscomp_off: "*",
        new_type_inf: true
      },
      concurrency: 3,
    }),
    new CSSPlugin({
      css: "./main.css",
      json: "./css.json",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "ivi-vars": "ivi-vars/browser",
    },
  },
};
