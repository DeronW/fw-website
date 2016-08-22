$(function () {
    //window.Chart = $('#chart').highcharts({
    window.Chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart',
            type: 'column'
        },
        title: { text: '金融工场投资一览表(省份)'},
        xAxis: {
            categories: [
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
                '港澳台'
            ]
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
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
            name: '投资',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 21, 22, 23, 24, 25, 26, 27, 28, 29, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        }, {
            name: '回款',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3, 21, 22, 23, 24, 25, 26, 27, 28, 29, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        }, {
            name: '投资人数',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2, 21, 22, 23, 24, 25, 26, 27, 28, 29, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        }]
    });
});

$(function () {
    // initial AMap
    var mainMap = new AMap.Map('mapContainer', {
        resizeEnable: true,
        zoom: 11,
        center: [116.397428, 39.90923]
    });

    var hotMap = new AMap.Map('mapBL', {
        resizeEnable: true,
        zoom: 2,
        center: [107, 37]
    });

    AMap.plugin(['AMap.OverView'], function () {
        mainMap.addControl(new AMap.OverView({isOpen: true}));
    });

    function createMarker(map, lng, lat) {
        return new AMap.Marker({
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [lng, lat],
            map: map
        });
    }

    //在指定位置打开信息窗体
    function openInfoWindow(map) {
        //构建信息窗体中显示的内容
        var html = [];
        html.push('<div>');
        html.push('<h3>有一笔新投资</h3>');
        html.push('');
        html.push('</div>');
        infoWindow = new AMap.InfoWindow({
            content: html.join('')  //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.open(map, map.getCenter());
    }

    window.markInvestOnMap = function (lng, lat) {
        createMarker(hotMap, lng, lat);
        mainMap.setZoomAndCenter(12, [lng, lat]);
        openInfoWindow(mainMap);
    };
    window.hotMap = hotMap;
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

    function msgHandler(msg) {
        //console.log(msg)
        var msg_type = msg.type, data = msg.data;
        window.InvestingPanel.receiveMessage(msg);

        // 有投资进来了
        if (msg_type == 1) {
            console.log('message', msg);

            window.TopInvestmentPanel.receiveInvestMessage({
                username: data.name,
                money: data.money,
                avatar: '',
                project_name: '[投标]',
                sex: 'male',
                province: data.province,
                city: data.city
            });

            window.markInvestOnMap(data.longitude, data.latitude);
        }
    }
});