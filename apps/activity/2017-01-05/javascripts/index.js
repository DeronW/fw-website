$(function () {
    //pc端底部如何邀友
    $(".howAward").on("click", function () {
        $UserReady(function (is_login, user) {
            if (is_login) {
                $(".pcNotice,.pcNotice .pcNoticeContentLogin").removeClass('hidden');
            } else {
                $(".pcNotice,.pcNotice .pcNoticeContentNo").removeClass('hidden')
            }
        });
    });
    //移动端底部如何邀友
    $(".mobileBarFriend").on('click', function () {
        $UserReady(function (is_login, user) {
            if (is_login) {
                $(".mobileNotice,.mobileNoticeContentLogin").removeClass('hidden');
            } else {
                $(".mobileNotice,.mobileNotice .mobileNoticeContentNo").removeClass('hidden')
            }
        });
    });
    //弹窗关闭按钮
    $(".noticeClose").on("click", function () {
        $(".pcNotice,.pcNotice .pcNoticeContentNo,.pcNotice .pcNoticeContentLogin,.pcNotice .pcNoticeWeekLadder").addClass('hidden');
        $(".mobileNotice,.mobileNotice .mobileNoticeContentNo,.mobileNotice .mobileNoticeContentLogin,.mobileNotice .mobileNoticeWeekLadder").addClass('hidden');
    });
    //底部关闭按钮
    $(".barClose").on("click", function () {
        $(".pcFooterBar").addClass('hidden')
    });
    $(".mobileClose").on("click", function () {
        $(".mobileBar").addClass("hidden")
    });
    //底部邀友弹窗
    $(".moreAward,.mobileBarAward").on("click", function () {
        toggleYaoQingYouLi();
    });
    //弹窗登录
    var loginUrl = 'http://www.9888.cn/api/activityPullNew/pullnewParty.do?id=18';
    $(".mobileNoticeContentNo .login").on("click", function () {
        $FW.gotoSpecialPage("登录", loginUrl);
    });

    $.get('./javascripts/month.json', function (data) {
        var rank = 0;
        let sData = data.data;
        let totalInvest = data.data.totalYearInvest;

        if (totalInvest >= 40000000 && totalInvest < 50000000) {
            $(".pcQuarterPack .quarterRemind").css({
                left: 60 + "px",
                top: -80 + "px"
            });
            $(".mobileQuarterPack .quarterRemind").addClass("quarterRemind1")
        } else if (totalInvest >= 50000000 && totalInvest<60000000) {
            $(".pcQuarterPack .quarterRemind").css({
                left: 360 + "px",
                top: -80 + "px"
            });
            $(".mobileQuarterPack .quarterRemind").addClass("quarterRemind2")
        }else if(totalInvest >= 60000000){
            $(".pcQuarterPack .quarterRemind").css({
                left: 680 + "px",
                top: -80 + "px"
            });
            $(".mobileQuarterPack .quarterRemind").addClass("quarterRemind3")
        }else{
            $(".pcQuarterPack .quarterRemind").addClass("hidden");
            $(".pcQuarterPack  .quarterRemindNot").removeClass("hidden");
            $(".mobileQuarterPack .quarterRemind").addClass("quarterRemindNot").html("截止当前，榜内推荐人的有效好友累投年化总额为<em>5600</em>万元，暂未达到中奖档位，大家继续加油哦！")
        }

        $(".pcQuarterPack .quarterRemind em,.pcQuarterPack .quarterRemindNot em").html(totalInvest/10000);
        $(".mobileQuarterPack .quarterRemind em,.mobileQuarterPack .quarterRemindNot em").html(totalInvest/10000);
        let $em = $(".pcQuarterPack .quarterExplain em,.mobileQuarterPack .quarterExplain em");
        $em.eq(0).text(sData.pullNewCount);
        $em.eq(1).text(sData.myFriendYearInvest);
        $em.eq(2).text(sData.rankNum || "30+");
        $em.eq(3).text(sData.totalYearInvest);

        //移动端提示

    }, 'json');

    var janStart = new Date("2017/1/6").getTime();
    var janEnd = new Date("2017/2/2 23:59:59").getTime();
    var febStart = new Date("2017/2/3").getTime();
    var febEnd = new Date("2017/3/2 23:59:59").getTime();
    var marStart = new Date("2017/3/3").getTime();
    var marEnd = new Date("2017/3/30 23:59:59").getTime();
    var $month = $(".monthStateCommon");
    var oneWeekStart = new Date("2017/1/6").getTime();
    var oneWeekEnd = new Date("2017/1/12 23:59:59").getTime();
    //顶部邀请奖励，根据不同周显示不同数据
    var week11 = new Date("2017/1/6 00:00:00").getTime();
    var week12 = new Date("2017/1/12 23:59:59").getTime();
    var week21 = new Date("2017/1/13 00:00").getTime();
    var week22 = new Date("2017/1/19 23:59:59").getTime();
    var week31 = new Date("2017/1/20 00:00").getTime();
    var week32 = new Date("2017/1/26 23:59:59").getTime();
    var week41 = new Date("2017/1/27 00:00").getTime();
    var week42 = new Date("2017/2/2 23:59:59").getTime();
    var week51 = new Date("2017/2/3 00:00").getTime();
    var week52 = new Date("2017/2/9 23:59:59").getTime();
    var week61 = new Date("2017/2/10 00:00").getTime();
    var week62 = new Date("2017/2/16 23:59:59").getTime();
    var week71 = new Date("2017/2/17 00:00").getTime();
    var week72 = new Date("2017/2/23 23:59:59").getTime();
    var week81 = new Date("2017/2/24 00:00").getTime();
    var week82 = new Date("2017/3/2 23:59:59").getTime();
    var week91 = new Date("2017/3/3 00:00").getTime();
    var week92 = new Date("2017/3/9 23:59:59").getTime();
    var week101 = new Date("2017/3/10 00:00").getTime();
    var week102 = new Date("2017/3/16 23:59:59").getTime();
    var week111 = new Date("2017/3/17 00:00").getTime();
    var week112 = new Date("2017/3/23 23:59:59").getTime();
    var week121 = new Date("2017/3/24 00:00").getTime();
    var week122 = new Date("2017/3/30 23:59:59").getTime();


    //API_PATH+"/api/userState/v1/timestamp.json"
    $.get("./javascripts/time.json", function (data) {
        var nowTime = data.data.timestamp;
        var timeText, week_arg_st, week_arg_et;
        if (nowTime < week12) {
            timeText = '1.6-1.12';
            week_arg_st = '2017/1/6';
            week_arg_et = '2017/1/12';
        }
        else if (week21 < nowTime && nowTime < week22) {
            timeText = '1.13-1.19';
            week_arg_st = '2017/1/13';
            week_arg_et = '2017/1/19';
        }
        else if (week31 < nowTime && nowTime < week32) {
            timeText = '1.20-1.26';
            week_arg_st = '2017/1/20';
            week_arg_et = '2017/1/26';
        }
        else if (week41 < nowTime && nowTime < week42) {
            timeText = '1.27-2.2';
            week_arg_st = '2017/1/27';
            week_arg_et = '2017/2/2';
        }
        else if (week51 < nowTime && nowTime < week52) {
            timeText = '2.3-2.9';
            week_arg_st = '2017/2/3';
            week_arg_et = '2017/2/9';
        }
        else if (week61 < nowTime && nowTime < week62) {
            timeText = '2.10-2.16';
            week_arg_st = '2017/2/10';
            week_arg_et = '2017/2/16';
        }
        else if (week71 < nowTime && nowTime < week72) {
            timeText = '2.17-2.23';
            week_arg_st = '2017/2/17';
            week_arg_et = '2017/2/23';
        }
        else if (week81 < nowTime && nowTime < week82) {
            timeText = '2.24-3.2';
            week_arg_st = '2017/2/24';
            week_arg_et = '2017/3/2';
        }
        else if (week91 < nowTime && nowTime < week92) {
            timeText = '3.3-3.9';
            week_arg_st = '2017/3/3';
            week_arg_et = '2017/3/9';
        }
        else if (week101 < nowTime && nowTime < week102) {
            timeText = '3.10-3.16';
            week_arg_st = '2017/3/10';
            week_arg_et = '2017/3/16';
        }
        else if (week111 < nowTime && nowTime < week112) {
            timeText = '3.17-3.23';
            week_arg_st = '2017/3/17';
            week_arg_et = '2017/3/23';
        }
        else {
            timeText = '3.24-3.30';
            week_arg_st = '2017/3/24';
            week_arg_et = '2017/3/30';
        }
        //API_PATH+/api/activityPullNew/v2/pullNewCount.json
        //,{
        //    startDate: week_arg_st,
        //        endDate: week_arg_et,
        //        totalBaseAmt: 1000,
        //}
        $.get("./javascripts/count.json", (data)=> {
            $UserReady(function (is_login, user) {
                if (is_login) {
                    var dataCount = data.data.pullNewCount || 0;
                    var score = 0;
                    var beforeText = '<div class="beforeWeek" >往周邀友奖励</div>';
                    if (dataCount >= 5) score = dataCount * 10;
                    if (dataCount >= 10) score = dataCount * 12;
                    if (dataCount >= 30) score = dataCount * 15;
                    if (dataCount >= 50) score = dataCount * 18;
                    if (dataCount < 5) {
                        weekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，暂未获得工豆奖励，加油哦！' + beforeText;
                    } else {
                        weekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，可获工豆 <em>' + score + '</em> 元 ！' + beforeText;
                    }
                    $(".pcWeekPack .weekAward").html(weekText);
                    $(".noticeCode").html(user.userCode);
                    $(".noticeLink").html('http://passport.9888.cn/pp-web2/register/phone.do?gcm=' + user.userCode);
                } else {
                    $(".pcWeekPack .weekAward").html('请登录后，查看您的邀友数及可获工豆， <a href="https://passport.9888.cn/passport/login">立即登录></a>');
                }
            });
            $(".beforeWeek").on("click", function () {
                $(".pcNotice,.pcNotice .pcNoticeWeekLadder").removeClass('hidden');
            });
            $(".weekBefore").on("click", function () {
                $(".mobileNotice,.mobileNotice .mobileNoticeWeekLadder").removeClass('hidden');
            });
        }, 'json');

        if (nowTime >= janStart && nowTime <= janEnd) {
            $month.eq(0).addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $(".monthStateCommon:gt(0)").addClass('not');
        } else if (nowTime >= febStart && nowTime <= febEnd) {
            $month.eq(1).addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $month.eq(0).addClass("end").find(".stateLeft").text("已结束");
            $month.eq(2).addClass("not").find(".stateLeft").text("未开始");
            $(".monthGiftNumber").text(15);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "./images/twoText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "./images/mobileTwo.png");
            febMonthClick();
        } else if (nowTime >= marStart && nowTime <= marEnd) {
            $month.eq(2).addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $(".monthStateCommon:lt(2)").addClass("end").find(".stateLeft").text("已结束");
            $(".monthGiftNumber").text(18);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "./images/threeText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "./images/mobileThree.png");
            marMonthClick();
        }
    }.bind(this), 'json');
    var febMonthClick = function () {
        $month.eq(0).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(12);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "./images/oneText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "./images/mobileOne.png");
        });
        $month.eq(1).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(15);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "./images/twoText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "./images/mobileTwo.png");
        });
    };
    var marMonthClick = function () {
        $month.eq(0).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(12);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "./images/oneText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "./images/mobileOne.png");
        });
        $month.eq(1).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(15);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "./images/twoText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "./images/mobileTwo.png");
        });
        $month.eq(2).on("click", function () {
            $(this).removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(18);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "./images/threeText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "./images/mobileThree.png");
        });
    };
    //$(".beforeWeek").on("click", function () {
    //    showWeekLadder();
    //});

});

//function showWeekLadder() {
//    ReactDOM.render(<WeekLadderPC />, document.getElementById("wl"));
//    //ReactDOM.render(<WeekLadderPC />, document.getElementById("week"));
//}