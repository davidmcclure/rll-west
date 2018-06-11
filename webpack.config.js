

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/index.js',
  output: {
    filename: 'script.js',
    path: resolve('dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RLL West',
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'root',
    })
  ],
  devServer: {
    contentBase: resolve('dist'),
    port: 1337
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  }
};
