'use strict';

let gulp = require('gulp');
const gt = require('./tasks');

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});

// 从当前环境中加载配置选项, 如果没有加载到就是用默认配置
let settings; // 本地配置选项
try {
    settings = require('./gulpfile.settings.js');
} catch (e) {
    settings = {};
}

const SETTINGS = Object.assign({}, require('./gulpfiles/settings.default.js'), settings);
// gulpfile 本地扩展配置
require('./gulpfiles/web.js')(gulp, gt, SETTINGS);
require('./gulpfiles/keji-web.js')(gulp, gt, SETTINGS);
require('./gulpfiles/loan-web.js')(gulp, gt, SETTINGS);
require('./gulpfiles/zx-web.js')(gulp, gt, SETTINGS);
require('./gulpfiles/p2p-web.js')(gulp, gt, SETTINGS);
