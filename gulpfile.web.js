'use strict';

const PROJ = 'web';

const INCLUDE_COMPONENTS = [
    `${PROJ}/header-status-bar.jsx`, `${PROJ}/alert.jsx`,
    `${PROJ}/confirm.jsx`, 'circle-progress.jsx', `${PROJ}/invest-list.jsx`
];
const INCLUDE_JAVASCRIPTS = [
    `${PROJ}/common-functions.js`,
    `${PROJ}/interest-calculator.js`,
    `${PROJ}/ajax-extend.js`
];
const INCLUDE_LESS = [
    `${PROJ}/header-nav-bar.less`,
    `${PROJ}/header-status-bar.less`,
    `${PROJ}/footer.less`,
    `${PROJ}/sidebar-fn.less`,
];


const WEB_APP_NAMES = [
    'guide', // 新手引导
    'app-download', // app 下载页面
    'welcome-register', // 推广用户注册落地页面
    'welcome-register-success', // 推广用户注册 成功页面

    // 主营产品分类说明页面
    'topic-yi-zhuan-ying',
    'topic-yi-che-xiang',
    'topic-li-sui-xiang',
    'topic-you-ju-dai',
    'topic-yi-shou-bao',
    'topic-bu-mao-tong',
    'topic-xiao-fei-dai',
    'topic-zun-xiang',

    // 专题说明页面
    'topic-annual-commision', // A码 用户返利规则 佣金说明
    'topic-hui-shang', // 徽商
    'topic-hui-shang-guide', // 徽商 开户引导
    'preservation', // 安全保障介绍页面
    'guide-cookbook', // 玩赚攻略页
    'vip-prerogative', // 等级攻略页
    'notice-corporate-structure', // 信息披露页面
    'topic-gong-you-hui', //工友会专题页

    // 重构页面
    //用户界面
    'user-center', //用户中心
    'user-coupon', //用户优惠券
    'user-messages', // 用户消息页面
    'user-bean', // 用户工豆
    'user-score', //用户工分
    'user-login-history', //用户登录日志页面
    // 其他页面
    'statistics', // 实时交易统计
];


module.exports = function (gulp, generate_task, settings) {

    WEB_APP_NAMES.forEach((i) => {
        generate_task(PROJ, i, {
            debug: true,
            api_path: settings.web.dev_api_path,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS,
            include_less: INCLUDE_LESS
        });
        generate_task(PROJ, i, {
            api_path: "//www.9888.cn/",
            cmd_prefix: 'pack',
            cdn_prefix: `/static/web/${i.name || i}/`,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS,
            include_less: INCLUDE_LESS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(WEB_APP_NAMES.map(i => `web:pack:${i.name || i}:revision`)));
};
