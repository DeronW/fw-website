'use strict';

const PROJ = 'activity';

const INCLUDE_COMPONENTS = [];
const INCLUDE_JAVASCRIPTS = [
    `${PROJ}/fw-fix-console.js`,
    `${PROJ}/fw-common.js`,
    `${PROJ}/native-bridge-0.3.0.js`,
    `${PROJ}/fw-app.js`,
    `${PROJ}/fw-pages.js`,
];
const INCLUDE_LESS = [
    `${PROJ}/reset.less`,
    `${PROJ}/header.less`
]

const WEB_APP_NAMES = [
    '2016-10-12',
    '2017-01-05'
];

module.exports = function (gulp, generate_task, settings) {
    WEB_APP_NAMES.forEach((i) => {
        let page_name = i.name || i; // 支持2中页面配置参数:string和object
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
            cdn_prefix: `/static/web/${page_name}/`,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS,
            include_less: INCLUDE_LESS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(WEB_APP_NAMES.map(i => `activity:pack:${page_name}:revision`)));
};
