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

	function getVal(obj, _this) {
		obj.bind('input propertychange', function() {

			var inputVal = $(this).val();

			if(verificationNum(inputVal)) {
				$(this).val($(this).val());				

				_this.phoneVal = $(this).val();				
			} else {
				$(this).val(_this.phoneVal);	
			}

		});
	}

	var registerObj = {
		phoneVal: '',
		codeVal: '',
		phoneValFun: function() {
			var _this = this;

			getVal($('#phoneChange'), _this);

		},
		codeValFun: function() {
			var _this = this;

			getVal($('#codeChange'), _this);

		}
	};

	registerObj.phoneValFun();
	registerObj.codeValFun();

	$("#registerButn").click(function() {
		var phone = registerObj.phoneVal;
		var code = registerObj.codeVal;

		if(phone == '') {
			alert("手机号不能为空");
		} else if (!isMobilePhone(phone)) {
			alert("手机号格式不对");
		} else if(code == '') {
			alert("验证不能为空");
		} else {
			$.ajax({
				url: '/api/userBase/v1/register.json',
				method: 'POST',
				data: {
				
				},
				success: function(data) {
					console.log(data);
				}
			});	
		}
		
		
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
