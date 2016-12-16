window.IS_LOGIN = null;
$(function () {
    var in_mobile = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ? true : false;
    var app = navigator.userAgent.match(/FinancialWorkshop/i) ? true : false;
    var isLogin = false;
    var top1, top2;
    var isIeLow = true;
    var loginUrl = "http://www.9888.cn/api/activityPullNew/pullnewParty.do?id=18";
    var datarr = ['10.11-10.17', '10.18-10.24', '10.25-10.31', '11.01-11.07', '11.08-11.14', '11.15-11.21', '11.22-11.28', '11.29-12.05', '12.06-12.12', '12.13-12.19', '12.20-12.26', '12.27-01.05'];

    if (in_mobile) { //各端事件
        clicks = 'touchend'
    } else {
        clicks = 'click'
    }

    if (app)$('.banner-wap').css('margin-top', '0');

    //登录跳转
    $('.pro-login a,.show-when-not-login,.tit-small a,.notTwo-noLog a,.charts-text a').on(clicks, function () {
        $FW.gotoSpecialPage("登录", loginUrl);
    });
    //时间戳
    var orderDate = new Date("2016/10/11 00:00:00");
    var endDate = new Date("2017/1/5 23:59:59");
    var orderTime = orderDate.getTime();
    var endTime = endDate.getTime();
    function timeStamp(time){
        $FW.Ajax({
            url:' /api/userState/v1/timestamp.json',
            method:"get",
            complete: function (data) {
                currentTime = data.data.timestamp;
                reduceValue = time - currentTime;
                console.log(time);
                if(reduceValue > 0){
                    $(".activityNotice").css("display","block");
                }
            }
        });
    }
    timeStamp(orderTime);
    $FW.Ajax({//获取服务器时间
        url: ' /api/userState/v1/timestamp.json',
        method: "get",
        complete: function (data) {
				var nowTime = data.data.timestamp;
				var week11 = new Date("2016/10/11 00:00:00").getTime();
				var week12 = new Date("2016/10/17 23:59:59").getTime();
				var week21 = new Date("2016/10/18 00:00").getTime();
				var week22 = new Date("2016/10/24 23:59:59").getTime();
				var week31 = new Date("2016/10/25 00:00").getTime();
				var week32 = new Date("2016/10/31 23:59:59").getTime();
				var week41 = new Date("2016/11/01 00:00").getTime();
				var week42 = new Date("2016/11/07 23:59:59").getTime();
				var week51 = new Date("2016/11/08 00:00").getTime();
				var week52 = new Date("2016/11/14 23:59:59").getTime();
				var week61 = new Date("2016/11/15 00:00").getTime();
				var week62 = new Date("2016/11/21 23:59:59").getTime();
				var week71 = new Date("2016/11/22 00:00").getTime();
				var week72 = new Date("2016/11/28 23:59:59").getTime();
				var week81 = new Date("2016/11/29 00:00").getTime();
				var week82 = new Date("2016/12/05 23:59:59").getTime();
				var week91 = new Date("2016/12/06 00:00").getTime();
				var week92 = new Date("2016/12/12 23:59:59").getTime();
				var week101 = new Date("2016/12/13 00:00").getTime();
				var week102 = new Date("2016/12/19 23:59:59").getTime();
				var week111 = new Date("2016/12/20 00:00").getTime();
				var week112 = new Date("2016/12/26 23:59:59").getTime();
				var week121 = new Date("2016/12/27 00:00").getTime();
				var week122 = new Date("2016/01/05 23:59:59").getTime();
				var timetxt,wagotxt,week_arg_st,week_arg_et;
				if(in_mobile){
					wagotxt='';$('.w-ago-btn').show();
				}
				else{
					wagotxt='<a class="w-ago"> 往周邀友奖励&gt;</a>';$('.w-ago-btn').hide();
				}

				if (nowTime < week12) {
					timetxt='10.11-10.17';week_arg_st='2016-10-11 00:00:00';week_arg_et='2016-10-17 23:59:59';
					wagotxt='';$(".w-ago-ul-box").find('li:gt(1)').find('.date').siblings().html('未开始');$('.w-ago-btn').hide();
				}
				else if (week21 < nowTime && nowTime < week22) {
					timetxt='10.18-10.24';week_arg_st='2016-10-18 00:00:00';week_arg_et='2016-10-24 23:59:59';$(".w-ago-ul-box").find('li:gt(2)').find('.date').siblings().html('未开始');
				}
				else if (week31 < nowTime && nowTime < week32) {
					timetxt='10.25-10.31';week_arg_st='2016-10-25 00:00:00';week_arg_et='2016-10-31 23:59:59';$(".w-ago-ul-box").find('li:gt(3)').find('.date').siblings().html('未开始');
				}
				else if (week41 < nowTime && nowTime < week42) {
					timetxt='11.1-11.7';week_arg_st='2016-11-01 00:00:00';week_arg_et='2016-11-07 23:59:59';$(".w-ago-ul-box").find('li:gt(4)').find('.date').siblings().html('未开始');
				}
				else if (week51 < nowTime && nowTime < week52) {
					timetxt='11.8-11.14';week_arg_st='2016-11-08 00:00:00';week_arg_et='2016-11-14 23:59:59';$(".w-ago-ul-box").find('li:gt(5)').find('.date').siblings().html('未开始');
				}
				else if (week61 < nowTime && nowTime < week62) {
					timetxt='11.15-11.21';week_arg_st='2016-11-15 00:00:00';week_arg_et='2016-11-21 23:59:59';$(".w-ago-ul-box").find('li:gt(6)').find('.date').siblings().html('未开始');
				}
				else if (week71 < nowTime && nowTime < week72) {
					timetxt='11.22-11.28';week_arg_st='2016-11-22 00:00:00';week_arg_et='2016-11-28 23:59:59';$(".w-ago-ul-box").find('li:gt(7)').find('.date').siblings().html('未开始');
				}
				else if (week81 < nowTime && nowTime < week82) {
					timetxt='11.29-12.5';week_arg_st='2016-11-29 00:00:00';week_arg_et='2016-12-05 23:59:59';$(".w-ago-ul-box").find('li:gt(8)').find('.date').siblings().html('未开始');
				}
				else if (week91 < nowTime && nowTime < week92) {
					timetxt='12.6-12.12';week_arg_st='2016-12-06 00:00:00';week_arg_et='2016-12-12 23:59:59';$(".w-ago-ul-box").find('li:gt(9)').find('.date').siblings().html('未开始');
				}
				else if (week101 < nowTime && nowTime < week102) {
					timetxt='12.13-12.19';week_arg_st='2016-12-13 00:00:00';week_arg_et='2016-12-19 23:59:59';$(".w-ago-ul-box").find('li:gt(10)').find('.date').siblings().html('未开始');
				}
				else if (week111 < nowTime && nowTime < week112) {
					timetxt='12.20-12.26';week_arg_st='2016-12-20 00:00:00';week_arg_et='2016-12-26 23:59:59';$(".w-ago-ul-box").find('li:gt(11)').find('.date').siblings().html('未开始');
				}
				else{
					timetxt='12.27-1.5';week_arg_st='2016-12-27 00:00:00';week_arg_et='2017-01-05 23:59:59';
				}

				$FW.Ajax({//邀请人数
					url: '/api/activityPullNew/v1/pullNewCount.json',
					method: 'post',
					data: {
							startDate: week_arg_st,
							endDate: week_arg_et,
							firstBaseAmt: 5000,
							totalBaseAmt: 5000
					},
					complete: function (data) {//登录后所获工豆
                        $UserReady(function (is_login, user) {
							if (is_login == false) {$('.w-ago-btn').hide();}
							else{
							var data5000 = data.data.pullNewCount||0;
							var score = 0;
							if (data5000 >= 5) score = data5000 * 8;
							if (data5000 >= 10) score = data5000 * 12;
							if (data5000 >= 30) score = data5000 * 16;
							if (data5000 >= 50) score = 1000;
							if (data5000 < 5) {
								text = '本周（'+timetxt+'）内，您有效邀友 <font color="#fff600">' + data5000 + '</font> 人，暂未获得工豆奖励，加油哦！'+wagotxt;
							} else {
								text = '本周（'+timetxt+'）内，您有效邀友 <font color="#fff600">' + data5000 + '</font> 人，可获工豆 <font color="#fff600">' + score + '</font> 元 ！'+wagotxt;
							}
							$('.pro-login').eq(0).html(text);
						//登录后如何邀请
						$('.noticeTwo').find('span').html(user.userCode);
						$('.noticeTwo').find('span')[0].innerHTML = user.userCode;
						$('.noticeTwo').find('#copy-value').html('http://passport.9888.cn/pp-web2/register/phone.do?gcm=' + user.userCode);
					}
					})
				}
				})

				//第一个排行榜时间参数
				var month11 = new Date("2016/10/11 00:00:00").getTime();
				var month12 = new Date("2016/11/07 23:59:59").getTime();
				var month21 = new Date("2016/11/08 00:00:00").getTime();
				var month22 = new Date("2016/12/05 23:59:59").getTime();
				var month31 = new Date("2016/12/06 00:00:00").getTime();
				var month32 = new Date("2016/01/05 23:59:59").getTime();
					 top1_arg_st0 ='2016-10-11 00:00:00';
					 top1_arg_et0 ='2016-11-07 23:59:59';
					 ori_prize0 = 120000;
				if(nowTime < month12){
					$('.flog-tit').html('10月邀友排行榜');$('.flog-box1-text').html('12');
				}
				else if (month21 < nowTime && nowTime < month22) {
					$('.flog-tit').html('11月邀友排行榜');
					$('.flog-box1-text').html('15');
					top1_arg_st0 ='2016-11-08 00:00:00';
					top1_arg_et0 ='2016-12-05 23:59:59';
					ori_prize0 = 150000;
				}
				else if (month31 < nowTime && nowTime < month32) {
					$('.flog-tit').html('12月邀友排行榜');
					$('.flog-box1-text').html('18');
					top1_arg_st0 ='2016-12-06 00:00:00';
					top1_arg_et0 ='2017-01-05 23:59:59';
					ori_prize0 = 180000;
				}
				else{
					$('.flog-tit').html('12月邀友排行榜');
					$('.flog-box1-text').html('18');
					top1_arg_st0 ='2016-12-06 00:00:00';
					top1_arg_et0 ='2017-01-05 23:59:59';
					ori_prize0 = 180000;
				}

                showTop1(top1_arg_st0,top1_arg_et0,ori_prize0);//第一个排行榜显示数据
				showTop2();
		}
    })

	function showTop1(arg1,arg2,arg3){//第一个排行榜显示的方法
			$FW.Ajax({
                url: '/api/activityPullNew/v1/PullNewTopAndYearInvest.json',
                method: "post",
                data: {
                    countBeans1: 0,
                    countMax1: undefined,
                    countMin1: 1,
                    dataCount: 20,
                    startDate: arg1,
                    endDate: arg2,
                    firstBaseAmt: 5000,
                    startTotalCount: 100,
                    startTotalInvest: 500000,
                    totalBaseAmt: 5000
                },
                complete: function (data) {
				    top1 = data.data.topList;
					var titText;
					var rankNum = data.data.rankNum || '20+';//当前用户排名
                    var pullNewCount = data.data.pullNewCount || 0;//有效邀请人数
                    var myFriendYearInvest = data.data.myFriendYearInvest;
                    var totalYearInvest = data.data.totalYearInvest;
                    var prize;
                    (totalYearInvest == 0||pullNewCount<100||myFriendYearInvest<500000) ? prize = 0 : prize = ((myFriendYearInvest / totalYearInvest) * arg3).toFixed(2);
                    if(totalYearInvest == 0||pullNewCount<100||myFriendYearInvest<500000){titText='该月内，您有效邀友 <font color="ff5050">' + pullNewCount + '</font> 人，好友累计年化投资 <font color="ff5050">' + myFriendYearInvest + '</font> 元，排名 <font color="ff5050">' + rankNum + '</font>，当前无奖金可分，要努力哦！';}
					else{titText='该月内，您有效邀友 <font color="ff5050">' + pullNewCount + '</font> 人，好友累计年化投资 <font color="ff5050">' + myFriendYearInvest + '</font> 元，排名 <font color="ff5050">' + rankNum + '</font>，当前可分得 <font color="ff5050">' + prize + ' </font>元奖金！';}
					if (data.data.topList.length==0) {
                        $('.flog-box2-ul-box').hide();
                        $('.flog-box2-no-data').show();
                        if (in_mobile) {
                            $('.flog-box2').css('background', 'url(../images/prize-list-wap1.png) no-repeat 0 0').find('.pop-page').hide();
                        }
                        else {
                             $('.flog-box2').find('.pop-page').hide();
                        };
                        $UserReady(function (is_login, data) {
                            if (is_login) $('.tit-small').html('<div>该月内，您有效邀友 <font color="ff5050">0</font> 人，好友累计年化投资 <font color="ff5050">0</font> 元，排名 <font color="ff5050">20+</font>，当前无奖金可分，要努力哦！</div>');
                        })
                    }
                    else {
						$('.flog-box2-ul-box').show();
                        $('.flog-box2-no-data').hide();
                        for (var i = 0; i < data.data.topList.length; i++) {
                            $('.flog-box2-ul').find('li').eq(i).find('.name').html(data.data.topList[i].loginName);
                            $('.flog-box2-ul').find('li').eq(i).find('.num').html(data.data.topList[i].totalall);
                            $('.flog-box2-ul').find('li').eq(i).find('.amount').html(data.data.topList[i].total);
                            $('.flog-box2-ul').find('li').eq(i).find('.prize').html((totalYearInvest == 0||data.data.topList[i].totalall<100||data.data.topList[i].total<500000) ? '暂无奖金' : ((data.data.topList[i].total) / (data.data.totalYearInvest) * arg3).toFixed(2));
                        if(i>20)break;
							$('.flog-box2-ul').find('li:lt(6)').show();
                            $('.flog-box2-ul').find('li:gt('+(data.data.topList.length-1)+')').hide();
                        };

                        $UserReady(function (is_login, data) {
                            if (is_login) $('.tit-small').html(titText);
                        })

                        if(data.data.topList.length>6){
							//翻页月榜   $(".flog-box2").find('.pop-page').data("page", "1");
                            $(".flog-box2").find('.up-page').on(clicks, function () {
								if($(".flog-box2").find('.pop-page').attr("data-page")==1) return;
								if($(".flog-box2").find('.pop-page').attr("data-page")==2){
									$(this).addClass('active');
								}
								top1_page= parseInt($(".flog-box2").find('.pop-page').attr("data-page"))-1;
								$(".flog-box2").find('.pop-page').attr("data-page",top1_page);
								$(".flog-box2").find('.down-page').removeClass('active');
								$('.flog-box2-ul').find('li').hide().slice((top1_page-1)*6,top1_page*6).show();
                                return false;
                            });

                            $(".flog-box2").find('.down-page').on(clicks, function () {
								if($(".flog-box2").find('.pop-page').attr("data-page")==4) return;
								if($(".flog-box2").find('.pop-page').attr("data-page")==3){
									$(this).addClass('active')
								}
							    top1_page= parseInt($(".flog-box2").find('.pop-page').attr("data-page"))+1;
								$(".flog-box2").find('.pop-page').attr("data-page",top1_page);
								$(".flog-box2").find('.up-page').removeClass('active');
								$('.flog-box2-ul').find('li').hide().slice((top1_page-1)*6,top1_page*6).show();
								return false;
                            });
							 $('.flog-box2').find('.pop-page').show();
                        }
                        else{
                             $('.flog-box2').find('.pop-page').hide();
                        }
                    }
                }
            })
	}

    function showTop2(){//第二个排行榜显示数据的方法
    $FW.Ajax({
        url: '/api/activityPullNew/v1/PullNewTopAndYearInvest.json',
        method: "post",
        data: {
            countBeans1: 0,
            countMax1: undefined,
            countMin1: 1,
            dataCount: 30,
            startDate: '2016-10-11 00:00:00',
            endDate: '2017-01-05 23:59:59',
            firstBaseAmt: 5000,
            startTotalCount: 100,
            startTotalInvest: 500000,
            totalBaseAmt: 5000
        },
        complete: function (data) {
            top2 = data.data.topList;
            var rankNum = data.data.rankNum|| '30+';//当前用户排名
            var pullNewCount = data.data.pullNewCount || 0;//有效邀请人数
            var myFriendYearInvest = data.data.myFriendYearInvest|| 0;
            var totalYearInvest = data.data.totalYearInvest;
            var prize;
            (totalYearInvest == 0|| pullNewCount<100||myFriendYearInvest<500000) ? prize = 0 : prize = ((myFriendYearInvest / totalYearInvest) * 300000).toFixed(2);
			if(totalYearInvest == 0|| pullNewCount<100||myFriendYearInvest<500000){chartsText = '<div>10.11-1.5，您有效邀友 <font color="ff5050">' + pullNewCount + '</font> 人，好友累计年化投资 <font color="ff5050">' + myFriendYearInvest + '</font> 元，排名 <font color="ff5050">' + rankNum + '</font>，当前无奖金可分，要努力哦！</div>';}
			else{chartsText = '<div>10.11-1.5，您有效邀友 <font color="ff5050">' + pullNewCount + '</font> 人，好友累计年化投资 <font color="ff5050">' + myFriendYearInvest + '</font> 元，排名 <font color="ff5050">' + rankNum + '</font>，当前可分得 <font color="ff5050">' + prize + ' </font>元奖金！</div>';}
			  if (data.data.topList.length!==0) {
                 for (var i = 0; i < data.data.topList.length; i++) {
                    $('.prize-list').find('.prize-li').eq(i).find('.user-name').html(data.data.topList[i].loginName);
                    $('.prize-list').find('.prize-li').eq(i).find('.invi-fri').html(data.data.topList[i].totalall);
                    $('.prize-list').find('.prize-li').eq(i).find('.inv-amo').html(data.data.topList[i].total);
                    $('.prize-list').find('.prize-li').eq(i).find('.reward').html((totalYearInvest == 0||data.data.topList[i].totalall<100||data.data.topList[i].total<500000) ? '暂无奖金' : ((data.data.topList[i].total) / (data.data.totalYearInvest) * 300000).toFixed(2));
                    if(i>30)break;
                     $('.prize-list').find('.prize-li:gt('+(data.data.topList.length-1)+')').hide();
                }
                if(data.data.topList.length>8){//翻页2
                    $(".prize-list-box").find('.up-page').on(clicks, function () {
						if($(".prize-list-box").find('.pop-page').attr("data-page")==1) return;
						if($(".prize-list-box").find('.pop-page').attr("data-page")==2){
							$(this).addClass('active')
						}
						top2_page= parseInt($(".prize-list-box").find('.pop-page').attr("data-page"))-1;
						$(".prize-list-box").find('.pop-page').attr("data-page",top2_page);
						console.log('up:top2_page:'+top2_page);
						$(".prize-list-box").find('.down-page').removeClass('active');
						$('.prize-list').find('.prize-li').hide().slice((top2_page-1)*8,top2_page*8).show();
						return false;
                    });

                    $(".prize-list-box").find('.down-page').on(clicks, function () {
						if($(".prize-list-box").find('.pop-page').attr("data-page")==4) return;
						if($(".prize-list-box").find('.pop-page').attr("data-page")==3){
							$(this).addClass('active')
						}
						top2_page= parseInt($(".prize-list-box").find('.pop-page').attr("data-page"))+1;
						$(".prize-list-box").find('.pop-page').attr("data-page",top2_page);
						console.log('down:top2_page:'+top2_page);
						$(".prize-list-box").find('.up-page').removeClass('active');
						$('.prize-list').find('.prize-li').hide().slice((top2_page-1)*8,top2_page*8).show();
						return false;
                    });
                }
                else{
                    $('.prize-list-box').find('.pop-page').hide()
                }
             }
            else {
                if(!in_mobile){
                    $('.prize-list-box').css('background', 'url(../images/prize-list-box1.png) no-repeat').find('.prize-list').hide().parent().find('.pop-page').hide();
                }
				else{$('.prize-list').hide();$('.prize-list-box').find('.pop-page').hide()}
				$('.prize-list-no-data').show();
            }
            $UserReady(function (is_login, user) {
                if (is_login == false) return;
                $('.charts-text').html(chartsText);
            })
        }
    })
	}

    $(document).on(clicks, ".over,.have_in_hand", function() {//点击活动周期切换月榜数据
        if($(this).attr('data-state')==1){
            top1_arg_st ='2016-10-11 00:00:00';
            top1_arg_et ='2016-11-07 23:59:59';
            $('.flog-box1-text').html(12);$('.flog-tit').html('10月邀友排行榜');
			ori_prize = 120000;
        }
        else if($(this).attr('data-state')==2){
            top1_arg_st ='2016-11-08 00:00:00';
            top1_arg_et ='2016-12-05 23:59:59';
            $('.flog-box1-text').html(15);$('.flog-tit').html('11月邀友排行榜');
			ori_prize = 150000;
        }
        else if($(this).attr('data-state')==3){
            top1_arg_st ='2016-12-06 00:00:00';
            top1_arg_et ='2017-01-05 23:59:59';
            $('.flog-box1-text').html(18);$('.flog-tit').html('12月邀友排行榜');
			ori_prize = 180000;
        }
        $(".flog-box2").find('.pop-page').attr('data-page',1);
        $(".flog-box2").find('up-page').addClass('active');
        $('.flog-box2-ul').find('li:gt(6)').hide();
        $('.flog-box2-ul').find('li:lt(6)').show();
        $(".flog-box2").find('.down-page').off(clicks);$(".flog-box2").find('.up-page').off(clicks);
        showTop1(top1_arg_st,top1_arg_et,ori_prize);
     })

    //邀友弹窗排行榜点击
    $(document).on(clicks, ".w-ago-btn,.w-ago", function(){
        $('.bgNotice,.notice').show();
        $(".notice em").on(clicks, function () {
            $(".bgNotice").hide();
            $(".notice").hide();
        });
    });

	//邀友弹窗排行榜数据显示
    $FW.Ajax({
        url: '/api/activityPullNew/v1/PullNewCountByTimeline.json',
        method: "post",
        data: {
            timeline: '2016-10-11,2016-10-17 23:59:59;2016-10-18,2016-10-24 23:59:59;2016-10-25,2016-10-31 23:59:59;2016-11-01,2016-11-07 23:59:59;2016-11-08,2016-11-14 23:59:59;2016-11-15,2016-11-21 23:59:59;2016-11-22,2016-11-28 23:59:59;2016-11-29,2016-12-05 23:59:59;2016-12-06,2016-12-12 23:59:59;2016-12-13,2016-12-19 23:59:59;2016-12-20,2016-12-26 23:59:59;2016-12-27,2017-01-05 23:59:59',
            firstBaseAmt: 5000,
            totalBaseAmt: 5000
        },
        complete: function (data) {
            if (data.code == 10000) {
                var countList = data.data.countList;
                   if (data.data.countList&&data.data.countList.length !== 0) {
                       for (var i = 0; i < data.data.countList.length; i++) {
                           $('.w-ago-ul-box').find('li:gt(0)').eq(i).find('.date').html(datarr[i]);
                           if($('.w-ago-ul-box').find('li:gt(0)').eq(i).find('.invi-fri').html()!=='未开始'){$('.w-ago-ul-box').find('li:gt(0)').eq(i).find('.invi-fri').html(data.data.countList[i]);}
						   var score = 0;
                           if (countList[i] >= 5)  score = countList[i] * 8;
                           if (countList[i] >= 10) score = countList[i] * 12;
                           if (countList[i] >= 30) score = countList[i] * 16;
                           if (countList[i] >= 50) score = 1000;
                           if($('.w-ago-ul-box').find('li:gt(0)').eq(i).find('.bean').html()!=='未开始'){$('.w-ago-ul-box').find('li:gt(0)').eq(i).find('.bean').html(score);}
						   if(i>12)break;
                           $('.w-ago-ul-box').find('li:gt('+(data.data.countList.length-1)+')').hide();
                        }
                        if (data.data.countList.length > 6) {
                            //翻页3
                            $(".w-ago-ul-box").find('.up-page').on(clicks, function () {
                                if (!$(this).hasClass('active')) {
                                    $(this).addClass('active');$(".w-ago-ul-box").find('.down-page').removeClass('active');
                                    $('.w-ago-ul-box').find('li:lt(7)').show();
                                    $('.w-ago-ul-box').find('li:gt(6)').hide()
                                }
                                return false;
                            });

                            $(".w-ago-ul-box").find('.down-page').on(clicks, function () {
                                if (!$(this).hasClass('active')) {
                                    $(this).addClass('active');$(".w-ago-ul-box").find('.up-page').removeClass('active');
                                    $('.w-ago-ul-box').find('li:lt(7):not(:first)').hide();
                                    $('.w-ago-ul-box').find('li:gt(6)').show()
                                }
                                return false;
                            });
                        }
                       else{
                            $('.w-ago-ul-box').find('.pop-page').hide();
                        }
                    }
                    else{
                        $('.w-ago-ul-box').hide();
                        $('.w-ago-no-data').show()
                    }
            }
            else {

            }
        }
    })

     $FW.Ajax({ //活动状态
        url: ' /api/userState/v1/timestamp.json',
        method: "get",
        complete: function (data) {
            var nowTime = data.data.timestamp;
            var state1 = new Date("2016/10/11 00:00:00").getTime();
            var state2 = new Date("2016/11/07 23:59:00").getTime();
            var state3 = new Date("2016/11/08 00:00:00").getTime();
            var state4 = new Date("2016/12/05 23:59:59").getTime();
            var state5 = new Date("2016/12/06 00:00:00").getTime();
            var state6 = new Date("2017/01/05 23:59:59").getTime();
			if (nowTime < state1) {
                $('.ac_state').addClass('not_start');
            }
            else if (state1 < nowTime && nowTime < state2) {
                $('.ac_state').eq(0).addClass('have_in_hand').find('.text-state').html('进行中');$('.ac_state').eq(1).addClass('not_start');$('.ac_state').eq(2).addClass('not_start');
            }
            else if (state3 < nowTime && nowTime < state4) {
                $('.ac_state').eq(0).addClass('over').find('.text-state').html('已结束');$('.ac_state').eq(1).addClass('have_in_hand').find('.text-state').html('进行中'); $('.ac_state').eq(2).addClass('not_start');
            }
            else if (state5 < nowTime && nowTime < state6) {
                $('.ac_state').eq(0).addClass('over').find('.text-state').html('已结束');$('.ac_state').eq(1).addClass('over').find('.text-state').html('已结束');$('.ac_state').eq(2).addClass('have_in_hand').find('.text-state').html('进行中');
            }
            else {
                $('.ac_state').eq(0).addClass('over').find('.text-state').html('已结束');$('.ac_state').eq(1).addClass('over').find('.text-state').html('已结束');$('.ac_state').eq(2).addClass('over').find('.text-state').html('已结束');
            }
        }
    });

    $(".closeUpStra").on(clicks, function () {//底部导航条关闭
        $(".pc-foot").hide();
    });

     $(".exp").on(clicks, function () {//移动端活动说明
         $(".notice-wap").show();
         $(".notice-wap-con span").on(clicks, function () {
             $(".notice-wap").hide();return false;
         });return false;
    });

    $('.noticeTwo a,.notTwo-noLog span').on(clicks, function () {
       if(in_mobile){ window.location.href='http://mp.weixin.qq.com/s?__biz=MjM5MjQwMjcyNA==&mid=507798032&idx=1&sn=6593ce9f7358486685b84006fa3c2fff&scene=0#wechat_redirect' }
        else{ window.location.href='http://www.9888.cn/news/notice/1861.html'  }
    });

    var clipboard = new Clipboard('#copy-link-btn');//复制功能
    clipboard.on('success', function(e) {
        alert('复制成功');
    });
    clipboard.on('error', function(e) {
        alert('复制失败');
    });
})

	function howInvite() {//如何邀请弹窗
		$UserReady(function (is_login, user) {
		if (is_login) {
			$(".bgNotice").show();
			$(".noticeTwo").show();
			$(".bgNotice em").on(clicks, function () {
				$(".bgNotice").hide();$(".noticeTwo").hide();
			});
		}
		else {
			$(".bgNotice").show();
			$(".notTwo-noLog").show();
			$(".bgNotice em").on(clicks, function () {
				$(".bgNotice").hide();$(".notTwo-noLog").hide();
			});
		}
	  });
	}
