$(function () {
	function verificationNum(val) {
		var reg = new RegExp("^[0-9]*$");
		return reg.test(val)
	}


	$("#close-btn").click(function () {
        $("#popwindow").css({display:"none"});
    });
    $("#konw-btn").click(function () {
        $("#popwindow").css({display:"none"});
    });

	function isMobilePhone (phone) {
		return /^1(3|4|5|7|8)\d{9}$/.test(phone)
	}

	function getVal(obj, objVal, _this) {
		obj.bind('input propertychange', function() {

			var inputVal = $(this).val();

			if(verificationNum(inputVal)) {
				$(this).val($(this).val());

				_this[objVal] = $(this).val();
			} else {
				$(this).val(_this[objVal]);
			}

		});
	}

	var registerObj = {
		phoneVal: '',
		codeVal: '',
		codeToken: '',
		codeType: '',
		getCode: false,
		phoneValFun: function() {
			var _this = this;

			getVal($('#phoneChange'), 'phoneVal', _this);

		},
		codeValFun: function() {
			var _this = this;

			getVal($('#codeChange'), 'codeVal',  _this);

		}
	};

	registerObj.phoneValFun();
	registerObj.codeValFun();

	$("#registerButn").click(function() {
		var phone = registerObj.phoneVal;
		var code = registerObj.codeVal;

		if(phone == '') {
			$("#phoneErrorText").text("请输入手机号");
		} else if (!isMobilePhone(phone)) {
			$("#phoneErrorText").text("手机号格式不正确");
		} else if(!registerObj.getCode) {
			$("#codeErrorText").text("请先获取验证码");
		}  else if(code == '') {
			$("#codeErrorText").text("请输入验证码");
		}else {
			$.ajax({
				url: $("#api-path").val() + 'api/userBase/v1/register.json',
				method: 'POST',
				data: {
					mobile: registerObj.phoneVal,
					codeToken: registerObj.codeToken,
					verifyCode: registerObj.codeVal,
					sourceType: 5
				},
				success: function(data) {
					if(data.code == 10000) {
						$("#rgisterContent").hide();
						$("#qrBlock").show();

					} else {
						alert(data.message);
					}
				}
			});
		}


	});


    $("#gaincode").click(function () {
		console.log('xxx');
		var phone = registerObj.phoneVal;

		if(phone == '') {
			$("#phoneErrorText").text("请输入手机号");
			return false;
		} else if (!isMobilePhone(phone)) {
			$("#phoneErrorText").text("手机号格式不正确");
			return false;
		}

        var num = 60;
        var _this=$(this);

		$("#gaincode").hide();
		$("#downCode").show();
		$("#downCode").text(num+'秒');

		registerObj.getCode = true;


        _this.text(num+'秒');
        var timer = setInterval(function () {
            if(num==0){
				$("#gaincode").text('点击获取')
                num = 60;
				$("#gaincode").show();
				$("#downCode").hide();
                clearInterval(timer);
            }else{
				$("#downCode").text(num+'秒')

                num--;
            }
        },1000);

    });



    getCaptcha();
    $("#captcha-img img").click(function(){
        getCaptcha();
    });
    function getCaptcha(){
        $.ajax({
            url: $("#api-path").val() + 'api/userBase/v1/verifyNum.json',
            method: 'POST',
            data: {
                mobile: registerObj.phoneVal,
                userOperationType: 3,
                sourceType: 5
            },
            success: function(data) {
                if(data.code == 10000) {
                    $("#captcha-img img").setAttribute('src', data.data.url);
                }
            }
        });
    }





});
