$(function () {
    // 设置全局变量的 API_PATH , 被用作所有接口的前缀地址
    // 该变量很重要 !!!
    var p = document.getElementById('api-path').value;
    if (p.substr(0, 2) != '//') p = '//' + p;
    window.API_PATH = location.protocol + p;
});
(function () {
    var _ready_list = [];
    var _is_login = null;
    var _user = {};

    function ur(cb) {
        _is_login === null ? _ready_list.push(cb) : cb(_is_login, _user);
    }

    ur.isLogin = null;
    ur.fire = function (is_login, user) {
        _is_login = is_login;
        _user = user;
        _ready_list.forEach(function (cb) {
            cb(_is_login, _user)
        });
        _ready_list = [];
        ur.isLogin = is_login;
    };

    window.$UserReady = ur;
})();

$(function () {
    $.get(API_PATH+'/api/userState/v1/userState.json', {}, function (data) {
        if (data.code == 10000) {
            var m = data.data;
            var avatar = m.sex == 1 ?
                location.protocol+'//www.gongchangp2p.com/img/man.png' :
                location.protocol+'//www.gongchangp2p.com/img/woman.png';

            $UserReady.fire(m.isLogin, {
                realname: m.realName || m.userName,
                avatar: avatar,
                username: m.userName,
                userLevel: m.userLevel,
                userCode: m.userCode,
            });
        } else {
            throw new Error('API异常, 无法获取用户登录状态, [' + data.message + ']');
        }
    }, 'json')
});

$(function () {
    // APP内不显示头部导航
    var ua = navigator.userAgent;
    var inApp = ua.indexOf('FinancialWorkshop') >= 0;
    var inIOS = ua.indexOf('iPhone') >= 0;
    if (inApp) $(".mobile-header").hide();
});

$UserReady(function (is_login, user) {
    if (is_login == false) return;
    $(".show-when-not-login").hide();
    $(".show-when-login").show();
    $(".nav-link-mall").attr("href","https://passport.9888keji.com/passport/login?sourceSite=dgsc&service=https://www.dougemall.com/")

    $("#header-username").html('<a href="https://www.9888keji.com/account/myHome.shtml">'+user.username+'</a>');
    $("#header-realname").html('<a href="https://www.9888keji.com/account/myHome.shtml">'+user.realname+'</a>');
    $("#header-avatar").attr('src', user.avatar);
});

window.$toggleYaoQingYouLi = function() {
    $("#yao-qing-you-li").toggle()
}

window.$globalLogin = function() {
    location.href = 'https://passport.9888keji.com/passport/login?sourceSite=jrgc&service=' + location.href;
}

// 在IE9以下不支持复制粘贴, 使用假方法避免js报错
if (typeof Clipboard === 'undefined') {
    var notSupport = function () {
        console.log('您的浏览器版本过低, 请手动复制')
    };
    var fakeObj = {
        on: notSupport,
        destroy: notSupport
    };
    Clipboard = function () {
        return fakeObj;
    };
}

function $getDebugParams (){
    var r = {};
    var search = location.search.substr(1);
    if(!search) return r;
    search.split('&').forEach(function(i){
        var kv = i.split('='), k = kv[0], v = kv[1] || null;
        if(!isNaN(v)) v = parseFloat(v);
        r[k] = v;
    });
    return r.debug === 'true' && r;
}

$(function(){
    window.CONTENT_NODE = document.getElementById('cnt');
})
