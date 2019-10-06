$(function(){
	mui.init({
		swipeBack: false
	});
	var bodyWidth = document.documentElement.clientWidth,
		$list = $("#list"),
		$listli = $("#list li"),
		advertisement = document.getElementById("advertisement");
		
	$listli.height(bodyWidth/3); // 保持模块正方形
	
	// 其他服务页广告
	advertisement.addEventListener("tap", function(){
		mui.toast("还没页面")
	});
	
	// 其他服务选择
	mui($list).on("tap", "li", function(){
		mui.toast("还没页面")
	});
});
