$(function () {
    $("#close-btn").click(function () {
        $("#popwindow").css({display:"none"});
    });
    $("#konw-btn").click(function () {
        $("#popwindow").css({display:"none"});
    });

    $("#gaincode").click(function () {
        var num =5;
        var _this=$(this);
        _this.text(num+'秒');
        var timer=  setInterval(function () {
            if(num==0){
                _this.text('点击获取');
                num = 5;
                clearInterval(timer);
            }else{
                _this.text(num+'秒');
                num--;
            }
        },1000);
    });
    function  time() {

    }
});
