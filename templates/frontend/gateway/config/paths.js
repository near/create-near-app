const path = require("path");

const srcPath = path.resolve(__dirname, "../src");
const distPath = path.resolve(__dirname, "../dist");
const publicPath = path.resolve(__dirname, "../public");
const nodeModulesPath = path.resolve(__dirname, "../node_modules");

module.exports = {
  srcPath,
  distPath,
  publicPath,
  nodeModulesPath,
};
