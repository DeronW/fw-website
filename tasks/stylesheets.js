const gulp = require('gulp');
const changed = require('gulp-changed');
const cssnano = require('gulp-cssnano');

module.exports = stylesheets = function (src_path, build_path) {
    return gulp.src(src_path)
        .pipe(changed(build_path))
        .pipe(cssnano({discardUnused: {keyframes: false}}))
        .pipe(gulp.dest(build_path));
};