const HtmlWebPackPlugin = require("html-webpack-plugin");
const ESLIntPlugin = require('eslint-webpack-plugin');

const hmtlPLugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [hmtlPLugin, new ESLIntPlugin({
    fix: true
  })],
};
