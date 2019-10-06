mui.init({
	swipeBack: false
});

$(function(){
	var bodyWidth = document.documentElement.clientWidth, // window.innerWidth
		bodyHeight = document.documentElement.clientHeight,
		$activepic = $("#activepic");
		
	$activepic.height(bodyWidth/2);
})
