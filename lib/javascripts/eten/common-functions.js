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
        $('body').animate({scrollTop: '0px'}, 400);
    });

    // 全局的JS异常捕捉方法, 捕捉后发送到服务器
    window.onerror = function (msg, file, line, column, error) {
        try {
            var img = document.createElement('img');
            var st = (new Date).getTime(), info = location.host + '-' + file + '-' + line + '-' + msg;
            img.src = 'http://api.9888.cn/bridge/api/1/session_user.json?msg=' + info + '&st=' + parseInt(st / 1000);
            img.width = '0';
            img.height = '0';
            img.style.display = 'none';
            img.id = 'err-' + st;
            setTimeout(function () {
                document.body.removeChild(document.getElementById('err-' + st))
            }, 3000);
            document.body.appendChild(img);
        } catch (e) {
            console.log('can not report js error', e)
        }
    }
});

$(function () {
    // 设置全局变量的 API_PATH , 被用作所有接口的前缀地址
    // 该变量很重要 !!!
    window.API_PATH = document.getElementById('api-path').value;
});

(function () {
// Create the event.
    var event = document.createEvent('Event');
// Define that the event name is 'build'.
    event.initEvent('UserStateLoaded', true, true);
// Listen for the event.
    document.addEventListener('UserStateLoaded', function (e) {
        // e.target matches elem
    }, false);

    window.IS_LOGIN = null;
    var is_user_login = null, user_data = null;
    var _user_ready_callback_list = [];
    window.UserReady = function (cb) {
        if (window.IS_LOGIN == null) {
            _user_ready_callback_list.push(cb)
        } else {
            cb(is_user_login, user_data)
        }
    };
    window.UserReady.go = function (is_login, user) {
        window.IS_LOGIN = is_user_login = is_login;
        user_data = user;
        _user_ready_callback_list.forEach(function (cb) {
            cb(is_login, user)
        });
        _user_ready_callback_list = [];
    }
})();