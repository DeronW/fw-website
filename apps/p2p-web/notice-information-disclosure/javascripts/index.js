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
    var judgeCash = function(value,n) {
        n = n >= 0 && n <= 20 ? n : 2;
        var len = value && value.toString().split(".")[0].length;
        value = Number(value && value.toString().substr(0, 11));

        var v = "";
        if (len > 8) {
            v = (value / 100000000).toFixed(n) + "亿";
        } else if (len > 3) {
            v = (value / 10000).toFixed(n) + "万";
        } else {
            return value.toFixed(n)
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
    function computeTotal() {
        var borrow = document.querySelectorAll(".staCommon");
        for (var i = 0; i < borrow.length; i++) {
            borrow[i].querySelector('.number span').innerText = arguments[i];
        }
    }
    //借款相关
    function borrow() {
        var person = document.querySelectorAll(".pieLeftText .person");
        for (var i = 0; i < person.length; i++) {
            person[i].querySelector('span').innerText = arguments[i];
        }
    }
    //出借相关
    function lend() {
        var lend = document.querySelectorAll(".pieRightText .person");
        for (var i = 0; i < lend.length; i++) {
            lend[i].querySelector('span').innerText = arguments[i];
        }
    }
    //平台承受能力
    function ability(){
        var n = 2
        var endCon = document.querySelectorAll(".enduranceContent .endCommon");
        for(var i = 0;i<endCon.length;i++){
            if(i == 3 || i == 5 || i == 8){
                n = 0
            } else{
                n = 2
            }
            endCon[i].querySelector(".money span").innerText = judgeCash(arguments[i],n);
        }
    }
    //防止除不尽
    function prevent(number) {
        return Number(number.toString().substr(0, 9)).toFixed(2)
    }


    function firstPie() {
        var myChartLeft = echarts.init(document.getElementById('main1'));
        optionLeft = {
            title: {
                text: '借款用户',
                subtext: '',
                x: 'left',
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
                        { value: arguments[0], name: '女士', selected: true },
                        { value: arguments[1], name: '男士' }
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
                        { value: arguments[2], name: '18~25岁' },
                        { value: arguments[3], name: '25~35岁' },
                        { value: arguments[4], name: '35~45岁' },
                        { value: arguments[5], name: '45~60岁' },
                        { value: arguments[6], name: '60岁以上' }
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
                x: 'left',
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
                        { value: arguments[0], name: '女士', selected: true },
                        { value: arguments[1], name: '男士' }
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
                        { value: arguments[2], name: '18~25岁' },
                        { value: arguments[3], name: '25~35岁' },
                        { value: arguments[4], name: '35~45岁' },
                        { value: arguments[5], name: '45~60岁' },
                        { value: arguments[6], name: '60岁以上' }
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChartRight.setOption(optionRight);
    }
    //args顺序：女，男，18,25,35,45,60以上
    $.get(API_PATH + "/dataTopics/data.shtml", {}, function (data) {
        var d = data.data
        //截止前一天日期
        $(".partStatisticsText span").text(d.date);
        //计算总额
        computeTotal(judgeCash(d.total_invest), judgeCash(d.total_orderCount,0), judgeCash(d.total_principal), judgeCash(d.total_principalInvest), judgeCash(d.total_principalCount,0));
        //借款用户
        firstPie(d.borr_female, d.borr_male, d.borr_age_level_1, d.borr_age_level_2, d.borr_age_level_3, d.borr_age_level_4, d.borr_age_level_5);

        //借款相关
        borrow(formatPerson(d.total_borrUserCount),(d.total_borrUserCount / d.total_invest * 100).toFixed(2)+"%",(d.total_topOnePriInvest / d.total_invest * 100).toFixed(2)+"%",(d.total_topTenPriInvest / d.total_invest * 100).toFixed(2),d.total_relInvest,d.total_relCount)

        //出借用户
        secondPie(d.female, d.male, d.age_level_1, d.age_level_2, d.age_level_3, d.age_level_4, d.age_level_5);
        //出借相关
        lend(formatPerson(d.total_userCount),(d.total_userCount / d.total_invest * 100).toFixed(2),(d.total_topOneBorrInvest / d.total_invest * 100).toFixed(2)+"%",(d.total_topTenBorrInvest / d.total_invest * 100).toFixed(2)+"%")
        //承受能力
        ability(d.total_repInterest,d.total_ninetyOverdueSum,d.total_compenAmount,d.overdue_ninetySumRate,d.total_compenCount,d.overdue_oneEightySumRate,d.total_lendSum,d.overdue_oneEightyOneSumRate,d.total_overdueSum,d.total_ninetyOverdueCount,d.total_overdueCount,d.overdue_ninetyRate,d.total_lendSum / d.total_invest * 100,d.overdue_oneEightyRate,d.total_overdueCount / d.total_orderCount * 100,d.overdue_oneEightyOneRate)

    }, 'json')
});
