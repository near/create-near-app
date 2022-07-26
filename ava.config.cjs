require("util").inspect.defaultOptions.depth = 5; // Increase AVA's printing depth

module.exports = {
  timeout: "300000",
  files: ["test/*.ava.js"],
  failWithoutAssertions: false,
  extensions: ["js"],
};
