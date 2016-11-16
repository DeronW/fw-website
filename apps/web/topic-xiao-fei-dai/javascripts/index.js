$(function () {
    //项目简介展开全部
    $("#handle").click(function () {
        if ($(this).hasClass("handle")) {
            $(".more").css("display", "");
            $(this).removeClass("handle").addClass("handleon");
        } else {
            $(".more").css("display", "none");
            $(this).removeClass("handleon").addClass("handle");
        }

    });
    $("#nav").css({
        'position': 'relative',
        "top": "0"
    });

    // $(window).scroll(function () {
    //     var scrollT=$(document).scrollTop()||document.documentElement.scrollTop || document.body.scrollTop;
    //     console.log(scrollT);
    // });
    $(window).scroll(function () {
        if ($(window).scrollTop() >420) {
            $("#nav").css({
                "position": "fixed",
                "top": "0",
                "width": "1140px",
                "margin": "0 auto"
            });
        }
        else {
            $("#nav").css({
                'position': 'relative',
                "top": "0"
            });
        }
    });
    $(".slideBox").slide({mainCell: ".bd ul", autoPlay: true});
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

    var onesize1, onesize2, onesize3, onesize4, onesize5;
    getHeight();
    function getHeight() {
        onesize1 = $(".Introduction").height();
        onesize2 = $(".guaranteeBox").height();
        onesize3 = $(".caseBox").height();
        onesize4 = $(".cooperationBox").height();
        onesize5 = $(".questionBox").height();
    }

    var iTop = $(".top").outerHeight();

    var iH = $(".centerNav").height();

    $(".centerNav ul li.list1").click(function () {
        //starMove(document, {'scrollbar': iH + iTop-100});
        $(document).scrollTop(iH + iTop-100);
        $(this).children("a").addClass("on").parent().siblings().children("a").removeClass("on");
    });
    $(".centerNav ul li.list2").click(function () {
        //starMove(document, {'scrollbar': onesize1 + iH + iTop-70});
        $(document).scrollTop(onesize1 + iH + iTop-70);
        $(this).children("a").addClass("on").parent().siblings().children("a").removeClass("on");
    });
    $(".centerNav ul li.list3").click(function () {
        //starMove(document, {'scrollbar': onesize1 + onesize2 + iH + iTop - 30});
        $(document).scrollTop(onesize1 + onesize2 + iH + iTop - 30);
        $(this).children("a").addClass("on").parent().siblings().children("a").removeClass("on");

    });
    $(".centerNav ul li.list4").click(function () {
        $(document).scrollTop(onesize1 + onesize2 + onesize3 + iH + iTop - 30);
        //starMove(document, {'scrollbar': onesize1 + onesize2 + onesize3 + iH + iTop - 30});
        $(this).children("a").addClass("on").parent().siblings().children("a").removeClass("on");

    });
    $(".centerNav ul li.list5").click(function () {
        $(document).scrollTop(onesize1 + onesize2 + onesize3 + onesize4 + iH + iTop - 30);
        //starMove(document, {'scrollbar': onesize1 + onesize2 + onesize3 + onesize4 + iH + iTop - 30});
        $(this).children("a").addClass("on").parent().siblings().children("a").removeClass("on");
    });
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
        }, 0)
    };
    $(window).scroll(function () {
        var st = $(window).scrollTop();
        if (st > (iTop + iH - 120) && st < (iH + iTop + onesize1 - 120)) {
            $(".list1 a").addClass("on").parent().siblings().children("a").removeClass("on");
        } else if (st > (iH + iTop + onesize1-80) && st < (iTop + iH + onesize1 + onesize2-80)) {
            $(".list2 a").addClass("on").parent().siblings().children("a").removeClass("on");
        } else if (st > (iTop + iH + onesize1 + onesize2 - 40) && st < (iTop + iH + onesize1 + onesize2 + onesize3 - 40)) {
            $(".list3 a").addClass("on").parent().siblings().children("a").removeClass("on");
        } else if (st > (iTop + iH + onesize1 + onesize2 + onesize3 - 40) && st < (iTop + iH + onesize1 + onesize2 + onesize3 + onesize4 - 40)) {
            $(".list4 a").addClass("on").parent().siblings().children("a").removeClass("on");
        } else if (st > (iTop + iH + onesize1 + onesize2 + onesize3 + onesize4 - 40) && st < (iTop + iH + onesize1 + onesize2 + onesize3 + onesize4 + onesize5 - 40)) {
            $(".list5 a").addClass("on").parent().siblings().children("a").removeClass("on");
        }
    });
});