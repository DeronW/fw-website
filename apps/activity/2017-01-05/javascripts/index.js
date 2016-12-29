

function getServerTimestamp(callback){
    var ts = $getDebugParams().timestamp;
    if(ts) {
        callback(ts)
    } else {
        $.get(API_PATH+"api/userState/v1/timestamp.json", function (data) {
            callback(data.data.timestamp)
        }, 'json')
    }
}

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
    var loginUrl = 'http://www.9888.cn/api/activityPullNew/pullnewParty.do?id=19';
    $(".mobileNoticeContentNo .login,.pcNoticeContentNo .login").on("click", function () {
        $FW.gotoSpecialPage("登录", loginUrl);
    });
    var fixedPriceFun = function (total,equalTotal, totalLimit) {
        var p = 0.01;
        if (total >= 4000000 && total < 5000000) {
            p = 0.01;
        } else if (total >= 5000000 && total < 6000000) {
            p = 0.013;
        } else if (total >= 6000000) {
            p = 0.018;
        } else {
            return '暂无奖金'
        }
        var price = equalTotal * p * 0.56 + (totalLimit - totalLimit) * p;
        return price.toFixed(2)
    };
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
    function totalShowText(totalYearInvest){
        $UserReady(function (is_login,user) {
            //4千万改为4百万
            if(is_login){
                if (totalYearInvest >= 4000000 && totalYearInvest < 5000000) {
                    totalMove(60, -80, "quarterRemind1");
                } else if (totalYearInvest >= 5000000 && totalYearInvest < 6000000) {
                    totalMove(360, -80, "quarterRemind2");
                } else if (totalYearInvest >= 6000000) {
                    totalMove(680, -80, "quarterRemind3");
                } else {
                    $(".mobileQuarterPack .quarterRemind").addClass("quarterRemindNot").html("截止当前，榜内推荐人的有效好友累投年化总额为<em>0</em>万元，暂未开启新春特奖，大家加油哦！")
                }
                $(".mobileQuarterPack .quarterRemind em,.pcQuarterPack .quarterRemind em,.pcQuarterPack  .quarterRemindNot em").html(totalYearInvest / 10000);
            }else{
                $(".mobileQuarterPack .quarterRemind,.pcQuarterPack  .quarterRemindNot").addClass("hidden")
            }
        });
    }
    //列表头部邀友文字
    function quarterTopText(totalYearInvest,pullNewCount,myFriendYearInvest,rankNum,myEqualFriendYearInvest,chartsText){
        $UserReady(function (is_login, user) {
            if (is_login) {
                //100人改为3人 1百万改为10万
                if (totalYearInvest == 0 || pullNewCount < 3 || myFriendYearInvest < 100000) {
                    chartsText = "<div>1.6-3.30，您有效邀友 <em>"+pullNewCount+"</em> 人，有效好友累投年化<em>"+myFriendYearInvest+"</em>排名<em>"+rankNum+"</em>，当前无奖金可分，要努力哦！";
                } else {
                    price = fixedPriceFun(totalYearInvest,myEqualFriendYearInvest,myFriendYearInvest);
                    chartsText = "<div>1.6-3.30，您有效邀友 <em>"+pullNewCount+"</em> 人，有效好友累投年化<em>"+myFriendYearInvest+"</em>排名<em>"+rankNum+"</em>，当前可分得<em>"+price+"</em>元奖金！";
                }
                $('.pcQuarterPack .quarterExplain,.mobileQuarterPack .quarterExplain').html(chartsText);
            } else {
                var pcChartsText = '<div class="quarterNoLoginText">请登录后，查看您的邀友排名及可获奖金</div> <div class="quarterLogin">立即登录></div>'
                var mobileChartsText = '<div class="quarterNoLoginText">请登录后，<br/>查看您的邀友排名及可获奖金</div> <div class="quarterLogin">立即登录></div>'
                $('.pcQuarterPack .quarterExplain').html(pcChartsText);
                $('.mobileQuarterPack .quarterExplain').html(mobileChartsText);
                $(".quarterLogin").on("click", function () {
                    $FW.gotoSpecialPage("登录", loginUrl);
                });
            }
        });
    }
    //季排行榜
    //API_PATH + '/api/activityPullNew/v2/PullNewTopAndYearInvest.json'
    $.get(API_PATH + 'api/activityPullNew/v2/PullNewTopAndYearInvest.json', {
        dataCount: 30,
        totalBaseAmt: 1000,
        endDate: '2017-3-30',
        startDate: '2017-1-6',
        startTotalCount: 0,
        startTotalInvest: 0
    }, function (data) {
        var price, chartsText;
        var rankNum = data.data.rankNum || '30+';//当前用户排名
        var pullNewCount = data.data.pullNewCount || 0;//有效邀请人数
        var myFriendYearInvest = data.data.myFriendYearInvest || 0;
        var totalYearInvest = data.data.totalYearInvest;
        var  myEqualFriendYearInvest = data.data. myEqualFriendYearInvest;//等额
        var topList = data.data.topList;
        //列表不为空时
        if(topList.length){
            $(".quarterLadder").removeClass('hidden');
            $(".quarterLadderNot").addClass('hidden');
        }
        totalShowText(totalYearInvest);
        quarterTopText(totalYearInvest,pullNewCount,myFriendYearInvest,rankNum,myEqualFriendYearInvest,chartsText)

    }.bind(this), 'json');


    //月排行榜
    function monthChange(arg1, arg2, arg3) {
        $.get(API_PATH + 'api/activityPullNew/v2/PullNewTopAndYearInvest.json', {
            dataCount: 20,
            totalBaseAmt: 1000,
            startDate: arg1,
            endDate: arg2,
            startTotalCount: 2,
            startTotalInvest: 50000
        }, function (data) {
            var titText;
            var rankNum = data.data.rankNum || '20+';//当前用户排名
            var pullNewCount = data.data.pullNewCount || 0;//有效邀请人数
            var myFriendYearInvest = data.data.myFriendYearInvest;
            var totalYearInvest = data.data.totalYearInvest;
            var topList = data.data.topList;
            var prize;
            //请求参数参数startTotalCount 50改2 startTotalInvest 500000改5更改，500000改5,50改2
            (totalYearInvest == 0 || pullNewCount < 2 || myFriendYearInvest < 50000) ? prize = 0 : prize = ((myFriendYearInvest / totalYearInvest) * arg3).toFixed(2);
            if (totalYearInvest == 0 || pullNewCount < 2 || myFriendYearInvest < 50000) {
                titText = '该月内，您有效邀友 <em>' + pullNewCount + '</em> 人，有效好友累投年化 <em>' + myFriendYearInvest + '</em> 元，排名 <em>' + rankNum + '</em>，当前无奖金可分，要努力哦！';
            } else {
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
            if(topList.length){
                $(".ladderContent").removeClass('hidden');
                $(".ladderContentNot").addClass('hidden');
            }
        }.bind(this), 'json');
    }

    var febStart = new Date("2017/2/3").getTime();
    var marStart = new Date("2017/3/3").getTime();
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
    //时间戳
    getServerTimestamp(function (timestamp) {
        var nowTime = timestamp;
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
        var clipboard = new Clipboard('.copyCode');//复制功能
        clipboard.on('success', function (e) {
            alert('复制成功');
        });
        clipboard.on('error', function (e) {
            alert('复制失败');
        });
        //拉新人数
        $.get(API_PATH + "api/activityPullNew/v2/pullNewCount.json", {
            startDate: week_arg_st,
            endDate: week_arg_et,
            totalBaseAmt: 1000,
        }, function(data){
            $UserReady(function (is_login, user) {
                if (is_login) {
                    var dataCount = data.data.pullNewCount || 0;
                    var score = 0, pcWeekText, mobileWeekText, beforeText;
                    if (nowTime < week21) {
                        beforeText = '';
                        $(".weekBefore").addClass("hidden");
                    } else {
                        beforeText = '<div class="beforeWeek" >往周邀友奖励</div>';
                        $(".weekBefore").html("往周邀友奖励");
                    }
                    //上线时更改为正式条件
                    if (dataCount >= 2 && dataCount <= 3) score = dataCount * 10;
                    if (dataCount >= 4 && dataCount <= 5) score = dataCount * 12;
                    if (dataCount >= 6 && dataCount <= 7) score = dataCount * 15;
                    if (dataCount >= 8) score = dataCount * 18;
                    if (dataCount < 5) {
                        pcWeekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，暂未获得工豆奖励，加油哦！' + beforeText;
                        mobileWeekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，暂未获得工豆奖励，加油哦！';
                    } else {
                        pcWeekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，可获工豆 <em>' + score + '</em> 元 ！' + beforeText;
                        mobileWeekText = '本周（' + timeText + '）内，您有效邀友 <em>' + dataCount + '</em> 人，可获工豆 <em>' + score + '</em> 元 ！';
                    }

                    $(".pcWeekPack .weekAward").html(pcWeekText);
                    $(".mobileWeekPack .weekAward").html(mobileWeekText);
                    $(".noticeCode").html(user.userCode);
                    $(".noticeLink").html('http://passport.9888.cn/pp-web2/register/phone.do?gcm=' + user.userCode);
                } else {
                    $(".pcWeekPack .weekAward").html('请登录后，查看您的邀友数及可获工豆， <a>立即登录></a>');
                    $(".pcWeekPack .weekAward").on("click", function () {
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

        //月份切换
        var month_1 = $(".monthStateCommon").eq(0);
        var month_2 = $(".monthStateCommon").eq(1);
        var month_3 = $(".monthStateCommon").eq(2);

        var fn = function (_this, n, pcImg, mobileImg) {
            _this.removeClass('end').addClass('active').siblings().removeClass('active').addClass("end");
            $(".monthGiftNumber").text(n);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "images/" + pcImg);
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "images/" + mobileImg);
        };
        if (nowTime < febStart) {
            month_1.addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $(".monthStateCommon:gt(0)").addClass('not');

            monthChange('2017-1-6', '201-2-2', 120000);
        } else if (nowTime < marStart) {
            month_2.addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            month_1.addClass("end").find(".stateLeft").text("已结束");
            month_3.addClass("not").find(".stateLeft").text("未开始");
            $(".monthGiftNumber").text(15);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "images/twoText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "images/mobileTwo.png");

            monthChange('2017-2-3', '2017-3-2', 150000);
            month_1.click(function () {
                fn($(this), 12, 'oneText.png', 'mobileOne.png')
            });
            month_2.click(function () {
                fn($(this), 15, 'twoText.png', 'mobileTwo.png')
            });
        } else {
            month_3.addClass('active').find(".stateLeft").text("进行中").siblings().removeClass('active');
            $(".monthStateCommon:lt(2)").addClass("end").find(".stateLeft").text("已结束");
            $(".monthGiftNumber").text(18);
            $(".pcMonthPack .monthLadder .ladderText").attr("src", "images/threeText.png");
            $(".mobileMonthPack .monthLadder .ladderText").attr("src", "images/mobileThree.png");

            monthChange('2017-3-3', '2017-3-30', 180000);
            month_1.click(function () {
                fn($(this), 12, 'oneText.png', 'mobileOne.png')
            });
            month_2.click(function () {
                fn($(this), 15, 'twoText.png', 'mobileTwo.png')
            });
            month_3.click(function () {
                fn($(this), 18, 'threeText.png', 'mobileThree.png')
            });
        }
    }.bind(this))

});

//function showWeekLadder() {
//    ReactDOM.render(<WeekLadderPC />, document.getElementById("wl"));
//    //ReactDOM.render(<WeekLadderPC />, document.getElementById("week"));
//}