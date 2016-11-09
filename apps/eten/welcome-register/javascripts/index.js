window.onload = function () {

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
};