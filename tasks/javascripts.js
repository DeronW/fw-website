const gulp = require('gulp');
const changed = require('gulp-changed');
const js_uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plugins = require('gulp-load-plugins')();

module.exports = javascripts = function (src_path, build_path, name, debug) {
    return gulp.src(src_path)
        .pipe(changed(build_path))
        .pipe(debug ?
            plugins.util.noop() :
            js_uglify({output: {quote_keys: true, screw_ie8: false}}))
        .pipe(name ? concat(name, {newLine: ';\n'}) : plugins.util.noop())
        .pipe(gulp.dest(build_path));
};
