const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const hbs = require('./pipelines/handlebars.js')
const path = require('path')

function hbs_engine(src_path, jsonData, config) {

    let partials = config.hbs_partials.map(i => {
        let fname = path.join(__dirname,
            '../apps',
            config.site_name,
            'lib/templates',
            `${i}.hbs`)

        return { name: i, path: fname }
    })

    return gulp.src(src_path)
        .pipe(hbs({ partials: partials, data: jsonData }))
}

module.exports = html = function (src_path, build_path, config, jsonData) {
    let engine;

    if (config.html_engine == 'hbs') {
        engine = hbs_engine
    } else {
        engine = src_path => gulp.src(src_path)
    }

    return engine(src_path, jsonData, config)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(build_path));
}
