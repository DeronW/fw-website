$(function () {
    // 公共js方法, 全局公用的部分小方法, 大部分跟页面样式有关, 都是些小功能

    // 头部导航, 图片没有对齐, 添加一个延时对其的功能, 在动画播放完后对其文字
    $("#global-nav-banner").css('transform', 'translateX(-50px)');

    // 在IE6/IE7下显示的升级提示, 如果被连续点击, 就隐藏掉遮罩层
    window.__not_support_ie6_ie7_click_count = 0;
    $(".please-update-your-browser").click(function () {
        window.__not_support_ie6_ie7_click_count++;
        if (window.__not_support_ie6_ie7_click_count > 2) {
            $(".please-update-your-browser").hide()
        }
    });

    // 全局返回页面顶部按钮
    $(document).scroll(function () {
        //window.__show_scroll_top_btn
        var e = $(document);
        if (e.scrollTop() > 10) {
            if (!window.__show_scroll_top_btn) {
                $("#sidebar-btn-scroll-top").show();
                window.__show_scroll_top_btn = true;
            }
        } else if (window.__show_scroll_top_btn) {
            $("#sidebar-btn-scroll-top").hide();
            window.__show_scroll_top_btn = false;
        }
    });
    $("#sidebar-btn-scroll-top").click(function () {
        $('body').animate({ scrollTop: '0px' }, 400);
    });

});

$(function () {
    // 设置全局变量的 API_PATH , 被用作所有接口的前缀地址
    // 该变量很重要 !!!!!
    window.API_PATH = document.getElementById('api-path').value;
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
// 添加p2p和尊享的判断

function $getDebugParams() {
    var r = {};
    var search = location.search.substr(1);
    if (!search) return r;
    search.split('&').forEach(function (i) {
        var kv = i.split('='), k = kv[0], v = kv[1] || null;
        if (!isNaN(v)) v = parseFloat(v);
        r[k] = v;
    });
    return r.debug === 'true' && r;
}

// $(function () {
//     // 9888.cn p2p
//     // gongchangzx.com
//     window.DOMAIN_P2P = $getDebugParams().path == 'p2p' || document.domain.match(/\.9888\.cn/)
//     window.DOMAIN_ZX = $getDebugParams().path == 'zx' || document.domain.match(/\.gongchangzx\.com/)
//     if (window.DOMAIN_ZX != null) {
//         $("[data-zx=true]").removeClass("hide")
//         $("[data-p2p=true]").addClass("hide")
//         //尊享的时候飘窗隐藏a
//         $("[data-zx-sidebar=true]").addClass("hide")
//         //我的p2p和我的尊享显示区分
//         $("[data-zx-title=true]").removeClass("hide")
//         $("[data-p2p-title=true]").addClass("hide")

//     }
// });
