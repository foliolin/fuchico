const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const env = require('./env');

module.exports = {
  entry: {
    default_page: [
      './src/assets/default_page.scss',
      './src/assets/default_page',
    ],
    vendor: [
      'babel-polyfill',
      'react',
    ],
  },
  output: {
    filename: '[name].js',
    path: './deploy/assets/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel', 'eslint'],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    contentBase: '/deploy/assets/',
    host: '0.0.0.0',
    progress: true,
    inline: true,
    historyApiFallback: {
      index: '/default_page.html',
    },
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin(env.required),
    new webpack.EnvironmentPlugin(env.requiredKeys),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css',{
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'default_page.html',
      template: './src/assets/default_page.html',
    }),
  ],
  eslint: {
    configFile: './.eslintrc.json',
    fix: true,
  },
  postcss() {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },
  sassLoader: {
    includePaths: [
      './node_modules/normalize-scss/sass/',
      './node_modules/normalize-scss/node_modules/support-for/sass',
    ],
  },
};
