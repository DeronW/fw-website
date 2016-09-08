$(function () {
    var Provinces = [
        '北京',
        '天津',
        '山西',
        '内蒙',
        '辽宁',
        '吉林',
        '黑龙江',
        '上海',
        '江苏',
        '浙江',
        '安徽',
        '福建',
        '江西',
        '山东',
        '河南',
        '湖北',
        '湖南',
        '广东',
        '广西',
        '重庆',
        '四川',
        '贵州',
        '云南',
        '西藏',
        '陕西',
        '甘肃',
        '青海',
        '宁夏',
        '新疆',
        '海南',
        '台湾',
        '香港',
        '澳门'
    ];
    window.Chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart',
            type: 'column',
            backgroundColor: 'transparent'
        },
        title: {text: null},
        xAxis: {
            categories: Provinces,
        },
        yAxis: {
            min: 0,
            title: {
                text: '投资额 (万元)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} 万</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '总投资',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1]
        }]
    });
    window.Chart.receiveInterestMsg = function (msg) {
        console.log('msg', msg);
        if (window._deny_redraw_flag) return;

        var series = Chart.series[0];
        var data = series.yData.slice();

        for (var i in msg) {
            for (var j = 0; j < Provinces.length; j++) {
                if (i == Provinces[j]) {
                    data[j] = parseInt(msg[i]);
                    break;
                }
            }
        }

        series.setData(data);

        window._deny_redraw_flag = true;
        window._chart_timer = setTimeout(function () {
            window._deny_redraw_flag = false;
        }, 5000);
    }
});

$(function () {
    // initial AMap
    var mainMap = new AMap.Map('map', {
        resizeEnable: true,
        zoom: 11,
        center: [116.397428, 39.90923]
    });

    mainMap.setMapStyle('blue_night');

    // AMap.plugin(['AMap.OverView'], function () {
    //     mainMap.addControl(new AMap.OverView({isOpen: true}));
    // });

    function createMarker(map, lng, lat) {
        return new AMap.Marker({
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [lng, lat],
            map: map
        });
    }

    //在指定位置打开信息窗体
    function openInfoWindow(map, username, money) {
        //构建信息窗体中显示的内容
        var html = [];
        html.push('<div style="padding-left: 12px; padding-bottom: 12px;">');
        html.push('<h3>' + username + '</h3>');
        html.push('<div>' + money + '</div>');
        html.push('</div>');
        infoWindow = new AMap.InfoWindow({
            content: html.join('')  //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.open(map, map.getCenter());
    }

    window.markInvestOnMap = function (lng, lat, username, money) {
        mainMap.setZoomAndCenter(12, [lng, lat]);
        openInfoWindow(mainMap, username, money);
    };
});

$(function () {
    var socket = new WebSocket('ws://10.10.100.104:8080/webSocketServer');

    socket.onopen = function (evt) {
        console.log('open', evt)
    };
    socket.onclose = function (evt) {
        console.log('close', evt)
    };
    socket.onmessage = function (event) {
        if (event.type == 'message') msgHandler(JSON.parse(event.data))
    };
    socket.onerror = function (evt) {
        console.log('error', evt)
    };

    window.msgHandler = function (packet) {

        if (packet.type == 1) {
            // 模拟投资
            // http://10.10.100.104:8080/logtest/invest?ip=111.202.74.131&name=XXXX
            var phone = packet.data.phone;
            if (!phone) phone = packet.data.name[0] + '**';

            window._Ladder.receiveInterestMsg({
                phone: phone,
                timestamp: +new Date(),
                money: parseInt(packet.data.money),
                province: packet.data.province
            });

            window.markInvestOnMap(
                packet.data.latitude,
                packet.data.longitude,
                packet.data.name,
                packet.data.money
            );

        } else if (packet.type == 2) {
            window._Header.receiveInterestMsg({
                today: packet.data.today,
                total: packet.data.total
            });
            window.Chart.receiveInterestMsg(packet.data.province);
        } else {
            var msg = {
                username: data.name,
                money: data.money,
                avatar: '',
                project_name: '[投标]',
                sex: 'male',
                province: data.province,
                city: data.city,
                phone: data.phone,
                timestamp: +new Date()
            };

            window._Ladder.receiveInterestMsg(msg);
            window._Header.receiveInterestMsg(msg);
        }


        // var msg_type = msg.type, data = msg.data;
        // window.InvestingPanel.receiveMessage(msg);
        //
        // // 有投资进来了
        // if (msg_type == 1) {
        //     console.log('message', msg);
        //
        //     window.TopInvestmentPanel.receiveInvestMessage({
        //         username: data.name,
        //         money: data.money,
        //         avatar: '',
        //         project_name: '[投标]',
        //         sex: 'male',
        //         province: data.province,
        //         city: data.city
        //     });
        //
        //     window.markInvestOnMap(data.longitude, data.latitude);
        // }
    }
});