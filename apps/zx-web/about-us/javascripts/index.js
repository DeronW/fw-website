$(document).ready(function () {
    var hash = location.hash;
    function jumplink(ele) {
        $(ele).addClass("active").siblings().removeClass("active")
        $(".r-item").eq($(ele).index()).css({display: "block"}).siblings().css({display: "none"})
        $(".aboutus").text($(ele).find(".l-content").text());
        $(".a-left").height($(".a-right").height());
    }
    if(hash==="#aboutus"){
        jumplink($(".left-item")[0]);
    }else if(hash==="#contactus"){
        jumplink($(".left-item")[1]);
    }
    $(window).on("hashchange", function () {
        hash = location.hash;
        if(hash==="#aboutus"){
            jumplink($(".left-item")[0]);
        }else if(hash==="#contactus"){
            jumplink($(".left-item")[1]);
        }
    });

    $(".left-item").each(function (index, item) {
        $(this).click(function () {
            $(this).addClass("active").siblings().removeClass("active")
            $(".r-item").eq(index).css({display: "block"}).siblings().css({display: "none"})
            $(".aboutus").text($(this).find(".l-content").text());
            $(".a-left").height($(".a-right").height());
            if(index==0){
                hashChnage("aboutus");
            }else if(index==1){
                hashChnage("contactus");
            }
        })
    });
    function hashChnage(key){
        window.scrollTo(0,0);
        history.pushState({}, '', `#${key}`)
    }
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

    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    var local = new BMap.LocalSearch(map, {
        renderOptions:{map: map}
    });
    local.search("北京市朝阳区朝阳门外大街18号");

    //map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    //var local = new BMap.LocalSearch(map, {
    //    renderOptions:{map: map, autoViewport:true}
    //});
    //local.searchNearby("丰联广场", "北京市朝阳区朝阳门外大街18号");
})
