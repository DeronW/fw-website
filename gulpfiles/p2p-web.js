const PROJ = 'p2p-web';

let APP_NAMES = [
    'app-download',//下载引导页
    'protocol-user-service',//用户服务协议
    'aboutus',//关于我们相关页面
    'preservation',//易保全页面
    'notice-information-disclosure',//新信息披露页
    'welcome', // 渠道注册页
]

// 专题说明类页面
const TOPIC_PAGES = [
    'topic-safety',//安全保障页面
    'topic-bu-mao-tong',//埠贸通专题页
    'topic-li-sui-xiang',//利随想专题页
    'topic-xiao-fei-dai',//消费贷专题页
    'topic-yi-che-xiang',//易车享专题页
    'topic-yi-shou-bao',//易收宝专题页
    'topic-yi-zhuan-ying',//易赚盈专题页
    'topic-you-ju-dai',//友居贷专题页
    'topic-hui-shang',//微商银行存管
    'topic-hui-shang-guide',//徽商银行存管操作指引
    'topic-che-xiang-dai',//车享贷专题页
    'topic-chan-rong-tong',//产融通专题页
]

const USER_PAGES = [
    'user-bank-phone'//银行预留手机号修改页
]


APP_NAMES.push(...TOPIC_PAGES, ...USER_PAGES)

module.exports = function (gulp, generate_task, settings) {

    let common_config = {
        html_engine: 'hbs',
        hbs_partials: [
            'base', 'exception-handler', 'footer', 'header-nav-bar', 'user',
            'sidebar-fn'
        ],
        project_components: [
            'header-status-bar.jsx',
            'alert.jsx',
            'confirm.jsx',
            'user-center-sidebar.jsx'
        ],
        project_javascripts: [
            'jquery-1.12.4.min.js',
            'promise-polyfill.min.js',
            'common-functions.js',
            'interest-calculator.js'
        ],
        project_less: [
            'common.less',
            'footer.less',
            'sidebar-fn.less',
            'header-nav-bar.less',
            'header-status-bar.less',
            // only for user center
            'partial/user-center-sidebar.less'
        ]
    }

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, Object.assign({
            debug: true,
            api_path: settings[PROJ].dev_api_path
        }, common_config))

        generate_task(PROJ, i, Object.assign({
            api_path: "",
            environment: "production",
            cmd_prefix: 'pack',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`
        }, common_config))
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map(i => `${PROJ}:pack:${i.name || i}:revision`)))
};
