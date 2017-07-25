const eslint = require('gulp-eslint');

const PROJ = 'zx-web';

let APP_NAMES = [
    'about-us',//关于我们
    'app-download',//app下载
    'topic-zun-xiang', // 尊享标计划
    'user-bank-phone',//修改银行预留手机号
    'user-coupon', //用户优惠券
    'user-score', //用户工分
    'user-bank-phone' // 用户预留手机号
];


module.exports = function (gulp, generate_task, settings) {

    // let INCLUDE_COMPONENTS = [
    //     `${PROJ}/header-status-bar.jsx`,
    //     `${PROJ}/alert.jsx`,
    //     `${PROJ}/confirm.jsx`,
    //     'circle-progress.jsx',
    // ];

    // let INCLUDE_JAVASCRIPTS = [
    //     `${PROJ}/common-functions.js`,
    //     `${PROJ}/interest-calculator.js`,
    // ];

    // let INCLUDE_LESS = [
    //     `${PROJ}/header-nav-bar.less`,
    //     `${PROJ}/header-status-bar.less`,
    //     `${PROJ}/footer.less`,
    //     `${PROJ}/sidebar-fn.less`,
    // ];

    // let common_config = {
    //     include_components: INCLUDE_COMPONENTS,
    //     include_javascripts: INCLUDE_JAVASCRIPTS,
    //     include_less: INCLUDE_LESS
    // }

    let common_config = {
        react_version: '15',
        project_components: [
            'header-status-bar.jsx',
        ],
        project_javascripts: [
            'jquery-1.12.4.min.js',
            'promise-polyfill.min.js',
            'common-functions.js',
            'interest-calculator.js'
        ],
        project_less: [
            'footer.less',
            'sidebar-fn.less',
            'header-nav-bar.less',
            'header-status-bar.less',
            // only for user center
            'partial/ucp-icon.less',
            'partial/user-center-panel.less'
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
