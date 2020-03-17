const path = require('path');
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

/**
 * Webpack configuration purely for development
 * Merged with common
 */

module.exports = merge(common, {
  mode: 'development',
  /**
   * dev server watches files for changes and spins up a web app
   * for hot reloads on changes
   */
  devServer: {
    // directory where dev server will serve index.html from
    contentBase: path.join(__dirname, 'dist'),
  },
});
