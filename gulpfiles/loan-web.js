const eslint = require('gulp-eslint');

const PROJ = 'loan-web';

let APP_NAMES = [
    'home',
    'aboutus'
];

module.exports = function (gulp, generate_task, settings) {

    let common_config = {
        project_components: [
            'header.jsx',
            'footer.jsx'
        ],
        project_javascripts: [
            'jquery-1.11.3.js',
            'promise-polyfill.min.js'
        ],
        project_less: [
            'common.less'
        ]
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
        }, common_config))

        gulp.task(`lint:${PROJ}:${i.name || i}`, gulp.series(() => {
            return gulp.src([
                `apps/${PROJ}/${i.name || i}**/*.+(js|jsx)`,
                '!node_modules/**',
                '!**/jquery.*.js',
                '!**.min.js'
            ])
                .pipe(eslint())
                .pipe(eslint.result(result => null))
                .pipe(eslint.format())
                .pipe(eslint.failAfterError());
        }))
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map(i => `${PROJ}:pack:${i.name || i}:revision`)))

    gulp.task(`lint:${PROJ}`, gulp.series(APP_NAMES.map(i => `lint:${PROJ}:${i.name || i}`)))

};
