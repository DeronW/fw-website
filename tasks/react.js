const gulp = require('gulp');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const plugins = require('gulp-load-plugins')();
const babel = require('gulp-babel');
const js_uglify = require('gulp-uglify');
const concat = require('gulp-concat');

module.exports = react = function (src_path, build_path, name, debug) {
    return gulp.src(src_path)
        .pipe(changed(build_path))
        .pipe(plumber())
        .pipe(babel({presets: ['es2015', 'react']}))
        .pipe(debug ? plugins.util.noop() : js_uglify())
        .pipe(concat(name, {newLine: ';'}))
        .pipe(gulp.dest(build_path));
};