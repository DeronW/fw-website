(function () {

    var LINKS = {
        '投资': {
            web: 'http://www.9888.cn/prdClaims/list.shtml',
            mobile: 'http://m.9888.cn/mpwap',
            app: '投资'
        },
        '登录': {
            web: 'https://passport.9888.cn/passport/login',
            mobile: 'http://m.9888.cn/mpwap/orderuser/toLogin.shtml',
            app: '登录'
        },
        '注册': {
            web: 'https://passport.9888.cn/pp-web2/register/phone.do?sourceSite=jrgc',
            mobile: 'http://m.9888.cn/mpwap/orderuser/toRegister.shtml?source=0',
            app: '注册'
        },
        '后退': {
            web: 'http://www.9888.cn',
            mobile: 'http://m.9888.cn',
            app: '后退至首页'
        },
        '查看优惠券': {
            web: 'http://www.9888.cn/beans/beanByUserIdList.shtml',
            mobile: 'http://m.9888.cn/mpwap/newBeans/toReturnMoneyList.shtml?status=0',
            app: '优惠券'
        },
        '查看工豆': {
            web: 'http://www.9888.cn/beans/list.shtml',
            mobile: 'http://m.9888.cn/mpwap/newBeans/toBeansList.shtml',
            app: '用户工豆'
        },
        '查看红包': {
            web: 'http://www.9888.cn/redPackage/redPackages.shtml',
            mobile: 'http://m.9888.cn/mpwap/newBeans/toMyRedPackage.shtml',
            app: '红包'
        },
        '会员等级': {
            web: '',
            mobile: 'http://m.9888.cn/mpwap/vipLevel/qryVipLevelMess.shtml',
            app: '用户等级'
        },
        '充值': {
            web: 'http://www.9888.cn/payBill/recharges.shtml',
            mobile: 'http://m.9888.cn/mpwap/orderuser/toRecharges.shtml',
            app: '充值'
        },
        '工场码': {
            web: 'http://www.9888.cn/factoryCode/info.shtml',
            mobile: 'http://m.9888.cn/mpwap/promotionCode/home.do',
            app: '工厂码'
        },
        '豆哥商城': {
            web: 'http://mall.9888.cn',
            mobile: 'http://mmall.9888.cn',
            app: '商城'
        },
        '工分': {
            web: 'http://www.9888.cn/user/credit/creditDetail.shtml',
            mobile: 'http://m.9888.cn/mpwap/score/myScore.shtml',
            app: '工分'
        },
        '刮刮卡去投资': {
            web: 'http://www.9888.cn/prdClaims/list.shtml',
            mobile: 'http://m.9888.cn/mpwap',
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
    if (typeof(window.FinancialWorkspace) == 'undefined')
        window.FinancialWorkspace = window.$FW = {};

    FinancialWorkspace.gotoSpecialPage = function (word, value) {
        if (client == 'web') {
            if (word == '登录') {
                window.location.href = LINKS[word].web + '?service=' + value
            } else {
                window.location.href = LINKS[word].web
            }
        } else if (client == 'mobile') {
            if (word == '登录') {
                window.location.href = LINKS[word].mobile + '?is_mall=3&redirect_url=' + value
            } else {
                window.location.href = LINKS[word].mobile
            }
        } else if (client == 'app') {
            FinancialWorkspace.tellApp(LINKS[word].app)
        } else {
            console.log('unknow client type, can not redirect to ' + word + ' page')
        }
    };
    FinancialWorkspace.SPECIAL_PAGE_LINKS = LINKS;
})();
