/**
 * Created by sjk on 2017/3/20.
 */

$(function () {
    $(".informationTab .tab").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        var i = $(this).index();
        $(".infoConPart").eq(i).removeClass("hidden").siblings().addClass("hidden")
    });
    //判断金额 n:四舍五入保留几位小数，默认为2位
    function judgeCash(value, n) {
        n = n > 0 && n <= 20 ? n : 2;
        value = Number(value.toString().substr(0,11));
        var len = value.toString().split(".")[0].length;
        var v = "";
        if (len > 8) {
            v = (value / 100000000).toFixed(n) + "亿";
        } else if (len > 3) {
            v = (value / 10000).toFixed(n) + "万";
        } else {
            return value
        }
        return v
    }

    //格式化人数
    function formatPerson(s) {
        s = parseFloat((s + "").replace(/[^\d.-]/g, "")) + "";
        var l = s.split(".")[0].split("").reverse(),
            t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + '人';
    }


    //计算累计
    function computeTotal(){
        var borrow = document.querySelectorAll(".staCommon");
        for (var i = 0; i < borrow.length; i++) {
            borrow[i].querySelector('.number span').innerText = arguments[i];
        }
    }

    //防止除不尽
    function prevent(number){
        return Number(number.toString().substr(0,9)).toFixed(2)
    }


    function firstPie() {
        var myChartLeft = echarts.init(document.getElementById('main1'));
        optionLeft = {
            title: {
                text: '借款用户',
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#384a62',
                    fontSize: 24,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{d}%",
                backgroundColor: 'rgba(55,72,123,0.7)',
                padding: [5, 20, 5, 20]
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: '80',
                itemWidth: 18,
                itemHeight: 18,
                itemGap: 10,
                data: [
                    {
                        name: '18~25岁',
                        icon: 'image://https://static.9888.cn/images/web/circle1.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '25~35岁',
                        icon: 'image://https://static.9888.cn/images/web/circle2.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '35~45岁',
                        icon: 'image://https://static.9888.cn/images/web/circle3.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '45~60岁',
                        icon: 'image://https://static.9888.cn/images/web/circle4.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '60岁以上',
                        icon: 'image://https://static.9888.cn/images/web/circle5.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '男士',
                        icon: 'image://https://static.9888.cn/images/web/circleMale.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '女士',
                        icon: 'image://https://static.9888.cn/images/web/circleFemale.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    }
                ]
            },
            color: ['#f66493', '#5bccff', '#ffa100', '#4fd9e2', '#677ecc', '#ff837f', '#a194cf'],
            textStyle: {
                color: '#fff',
                fontSize: 18
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '40%'],
                    selectedOffset: 4,
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    data: [
                        {value: arguments[0], name: '女士', selected: true},
                        {value: arguments[1], name: '男士'}
                    ]
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['50%', '65%'],
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: arguments[2], name: '18~25岁'},
                        {value: arguments[3], name: '25~35岁'},
                        {value: arguments[4], name: '35~45岁'},
                        {value: arguments[5], name: '45~60岁'},
                        {value: arguments[6], name: '60岁以上'}
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChartLeft.setOption(optionLeft);
    }


    //第二个饼图
    function secondPie() {
        var myChartRight = echarts.init(document.getElementById('main2'));

        optionRight = {
            title: {
                text: '出借用户',
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#384a62',
                    fontSize: 24,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{d}%",
                backgroundColor: 'rgba(55,72,123,0.7)',
                padding: [5, 20, 5, 20]
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: '80',
                itemWidth: 18,
                itemHeight: 18,
                itemGap: 10,
                data: [
                    {
                        name: '18~25岁',
                        icon: 'image://https://static.9888.cn/images/web/circleRight1.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '25~35岁',
                        icon: 'image://https://static.9888.cn/images/web/circleRight2.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '35~45岁',
                        icon: 'image://https://static.9888.cn/images/web/circleRight3.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '45~60岁',
                        icon: 'image://https://static.9888.cn/images/web/circleRight4.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '60岁以上',
                        icon: 'image://https://static.9888.cn/images/web/circleRight5.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '男士',
                        icon: 'image://https://static.9888.cn/images/web/circleRight6.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    },
                    {
                        name: '女士',
                        icon: 'image://https://static.9888.cn/images/web/circleRight7.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 14
                        }
                    }
                ]
            },
            color: ['#f46694', '#6c8ed8', '#f1b65c', '#e76f69', '#4cc0be', '#5baef5', '#6bb87a'],
            textStyle: {
                color: '#fff',
                fontSize: 18
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '40%'],
                    selectedOffset: 4,
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    data: [
                        {value: arguments[0], name: '女士', selected: true},
                        {value: arguments[1], name: '男士'}
                    ]
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['50%', '65%'],

                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: arguments[2], name: '18~25岁'},
                        {value: arguments[3], name: '25~35岁'},
                        {value: arguments[4], name: '35~45岁'},
                        {value: arguments[5], name: '45~60岁'},
                        {value: arguments[6], name: '60岁以上'}
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChartRight.setOption(optionRight);
    }
    //args顺序：女，男，18,25,35,45,60以上
    $.get(API_PATH+"/dataTopics/data.shtml").then((data)=>{
        //截止前一天日期
        $(".partStatisticsText span").text(data.data.date);
        //计算总额
        computeTotal(judgeCash(data.data.total_invest),judgeCash(data.data.total_interest),judgeCash(data.data.total_principal),judgeCash(data.data.total_orderCount));
        //借款用户
        firstPie(data.data.borr_female,data.data.borr_male,data.data.borr_age_level_1,data.data.borr_age_level_2,data.data.borr_age_level_3,data.data.borr_age_level_4,data.data.borr_age_level_5);
        //借款人数
        $(".pieLeftText .person span").text(formatPerson(data.data.total_borrUserCount));
        //借款累计金额
        $(".pieLeftText .cash span").text(judgeCash(data.data.total_invest / data.data.total_borrUserCount));
        //出借用户
        secondPie(data.data.female,data.data.male,data.data.age_level_1,data.data.age_level_2,data.data.age_level_3,data.data.age_level_4,data.data.age_level_5);
        //出借人数
        $(".pieRightText .person span").text(formatPerson(data.data.total_userCount));
        //出借累计金额
        $(".pieRightText .cash span").text(judgeCash(data.data.total_invest / data.data.total_userCount));
        //待偿金额
        var endCon = $(".enduranceContent .endCommon");
        var len = endCon.length;
        for(var i =0 ;i < len;i++){
            endCon.eq(0).find(".money span").text(judgeCash(data.data.total_principalInvest,2));
            endCon.eq(1).find(".money span").text(judgeCash(data.data.total_overdueSum,2));
            endCon.eq(2).find(".money span").text(prevent(data.data.total_overdueSum / data.data.total_invest * 100));
            endCon.eq(3).find(".money span").text(prevent(data.data.total_overdueCount / data.data.total_orderCount * 100));
            endCon.eq(4).find(".money span").text(judgeCash(data.data.total_lendSum,2))
    }
    });
});
