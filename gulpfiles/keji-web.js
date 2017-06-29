const eslint = require('gulp-eslint');

const PROJ = 'keji-web';

// 专题说明类页面
const APP_NAMES = [
    'app-download',
    'update-browser'
]

APP_NAMES.push(
    ...[]
)

module.exports = function (gulp, generate_task, settings) {
    let common_config = {
        react_version: '15',
        project_components: [
            'header-status-bar.jsx',
            'alert.jsx',
            'confirm.jsx'
        ],
        project_javascripts: [
            'common-functions.js',
            'interest-calculator.js'
        ],
        project_less: [
            'header-nav-bar.less',
            'header-status-bar.less',
            'footer.less',
            'sidebar-fn.less'
        ]
    }

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, Object.assign({
            debug: true,
            api_path: settings[PROJ].dev_api_path
        }, common_config))
        generate_task(PROJ, i, Object.assign({
            api_path: "",
            cmd_prefix: 'pack',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
        }, common_config))
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
