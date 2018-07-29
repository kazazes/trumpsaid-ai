const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: 'cheap-module-eval-source-map',
  entry: ['./src/public/js/main.ts', './src/public/css/main.scss'],
  output: {
    path: __dirname + '/dist/public/',
    filename: 'js/bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new CopyWebpackPlugin([
      { from: './src/public/img', to: 'img' },
      { from: './src/public/font', to: 'font' }
    ])
  ],
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.scss', '.pug', '.jpg', '.png', '.svg'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader?name=public/img/[name].[ext]'
      }
    ],
  },
  target: 'web'
};
