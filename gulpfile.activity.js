'use strict';

const PROJ = 'activity';

const INCLUDE_COMPONENTS = [
    `${PROJ}/ladder.jsx`,
    `${PROJ}/ladder/quarter-ladder-pc.jsx`,
    `${PROJ}/ladder/quarter-ladder-mobile.jsx`,
    `${PROJ}/ladder/month-ladder-pc.jsx`,
    `${PROJ}/ladder/month-ladder-mobile.jsx`,
    `${PROJ}/ladder/week-ladder-pc.jsx`,
    `${PROJ}/ladder/week-ladder-mobile.jsx`,
];
const INCLUDE_JAVASCRIPTS = [
    `${PROJ}/fw-fix-console.js`,
    `${PROJ}/fw-common.js`,
    `${PROJ}/native-bridge-0.3.0.js`,
    `${PROJ}/fw-app.js`,
    `${PROJ}/fw-pages.js`,
];
const INCLUDE_LESS = [
    `${PROJ}/reset.less`,
    `${PROJ}/header.less`,
    `${PROJ}/ladder/quarter-ladder-pc.less`,
    `${PROJ}/ladder/quarter-ladder-mobile.less`,
    `${PROJ}/ladder/month-ladder-pc.less`,
    `${PROJ}/ladder/month-ladder-mobile.less`,
    `${PROJ}/ladder/week-ladder-pc.less`,
    `${PROJ}/ladder/week-ladder-mobile.less`,
];

const APP_NAMES = [
    '2017-01-05',
];

module.exports = function (gulp, generate_task, settings) {
    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, {
            debug: true,
            api_path: settings[PROJ].dev_api_path,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS,
            include_less: INCLUDE_LESS
        });
        generate_task(PROJ, i, {
            api_path: "//www.9888.cn/",
            cmd_prefix: 'pack',
            cdn_prefix: `/static/${PROJ}/${i.name||i}/`,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS,
            include_less: INCLUDE_LESS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map(i => `${PROJ}:pack:${i.name||i}:revision`)));
};
