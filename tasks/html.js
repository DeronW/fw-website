const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const htmlmin = require('gulp-htmlmin');
const swig = require('gulp-swig');
const data = require('gulp-data');
const hbs = require('./pipelines/handlebars.js')
const path = require('path')

// module.exports = html = function (src_path, build_path, html_engine, jsonData) {
//     return gulp.src(src_path)
//         .pipe(plumber())
//         .pipe(data(() => jsonData))
//         .pipe(html_engine == 'swig' ?
//             swig({ defaults: { cache: false } }) :
//             plugins.util.noop())
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest(build_path));
// };

function swig_engine(src_path, jsonData) {
    return gulp.src(src_path + 'index.html')
        .pipe(plumber())
        .pipe(data(() => jsonData))
        .pipe(swig({ defaults: { cache: false } }))
}

function hbs_engine(src_path, jsonData, config) {

    let partials = config.hbs_partials.map(i => {
        let fname = path.join(__dirname,
            '../apps',
            config.site_name,
            'lib/templates',
            `${i}.hbs`)

        return { name: i, path: fname }
    })

    return gulp.src(src_path + 'index.hbs')
        .pipe(hbs({ partials: partials, data: jsonData }))
}

module.exports = html = function (src_path, build_path, config, jsonData) {
    let engine

    if (config.html_engine == 'swig') {
        engine = swig_engine
    } else if (config.html_engine == 'hbs') {
        engine = hbs_engine
    } else {
        engine = src_path => gulp.src(src_path + 'index.html')
    }

    if (config.html_engine == 'hbs') {
        engine = hbs_engine;
    }

    return engine(src_path, jsonData, config)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(build_path));
}
