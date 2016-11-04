return
(function () {

    function tab(obj) {
        obj.bind("click", function () {
            var _this = $(this);


            var ifHide = $($(".tab-content-info")[_this.index()]).is(":hidden");

            if (ifHide == false) {
                return;
            }

            obj.removeClass("select-li");

            $(".tab-content-info").hide();

            $("#selectTab").animate({
                left: (_this.width() + 2) * _this.index()
            }, 200, function () {
                _this.addClass("select-li");

                $($(".tab-content-info")[_this.index()]).show();
            });

        });
    }

    function movObj(liObj, showObj, hideObj) {
        liObj.hover(function () {
            $($(hideObj)[$(this).index()]).animate({
                top: 1
            }, 300);
        }, function () {
            $($(hideObj)[$(this).index()]).animate({
                top: 88
            }, 300);
        });


    }

    movObj($("#pluralisticProductUl li"), $("#pluralisticProductUl li .show-info"), $("#pluralisticProductUl li .hide-info"));

    tab($("#tabTitle li "));
})();