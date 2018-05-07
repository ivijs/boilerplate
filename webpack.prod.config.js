const path = require("path");
const webpack = require("webpack");
const CSSPlugin = require("modular-css-webpack/plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
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
    new webpack.DefinePlugin({
      "DEBUG": "false",
      "TARGET": JSON.stringify("browser"),
    }),
    new CSSPlugin({
      css: "./main.css",
      json: "./css.json",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
