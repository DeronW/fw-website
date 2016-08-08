'use strict';

var gulp = require('gulp');
const gt = require('./tasks');

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});

const ETEN_APP_NAMES = [
    'account-setting',
    'guide',
    'app-download',
    'yi-zhuan-ying',
	'yi-che-xiang',
    'you-ju-dai',
     'yi-shou-bao',
    'preservation',
    'guide-cookbook',
    'fu-mao-tong'
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
