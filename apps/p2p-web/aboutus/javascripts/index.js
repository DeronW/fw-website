$(document).ready(function () {
    $(".left-item").each(function (index, item) {
        $(this).click(function () {
            $(this).addClass("active").siblings().removeClass("active")
            $(".r-item").eq(index).css({display: "block"}).siblings().css({display: "none"})
            $(".aboutus").text($(this).find(".l-content").text());
            $(".a-left").height($(".a-right").height());
        })
    })
    $(".policy-item").each(function (index, item) {
        $(this).mouseenter(function () {
            $(this).addClass("active").siblings().removeClass("active")
        })
    })
    $(".policy-item").each(function (index, item) {
        $(this).mouseleave(function () {
            $(this).removeClass("active")
        })
    })
    // 百度地图API功能
    var map = new BMap.Map("item2-box");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
})
