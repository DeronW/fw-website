'use strict';

const WEB_APP_NAMES = [
    '2016-10-12'
];

module.exports = function (gulp, generate_task, settings) {
    let proj = 'activity';

    WEB_APP_NAMES.forEach((i) => {
        let include_components = [];
        let include_javascripts = [
            `${proj}/fw-fix-console.js`,
            `${proj}/fw-common.js`,
            `${proj}/native-bridge-0.3.0.js`,
            `${proj}/fw-app.js`,
            `${proj}/fw-pages.js`,
        ];
        let include_less = [
            `${proj}/reset.less`,
            `${proj}/header.less`
        ]

        generate_task(proj, i, {
            debug: true,
            api_path: settings.web.dev_api_path,
            include_components: include_components,
            include_javascripts: include_javascripts,
            include_less: include_less
        });
        generate_task(proj, i, {
            api_path: "//www.9888.cn/",
            cmd_prefix: 'pack',
            cdn_prefix: `/static/web/${i.name || i}/`,
            include_components: include_components,
            include_javascripts: include_javascripts,
            include_less: include_less
        });
    });

    gulp.task(`build:${proj}`, gulp.series(WEB_APP_NAMES.map(i => `activity:pack:${i.name || i}:revision`)));
};
