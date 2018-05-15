"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    chunkFilename: "[chunkhash].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  module: {
    strictExportPresence: true,
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
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(__dirname, "node_modules", ".cache", "cache-loader"),
            },
          },
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
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
};
