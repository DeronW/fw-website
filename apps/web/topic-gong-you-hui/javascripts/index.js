

$(function () {
    $.ajax({
        type: "GET",
        async: false,
        url:"http://fore.9888.cn/cms/api/gyh_banner.php?key=0ca175b9c0f726a831d895e&id=28&callback=gyh1",
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"gyh1",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(data){
            for(var i =0;i < data.length;i++){
                $(".wealthBigImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
                $(".wealthSmallImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
            }
        },
        error: function(){
            alert("fail");
        }
    });
    //$.getJSON('http://fore.9888.cn/cms/api/gyh_banner.php?key=0ca175b9c0f726a831d895e&id=28&callback=?', function (data) {
    //    for(var i =0;i < data.length;i++){
    //        $(".wealthBigImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
    //        $(".wealthSmallImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
    //    }
    //});
    $.ajax({
        type: "GET",
        async: false,
        url:"http://fore.9888.cn/cms/api/gyh_banner.php?key=0ca175b9c0f726a831d895e&id=29&callback=gyh2",
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"gyh2",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(data){
            for(var i =0;i < data.length;i++){
                $(".northBigImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
                $(".northSmallImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
            }
        },
        error: function(){
            alert("fail");
        }
    });
    $.ajax({
        type: "GET",
        async: false,
        url:"http://fore.9888.cn/cms/api/gyh_banner.php?key=0ca175b9c0f726a831d895e&id=30&callback=gyh3",
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"gyh3",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(data){
            for(var i =0;i < data.length;i++){
                $(".eastBigImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
                $(".eastSmallImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
            }
        },
        error: function(){
            alert("fail");
        }
    });
    $.ajax({
        type: "GET",
        async: false,
        url:"http://fore.9888.cn/cms/api/gyh_banner.php?key=0ca175b9c0f726a831d895e&id=31&callback=gyh4",
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"gyh4",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(data){
            for(var i =0;i < data.length;i++){
                var $title = $(".news .newsSmallTitle");
                $title.eq(i).css('display','block').find('.newsOneTitle span').text(data[i].title);
                $title.eq(i).find('.newsOneText span').text(data[i].desc);
            }
        },
        error: function(){
            alert("fail");
        }
    });
});