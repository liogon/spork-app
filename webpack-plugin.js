const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
  const environment = env === 'prod' ? 'production' : 'development';
  const minify = env === 'prod'
    ? {
      caseSensitive: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      minifyJS: true,
      preserveLineBreaks: true,
      removeComments: true
    }
    : false;

  const plugins = [
    new CleanWebpackPlugin(['public']),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.ejs'),
      inject: false,
      filename: 'index.html',
      minify
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.ejs'),
      inject: false,
      filename: '404.html',
      minify
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './node_modules/@webcomponents/webcomponentsjs/*.js'),
        to: 'vendor/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, './node_modules/@webcomponents/webcomponentsjs/*.map'),
        to: 'vendor/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, './node_modules/es5-shim/es5-shim.min.js'),
        to: 'vendor/es5-shim.js'
      },
      {
        from: path.resolve(__dirname, './node_modules/es5-shim/es5-sham.min.js'),
        to: 'vendor/es5-sham.js'
      },
      {
        from: path.resolve(__dirname, './node_modules/es6-shim/es6-shim.min.js'),
        to: 'vendor/es6-shim.js'
      },
      {
        from: path.resolve(__dirname, './node_modules/es6-shim/es6-sham.min.js'),
        to: 'vendor/es6-sham.js'
      },
      {
        from: path.resolve(__dirname, './node_modules/es6-promise/dist/es6-promise.min.js'),
        to: 'vendor/es6-promise.js'
      },
      {
        from: path.resolve(__dirname, './node_modules/intersection-observer/intersection-observer.js'),
        to: 'vendor/intersection-observer.js'
      },
      {
        from: path.resolve(__dirname, './node_modules/@webcomponents/shadycss/scoping-shim.min.js'),
        to: 'vendor/scoping-shim.js'
      },
      {
        from: path.resolve(__dirname, './src/assets'),
        to: 'assets'
      }
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(environment)
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      module: true,
      columns: true,
      // noSources: true,
      linToLine: true
    })
  ];

  // if (true) {
  if (env === 'prod') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    }));
  }

  return plugins;
};
