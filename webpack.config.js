const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: "development",
  entry: {
    main: "./src/public/js/main.js",
    main: "./src/public/css/main.scss",
    admin: "./src/public/css/admin.scss",
    admin: "./src/vue/AppAdmin/main.ts"
  },
  output: {
    path: __dirname + "/dist/public/",
    filename: "js/[name].bundle.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new CopyWebpackPlugin([
      { from: "./src/public/img", to: "img" },
      { from: "./src/public/font", to: "font" },
      { from: "./src/public/root" }
    ]),
    new VueLoaderPlugin(),
    new DuplicatePackageCheckerPlugin()
  ],
  resolve: {
    extensions: [
      ".webpack.js",
      ".web.js",
      ".ts",
      ".tsx",
      ".js",
      ".scss",
      ".pug",
      ".jpg",
      ".png",
      ".svg",
      ".vue"
    ],
    alias: {
      vue: "vue/dist/vue.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
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
        loader: "file-loader?name=/fonts/[name].[ext]"
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: "file-loader?name=/img/[name].[ext]"
      }
    ]
  },
  target: "web"
};
