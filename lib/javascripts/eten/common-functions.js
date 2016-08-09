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

window.IS_LOGIN = null;

window.globalInterestCalculator = {
    addValidate: function () {
        var ids = ["#ic-total-invest", "#ic-interest-rate", "#ic-invest-time"];
        for (var i = 0; i < ids.length; i++) {
            $(ids[i]).on('keyup', function () {
                var e = $(this);
                e.val(parseInt(e.val()) || 0)
            });
        }
    },
    addChangeWay: function () {
        $("#ic-return-way").change(function () {
            var e = $(this);
            if (e.val() == 'daily') {
                $("#ic-invest-time-unit").text('天')
            } else {
                $("#ic-invest-time-unit").text('月')
            }
        })
    },
    calculate: function () {
        var money = parseInt($("#ic-total-invest").val()),
            rate = parseInt($("#ic-interest-rate").val()),
            rway = $("#ic-return-way").val(),
            time = parseInt($("#ic-invest-time").val());

        if (!money) return this.showTips('项目金额不能为空');
        if (!rate) return this.showTips('年化收益率不能为空');
        if (!time) return this.showTips('项目期限不能为空');

        var monthly_interest = (money * rate / 12);
        var daily_interest = (money * rate / 360);

        var pre_item = rway == 'daily' ? daily_interest : monthly_interest;
        var interest = Math.round(pre_item * time) / 100;

        var total = money + interest;
        var last = money + Math.round(monthly_interest) / 100;

        if (rway == 'monthly') {
        } else {
            pre_item = null;
            last = null;
        }

        this.showResult(total, interest, Math.round(pre_item) / 100, last);
    },
    formatMoney: function (str) {
        str += '';
        var newStr = "";
        var count = 0;
        if (str.indexOf(".") == -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr + ".00"; //自动补小数点后两位
            return str
        }
        else {
            for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
            return str
        }
    },
    reset: function () {
        $("#ic-total-invest").val(5000);
        $("#ic-interest-rate").val(12);
        //$("#ic-return-way").val();
        $("#ic-invest-time").val(12);

        this.hideTips();
        this.hideResult();
    },
    showTips: function () {
        $(".interest-calculator .error-tips").html("");
    },
    hideTips: function () {
        $(".interest-calculator .error-tips").html("");
    },
    showResult: function (total, interest, pre_item, last) {
        var items = $(".ic-result-item");
        if (total) {
            $(items[0]).find('b').text(this.formatMoney(total) + '元');
            $(items[0]).show();
        }

        if (interest) {
            $(items[1]).find('b').text(this.formatMoney(interest) + '元');
            $(items[1]).show();
        }

        if (pre_item) {
            $(items[2]).find('b').text(this.formatMoney(pre_item) + '元');
            $(items[2]).show();
        } else {
            $(items[2]).hide();
        }

        if (last) {
            $(items[3]).find('b').text(this.formatMoney(last) + '元');
            $(items[3]).show();
        } else {
            $(items[3]).hide();
        }
    },
    hideResult: function () {
        $(".ic-result-item").hide();
    },
    show: function () {
        $(".interest-calculator").show()
    },
    hide: function () {
        $(".interest-calculator").hide();
        this.reset();
    }
};

$(function () {
    globalInterestCalculator.addValidate();
    globalInterestCalculator.addChangeWay();
});