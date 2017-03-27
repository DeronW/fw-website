/**
 * Created by Administrator on 2017/3/20.
 */
$(function () {
    $(".informationTab .tab").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        var i = $(this).index();
        $(".infoConPart").eq(i).removeClass("hidden").siblings().addClass("hidden")
    });



    var myChartLeft = echarts.init(document.getElementById('main1'));

    optionLeft = {
        title: {
            text: '借款用户',
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#384a62',
                fontSize: 24,
                fontWeight:'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{d}%",
            backgroundColor: 'rgba(55,72,123,0.7)',
            padding: 10
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
                    {value: 345, name: '女士', selected: true},
                    {value: 251, name: '男士'}
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
                    {value: 335, name: '18~25岁'},
                    {value: 310, name: '25~35岁'},
                    {value: 234, name: '35~45岁'},
                    {value: 135, name: '45~60岁'},
                    {value: 1048, name: '60岁以上'}
                ]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartLeft.setOption(optionLeft);

    //第二个饼图
    var myChartRight = echarts.init(document.getElementById('main2'));

    // app.title = '嵌套环形图';

    optionRight = {
        title: {
            text: '出借用户',
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#384a62',
                fontSize: 24,
                fontWeight:'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{d}%",
            backgroundColor: 'rgba(55,72,123,0.7)',
            padding: 10
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
        color: ['#f46694','#6c8ed8','#f1b65c', '#e76f69', '#4cc0be', '#5baef5', '#6bb87a'],
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
                    {value: 345, name: '女士', selected: true},
                    {value: 251, name: '男士'}
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
                    {value: 335, name: '18~25岁'},
                    {value: 310, name: '25~35岁'},
                    {value: 234, name: '35~45岁'},
                    {value: 135, name: '45~60岁'},
                    {value: 1048, name: '60岁以上'}
                ]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartRight.setOption(optionRight);

});