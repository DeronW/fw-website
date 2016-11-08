window.onload = function () {
    $("#redcash").on("mouseenter", function () {
        $("#redbag1").css("display", "block").removeClass().addClass("redbag1");
        $("#redbag2").css("display", "block");
    }).on("mouseleave", function () {
        $("#redbag1").css("display", "none").removeClass().css({"left": "0", "top": "0"}).addClass("redbag1-down");
        $("#redbag2").css("display", "none");
    });
    $("#redcash2").on("mouseenter", function () {
        $("#redbag21").css("display", "block");
        $("#redbag22").css("display", "block");
    }).on("mouseleave", function () {
        $("#redbag21").css("display", "none");
        $("#redbag22").css("display", "none");
    });
    $("#redcash3").on("mouseenter", function () {
        $("#redbag31").css("display", "block");
        $("#redbag32").css("display", "block");
    }).on("mouseleave", function () {
        $("#redbag31").css("display", "none");
        $("#redbag32").css("display", "none");
    });
    $(".selectItem").on("mouseenter", function () {
        console.log($(this).find("img"));
        $(this).find("img").attr("src", "images/guide_selectlistB-0" + ($(this).index() + 1) + ".gif");

    }).on("mouseleave", function () {

        $(this).find("img").attr("src", "images/guide_selectlistB-0" + ($(this).index() + 1) + ".jpg");
    });
    // 鼠标滚动一定高度后显示
    $(document).scroll(function () {
        var top = $(document).scrollTop();
        if (top >= 400) {
            $(".scroll").css("display", "block");
        } else {
            $(".scroll").css("display", "none");
        }

    });
    // 表单验证相关
    function phoneNumberVer(obj) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!myreg.test(obj.val())) {
            return false;
        }
    };
    var formAction = {
        number: $("#phoneNumber"),
        person: $("#person"),
        test: $("#test"),
        numberBlur: function () {
            var _this = this;
            this.number.blur(function () {
                if (_this.number.val() == "") {
                    $("#phonetips").show();
                } else if (!phoneNumberVer(_this.number)) {
                    $("#phonetips").text("手机号格式不对").show();
                }
            })
        },
        testBlur: function () {
            console.log("testblur1");
            var _this = this;
            this.test.blur(function () {
                console.log("testblur2");
                if (_this.test.val() == "") {
                    $("#testtips").show();
                } else if (_this.test.val() !== "1234") {
                    $("#testtips").text("网页验证码不正确！").show();
                }
            })
        },
        formPost: function () {
            var numberValue = this.number.val();
            console.log(numberValue);
            var _this = this;
            if (this.number.val() == "") {
                $("#phonetips").show();
            } else if (!phoneNumberVer(this.number)) {
                $("#phonetips").text("手机号格式不对").show();
            }
            if (_this.test.val() == "") {
                $("#testtips").show();
            } else if (_this.test.val() !== "1234") {
                $("#testtips").text("网页验证码不正确！").show();
            }

        }

    };
    formAction.numberBlur();
    formAction.testBlur();
    $("#submit").click(function () {
        formAction.formPost();
    });

    $("#verificationCode").click(function () {
        this.src = this.src + "&" + Math.random();
    });

    //模拟返回的数据
    function data() {
        return {
            hotDeil: [
                {id: 1, proName: "利随享", borrowAmout: 300000, repayPeriod: 20, annualRate: 6.2},
                {id: 2, proName: "利随享9695", borrowAmout: 100000, repayPeriod: 6, annualRate: 9.2}

            ],
            verificationImg: [],

        }
    }

    $("#ftwo").text(data().hotDeil[0].proName);
    $("#ftwoDay").text(data().hotDeil[0].repayPeriod + "天");

    //开始得到数据
    $.ajax({
        url:"http://www.9888.cn/cms/api/dealstatis.php",
        dataType:"json",
        type:"post",
        success:function (data) {
            console.log(data);
        }
    });





}
