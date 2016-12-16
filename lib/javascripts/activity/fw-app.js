/*
 给APP发消息
 */

(function () {
    function send2app(action, value) {
        var data = {type: 'toApp', action: action, value: value};
        switch (data.action) {
            case 'toNative':
                NativeBridge.toNative(data.value);
                break;
            case 'login':
                NativeBridge.login();
                break;
            case 'gotoMall':
                NativeBridge.gotoMall();
                break;
            case 'close':
                NativeBridge.close();
                break;
            case 'goto':
                NativeBridge.goto(data.value);
                break;
            case 'setTitle':
                NativeBridge.setTitle(data.value);
                break;
            default:
                console.log('not handle to native message', data)
        }
    }

    var TO_NATIVE_VALUE = {
        '注册': 'app_register',
        '投资': 'app_invest_immediately',
        '优惠券': 'app_coupon',
        '用户工豆': 'app_bean',
        '红包': 'app_red_package',
        '用户等级': 'app_vip_level',
        '充值': 'app_recharge',
        '工厂码': 'app_factory_barcode',
        '工分': 'app_scores',
        '升级攻略': 'app_upgrade_strategy',
        '贡献值': 'app_contribute_detail',
        '邀请返利': 'app_invite_interest'
    };

    var ACTION = {
        '登录': 'login',
        '商城': 'gotoMall',
        '关闭页面': 'close',
        '显示后退按钮': 'show_back_button',
        '隐藏后退按钮': 'hide_back_button',
        // 'ajax开始': 'ajax_start',
        // 'ajax结束': 'ajax_complete',
        '设置标题': 'set_title'
    };

    // set to global
    if (typeof(window.FinancialWorkspace) == 'undefined')
        window.FinancialWorkspace = window.$FW = {};

    FinancialWorkspace.tellApp = function (word, value) {
        if (ACTION[word]) {
            word == '设置标题' ?
                send2app('setTitle', value) :
                send2app(ACTION[word])
        } else if (TO_NATIVE_VALUE[word]) {
            send2app('toNative', TO_NATIVE_VALUE[word])
        } else {
            alert('ERROR: ' + word + ' not recognize with app message')
        }
    };

    FinancialWorkspace.getShouldTellAppKeyword = function (word) {
        var r = {};
        if (ACTION[word]) {
            r.action = ACTION[word]
        } else if (TO_NATIVE_VALUE[word]) {
            r.action = 'toNative';
            r.value = TO_NATIVE_VALUE[word]
        } else {
            r.error = 'not match'
        }
        return r
    }
})();
