const eslint = require('gulp-eslint');

const PROJ = 'zx-web';

let APP_NAMES = [
    //'guide', // 新手引导
    //'app-download', // app 下载页面
    //'welcome-register', // 推广用户注册落地页面
    //'welcome-register-success', // 推广用户注册 成功页面
];

// 公告类页面
const NOTICE_PAGES = [
    //    'preservation', // 安全保障介绍页面
    //    'guide-cookbook', // 玩赚攻略页
    //    'vip-prerogative', // 等级攻略页
    //    'notice-corporate-structure', // 信息披露页面
    //    'notice-information-disclosure',//信息披露新页面
    //    'protocol-user-service',//金融工场用户协议
]

// 专题说明类页面
const TOPIC_PAGES = [
    // 专题说明页面
    //'topic-annual-commision', // A码 用户返利规则 佣金说明
    //'topic-hui-shang', // 徽商
    //'topic-gong-you-hui', //工友会专题页
    //'topic-hui-shang-guide', // 徽商 开户引导
]

const USER_PAGES = [
    //用户界面
    'user-coupon', //用户优惠券
    'user-score', //用户工分
]

const DEVELOPING_PAGES = [
    'topic-zun-xiang', // 尊享标计划
    //'user-login-history', //用户登录日志页面
    'user-bank-phone',//用户预留手机号页面
    //'user-messages', // 用户消息页面
    //'user-center', //用户中心
    //'user-bean', // 用户工豆
]

APP_NAMES.push(
    ...TOPIC_PAGES,
    ...USER_PAGES,
    ...NOTICE_PAGES,
    ...DEVELOPING_PAGES
)

module.exports = function (gulp, generate_task, settings) {

    let INCLUDE_COMPONENTS = [
        `${PROJ}/header-status-bar.jsx`, `${PROJ}/alert.jsx`,
        `${PROJ}/confirm.jsx`, 'circle-progress.jsx', `${PROJ}/invest-list.jsx`
    ];

    let INCLUDE_JAVASCRIPTS = [
        `${PROJ}/common-functions.js`,
        `${PROJ}/interest-calculator.js`,
        `${PROJ}/ajax-extend.js`
    ];

    let INCLUDE_LESS = [
        `${PROJ}/header-nav-bar.less`,
        `${PROJ}/header-status-bar.less`,
        `${PROJ}/footer.less`,
        `${PROJ}/sidebar-fn.less`,
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