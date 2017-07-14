$(document).ready(function() {
    var hash = location.hash;

    function jumplink(ele) {
        $(ele).addClass("active").siblings().removeClass("active")
        $(".r-item").eq($(ele).index()).css({ display: "block" }).siblings().css({ display: "none" })
        $(".aboutus").text($(ele).find(".l-content").text());
        $(".a-left").height($(".a-right").height());
    }
    if (hash === "#aboutus") {
        jumplink($(".left-item")[0]);
    } else if (hash === "#contactus") {
        jumplink($(".left-item")[1]);
    } else if (hash === "#partner") {
        jumplink($(".left-item")[2]);
    }
    $(window).on("hashchange", function() {
        hash = location.hash;
        if (hash === "#aboutus") {
            jumplink($(".left-item")[0]);
        } else if (hash === "#contactus") {
            jumplink($(".left-item")[1]);
        } else if (hash === "#partner") {
            jumplink($(".left-item")[2]);
        }
    });

    $(".left-item").each(function(index, item) {
        $(this).click(function() {
            $(this).addClass("active").siblings().removeClass("active")
            $(".r-item").eq(index).css({ display: "block" }).siblings().css({ display: "none" })
            $(".aboutus").text($(this).find(".l-content").text());
            $(".a-left").height($(".a-right").height());
            if (index == 0) {
                hashChnage("aboutus");
            } else if (index == 1) {
                hashChnage("contactus");
            } else if (index == 2) {
                hashChnage("partner");
            }
        })
    });

    function hashChnage(key) {
        window.scrollTo(0, 0);
        history.pushState({}, '', `#${key}`)
    }

    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.445056, 39.929543);
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    map.centerAndZoom(point, 15);
    var opts = {
        width: 200,
        height: 100,
        title: "北京市朝阳区朝阳门外大街18号",
    }
    var infoWindow = new BMap.InfoWindow("地址：北京市朝阳区朝阳门外大街18号丰联广场11层1105", opts);
    map.openInfoWindow(infoWindow, point);
})