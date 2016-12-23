$(function () {
    //$(".monthStateCommon").on("click", function () {
    //    $(this).addClass('active')
    //})
    var is_login = null;
    var user = null;

    var janStart = new Date("2017/1/6").getTime();
    var janEnd = new Date("2017/2/2 23:59:59").getTime();
    var febStart = new Date("2017/2/3").getTime();
    var febEnd = new Date("2017/3/2 23:59:59").getTime();
    var marStart = new Date("2017/3/3").getTime();
    var marEnd = new Date("2017/3/30 23:59:59").getTime();
    var $month = $(".monthStateCommon");
    var oneWeekStart = new Date("2017/1/6").getTime();
    var oneWeekEnd = new Date("2017/1/12 23:59:59").getTime();
    $.get(API_PATH+"/api/userState/v1/timestamp.json", function (data) {
        var time = data.data.timestamp;
        $UserReady(function (is_login, user) {
            if (is_login) {
                if (time >= oneWeekStart && time <= oneWeekEnd) {
                    $(".weekAward").html('本周（1.6-1.12）内，您有效邀友<em>50</em>人，可获工豆<em>100</em>元。');
                } else if(time > oneWeekEnd && time <= marEnd){
                    $(".weekAward").html('本周（1.6-1.12）内，您有效邀友<em>50</em>人，可获工豆<em>100</em>元。&nbsp;&nbsp;<div class="beforeWeek" >往周邀友奖励</div>');
                }
            } else {
                $(".weekAward").html('请登录后，查看您的邀友数及可获工豆， <a href="https://passport.9888.cn/passport/login?sourceSite=jrgc">立即登录></a>');

            }
        });
        $(".beforeWeek").on("click", function () {
            $(".weekNotice").css("display","block");
        });
        if (time >= janStart && time <= janEnd) {
            $month.eq(0).addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $(".monthStateCommon:gt(0)").addClass('not');
        } else if (time >= febStart && time <= febEnd) {
            $month.eq(1).addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $month.eq(0).addClass("end").find(".stateLeft").text("已结束");
            $month.eq(2).addClass("not").find(".stateLeft").text("未开始");
            $(".monthGiftNumber").text(15);
            $(".monthLadder .ladderText").attr("src","./images/twoText.png");
            febMonthClick();
        } else if (time >= marStart && time <= marEnd) {
            $month.eq(2).addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $(".monthStateCommon:lt(2)").addClass("end").find(".stateLeft").text("已结束");
            $(".monthGiftNumber").text(18);
            $(".monthLadder .ladderText").attr("src","./images/threeText.png");
            marMonthClick();
        }
    }.bind(this), 'json');
    var febMonthClick = function () {
        $month.eq(0).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(12);
            $(".monthLadder .ladderText").attr("src","./images/oneText.png");
        });
        $month.eq(1).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(15);
            $(".monthLadder .ladderText").attr("src","./images/twoText.png");
        });
    };
    var marMonthClick = function () {
        $month.eq(0).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(12);
            $(".monthLadder .ladderText").attr("src","./images/oneText.png");
        });
        $month.eq(1).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(15);
            $(".monthLadder .ladderText").attr("src","./images/twoText.png");
        });
        $month.eq(2).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(18);
            $(".monthLadder .ladderText").attr("src","./images/threeText.png");
        });
    }
});
