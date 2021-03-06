"use strict";

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    default: './src/default.js',
    "curl-to-crystal": './src/curl-to-crystal.js'
  },

  output: {
    path: path.join(__dirname, "public/assets"),
    filename: "[name].js"
  },

  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: '/assets/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
              "useBuiltIns": "usage",
              "corejs": 3
            }]
            ]
          }
        }
      }
    ]
  }
}
