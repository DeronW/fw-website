'use strict';

var gulp = require('gulp');
const gt = require('./tasks');

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});

const ETEN_APP_NAMES = [
    // 'account-setting',
    'guide', // 新手引导
    'app-download', // app 下载页面

    // 主营产品分类说明页面
    'topic-yi-zhuan-ying',
    'topic-yi-che-xiang',
    'topic-li-sui-xiang',
    'topic-you-ju-dai',
    'topic-yi-shou-bao',
    'topic-bu-mao-tong',

    // 专题说明页面
    'topic-annual-commision', // A码 用户返利规则 佣金说明
    'topic-hui-shang', // 徽商
    'topic-hui-shang-guide', // 徽商 开户引导
    'topic-hui-shang-updating', // 徽商 升级中
    'preservation', // 安全保障介绍页面
    'guide-cookbook', // 玩赚攻略页


    'vip-prerogative', // 等级攻略页

    // 其他页面
    'statistics', // 实时交易统计
    'popong' // 点点点游戏页
];

ETEN_APP_NAMES.forEach(function (i) {
    let common_components = ['eten/header-status-bar.jsx'];
    let common_js = [];

    gt('eten', i, {
        debug: true,
        api_path: 'http://localhost/fake/',
        include_components: common_components,
        include_common_js: common_js
    });
    gt('eten', i, {
        api_path: "http://www.9888.cn/",
        cmd_prefix: 'pack',
        cdn_prefix: '/static/web/' + i + '/',
        include_components: common_components,
        include_common_js: common_js
    });
});

gulp.task('build:eten', gulp.series(ETEN_APP_NAMES.map(name => `eten:pack:${name}:revision`)));
