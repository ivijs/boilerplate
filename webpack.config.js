const path = require("path");
const webpack = require("webpack");
const CSSPlugin = require("modular-css-webpack/plugin");

module.exports = {
  mode: "development",
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
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
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
  devServer: {
    port: 9000,
    host: "localhost",
    historyApiFallback: true,
    noInfo: false,
    stats: "minimal",
    contentBase: path.join(__dirname, "public"),
  },
};
