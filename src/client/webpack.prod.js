const merge = require('webpack-merge')
const common = require('./webpack.common.js')

/**
 * Webpack configuration purely for production
 * Merged with common
 */

module.exports = merge(common, {
  mode: 'production',
});
