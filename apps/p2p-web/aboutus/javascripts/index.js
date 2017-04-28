$(document).ready(function () {
    var hash = location.hash;
    function jumplink(ele) {
        $(ele).addClass("active").siblings().removeClass("active")
        $(".r-item").eq($(ele).index()).css({display: "block"}).siblings().css({display: "none"})
        $(".aboutus").text($(ele).find(".l-content").text());
        $(".a-left").height($(".a-right").height());
    }
    if(hash==="#aboutus"){
        jumplink(hash);
    }else if(hash==="#contactus"){
        jumplink(hash);
    }else if(hash==="#school"){
        jumplink(hash);
    }
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
    var map = new BMap.Map("bdmap");
    var point = new BMap.Point(116.4347124,39.957053);
    map.centerAndZoom(point,12);
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint("北京市朝阳区朝阳门外大街18号", function(point){
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
        }else{
            alert("您选择地址没有解析到结果!");
        }
    }, "北京市");
})
