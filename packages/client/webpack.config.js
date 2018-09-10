const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main/main.ts',
    admin: './src/admin-app/main.ts',
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: 'js/[name].bundle.js',
  },
  devtool: DEBUG ? 'cheap-module-source-map' : 'hidden-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new CopyWebpackPlugin([
      { from: './src/public/img', to: 'img' },
      { from: './src/public/font', to: 'font' },
      { from: './src/public/root' },
    ]),
    new VueLoaderPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(en|es|fr)$/),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
    }),
  ],
  stats: {
    children: false,
    warningsFilter: /export .* was not found in/,
  },
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.ts',
      '.tsx',
      '.js',
      '.scss',
      '.pug',
      '.jpg',
      '.png',
      '.svg',
      '.vue',
    ],
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=/font/[name].[ext]',
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader?name=/img/[name].[ext]',
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({ parallel: true, sourceMap: true })],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  target: 'web',
};
