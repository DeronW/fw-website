const eslint = require('gulp-eslint');

const PROJ = 'keji-web';

// 专题说明类页面
const APP_NAMES = [{
    name: 'guide', // 'guide', // 新手引导
    html_engine: 'hbs'
}, {
    name: 'guide-cookbook', // 玩赚攻略页
    html_engine: 'hbs'
}, {
    name: 'app-download', // app 下载页面
    html_engine: 'hbs'
}, {
    name: 'update-browser', // IE8及一下版本浏览器的升级提示
    html_engine: ''
}]

// 公告类页面
const NOTICE_PAGES = [{
    name: 'notice-preservation', // 安全保障介绍页面
    html_engine: 'hbs'
}, {
    name: 'notice-corporate-structure', // 信息披露页面
    html_engine: 'hbs'
}, {
    name: 'notice-vip-prerogative', // 等级攻略页
    html_engine: 'hbs'
}, {
    name: 'notice-user-protocol',//金融工场用户协议
    html_engine: 'hbs'
}, {
    name: 'welcome', // 'welcome'//PC落地渠道页
}]

// 专题说明类页面
const TOPIC_PAGES = [{
    name: 'topic-annual-commision', // A码 用户返利规则 佣金说明
    html_engine: 'hbs'
}, {
    name: 'topic-hui-shang', // 徽商
    html_engine: 'hbs'
}, {
    name: 'topic-gong-you-hui', //工友会专题页
    html_engine: 'hbs'
}, {
    name: 'topic-hui-shang-guide', // 徽商 开户引导
    html_engine: 'hbs'
}]

//用户界面
const USER_PAGES = [{
    name: 'user-score', //用户工分
    html_engine: 'hbs',
    project_components: [
        'header-status-bar.jsx',
        'alert.jsx',
        'confirm.jsx',
        'user-center-sidebar.jsx'
    ]
}, {
    name: 'user-coupon', //用户优惠券
    project_components: [
        'header-status-bar.jsx',
        'alert.jsx',
        'confirm.jsx',
        'user-center-sidebar.jsx'
    ]
}]

APP_NAMES.push(
    ...NOTICE_PAGES,
    ...TOPIC_PAGES,
    ...USER_PAGES
)

module.exports = function (gulp, generate_task, settings) {
    let common_config = {
        hbs_partials: [
            'base', 'user-base', 'footer', 'header-nav-bar',
            'growing-io', 'shortcut'
        ],
        project_components: [
            'header-status-bar.jsx',
            'alert.jsx',
            'confirm.jsx'
        ],
        project_javascripts: [
            'jquery-1.12.4.min.js',
            'common-functions.js',
            'interest-calculator.js',
            'sync-login.js'
        ],
        project_less: [
            'common.less',
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
