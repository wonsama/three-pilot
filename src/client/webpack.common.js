const path = require('path');
const {entry, template} = require('../../entry.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../dist/client'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template,
    }),
    new FaviconsWebpackPlugin('./src/client/favicon.png'),
  ],
};
