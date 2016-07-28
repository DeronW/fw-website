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
	
	$("#menu img").mouseover(function(){
		var index=$(this).index();
		$(".option>li").eq(index).show().siblings().hide();
	})
	
})	










