'use strict';

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
    'notice-corporate-structure',// 信息披露页面

    // 重构页面
    //用户界面
    'user-center',//用户中心
    'user-coupon',//用户优惠券
    'user-messages', // 用户消息页面
    'user-bean', // 用户工豆

    // 其他页面
    'statistics', // 实时交易统计
    // 'popong',// 点点点游戏页
];

module.exports = function (gulp, generate_task, settings) {

    WEB_APP_NAMES.forEach((i) => {
        let common_components = [
            'web/header-status-bar.jsx', 'web/alert.jsx',
            'web/confirm.jsx', 'circle-progress.jsx', 'web/invest-list.jsx'
        ];
        let common_js = [];

        generate_task('web', i, {
            debug: true,
            api_path: settings.web.dev_api_path,
            include_components: common_components,
            include_common_js: common_js
        });
        generate_task('web', i, {
            api_path: "http://www.9888.cn/",
            cmd_prefix: 'pack',
            cdn_prefix: '/static/web/' + i + '/',
            include_components: common_components,
            include_common_js: common_js
        });
    });

    gulp.task('build:web', gulp.series(WEB_APP_NAMES.map(name => `web:pack:${name}:revision`)));
};