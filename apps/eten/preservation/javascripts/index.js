$(function(){
	//展开[详情]
	$(".more_link").click(function(){
		if($(this).text()=="[详情]"){
			$(".more_txt").css("display","");
			$(this).text("[收起]");
			$(this).addClass("on");	
		}else{
			$(".more_txt").css("display","none");
			$(this).text("[详情]");
			$(this).removeClass("on");	
		}
	})
	
	$(".more_link1").click(function(){
		if($(this).text()=="[详情]"){
			$(".more_txt1").css("display","");
			$(this).text("[收起]");
			$(this).addClass("on");	
		}else{
			$(".more_txt1").css("display","none");
			$(this).text("[详情]");
			$(this).removeClass("on");	
		}
	})
	
	$(".more_link2").click(function(){
		if($(this).text()=="[详情]"){
			$(".more_txt2").css("display","");
			$(this).text("[收起]");
			$(this).addClass("on");	
		}else{
			$(".more_txt2").css("display","none");
			$(this).text("[详情]");
			$(this).removeClass("on");	
		}
	})
	
	$(".more_link3").click(function(){
		if($(this).text()=="[详情]"){
			$(".more_txt3").css("display","");
			$(this).text("[收起]");
			$(this).addClass("on");	
		}else{
			$(".more_txt3").css("display","none");
			$(this).text("[详情]");
			$(this).removeClass("on");	
		}
	})
	
	
	setTimeout(function(){
		$("#menu div>div>div").mouseover(function(){
			var index=$(this).index();
			$(".option>li").eq(index).show().siblings().hide();
			$(".mouse").hide();
		})
		
	},1000)	
	
	setTimeout(function(){
		$("#menu div>div>div").mouseout(function(){
			$(".mouse").show();
			$(".option>li").hide();
		})
	},1000)	
	

})	










