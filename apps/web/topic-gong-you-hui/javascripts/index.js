$(function () {
    var wealthBigImgs = [
        "./images/img1.png",
        "./images/img2.png",
        "./images/img3.png",
        "./images/img1.png",
        "./images/img2.png",
        "./images/img3.png"
    ];
    $.get('http://fore.9888.cn/cms/api/gyh_banner.php'
        ,{
            key:'0ca175b9c0f726a831d895e',
            id:'28'
        },(data) => {
            for(var i =0;i < data.length;i++){
                $(".wealthBigImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
                $(".wealthSmallImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
            }
        },'json');

    $.get('http://fore.9888.cn/cms/api/gyh_banner.php'
        ,{
            key:'0ca175b9c0f726a831d895e',
            id:'29'
        },(data) => {
            for(var i =0;i < data.length;i++){
                $(".northBigImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
                $(".northSmallImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
            }
        },'json');

    $.get('http://fore.9888.cn/cms/api/gyh_banner.php'
        ,{
            key:'0ca175b9c0f726a831d895e',
            id:'30'
        },(data) => {
            for(var i =0;i < data.length;i++){
                $(".eastBigImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
                $(".eastSmallImg ul").find('li').eq(i).find('img').attr('src',data[i].thumb);
            }
        },'json');

    $.get('http://fore.9888.cn/cms/api/gyh_banner.php'
        ,{
            key:'0ca175b9c0f726a831d895e',
            id:'31'
        },(data) => {
            for(var i =0;i < data.length;i++){
                $(".news .newsSmallTitle").eq(i).find('.newsOneTitle span').text(data[i].title);
                $(".news .newsSmallTitle").eq(i).find('.newsOneTitle span').text(data[i].title);
            }
        },'json');
    //for(var i =0;i < wealthBigImgs.length;i++){
    //    $(".wealthBigImg ul").find('li').eq(i).find('img').attr('src',wealthBigImgs[i])
    //}
    //for(var i =0;i < wealthBigImgs.length;i++){
    //    $(".northBigImg ul").append($("<li>").append($("<img>").attr("src",wealthBigImgs[i])))
    //}
    //for(var i =0;i < wealthBigImgs.length;i++){
    //    $(".eastBigImg ul").append($("<li>").append($("<img>").attr("src",wealthBigImgs[i])))
    //}
    //for(var j =0;j < wealthBigImgs.length;j++){
    //    $(".wealthSmallImg ul").append($("<li>").append($("<span>")).append($("<img>").attr("src",wealthBigImgs[j])))
    //}
    //for(var j =0;j < wealthBigImgs.length;j++){
    //    $(".northSmallImg ul").append($("<li>").append($("<span>")).append($("<img>").attr("src",wealthBigImgs[j])))
    //}
    //for(var j =0;j < wealthBigImgs.length;j++){
    //    $(".eastSmallImg ul").append($("<li>").append($("<span>")).append($("<img>").attr("src",wealthBigImgs[j])))
    //}
});