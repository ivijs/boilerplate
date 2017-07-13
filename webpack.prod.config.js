const path = require("path");
const webpack = require("webpack");
const ClosureCompilerPlugin = require("webpack-closure-compiler");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFileName: "tsconfig.json",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "__IVI_DEV__": false,
      "__IVI_BROWSER__": true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
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
        rewrite_polyfills: true,
      },
      concurrency: 3,
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
