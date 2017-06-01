const eslint = require('gulp-eslint');

const PROJ = 'activity';

const APP_NAMES = [
    //  '2017-01-05', //不再更能 旧专题
    '2017-04-26',//五月份上线的专题
    '2017-05-16',//五月份上线的专题重构版
    // 'topic-template-one',
    // 'topic-template-two',
    // 'template-columns', // 动态分配的 列数 模板
    'template-lottery-draw',//戳气球
    // 'template-one-arm-bandit', // 老虎机 模板
];

module.exports = function (gulp, generate_task, settings) {

    let INCLUDE_COMPONENTS = [
        `${PROJ}/board/product-blue-pc.jsx`,//专题模板
        `${PROJ}/board/product-purple-pc.jsx`,//专题模板
        `${PROJ}/board/product-orange-pc.jsx`,//专题模板
        `${PROJ}/board/product-blue-mobile.jsx`,//专题模板
        `${PROJ}/board/product-purple-mobile.jsx`,//专题模板
        `${PROJ}/board/product-orange-mobile.jsx`,//专题模板
        `${PROJ}/board/product-list-auto.jsx`,//摇奖商品展示模板自动适应商品个数
        `${PROJ}/ladder/quarter-ladder-pc.jsx`,//专题活动季榜pc
        `${PROJ}/ladder/quarter-ladder-mobile.jsx`,//专题活动季榜mobile
        `${PROJ}/ladder/month-ladder-pc.jsx`,//专题活动月榜pc
        `${PROJ}/ladder/month-ladder-mobile.jsx`,//专题活动月榜mobile
        `${PROJ}/ladder/week-ladder-pc.jsx`,//专题活动周榜pc
        `${PROJ}/ladder/week-ladder-mobile.jsx`,//专题活动周榜mobile
        `${PROJ}/pop/pop-one-prize.jsx`,//摇奖弹层，摇奖一次
        `${PROJ}/pop/pop-ten-prize.jsx`,//摇奖弹层，摇奖十次
        `${PROJ}/pop/pop-message.jsx`,//摇奖弹层，摇奖信息显示
        `${PROJ}/pop/pop-zero.jsx`,//摇奖弹层，没有摇奖机会
        `${PROJ}/pop/pop-more-prize.jsx`,//摇奖弹层，我的多个奖品
        `${PROJ}/pop/pop-all-situation.jsx`,//摇奖弹层，移动端的所有情况
        `${PROJ}/pop/pop-information.jsx`,//摇奖弹层，移动端的收货信息
        `${PROJ}/pop/pop-rule.jsx`,//摇奖说明
        `${PROJ}/pop/pop-no-start.jsx`,//活动未开始
        `${PROJ}/pop/pop-no-start-mobile.jsx`,//移动端活动未开始
        `${PROJ}/board/slot-machine-pc.jsx`,//老虎机
        `${PROJ}/board/poke-balloon-mobile.jsx`,//戳气球
        `${PROJ}/board/winning-list-pc.jsx`,//获奖名单
    ];

    let INCLUDE_JAVASCRIPTS = [
        'promise-polyfill.min.js',
        `${PROJ}/fw-fix-console.js`,
        `${PROJ}/fw-common.js`,
        `${PROJ}/native-bridge-0.3.0.js`,
        `${PROJ}/fw-app.js`,
        `${PROJ}/fw-pages.js`,
    ];

    let INCLUDE_LESS = [
        `${PROJ}/reset.less`,
        `${PROJ}/header.less`,
        `${PROJ}/board/product-blue-pc.less`,//专题模板
        `${PROJ}/board/product-purple-pc.less`,//专题模板
        `${PROJ}/board/product-orange-pc.less`,//专题模板
        `${PROJ}/board/product-blue-mobile.less`,//专题模板
        `${PROJ}/board/product-purple-mobile.less`,//专题模板
        `${PROJ}/board/product-orange-mobile.less`,//专题模板
        `${PROJ}/board/product-list-auto.less`,
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
        `${PROJ}/pop/pop-information.less`,
        `${PROJ}/pop/pop-rule.less`,
        `${PROJ}/pop/pop-no-start.less`,
        `${PROJ}/pop/pop-no-start-mobile.less`,
        `${PROJ}/board/slot-machine-pc.less`,
        `${PROJ}/board/poke-balloon-mobile.less`,
        `${PROJ}/board/winning-list-pc.less`,
    ];

    let default_options = {
        // react_version: '15',
        include_components: INCLUDE_COMPONENTS,
        include_javascripts: INCLUDE_JAVASCRIPTS,
        include_less: INCLUDE_LESS
    }

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, Object.assign({}, default_options, {
            debug: true,
            api_path: settings[PROJ].dev_api_path
        }))
        generate_task(PROJ, i, Object.assign({}, default_options, {
            api_path: "//www.9888.cn/",
            cmd_prefix: 'pack',
            environment: 'production',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
        }))
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map(
        i => `${PROJ}:pack:${i.name || i}:revision`)));

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