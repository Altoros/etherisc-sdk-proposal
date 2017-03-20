
import path from 'path';
import webpack from 'webpack';

const context = path.resolve(__dirname, '..');

export default {
  entry: [
    './assets/scripts/scripts.js',
  ],
  output: {
    path: './public/scripts/',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    modules: [
      path.join(__dirname, 'assets', 'scripts'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  watch: true,
  devtool: 'inline-source-map',
  module: {
    rules: [
     {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'development'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
