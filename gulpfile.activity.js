const eslint = require('gulp-eslint');

const PROJ = 'activity';

const APP_NAMES = [
    //  '2017-01-05', 不再更能 旧专题
    'topic-template-one',
    'template-columns',
    'template-lottery-draw'
];

module.exports = function (gulp, generate_task, settings) {

    let INCLUDE_COMPONENTS = [
        `${PROJ}/board/product-blue-pc.jsx`,
        `${PROJ}/board/product-purple-pc.jsx`,
        `${PROJ}/board/product-orange-pc.jsx`,
        `${PROJ}/board/product-blue-mobile.jsx`,
        `${PROJ}/board/product-purple-mobile.jsx`,
        `${PROJ}/board/product-orange-mobile.jsx`,
        `${PROJ}/ladder/quarter-ladder-pc.jsx`,
        `${PROJ}/ladder/quarter-ladder-mobile.jsx`,
        `${PROJ}/ladder/month-ladder-pc.jsx`,
        `${PROJ}/ladder/month-ladder-mobile.jsx`,
        `${PROJ}/ladder/week-ladder-pc.jsx`,
        `${PROJ}/ladder/week-ladder-mobile.jsx`,
        `${PROJ}/pop/pop-one-prize.jsx`,
        `${PROJ}/pop/pop-ten-prize.jsx`,
        `${PROJ}/pop/pop-message.jsx`,
        `${PROJ}/pop/pop-zero.jsx`,
        `${PROJ}/pop/pop-more-prize.jsx`,
        `${PROJ}/pop/pop-all-situation.jsx`,
        `${PROJ}/board/slot-machine-pc.jsx`,
        `${PROJ}/board/poke-balloon-mobile.jsx`,
        `${PROJ}/board/winning-list-pc.jsx`,
        `${PROJ}/board/winning-list-mobile.jsx`,
    ];

    let INCLUDE_JAVASCRIPTS = [
        `${PROJ}/fw-fix-console.js`,
        `${PROJ}/fw-common.js`,
        `${PROJ}/native-bridge-0.3.0.js`,
        `${PROJ}/fw-app.js`,
        `${PROJ}/fw-pages.js`,
    ];

    let INCLUDE_LESS = [
        `${PROJ}/reset.less`,
        `${PROJ}/header.less`,
        `${PROJ}/board/product-blue-pc.less`,
        `${PROJ}/board/product-purple-pc.less`,
        `${PROJ}/board/product-orange-pc.less`,
        `${PROJ}/board/product-blue-mobile.less`,
        `${PROJ}/board/product-purple-mobile.less`,
        `${PROJ}/board/product-orange-mobile.less`,
        `${PROJ}/ladder/quarter-ladder-pc.less`,
        `${PROJ}/ladder/quarter-ladder-mobile.less`,
        `${PROJ}/ladder/month-ladder-pc.less`,
        `${PROJ}/ladder/month-ladder-mobile.less`,
        `${PROJ}/ladder/week-ladder-pc.less`,
        `${PROJ}/ladder/week-ladder-mobile.less`,
        `${PROJ}/pop/pop-one-prize.less`,
        `${PROJ}/pop/pop-ten-prize.less`,
        `${PROJ}/pop/pop-message.less`,
        `${PROJ}/pop/pop-zero.less`,
        `${PROJ}/pop/pop-more-prize.less`,
        `${PROJ}/pop/pop-all-situation.less`,
        `${PROJ}/board/slot-machine-pc.less`,
        `${PROJ}/board/poke-balloon-mobile.less`,
        `${PROJ}/board/winning-list-pc.less`,
        `${PROJ}/board/winning-list-mobile.less`,
    ];

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
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS,
            include_less: INCLUDE_LESS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map(i => `${PROJ}:pack:${i.name || i}:revision`)));
    gulp.task(`lint:${PROJ}`, gulp.series(() => {
        return gulp.src([
            `apps/${PROJ}/**/*.+(js|jsx)`,
            '!node_modules/**', '!**.min.js'])
            .pipe(eslint())
            .pipe(eslint.result(result => null))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    }))
};
