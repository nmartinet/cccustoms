//webpack.config.js
import path from 'path'
import webpack from 'webpack'

const config = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client.js'
  ],
  output: {
    path: "/",
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        query: {
          babelrc: false,
          "presets": [ "react", "es2015", "react-hmre"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
      }, {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, 
        loader: "url-loader?limit=10000" }
 
    ]
  },
  plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
            BROWSER: JSON.stringify(true)
        }
    })
  ]
}

export default config