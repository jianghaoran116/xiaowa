const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    overlay: true,
    contentBase: './dist',
    open: true,
    port: 8383,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8099',
        secure: false, // https
        pathRewrite: {
          '^/api': '',
        },
        // 'changeOrigin': true,
        // 'header': {
        //   host: '',
        //   cookie: ''
        // }
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     // MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 2,
      //       },
      //     },
      //     'sass-loader',
      //     'postcss-loader',
      //   ],
      // }, {
      //   test: /\.css$/,
      //   use: [
      //     // {
      //     //   loader: MiniCssExtractPlugin.loader,
      //     //   options: {
      //     //     hmr: true,
      //     //   },
      //     // },
      //     'css-loader',
      //     'postcss-loader',
      //   ],
      // },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
};

module.exports = merge(commonConfig, devConfig);
