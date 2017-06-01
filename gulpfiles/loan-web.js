const eslint = require('gulp-eslint');

const PROJ = 'loan-web';

let APP_NAMES = [
    'home',
    'register-protocol'
];

module.exports = function (gulp, generate_task, settings) {

    let INCLUDE_COMPONENTS = [
    ];

    let INCLUDE_JAVASCRIPTS = [
    ];

    let INCLUDE_LESS = [
    ];

    let common_config = {
        include_components: INCLUDE_COMPONENTS,
        include_javascripts: INCLUDE_JAVASCRIPTS,
        include_less: INCLUDE_LESS
    }

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, Object.assign({
            debug: true,
            api_path: settings[PROJ].dev_api_path
        }, common_config))
        generate_task(PROJ, i, Object.assign({
            api_path: "//www.easyloan888.com/",
            cmd_prefix: 'pack',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`
        }, common_config));
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map(i => `${PROJ}:pack:${i.name || i}:revision`)));
    gulp.task(`lint:${PROJ}`, gulp.series(() => {
        return gulp.src([
            `apps/${PROJ}/**/*.+(js|jsx)`, '!node_modules/**',
            '!**/jquery.*.js', '!**.min.js'])
            .pipe(eslint())
            .pipe(eslint.result(result => null))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    }))
};
