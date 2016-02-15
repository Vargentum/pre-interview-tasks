var webpack = require('webpack');
var minimize = process.argv.indexOf('--no-minimize') === -1 ? true : false;
var plugins = minimize ? [new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  compress: {
    drop_console: true
  }
})] : [];

module.exports = {
  entry: './src/pre-interview-tasks.js',
  output: {
    path: './dist',
    filename: minimize ? 'pre-interview-tasks.min.js' : 'pre-interview-tasks.js',
    libraryTarget: 'umd',
    library: 'preInterviewTasks'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  },
  plugins: plugins
};
