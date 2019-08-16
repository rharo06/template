var path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"

      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      favicon: './public/favicon.ico',
    }),
    new CopyWebpackPlugin([
      { from: './src/assets/images', to: 'assets' },
      { from: './src/assets/logo', to: 'assets' }
    ]),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/serviceWorker.js',
      swDest: 'sw.js'
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};