$(document).ready(function(){
	var pinHeg = document.documentElement.clientHeight - 230;
	$('#historySearch').css('height',pinHeg+'px')
	//清空搜索框内容
	$('#inputReset').click(function(){
		$('#search').val("");
	});
	//历史搜索效果
	//
 	// 获取n至m随机整数
	// c = m-n+1; 
	// Math.floor(Math.random() * c + n);	
	var fsize = new Array("12px","14px","16px","18px","20px");
	var coler = new Array("#E74C3C","#1ABC9C","#3498DB","#F1C40F","#9B59B6");
	$('#historySearch li').each(function(){
		$(this).children('a').css({
			'font-size': fsize[Math.floor(Math.random() * 5)],
			'line-height': fsize[Math.floor(Math.random() * 5)],
			'color': coler[Math.floor(Math.random() * 5)] 
		});
	});
});