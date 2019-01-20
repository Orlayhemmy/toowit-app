const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

require("babel-polyfill");

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/client/index.jsx')
  ],
  mode: "development",
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: 'babel-loader',
        query: {
          presets: ['react', 'env'],
          plugins: [
            'transform-class-properties',
          ]
        },
        include: [path.join(__dirname, 'client')],
        exclude: /(node_modules|server|.vscode)/
      },
      {
        test: /\.(sass|scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints readable module names console
    new Dotenv()
  ],
  node: {
    dns: 'empty',
    net: 'empty'
  }
};
