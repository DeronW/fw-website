
(function () {
    var PROTOCOL = location.protocol;
    var LINKS = {
        '投资': {
            web: PROTOCOL+'//www.9888.cn/prdClaims/list.shtml',
            mobile: PROTOCOL+'//m.9888.cn/mpwap',
            app: '投资'
        },
        '登录': {
            web: 'https://passport.9888.cn/passport/login',
            mobile: PROTOCOL+'//m.9888.cn/mpwap/orderuser/toLogin.shtml',
            app: '登录'
        },
        '注册': {
            web: 'https://www.9888.cn/depository/regist/toRegist.shtml?sourceSite=jrgc',
            mobile: PROTOCOL+'//m.9888.cn/mpwap/orderuser/toRegister.shtml?source=0',
            app: '注册'
        },
        '后退': {
            web: PROTOCOL+'//www.9888.cn',
            mobile: PROTOCOL+'//m.9888.cn',
            app: '后退至首页'
        },
        '查看优惠券': {
            web: PROTOCOL+'//www.9888.cn/beans/beanByUserIdList.shtml',
            mobile: PROTOCOL+'//m.9888.cn/mpwap/newBeans/toReturnMoneyList.shtml?status=0',
            app: '优惠券'
        },
        '查看工豆': {
            web: PROTOCOL+'//www.9888.cn/beans/list.shtml',
            mobile: PROTOCOL+'//m.9888.cn/mpwap/newBeans/toBeansList.shtml',
            app: '用户工豆'
        },
        '查看红包': {
            web: PROTOCOL+'//www.9888.cn/redPackage/redPackages.shtml',
            mobile: PROTOCOL+'//m.9888.cn/mpwap/newBeans/toMyRedPackage.shtml',
            app: '红包'
        },
        '会员等级': {
            web: '',
            mobile: PROTOCOL+'//m.9888.cn/mpwap/vipLevel/qryVipLevelMess.shtml',
            app: '用户等级'
        },
        '充值': {
            web: PROTOCOL+'//www.9888.cn/payBill/recharges.shtml',
            mobile: PROTOCOL+'//m.9888.cn/mpwap/orderuser/toRecharges.shtml',
            app: '充值'
        },
        '工场码': {
            web: PROTOCOL+'//www.9888.cn/factoryCode/info.shtml',
            mobile: PROTOCOL+'//m.9888.cn/mpwap/promotionCode/home.do',
            app: '工厂码'
        },
        '豆哥商城': {
            web: PROTOCOL+'//mall.9888.cn',
            mobile: PROTOCOL+'//mmall.9888.cn',
            app: '商城'
        },
        '工分': {
            web: PROTOCOL+'//www.9888.cn/user/credit/creditDetail.shtml',
            mobile: PROTOCOL+'//m.9888.cn/mpwap/score/myScore.shtml',
            app: '工分'
        },
        '刮刮卡去投资': {
            web: PROTOCOL+'//www.9888.cn/prdClaims/list.shtml',
            mobile: PROTOCOL+'//m.9888.cn/mpwap',
            app: '投资'
        }
    };

    var client = null;
    var ua = navigator.userAgent;
    if (ua.match(/FinancialWorkshop/i)) {
        client = 'app'
    } else if (ua.match(/android|iphone|ipad|Mobile/i)) {
        client = 'mobile'
    } else {
        client = 'web'
    }

    // set to global
    if (typeof (window.FinancialWorkspace) == 'undefined')
        window.FinancialWorkspace = window.$FW = {};

    FinancialWorkspace.gotoSpecialPage = function (word, value) {
        if (client == 'web') {
            window.location.href = word == '登录' ? LINKS[word].web + '?service=' + value : LINKS[word].web;
        } else if (client == 'mobile') {
            window.location.href = word == '登录' ? LINKS[word].mobile + '?is_mall=3&redirect_url=' + value : LINKS[word].mobile;
        } else if (client == 'app') {
            FinancialWorkspace.tellApp(LINKS[word].app)
        } else {
            console.log('unknow client type, can not redirect to ' + word + ' page')
        }
    };
    FinancialWorkspace.SPECIAL_PAGE_LINKS = LINKS;
})();
