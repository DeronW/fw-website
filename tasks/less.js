const gulp = require('gulp');
const changed = require('gulp-changed');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const less = require('gulp-less');

module.exports = less2css = function (src_path, build_path, name) {
    return gulp.src(src_path)
        .pipe(changed(build_path))
        .pipe(less())
        .pipe(cssnano())
        .pipe(concat(name))
        .pipe(gulp.dest(build_path));
};