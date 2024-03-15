const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

module.exports = () => {
  return {
    output: {
      path: path.resolve(__dirname, "../dist"),
      publicPath: "./",
      filename: "[name].[contenthash].bundle.js",
    },
    devtool: false,
    module: {
      rules: [
        // {
        //   test: /\.(css)$/,
        //   use: [MiniCssExtractPlugin.loader, "css-loader"],
        //   //   options: {
        //   //     sourceMap: false,
        //   //   },
        // },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              // inject CSS to page
              loader: "style-loader",
            },
            {
              // translates CSS into CommonJS modules
              loader: "css-loader",
            },
            {
              // Run postcss actions
              loader: "postcss-loader",
              options: {
                // `postcssOptions` is needed for postcss 8.x;
                // if you use postcss 7.x skip the key
                postcssOptions: {
                  // postcss plugins, can be exported to postcss.config.js
                  plugins: function () {
                    return [require("autoprefixer")];
                  },
                },
              },
            },
            {
              // compiles Sass to CSS
              loader: "sass-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles/[name].[contenthash].css",
        chunkFilename: "[id].css",
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), "..."],
      runtimeChunk: {
        name: "runtime",
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
