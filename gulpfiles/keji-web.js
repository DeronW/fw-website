const eslint = require('gulp-eslint');

const PROJ = 'keji-web';

// 专题说明类页面
const APP_NAMES = [
    'guide', // 新手引导
    'guide-cookbook', // 玩赚攻略页
    'app-download', // app 下载页面
    'update-browser' // IE8及一下版本浏览器的升级提示
]

// 公告类页面
const NOTICE_PAGES = [
    'notice-preservation', // 安全保障介绍页面
    'notice-corporate-structure', // 信息披露页面
    // 'vip-prerogative', // 等级攻略页
    'notice-information-disclosure', //信息披露新页面
    'notice-user-protocol'//金融工场用户协议
]

// 专题说明类页面
const TOPIC_PAGES = [
    'topic-annual-commision', // A码 用户返利规则 佣金说明
    'topic-hui-shang', // 徽商
    'topic-gong-you-hui', //工友会专题页
    'topic-hui-shang-guide', // 徽商 开户引导
]

APP_NAMES.push(
    ...NOTICE_PAGES,
    ...TOPIC_PAGES
)

module.exports = function (gulp, generate_task, settings) {
    let common_config = {
        react_version: '15',
        project_components: [
            'header-status-bar.jsx',
            'alert.jsx',
            'confirm.jsx'
        ],
        project_javascripts: [
            'common-functions.js',
            'interest-calculator.js'
        ],
        project_less: [
            'header-nav-bar.less',
            'header-status-bar.less',
            'footer.less',
            'sidebar-fn.less'
        ]
    }

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, Object.assign({
            debug: true,
            api_path: settings[PROJ].dev_api_path
        }, common_config))
        generate_task(PROJ, i, Object.assign({
            api_path: "",
            cmd_prefix: 'pack',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
        }, common_config))
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map(i => `${PROJ}:pack:${i.name || i}:revision`)));
    gulp.task(`lint:${PROJ}`, gulp.series(() => {
        return gulp.src([
            `apps/${PROJ}/**/*.+(js|jsx)`, '!node_modules/**',
            '!**/jquery.*.js', '!**.min.js'])
            .pipe(eslint())
            .pipe(eslint.result(result => null))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    }))
};
