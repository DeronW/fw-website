$(function () {
    // 公共js方法, 全局公用的部分小方法, 大部分跟页面样式有关, 都是些小功能

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
    window.API_PATH = document.getElementById('api-path').value
    window.CONTENT_NODE = document.getElementById('cnt')
    window.HEADER_STATUS_NODE = document.getElementById('header-status-bar')
    window.USER_CENTER_SIDEBAR_NODE = document.getElementById('user-center-sidebar')
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
