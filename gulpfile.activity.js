'use strict';

const WEB_APP_NAMES = [
    '2016-10-12'
];

module.exports = function (gulp, generate_task, settings) {

    WEB_APP_NAMES.forEach((i) => {
        let include_components = [];
        let include_javascripts = [];
        let include_less = [
            'activity/reset.less',
            'activity/header.less'
        ]

        generate_task('activity', i, {
            debug: true,
            api_path: settings.web.dev_api_path,
            include_components: include_components,
            include_javascripts: include_javascripts,
            include_less: include_less
        });
        generate_task('activity', i, {
            api_path: "//www.9888.cn/",
            cmd_prefix: 'pack',
            cdn_prefix: `/static/web/${i.name || i}/`,
            include_components: include_components,
            include_javascripts: include_javascripts,
            include_less: include_less
        });
    });

    gulp.task('build:web', gulp.series(WEB_APP_NAMES.map(i => `activity:pack:${i.name || i}:revision`)));
};
