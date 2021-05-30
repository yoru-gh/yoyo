$(function(){
	var $openTable = $("#openTable"),
		$content = $("#content"),
		$minus = $("#minus"),
		$text = $("#text"),
		$plus = $("#plus"),
		$mask = $("#mask"),
		$sellist = $("#sellist"),
		$sellistTitle = $("#sellist p"),
		$tea = $("#tea"),
		$teai = $("#tea i"),
		$tissue = $("#tissue"),
		$tissuei = $("#tissue i"),
		$guestMesText = $("#guestMes textarea"),
		$teaPrice = $("#teaPrice"),
		$teaSum = $("#teaSum"),
		$tissuePrice = $("#tissuePrice"),
		$tissueSum = $("#tissueSum"),
		$pagePrice = $("#pagePrice");

	// 开台
	$openTable.click(function(){
		$openTable.addClass('active');
		$content.addClass('active');
		setTimeout(function(){
			$openTable.remove();
		}, 350);
	});
	// $openTable.trigger('click'); // 不需要点开台按钮的加上这句

	// 加一
	$plus.click(function(event) {
		$text.text(parseInt($text.text()) + 1);
		sasaSum();
	});
	// 减一
	$minus.click(function(event) {
		if (parseInt($text.text()) < 1) {
			return
		}else{
			$text.text(parseInt($text.text()) - 1);
		};
		sasaSum();
	});

	// 打开选择茶
	$tea.click(function(){
		$teai.addClass('point'); // point 设置标记用于显示选择的茶名
		$teaPrice.addClass('pointp'); // pointp 设置标记用于显示选择的茶的单价
		$sellistTitle.text('请选择茶');
		$mask.addClass('maskshow');
		$sellist.addClass('active');
	});

	// 打开选择纸巾
	$tissue.click(function(){
		$tissuei.addClass('point');
		$tissuePrice.addClass('pointp');
		$sellistTitle.text('请选择纸巾');
		$mask.addClass('maskshow');
		$sellist.addClass('active');
	});

	// 点击遮罩层关闭选择框
	$mask.click(function(){
		$mask.removeClass('maskshow');
		$sellist.removeClass('active');
		$(".point").removeClass('point');
		$(".pointp").removeClass('pointp');
	});

	// 选择
	$sellist.on('click', 'li', function(event) {
		event.preventDefault();
		$(".point").text($(this).text());
		$(".pointp").text($(this).attr("value"));
		$mask.removeClass('maskshow');
		$sellist.removeClass('active');
		$(".point").removeClass('point');
		$(".pointp").removeClass('pointp');
		sasaSum();
	});

	// 备注
	$guestMesText.focus(function(){
		$guestMesText.val("");
	});
	$guestMesText.blur(function(){
		if ($guestMesText.val() == "") {
			$guestMesText.val("备注...");
		};	
	});

	// 按人数计算茶位费和纸巾费之后计算合计
	function sasaSum(){
		var a = parseInt($text.text());
		var b = parseInt($teaPrice.text());
		var c = parseInt($tissuePrice.text());
		$teaSum.text(a*b);
		$tissueSum.text(a*c);
		$pagePrice.text(parseInt($teaSum.text())+parseInt($tissueSum.text()));
	};
})