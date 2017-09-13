const eslint = require('gulp-eslint');

const PROJ = 'zx-web';

let APP_NAMES = [
    'about-us',//关于我们
    'app-download',//app下载
    'topic-zun-xiang', // 尊享标计划
    'topic-huang-jin', // 尊享金计划
    'topic-zeng-jin-bao', // 增金宝计划
    'user-bank-phone',//修改银行预留手机号
];


module.exports = function (gulp, generate_task, settings) {

    let common_config = {
        project_components: [
            'header-status-bar.jsx',
            'alert.jsx',
            'confirm.jsx',
            'user-center-sidebar.jsx'
        ],
        project_javascripts: [
            'jquery-1.12.4.min.js',
            'promise-polyfill.min.js',
            'common-functions.js',
            'interest-calculator.js'
        ],
        project_less: [
            'common.less',
            'footer.less',
            'sidebar-fn.less',
            'header-nav-bar.less',
            'header-status-bar.less',
            // only for user center
            'partial/user-center-sidebar.less'
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

        gulp.task(`lint:${PROJ}:${i.name || i}`, gulp.series(() => {
            return gulp.src([
                `apps/${PROJ}/${i.name || i}/**/*.+(js|jsx)`,
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
