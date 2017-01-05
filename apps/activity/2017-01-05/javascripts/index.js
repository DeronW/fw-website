function getServerTimestamp(callback) {
    var ts = $getDebugParams().timestamp;
    if (ts) {
        callback(ts)
    } else {
        $.get(API_PATH + "api/userState/v1/timestamp.json", function (data) {
            callback(data.data.timestamp)
        }, 'json')
    }
}
//alert("2ds342gg3")
$(function () {
    var app = navigator.userAgent.match(/FinancialWorkshop/i) ? true : false;
    if (app)$('.mobileContainer').css('margin-top', '0');


    //pc端底部如何邀友
    $UserReady(function (is_login, user) {
        $(".howAward").on("click", function () {
            if (is_login) {
                $(".pcNotice,.pcNotice .pcNoticeContentLogin").removeClass('hidden');
            } else {
                $(".pcNotice,.pcNotice .pcNoticeContentNo").removeClass('hidden')
            }
        })
    });
    //移动端底部如何邀友
    $UserReady(function (is_login, user) {
        $(".mobileBarFriend").on('click', function () {
            if (is_login) {
                $(".mobileNotice,.mobileNoticeContentLogin").removeClass('hidden');
            } else {
                $(".mobileNotice,.mobileNotice .mobileNoticeContentNo").removeClass('hidden')
            }
        })
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
        $toggleYaoQingYouLi();
    });
    //弹窗登录
    var loginUrl = location.protocol + '//www.9888.cn/api/activityPullNew/pullnewParty.do?id=19';
    $(".mobileNoticeContentNo .login,.pcNoticeContentNo .login").on("click", function () {
        $FW.gotoSpecialPage("登录", loginUrl);
    });
    //移动端有效邀友判断
    $(".mobilePerson").on("touchend", function (e) {
        $(".mobilePersonText").removeClass('hidden');
        e.preventDefault();
        return false
    });
    $('body').on('touchend', function () {
        $(".mobilePersonText").addClass('hidden');
    });

    //季排行榜奖金总额显示位置
    function totalMove(left, top, className) {
        $(".pcQuarterPack .quarterRemind").css({
            left: left + "px",
            top: top + "px"
        }).removeClass("hidden").addClass(className);
        $(".mobileQuarterPack .quarterRemind").addClass(className);
        $(".pcQuarterPack  .quarterRemindNot").addClass("hidden");
    }

    //季排行榜奖金总额
    function totalQuarterShowText(totalYearInvest) {
        $UserReady(function (is_login, user) {
            //4千万改为4百万
            if (is_login) {
                if (totalYearInvest < 4000000) {
                    $(".mobileQuarterPack .quarterRemind").addClass("quarterRemindNot").html("截止当前，榜内工友的有效好友累投年化总额为<em>0</em>万元，暂未开启新春特奖，大家加油哦！")
                } else if (totalYearInvest < 5000000) {
                    totalMove(60, -80, "quarterRemind1");
                } else if (totalYearInvest < 6000000) {
                    totalMove(360, -80, "quarterRemind2");
                } else {
                    totalMove(680, -80, "quarterRemind3");
                }
                $(".mobileQuarterPack .quarterRemind em,.pcQuarterPack .quarterRemind em,.pcQuarterPack  .quarterRemindNot em").html((totalYearInvest / 10000).toFixed(2));
            } else {
                $(".mobileQuarterPack .quarterRemind,.pcQuarterPack  .quarterRemindNot").addClass("hidden")
            }
        });
    }

    //季榜可以上榜文字显示
    function quarterTopTextCb(pullNewCount, myEqualFriendYearInvest, myFriendYearInvest, rankNum, p) {
        var price = myEqualFriendYearInvest * p * 0.56 + (myFriendYearInvest - myEqualFriendYearInvest) * p;
        return "<div>1.6-3.30，您有效邀友 <em>" + pullNewCount + "</em> 人，有效好友累投年化 <em>" + myFriendYearInvest + "</em> 元，排名 <em>" + rankNum + "</em>，当前可分得<em>" + price.toFixed(2) + "</em>元奖金！";
    }

    //季榜列表头部邀友文字
    function quarterTopText(totalYearInvest, pullNewCount, myFriendYearInvest, rankNum, myEqualFriendYearInvest, callback) {
        $UserReady(function (is_login, user) {
            if (is_login) {
                //100人改为3人 1百万改为10万
                var chartsText = '';
                chartsText = "<div>1.6-3.30，您有效邀友 <em>" + pullNewCount + "</em> 人，有效好友累投年化 <em>" + myFriendYearInvest + "</em> 元，排名 <em>" + rankNum + "</em>，当前暂无奖金可分，加油哦！";
                if (pullNewCount > 3 && myFriendYearInvest > 100000) {
                    if (totalYearInvest >= 4000000 && totalYearInvest < 5000000) {
                        chartsText = callback(pullNewCount, myEqualFriendYearInvest, myFriendYearInvest, rankNum, 0.01);
                    } else if (totalYearInvest >= 5000000 && totalYearInvest < 6000000) {
                        chartsText = callback(pullNewCount, myEqualFriendYearInvest, myFriendYearInvest, rankNum, 0.013);
                    } else if (totalYearInvest >= 6000000) {
                        chartsText = callback(pullNewCount, myEqualFriendYearInvest, myFriendYearInvest, rankNum, 0.018);
                    }
                }
                $('.pcQuarterPack .quarterExplain,.mobileQuarterPack .quarterExplain').html(chartsText);
            } else {
                var pcChartsText = '<div class="quarterNoLoginText">请登录后，查看您的邀友排名及可获奖金，</div> <div class="quarterLogin">立即登录></div>'
                var mobileChartsText = '<div class="quarterNoLoginText">请登录后，<br/>查看您的邀友排名及可获奖金，</div> <div class="quarterLogin">立即登录></div>'
                $('.pcQuarterPack .quarterExplain').html(pcChartsText);
                $('.mobileQuarterPack .quarterExplain').html(mobileChartsText);
                $(".quarterLogin").on("click", function () {
                    $FW.gotoSpecialPage("登录", loginUrl);
                });
            }
        });
    }

    //季排行榜
    $.get(API_PATH + 'api/activityPullNew/v2/PullNewTopAndYearInvest.json', {
        dataCount: 30,
        totalBaseAmt: 1000,
        endDate: '2017-3-30 23:59:59',
        startDate: '2017-1-6',
        startTotalCount: 3,
        startTotalInvest: 100000
    }, function (data) {
        var rankNum = data.data.rankNum || '30+';//当前用户排名
        var pullNewCount = data.data.pullNewCount || 0;//有效邀请人数
        var myFriendYearInvest = data.data.myFriendYearInvest || 0;
        var totalYearInvest = data.data.totalYearInvest;
        var totalYearInvestAll = data.data.totalYearInvestAll;
        var myEqualFriendYearInvest = data.data.myEqualFriendYearInvest;//等额
        var topList = data.data.topList;
        //列表不为空时
        if (topList.length) {
            $(".quarterLadder").removeClass('hidden');
            $(".quarterLadderNot").addClass('hidden');
        }
        totalQuarterShowText(totalYearInvestAll);
        quarterTopText(totalYearInvestAll, pullNewCount, myFriendYearInvest, rankNum, myEqualFriendYearInvest, quarterTopTextCb)

    }.bind(this), 'json');

    //月排行榜头部文字显示
    function monthTitleShow(titText, rankNum, pullNewCount, myFriendYearInvest, totalYearInvest, arg3, prize) {
        //请求参数参数startTotalCount 50改2 startTotalInvest 500000改5更改，500000改5,50改2
        if (pullNewCount < 2 || myFriendYearInvest < 50000) {
            titText = '该月内，您有效邀友 <em>' + pullNewCount + '</em> 人，有效好友累投年化 <em>' + myFriendYearInvest + '</em> 元，排名 <em>' + rankNum + '</em>，当前无奖金可分，要努力哦！';
        } else {
            prize = ((myFriendYearInvest / totalYearInvest) * arg3).toFixed(2);
            titText = '该月内，您有效邀友 <em>' + pullNewCount + '</em> 人，有效好友累投年化 <em>' + myFriendYearInvest + '</em> 元，排名 <em>' + rankNum + '</em>，当前可分得 <em>' + prize + ' </em>元奖金！';
        }
        $UserReady(function (is_login, user) {
            if (is_login) {
                $('.ladderTitle').html(titText);
            } else {
                var pcTitText = '<div class="monthNoLogin">请登录后，查看您的邀友排名及可获奖金 ，</div> <div class="monthLogin">立即登录></div>';
                var mobileTitText = '<div class="monthNoLogin">请登录后，<br/>查看您的邀友排名及可获奖金</div> <div class="monthLogin">立即登录></div>';
                $('.pcMonthPack .ladderTitle').html(pcTitText);
                $('.mobileMonthPack .ladderTitle').html(mobileTitText);
                $(".monthLogin").on('click', function () {
                    $FW.gotoSpecialPage("登录", loginUrl);
                })
            }
        });
    }

    //月排行榜
    function monthLadderShow(arg1, arg2, arg3) {
        $.get(API_PATH + 'api/activityPullNew/v2/PullNewTopAndYearInvest.json', {
            dataCount: 20,
            totalBaseAmt: 1000,
            startDate: arg1,
            endDate: arg2,
            startTotalCount: 2,
            startTotalInvest: 50000
        }, function (data) {
            var titText = '';
            var rankNum = data.data.rankNum || '20+';//当前用户排名
            var pullNewCount = data.data.pullNewCount || 0;//有效邀请人数
            var myFriendYearInvest = data.data.myFriendYearInvest;
            var totalYearInvest = data.data.totalYearInvest;
            var topList = data.data.topList;
            var prize = 0;
            monthTitleShow(titText, rankNum, pullNewCount, myFriendYearInvest, totalYearInvest, arg3, prize);
            if (topList.length) {
                $(".ladderContent").removeClass('hidden');
                $(".ladderContentNot").addClass('hidden');
            }
        }.bind(this), 'json');
    }

    //复制功能
    var clipboard = new Clipboard('.copyCode');//复制功能
    clipboard.on('success', function (e) {
        alert('复制成功');
    });
    clipboard.on('error', function (e) {
        alert('复制失败');
    });

    //顶部邀请奖励，根据不同周显示不同数据
    var febStart = new Date("2017/2/3").getTime();
    var marStart = new Date("2017/3/3").getTime();
    var week21 = new Date("2017/1/13 00:00").getTime();


    //判断在不同周的拉新人数
    function judgeWeekPerson(nowTime, timeText, week_arg_st, week_arg_et) {
        $.get(API_PATH + "api/activityPullNew/v2/pullNewCount.json", {
            startDate: week_arg_st,
            endDate: week_arg_et,
            totalBaseAmt: 1000,
        }, function (data) {
            $UserReady(function (is_login, user) {
                if (is_login) {
                    var dataCount = data.data.pullNewCount || 0;
                    var score = 0, pcWeekText, mobileWeekText, beforeText;
                    if (nowTime < week21) {
                        beforeText = '';
                        //移动端往周邀友奖励按钮隐藏
                        $(".weekBefore").addClass("hidden");
                    } else {
                        beforeText = '<div class="beforeWeek" >往周邀友奖励</div>';
                        //移动端往周邀友奖励按钮显示
                        $(".weekBefore").html("往周邀友奖励");
                    }
                    //上线时更改为正式条件
                    if (dataCount < 2) {
                        pcWeekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，暂未获得工豆奖励，加油哦！' + beforeText;
                        mobileWeekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，暂未获得工豆奖励，加油哦！';
                    } else {
                        if (dataCount <= 3) {
                            score = dataCount * 10;
                        } else if (dataCount <= 5) {
                            score = dataCount * 12;
                        } else if (dataCount <= 7) {
                            score = dataCount * 15;
                        } else if (dataCount >= 8) {
                            score = dataCount * 18;
                        }
                        pcWeekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，可获工豆 <em>' + score + '</em> 元 ！' + beforeText;
                        mobileWeekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，可获工豆 <em>' + score + '</em> 元 ！';
                    }

                    $(".pcWeekPack .weekAward").html(pcWeekText);
                    $(".mobileWeekPack .weekAward").html(mobileWeekText);
                    $(".noticeCode").html(user.userCode);
                    $(".noticeLink").html('https://passport.9888.cn/pp-web2/register/phone.do?gcm=' + user.userCode);
                } else {
                    $(".pcWeekPack .weekAward").html('请登录后，查看您的邀友数及可获工豆， <a>立即登录></a>').on("click", function () {
                        $FW.gotoSpecialPage('登录', loginUrl);
                    });
                    $(".mobileWeekPack .weekAward").html('请登录后，查看您的邀友数及可获工豆');
                    $(".weekBefore").addClass('hidden');
                    $(".weekLogin").removeClass('hidden').html('立即登录').on("click", function () {
                        $FW.gotoSpecialPage('登录', loginUrl);
                    });
                }
            });
            //往周邀友奖励
            $(".beforeWeek").on("click", function () {
                $(".pcNotice,.pcNotice .pcNoticeWeekLadder").removeClass('hidden');
            });
            $(".weekBefore").on("click", function () {
                $(".mobileNotice,.mobileNotice .mobileNoticeWeekLadder").removeClass('hidden');
            });
        }.bind(this), 'json');
    }

    //月份变换
    var fn = function (_this, n, pcImg, mobileImg) {
        _this.removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
        $(".monthGiftNumber").text(n);
        $(".pcMonthPack .monthLadder .ladderText").attr("src", pcImg);
        $(".mobileMonthPack .monthLadder .ladderText").attr("src", mobileImg);
    };
    //月份显示及点击切换
    function monthClickChange(nowTime) {
        var month_1 = $(".monthStateCommon").eq(0);
        var month_2 = $(".monthStateCommon").eq(1);
        var month_3 = $(".monthStateCommon").eq(2);
        if (nowTime < febStart) {
            month_1.addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $(".monthStateCommon:gt(0)").addClass('not');
            monthLadderShow('2017-1-6', '2017-2-2 23:59:59', 120000);
        } else if (nowTime < marStart) {
            month_2.addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            month_1.addClass("end").find(".stateLeft").text("已结束");
            month_3.addClass("not").find(".stateLeft").text("未开始");
            $(".monthGiftNumber").text(15);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "images/twoText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "images/mobileTwo.png");

            monthLadderShow('2017-2-3', '2017-3-2 23:59:59', 150000);
            month_1.click(function () {
                fn($(this), 12, 'images/onetext.png', 'images/mobileOne.png');
                monthLadderShow('2017-1-6', '2017-2-2 23:59:59', 120000);
            });
            month_2.click(function () {
                fn($(this), 15, 'images/twoText.png', 'images/mobileTwo.png');
                monthLadderShow('2017-2-3', '2017-3-2 23:59:59', 150000);
            });
        } else {
            month_3.addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $(".monthStateCommon:lt(2)").addClass("end").find(".stateLeft").text("已结束");
            $(".monthGiftNumber").text(18);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "images/threeText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "images/mobileThree.png");

            monthLadderShow('2017-3-3', '2017-3-30 23:59:59', 180000);
            month_1.click(function () {
                fn($(this), 12, 'images/onetext.png', 'images/mobileOne.png');
                monthLadderShow('2017-1-6', '2017-2-2 23:59:59', 120000);

            });
            month_2.click(function () {
                fn($(this), 15, 'images/twoText.png', 'images/mobileTwo.png');
                monthLadderShow('2017-2-3', '2017-3-2 23:59:59', 150000);
            });
            month_3.click(function () {
                fn($(this), 18, 'images/threeText.png', 'images/mobileThree.png');
                monthLadderShow('2017-3-3', '2017-3-30 23:59:59', 180000);
            });
        }
    }

    var weekTime = 7 * 24 * 60 * 60 * 1000;
    var startTime = new Date("2017/1/6 00:00:00").getTime();
    var weekList = [];
    for (var i = 0; i < 12; i++) {
        weekList.push((startTime += weekTime));
    }
    //时间戳
    getServerTimestamp(function (timestamp) {
        var nowTime = timestamp;
        var timeText, week_arg_st, week_arg_et;
        //遮罩层

        var startTime = new Date("2017/1/6 00:00:00").getTime();
        if(nowTime >= startTime){
            $(".pcNoStart").addClass('hidden');
            $(".mobileNoStart").addClass('hidden');
        }
        if (nowTime < weekList[0]) {
            timeText = '1.6-1.12';
            week_arg_st = '2017-1-6 00:00:00';
            week_arg_et = '2017-1-12 23:59:59';
        } else if (nowTime >= weekList[0] && nowTime < weekList[1]) {
            timeText = '1.13-1.19';
            week_arg_st = '2017-1-13 00:00:00';
            week_arg_et = '2017-1-19 23:59:59';
        } else if (nowTime >= weekList[1] && nowTime < weekList[2]) {
            timeText = '1.20-1.26';
            week_arg_st = '2017-1-20 00:00:00';
            week_arg_et = '2017-1-26 23:59:59';
        } else if (nowTime >= weekList[2] && nowTime < weekList[3]) {
            timeText = '1.27-2.2';
            week_arg_st = '2017-1-27 00:00:00';
            week_arg_et = '2017-2-2 23:59:59';
        } else if (nowTime >= weekList[3] && nowTime < weekList[4]) {
            timeText = '2.3-2.9';
            week_arg_st = '2017-2-3';
            week_arg_et = '2017-2-9 23:59:59';
        } else if (nowTime >= weekList[4] && nowTime < weekList[5]) {
            timeText = '2.10-2.16';
            week_arg_st = '2017-2-10 00:00:00';
            week_arg_et = '2017-2-16 23:59:59';
        } else if (nowTime >= weekList[5] && nowTime < weekList[6]) {
            timeText = '2.17-2.23';
            week_arg_st = '2017-2-17 00:00:00';
            week_arg_et = '2017-2-23 23:59:59';
        } else if (nowTime >= weekList[6] && nowTime < weekList[7]) {
            timeText = '2.24-3.2';
            week_arg_st = '2017-2-24 00:00:00';
            week_arg_et = '2017-3-2 23:59:59';
        } else if (nowTime >= weekList[7] && nowTime < weekList[8]) {
            timeText = '3.3-3.9';
            week_arg_st = '2017-3-3 00:00:00';
            week_arg_et = '2017-3-9 23:59:59';
        } else if (nowTime >= weekList[8] && nowTime < weekList[9]) {
            timeText = '3.10-3.16';
            week_arg_st = '2017-3-10 00:00:00';
            week_arg_et = '2017-3-16 23:59:59';
        } else if (nowTime >= weekList[9] && nowTime < weekList[10]) {
            timeText = '3.17-3.23';
            week_arg_st = '2017-3-17 00:00:00';
            week_arg_et = '2017-3-23 23:59:59';
        } else {
            timeText = '3.24-3.30';
            week_arg_st = '2017-3-24 00:00:00';
            week_arg_et = '2017-3-30 23:59:59';
        }

        //拉新人数
        judgeWeekPerson(nowTime, timeText, week_arg_st, week_arg_et);
        //月份切换
        monthClickChange(nowTime)
    }.bind(this))
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0")
    {
        $(".copyCode").on('click', function () {
            alert("您的浏览器版本过低, 请手动复制")
        });
    }
});

