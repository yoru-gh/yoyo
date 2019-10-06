$(document).ready(function(){
	// 分类选中效果
	$('#nav ul li').on('click',function(){
		$(this).addClass('selectLi').siblings('li').removeClass('selectLi');
	});
});