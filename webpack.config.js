const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: "development",
  entry: {
    main: './src/public/js/main.js',
    main: './src/public/css/main.scss',
    admin: './src/public/css/admin.scss',
    admin: './src/vue/main.js'
  },
  output: {
    path: __dirname + '/dist/public/',
    filename: 'js/[name].bundle.js'
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
    ]),
    new VueLoaderPlugin()
  ],
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.scss', '.pug', '.jpg', '.png', '.svg', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader?name=/img/[name].[ext]'
      }
    ],
  },
  target: 'web'
};
