const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: "localhost",
    port: 8080,
    static: {
      directory: path.resolve(__dirname, "dist"),
      publicPath: "/"
    },
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "./client/static/favicon.ico"
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset"
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
