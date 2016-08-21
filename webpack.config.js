let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',

    // Add your application's scripts below
    './src/index.js',
  ],
  output: {
    publicPath: './dist',
    filename: './dist/main.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "src"),
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react'],
        }
      },
    ]
  },
  watch: true
};