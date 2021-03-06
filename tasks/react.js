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
        .pipe(babel({
            presets: [['env', {
                targets: {
                    browsers: [
                        "last 2 major versions",
                        "ie 9"
                    ],
                    useBuiltIns: true,
                    uglify: false,
                    include: ['transform-es2015-arrow-functions'],
                    debug: debug
                }
            }], 'react', 'stage-2']
        }))
        .pipe(debug ?
            plugins.util.noop() :
            js_uglify({ mangle: false, compress: { unused: false } }))
        .pipe(concat(name, { newLine: ';' }))
        .pipe(gulp.dest(build_path));
};
