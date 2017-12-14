// webpack.config.js
const webpack = require('webpack');

module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/public`,
    filename: 'index_bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        // scss styles are loaded with modules local scope
        test: /\.scss$/,
        loader:
          'style-loader!css-loader?modules&localIdentName=' +
          '[local]---[hash:base64:5]!sass-loader!postcss-loader'
      }
    ]
  },
  plugins: [],
  watch: true
};
