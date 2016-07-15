const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const changed = require('gulp-changed');
const htmlmin = require('gulp-htmlmin');
const swig = require('gulp-swig');
const data = require('gulp-data');

module.exports = html = function (src_path, build_path, html_engine, jsonData) {
    return gulp.src(src_path)
        .pipe(data(() =>jsonData))
        .pipe(html_engine == 'swig' ?
            swig({defaults: {cache: false}}) :
            plugins.util.noop())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(build_path));
};