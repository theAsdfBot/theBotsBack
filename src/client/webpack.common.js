const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack configuration used for both development
 * and production
 */

module.exports = {
  resolve: {
    /**
     * Add '.ts' and '.tsx' as resolvable extensions.
     * js needs to be added for webpack-dev-server to work
     */
    extensions: ['.ts', '.tsx', '.js'],
  },
  /**
   * Helps with debugging since this will help us get the
   * exact error lines even after webpack bundles and
   * minifies the code
   */
  devtool: 'source-map',
  /**
   * Plugins are run in order within the array that executes
   * during file bundling
   */
  plugins: [
    // Clean out old built files in the dist folder
    new CleanWebpackPlugin(),
    // Generate the HTML file in dist/index.html from the public/index.html
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
  module: {
    rules: [
      // Convert TS to JS
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      // Support direct CSS imports loading in our react files
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      // Support direct image imports in our react files
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
};
