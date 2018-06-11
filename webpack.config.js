

const path = require('path');


const distDir = path.resolve(__dirname, 'dist')


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'script.js',
    path: distDir
  },
  devServer: {
    contentBase: distDir,
    port: 1337
  }
};
