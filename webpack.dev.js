"use strict";

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CSSPlugin = require("modular-css-webpack/plugin");

module.exports = merge(require("./webpack.common"), {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "DEBUG": "true",
      "TARGET": JSON.stringify("browser"),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "html/index.html",
    }),
    new CSSPlugin({
      css: "main.css",
      json: "css.json",
    }),
  ],
  serve: {
    content: [
      path.resolve(__dirname, "assets"),
    ],
    add: (app, middleware, options) => {
      const convert = require("koa-connect");
      middleware.webpack();
      middleware.content();
      app.use(convert(require("connect-history-api-fallback")({
        disableDotRule: true,
        htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
      })));
    },
  },
});
