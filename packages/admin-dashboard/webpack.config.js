const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: {
    admin: ['./src/public/css/admin.scss', './src/main.ts'],
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: 'js/[name].bundle.js',
  },
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
  ],
  stats: {
    children: false,
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
    modules: ['node_modules'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
        loader: 'file-loader?name=/fonts/[name].[ext]',
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader?name=/img/[name].[ext]',
      },
    ],
  },
  target: 'web',
};
