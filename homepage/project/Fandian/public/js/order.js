$(function(){
	var $orderMes = $("#orderMes"),
		$allSum = $("#allSum i");
	// 加一份菜
	$orderMes.on('click', '.buybtn .plus', function(event) {
		event.preventDefault();
		var thisNum = $(this).siblings('.text');
		var thisPrice = parseInt($(this).parent('.buybtn').siblings('.price').text());
		var thisSum = $(this).parent('.buybtn').siblings('.sum').children('i');
		thisNum.text(parseInt(thisNum.text()) + 1);
		thisSum.text(parseInt(thisNum.text())*thisPrice);
		gosum();
	});
	// 减一份菜
	$orderMes.on('click', '.buybtn .minus', function(event) {
		event.preventDefault();
		var thisNum = $(this).siblings('.text');
		var thisPrice = parseInt($(this).parent('.buybtn').siblings('.price').text());
		var thisSum = $(this).parent('.buybtn').siblings('.sum').children('i');
		if (parseInt(thisNum.text()) < 1) {
			return
		}else{
			thisNum.text(parseInt(thisNum.text()) - 1);
			thisSum.text(parseInt(thisNum.text())*thisPrice);
			gosum();
		};
	});
	// 删除当前菜式
	$orderMes.on('click', '.del', function(event) {
		event.preventDefault();
		yconfirmshow("你确定要删除这道菜？", function(){
			$(this).parent('li').remove();
		});	
	});

	// 计算总价
	function gosum(){
		$allSum.text(0);
		$(".sum i").each(function(){
			$allSum.text(parseInt($allSum.text())+parseInt($(this).text()));
		});
	};
})