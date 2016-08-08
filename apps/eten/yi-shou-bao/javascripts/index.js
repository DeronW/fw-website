$(function () {
    //项目简介展开全部
    $(".more_link").click(function () {
        if ($(this).text() == "展开全部") {
            $(".more_txt").css("display", "");
            $(this).text("点击折叠");
            $(this).addClass("on");
        } else {
            $(".more_txt").css("display", "none");
            $(this).text("展开全部");
            $(this).removeClass("on");
        }
    })
    var iNum = 0;
    var flag = false;

    function css(obj, attr, value) {
        if (arguments.length == 2) {
            if (attr == "scrollbar") {
                return document.documentElement.scrollTop || document.body.scrollTop;
            }
        } else {
            document.documentElement.scrollTop = document.body.scrollTop = value;
        }
    }

    function starMove(obj, oTarget) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var iSpeed = 0;
            var iCur = 0;
            var bStop = true;
            for (var attr in oTarget) {
                iCur = css(obj, attr);
                iSpeed = (oTarget[attr] - iCur) / 5;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iCur != oTarget[attr]) {
                    bStop = false;
                    css(obj, attr, iCur + iSpeed);
                }
                flag = true;
            }
            if (bStop) {
                clearInterval(obj.timer);
            }
        }, 15)
    };
    var onesize1, onesize2, onesize3, onesize4, onesize5;
    getHeight();
    $(".more_link").click(function () {
        getHeight();
    })
    function getHeight() {
        onesize1 = $(".block1").height();
        onesize2 = $(".block2").height();
        onesize3 = $(".block3").height();
        onesize4 = $(".block4").height();
        onesize5 = $(".block5").height();
    }

    var iTop = $(".head-top").outerHeight();
    var iH = $(".top1").height();
    $(".menue ul li.list1").click(function () {
        starMove(document, {'scrollbar': iH + iTop})
    });
    $(".menue ul li.list2").click(function () {
        starMove(document, {'scrollbar': onesize1 + iH + iTop})
    });
    $(".menue ul li.list3").click(function () {
        starMove(document, {'scrollbar': onesize1 + onesize2 + iH + iTop})
    });
    $(".menue ul li.list4").click(function () {
        starMove(document, {'scrollbar': onesize1 + onesize2 + onesize3 + iH + iTop})
    });
    $(".menue ul li.list5").click(function () {
        starMove(document, {'scrollbar': onesize1 + onesize2 + onesize3 + onesize4 + iH + iTop})
    });

    $(window).on("scroll resize", function () {
        if ($(window).scrollTop() >= iH + iTop && $(window).scrollTop() < onesize1 + iH + iTop) {
            iNum = 0;
        } else if ($(window).scrollTop() >= onesize1 + iH + iTop && $(window).scrollTop() < onesize1 + onesize2 + iH + iTop) {
            iNum = 1;
        } else if ($(window).scrollTop() >= onesize1 + onesize2 + iH + iTop && $(window).scrollTop() < onesize1 + onesize2 + onesize3 + iH + iTop) {
            iNum = 2;
        } else if ($(window).scrollTop() >= onesize1 + onesize2 + onesize3 + iH + iTop && $(window).scrollTop() < onesize1 + onesize2 + onesize3 + onesize4 + iH + iTop) {
            iNum = 3;
        } else if ($(window).scrollTop() >= onesize1 + onesize2 + onesize3 + onesize4 + iH + iTop) {
            iNum = 4
        }
        if (flag == false) {
            clearInterval(document.timer);
        }
        flag = false;
        if ($(window).scrollTop() >= iH + 419) {
            $(".menue").css("position", "fixed").css("top", 0).css("left", 0);
            //$(".innerment").css("top",62);
            $(".moment.last").css("paddingBottom", 100);
            $(".menue ul li a").attr("class", "");
            $(".menue ul li a").eq(iNum).attr("class", "on");
        } else {
            $(".menue").css("position", "relative").css("top", 0).css("left", 0);
            //$(".innerment").css("top",0);
            $(".moment.last").css("paddingBottom", 38);
            $(".menue ul li a").attr("class", "");
        }
    })

    fn($(".agency"))

    function fn(obj) {
        $(window).on("resize", function () {
            toSize();
        })
        toSize();
        function toSize() {
            obj.find("ul").css("left", 0);
        }

        var iNum = 0;
        var timer = null;
        var onesize = obj.find("ul li").eq(0).width(); // 一个运动单位的长度就是一个LI的宽度
        obj.find("ul").css("width", onesize * obj.find("ul li").size()); // 动态计算UL的宽度
        obj.find("div").find("a").click(function () {
            iNum = $(this).index();
            fnclear();  // 重新分配A的class函数
            obj.find("ul").stop().animate({left: -iNum * onesize});
        })
        function fnclear() {
            obj.find("div").find("a").attr("class", "");
            obj.find("div").find("a").eq(iNum).attr("class", "on");
        }

        clearInterval(timer);
        timer = setInterval(autoplay, 3000);
        function autoplay() {  // 自动播放函数
            iNum++;
            if (iNum < obj.find("ul li").size()) {
                fnclear();
                obj.find("ul").stop().animate({left: -iNum * onesize});
            } else {
                iNum = 0;
                fnclear();
                obj.find("ul li").eq(0).css("position", "relative").css("left", obj.find("ul li").size() * obj.find("ul li").eq(0).width());
                obj.find("ul").stop().animate({left: -obj.find("ul li").size() * onesize}, function () {
                    obj.find("ul li").eq(0).css("position", "static");
                    obj.find("ul").css("left", 0);
                });
            }
        }

        obj.mouseover(function () {
            clearInterval(timer);
        });
        obj.mouseout(function () {
            clearInterval(timer);
            timer = setInterval(autoplay, 3000);
        })

    }
});