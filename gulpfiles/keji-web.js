const PROJ = 'keji-web';

const APP_NAMES = [
    'guide',// 新手引导
    'guide-cookbook', // 玩赚攻略页
    'app-download', // app 下载页面

    'notice-preservation', // 安全保障介绍页面
    'notice-corporate-structure', // 信息披露页面
    'notice-vip-prerogative', // 等级攻略页
    'notice-user-protocol',//金融工场用户协议

    'topic-annual-commision', // A码 用户返利规则 佣金说明
    'topic-hui-shang', // 徽商
    'topic-gong-you-hui', //工友会专题页
    'topic-hui-shang-guide', // 徽商 开户引导
    'welcome', //PC落地渠道页
    {
        name: 'update-browser',// IE8及一下版本浏览器的升级提示
        html_engine: ''
    }
]

//用户界面
const USER_PAGES = [{
    name: 'user-score', //用户工分
    project_components: [
        'header-status-bar.jsx',
        'header-nav-bar.jsx',
        'alert.jsx',
        'confirm.jsx',
        'user-center-sidebar.jsx'
    ]
}, {
    name: 'user-coupon', //用户优惠券
    project_components: [
        'header-status-bar.jsx',
        'header-nav-bar.jsx',
        'alert.jsx',
        'confirm.jsx',
        'user-center-sidebar.jsx'
    ]
}]

APP_NAMES.push(...USER_PAGES)

module.exports = function (gulp, generate_task, settings) {
    let common_config = {
        html_engine: 'hbs',
        hbs_partials: [
            'base', 'user', 'footer',
            'growing-io', 'shortcut'
        ],
        project_components: [
            'header-status-bar.jsx',
            'header-nav-bar.jsx',
            'alert.jsx',
            'confirm.jsx'
        ],
        project_javascripts: [
            'jquery-1.12.4.min.js',
            'common-functions.js',
            'interest-calculator.js',
            'es6-promise.min.js'
        ],
        project_less: [
            'common.less',
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

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map(i => `${PROJ}:pack:${i.name || i}:revision`)))
};
