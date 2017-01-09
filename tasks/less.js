const gulp = require('gulp');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const plugins = require('gulp-load-plugins')();
const less = require('gulp-less');

module.exports = less2css = function (src_path, build_path, name, debug) {
    return gulp.src(src_path)
        .pipe(changed(build_path))
        .pipe(less())
        .pipe(plumber())
        .pipe(concat(name))
        .pipe(debug ? plugins.util.noop() : cssnano({zindex: false}))
        .pipe(gulp.dest(build_path));
};
