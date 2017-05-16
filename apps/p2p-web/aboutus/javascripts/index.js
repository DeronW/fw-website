$(document).ready(function () {
    var hash = location.hash;
    function jumplink(ele) {
        window.scrollTo(0,0)
        $(ele).addClass("active").siblings().removeClass("active")
        $(".r-item").eq($(ele).index()).css({display: "block"}).siblings().css({display: "none"})
        $(".aboutus").text($(ele).find(".l-content").text());
        $(".a-left").height($(".a-right").height());

    }
    if(hash==="#aboutus"){
        jumplink($(".left-item")[0]);
    }else if(hash==="#partner"){
        jumplink($(".left-item")[1])
    }else if(hash==="#contactus"){
        jumplink($(".left-item")[2]);
    }else if(hash==="#school"){
        jumplink($(".left-item")[3]);
    }
    $(".left-item").each(function (index, item) {
        $(this).click(function () {
            console.log(index);
            $(this).addClass("active").siblings().removeClass("active")
            $(".r-item").eq(index).css({display: "block"}).siblings().css({display: "none"})
            $(".aboutus").text($(this).find(".l-content").text());
            $(".a-left").height($(".a-right").height());
            if(index==0){
                location.hash = "#aboutus";
                window.scrollTo(0,0);
            }else if(index==1){
                location.hash ="#partner";
                window.scrollTo(0,0);
            }else if(index==2){
                location.hash="#contactus";
                window.scrollTo(0,0);
            }else if(index==3){
                location.hash="#school";
                window.scrollTo(0,0);
            }
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
