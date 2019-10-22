const gulp = require("gulp");
const nearUtils = require("near-shell/gulp-utils");

gulp.task("build", callback => {
  nearUtils.compile("./assembly/main.ts", "./out/main.wasm", callback);
});

exports.default = gulp.series(["build"])
