const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
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
    before: (app) => {
      app.get('/list', (req, res) => {
        const fileName = `./mock/list_${req.query.tab}.json`;
        const backupFileName = './mock/list.json';
        fs.exists(fileName, (exists) => {
          console.log(exists);
          fs.readFile(exists ? fileName : backupFileName, (err, content) => {
            console.log(backupFileName);
            res.send(content);
          });
        });
      });
      app.get('/price', (req, res) => {
        res.send(JSON.stringify({
          infos: [
            { price: 23 * Math.random() },
            { price: 23 * Math.random() },
          ],
        }));
      });
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8099',
    //     secure: false, // https
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //     // 'changeOrigin': true,
    //     // 'header': {
    //     //   host: '',
    //     //   cookie: ''
    //     // }
    //   },
    // },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
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
            loader: 'vue-style-loader',
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
    new VueLoaderPlugin(),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
};

module.exports = merge(commonConfig, devConfig);
