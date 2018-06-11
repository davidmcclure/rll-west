

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'script.js',
    path: resolve('dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RLL West',
      template: require('html-webpack-template'),
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
      }
    ]
  }
};
