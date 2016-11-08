//webpack.static.config.js
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

var ejs = require('ejs');
var fs = require('fs');

var template = ejs.compile(fs.readFileSync(__dirname + '/src/views/template.static.ejs', 'utf-8'));

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('stylesheets/[name].css')

const paths = [
  '/'
]

module.exports = {
  entry: {
    main: './src/static.js'
  },
  output: {
    filename: 'bundle.js',
    path: 'docs',
    publicPath: '../',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract(['css','sass']) 
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
      },
      {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
      },
      {
        test: /\.(eot|ttf|svg|gif|png|jpg)$/,
        loader: "url-loader?limit=1"
      }
    ]
  },

  plugins: [
    extractCSS,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: true,
      mangle: true,
      minimize: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new StaticSiteGeneratorPlugin('main', paths, {template: template}),
    new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
      },
    })
  ]

}