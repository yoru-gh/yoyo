$(function(){
	var $food = $("#food"),
		$foodi = $("#food i"),
		$sellist = $("#sellist"),
		$jilii = $("#jili i"),
		$mask = $("#mask");
	// 打开选择茶
	$food[0].addEventListener("tap",function(){
		$foodi.addClass('point'); // 设置标记
		$jilii.addClass('ipoint'); // 设置计量单位
		$mask.addClass('maskshow');
		$sellist.addClass('active');
	});
	// 点击遮罩层关闭选择框
	$mask[0].addEventListener("tap",function(){
		$mask.removeClass('maskshow');
		$sellist.removeClass('active');
		$(".point").removeClass('point');
		$(".ipoint").removeClass('ipoint');
	});
	// 选择食材
	$sellist.on('tap', 'ul li', function(event) {
		event.preventDefault();		
		$(".point").text($(this).text());
		$(".ipoint").text($(this).attr("value"));
		$mask.removeClass('maskshow');
		$sellist.removeClass('active');
		$(".point").removeClass('point');
		$(".ipoint").removeClass('ipoint');
	});
})