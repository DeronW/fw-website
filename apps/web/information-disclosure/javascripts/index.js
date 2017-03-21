/**
 * Created by Administrator on 2017/3/20.
 */
$(function(){
    var myChart = echarts.init(document.getElementById('main1'));

    // app.title = '嵌套环形图';

    option = {
        title : {
            text: '塑料袋看风景时看来大家分开了时间',
            subtext: '',
            x:'center',
            textStyle:{

            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            // data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        textStyle:{
            color:'#f00',
            fontStyle:'italic'
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                legendHoverLink : true,
                hoverAnimation : true,
                data:[
                    {value:335, name:'直接访问',labelLine:{
                        normal:{
                            show:false
                        }
                    }},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    //第二个饼图
    var myChart1 = echarts.init(document.getElementById('main2'));


    option1 = {
        title : {
            text: '塑料袋看风景时看来大家分开了时间',
            subtext: '',
            x:'center',
            textStyle:{

            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{c} : ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            // data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        textStyle:{
            color:'#f00',
            fontStyle:'normal'
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                legendHoverLink : true,
                hoverAnimation : true,
                data:[
                    {value:335, name:'直接访问',labelLine:{
                        normal:{
                            show:false
                        }
                    }},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
});