$(function () {
    $("#global-nav-banner").css('transform', 'translateX(-50px)');
});

window.globalInterestCalculator = {
    addValidate: function () {
        var ids = ["#ic-total-invest", "#ic-interest-rate", "#ic-invest-time"];
        for (var i = 0; i < ids.length; i++) {
            $(ids[i]).bind('input propertychange', function () {
                var e = $(this);
                e.val(parseInt(e.val()) || 0)
            });
        }
    },
    addChangeWay: function () {
        $("#ic-return-way").change(function () {
            var e = $(this);
            if (e.val() == 'daily') {
                $("#ic-invest-time-unit").text('天')
            } else {
                $("#ic-invest-time-unit").text('月')
            }
        })
    },
    calculate: function () {
        var money = parseInt($("#ic-total-invest").val()),
            rate = parseInt($("#ic-interest-rate").val()),
            rway = $("#ic-return-way").val(),
            time = parseInt($("#ic-invest-time").val());

        if (!money) return this.showTips('项目金额不能为空');
        if (!rate) return this.showTips('年化收益率不能为空');
        if (!time) return this.showTips('项目期限不能为空');

        var monthly_interest = (money * rate / 12);
        var daily_interest = (money * rate / 360);

        var pre_item = rway == 'daily' ? daily_interest : monthly_interest;
        var interest = Math.round(pre_item * time) / 100;

        var total = money + interest;
        var last = money + Math.round(monthly_interest) / 100;

        if (rway == 'monthly') {
        } else {
            pre_item = null;
            last = null;
        }

        this.showResult(total, interest, Math.round(pre_item) / 100, last);
    },
    reset: function () {
        $("#ic-total-invest").val(5000);
        $("#ic-interest-rate").val(12);
        //$("#ic-return-way").val();
        $("#ic-invest-time").val(12);

        this.hideTips();
        this.hideResult();
    },
    showTips: function () {
        $(".interest-calculator .error-tips").html("");
    },
    hideTips: function () {
        $(".interest-calculator .error-tips").html("");
    },
    showResult: function (total, interest, pre_item, last) {
        var items = $(".ic-result-item");
        if (total) {
            $(items[0]).find('b').text(total + '元');
            $(items[0]).show();
        }

        if (interest) {
            $(items[1]).find('b').text(interest + '元');
            $(items[1]).show();
        }

        if (pre_item) {
            $(items[2]).find('b').text(pre_item + '元');
            $(items[2]).show();
        } else {
            $(items[2]).hide();
        }

        if (last) {
            $(items[3]).find('b').text(last + '元');
            $(items[3]).show();
        } else {
            $(items[3]).hide();
        }
    },
    hideResult: function () {
        $(".ic-result-item").hide();
    },
    show: function () {
        $(".interest-calculator").show()
    },
    hide: function () {
        $(".interest-calculator").hide();
        this.reset();
    }
};

$(function () {
    globalInterestCalculator.addValidate();
    globalInterestCalculator.addChangeWay();
});