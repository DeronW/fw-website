// return false;
// window.onload = function () {
//     $("#redcash").on("mouseenter", function () {
//         $("#redbag1").css("display", "block").removeClass().addClass("redbag1");
//         $("#redbag2").css("display", "block");
//     }).on("mouseleave", function () {
//         $("#redbag1").css("display", "none").removeClass().css({"left": "0", "top": "0"}).addClass("redbag1-down");
//         $("#redbag2").css("display", "none");
//     });
//     $("#redcash2").on("mouseenter", function () {
//         $("#redbag21").css("display", "block");
//         $("#redbag22").css("display", "block");
//     }).on("mouseleave", function () {
//         $("#redbag21").css("display", "none");
//         $("#redbag22").css("display", "none");
//     });
//     $("#redcash3").on("mouseenter", function () {
//         $("#redbag31").css("display", "block");
//         $("#redbag32").css("display", "block");
//     }).on("mouseleave", function () {
//         $("#redbag31").css("display", "none");
//         $("#redbag32").css("display", "none");
//     });
//
//
//     $(".selectItem").on("mouseenter", function () {
//         console.log($(this).find("img"));
//         $(this).find("img").attr("src", "images/guide_selectlistB-0" + ($(this).index() + 1) + ".gif");
//
//     }).on("mouseleave", function () {
//
//         $(this).find("img").attr("src", "images/guide_selectlistB-0" + ($(this).index() + 1) + ".jpg");
//     });
//
//     // 鼠标滚动一定高度后显示
//     // var top=$(document).scrollTop();
//     // console.log(top);
//     $(document).scroll(function () {
//         var top = $(document).scrollTop();
//
//         if (top >= 400) {
//             $(".scroll").css("display", "block");
//         } else {
//             $(".scroll").css("display", "none");
//         }
//
//     });
//     // 表单验证相关
//     // var number =$("#phoneNumber");
//     // number.blur(function () {
//     //     console.log("aaaa");
//     //     if(number.val()==""){
//     //        $("#phonetips").show();
//     //     }else if (!phoneNumberVer(number)){
//     //         $("#phonetips").text("手机号格式不对").show();
//     //     }
//     // });
//     // 验证手机号码格式的函数
//     function phoneNumberVer(obj) {
//         var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
//         if (!myreg.test(obj.val())) {
//             return false;
//         }
//     };
//     var formAction = {
//         number: $("#phoneNumber"),
//         person: $("#person"),
//         test: $("#test"),
//         numberBlur: function () {
//             console.log("bbbb");
//             var _this = this;
//             this.number.blur(function () {
//                 console.log("aaaa");
//                 if (_this.number.val() == "") {
//                     $("#phonetips").show();
//                 } else if (!phoneNumberVer(_this.number)) {
//                     $("#phonetips").text("手机号格式不对").show();
//                 }
//             })
//         },
//         testBlur: function () {
//             console.log("testblur1");
//             var _this = this;
//             this.test.blur(function () {
//                 console.log("testblur2");
//                 if (_this.test.val() == "") {
//                     $("#testtips").show();
//                 } else if (_this.test.val() !== "1234") {
//                     $("#testtips").text("网页验证码不正确！").show();
//                 }
//             })
//         },
//
//
//         formPost: function () {
//             var numberValue = this.number.val();
//             console.log(numberValue);
//             var _this = this;
//             if (this.number.val() == "") {
//                 $("#phonetips").show();
//             } else if (!phoneNumberVer(this.number)) {
//                 $("#phonetips").text("手机号格式不对").show();
//             }
//             if (_this.test.val() == "") {
//                 $("#testtips").show();
//             } else if (_this.test.val() !== "1234") {
//                 $("#testtips").text("网页验证码不正确！").show();
//             }
//
//         }
//
//     };
//     formAction.numberBlur();
//     formAction.testBlur();
//     $("#submit").click(function () {
//         formAction.formPost();
//     });
//
//     $("#verificationCode").click(function () {
//         this.src = this.src + "&" + Math.random();
//     });
//
//     //模拟返回的数据
//     function data() {
//         return {
//             hotDeil: [
//                 {id: 1, proName: "利随享", borrowAmout: 300000, repayPeriod: 20, annualRate: 6.2},
//                 {id: 2, proName: "利随享9695", borrowAmout: 100000, repayPeriod: 6, annualRate: 9.2}
//
//             ],
//             verificationImg: [],
//
//         }
//     }
//
//     $("#ftwo").text(data().hotDeil[0].proName);
//     $("#ftwoDay").text(data().hotDeil[0].repayPeriod + "天");
//     // console.log(data().hotDeil[0].proName);
//
//     var arr = ["54", 2323];
//
//     function totenThousands(num) {
//         return (num || 0).toString().replace(/(\d)(?=(?:\d{4})+$)/g, '$1,');
//     }
//
//     function formatData() {
//         var investTotal = arr[0];
//
//         var yizi = '<span class="yizi" id="yizi">亿</span>';
//         var square = function (i) {
//             return '<span class="money-number num5 " >' +
//                 '<em class="timerNumber" id="num' + i + '">' + i + '</em>' +
//                 '<strong></strong></span>';
//         }
//
//         var wanyuan = '<span class="yizi">万</span><span class="yizi">元</span>';
//
//         var nLength = investTotal.toString().length;
//         for (var i = nLength; i > 0; i--) {
//             if ((i % 4) == 0) {
//                 if (nLength != i) {
//                     $("#yibox").append(yizi);
//                 }
//             }
//             $("#yibox").append(square(investTotal.toString()[(investTotal.toString().length - i)]));
//             //$("#yibox").append(square(investTotal.toString()));
//
//         }
//         $("#yibox").append(wanyuan);
//
//         $(".timerNumber").each(function () {
//             //time($(this), investTotal);
//         })
//
//     }
//
//     formatData();
//     var dataobj = {};
//     for (var i = 0; i < arr.length; i++) {
//         var item = arr[i];
//         for (var j = 0; j < item.length; j++) {
//             dataobj[j] = item[j];
//         }
//     }
//     console.log(dataobj);
//     var everydataobj = [];
//     //遍历这个对象，获取到数字总额中的每一个数字
//     $.each(dataobj, function (n, value) {
//         // console.log(n);
//         console.log(value);
//         //对每一个数字做定时器累加的操作
//         everydataobj.push(value);
//         // time(value);
//     })
//     // $(".money-number>#five").text(9);
//     // time(everydataobj[0]);
//     function time(n) {
//
//         // console.log("time函数被调用了");
//         clearInterval(timer);
//
//         var timer = setInterval(function () {
//             for (var i = 0; i <= n; i++) {
//                 console.log(i);
//                 $(".money-number>#five").text(i);
//                 console.log("for循环执行了");
//                 // $(".timerNumber").each(function (index,value) {
//                 //     // console.log(value);
//                 // });
//                 clearInterval(timer);
//
//             }
//             clearInterval(timer);
//
//         }, 1000)
//
//
//         // obj.timer=setInterval(function () {
//         //     // console.log(n>=0);
//         //     console.log(obj);
//         //
//         //     clearInterval(obj.timer[0])
//         //    i++;
//         //
//         // },2000);
//         // var timer=setInterval(function () {
//         //     // console.log(n>=0);
//         //     if(n>=0){
//         //         // console.log("aaaa");
//         //         $("#num1").text(i++);
//         //         n--;
//         //
//         //     }else{
//         //         clearInterval(timer);
//         //     }
//
//     }
//
//     // time(dataobj);
//
//
//     //tab选项卡部分
//     $("#titleBox li").click(function () {
//         // var _this= $(this);
//         // console.log(_this);
//         $("#titleBox li").addClass(".current").siblings().removeClass(".current");
//         $("#contentBox li").hide().eq($("#titleBox li").index(this)).fadeIn();
//
//
//     });
//
//
//     //图片轮播部分
//     var t = n = 0;
//     var count;
//
//     count = $("#banner_list a").length;
//     //console.log(count);//4
//     $("#banner_list a:not(:first-child)").hide();
//     $("#banner_info").html($("#banner_list a:first-child").find("img").attr('alt'));
//     $("#banner_info").click(function () {
//         window.open($("#banner_list a:first-child").attr("href"), "_blank");
//     });
//
//     $("#banner li").click(function () {
//         var i = $(this).text() - 1;
//         console.log(i);
//         n = i;
//         if (i >= count) return;
//         $("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));
//         $("#banner_info").unbind().click(function () {
//             window.open($("#banner_list a").eq(i).attr("href"), "_blank");
//         });
//         $("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
//         document.getElementById("banner").style.background = "";
//         $(this).toggleClass("on");
//         // $(this).siblings().removeAttr("class");
//         $(this).siblings().removeClass("on");
//     });
//     t = setInterval("showAuto()", 2000);
//     $("#banner").hover(function () {
//         clearInterval(t)
//     }, function () {
//         t = setInterval("showAuto()", 2000);
//     });
//
//
//     function showAuto() {
//         n = n >= (count - 1) ? 0 : ++n;
//         $("#banner li").eq(n).trigger("click");
//     }
//
//
// }
