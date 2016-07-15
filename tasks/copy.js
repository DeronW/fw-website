const gulp = require('gulp');

module.exports = copy = function (src_path, build_path) {
    return gulp.src(src_path).pipe(gulp.dest(build_path));
};