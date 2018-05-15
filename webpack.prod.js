"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CSSPlugin = require("modular-css-webpack/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = merge(require("./webpack.common"), {
  mode: "production",
  devtool: "hidden-source-map",
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            inline: true,
            passes: 3,
          },
          output: {
            ecma: 5,
            comments: false,
          },
          toplevel: true,
          mangle: {
            safari10: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "DEBUG": "false",
      "TARGET": JSON.stringify("browser"),
    }),
    new CSSPlugin({
      css: "main.css",
      json: "css.json",
    }),
    new CopyWebpackPlugin([
      { from: "assets/", to: "" },
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: "html/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
    }),
  ],
});
