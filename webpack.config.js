const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    open: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: () => `
        <html>
          <head></head>
          <body>
            <div id="app">
              <h1 class='header1'>Tetris</h1>
            </div>
          </body>
        </html>
      `,
      filename: "index.html",
    }),
  ],
};

module.exports = config;
