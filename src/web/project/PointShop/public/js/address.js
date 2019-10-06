$(document).ready(function(){
	// 保存新添加收货地的信息
	var areaArr = new Array();
	// 选择默认收货地址
	$("#arealist").on('click', ".btn span:nth-of-type(1)", function(event) {
		event.preventDefault();
		$(".stared").removeClass('stared');
		$(this).addClass('stared');
	});
	// 编辑收货地址
	$("#arealist").on('click', ".btn span:nth-of-type(2)", function(event) {
		event.preventDefault();
		$(this).parents('li').addClass('point').siblings('point');
		// 收集数据传到地址编辑窗中
		var a = $(".point .name").text(),
		b = $(".point .phone").text(),
		c = $(".point .area span").eq(0).text(),
		d = $(".point .area span").eq(1).text(),
		e = $(".point .area span").eq(2).text();
		// 写入数据
		$("#name input").val(a);
		$("#tel input").val(b);
		$("#city input").val(c);
		$("#street input").val(d);
		$("#addr textarea").val(e);
		$("#mark").addClass('markshow');
	});
	// 删除收货地址
	$("#arealist").on('click', ".btn span:nth-of-type(3)", function(event) {
		event.preventDefault();
		$(this).parents('li').remove();
	});

	function clearText(){
		$("#name input").val("");
		$("#tel input").val("");
		$("#city input").val("");
		$("#street input").val("");
		$("#addr textarea").val("输入详细地址...");
	};

	// 添加新地址
	$("#address").click(function(){
		clearText();
		$("#mark").addClass('markshow');
	});

	// 地址编辑栏关闭/保存
	$("#setclose").click(function(){
		$("#mark").removeClass('markshow');
		$(".point").removeClass('point');
		// 清除数据
		clearText();
	});
	$("#setsave").click(function(){
		// 收集数据
		var a =$("#name input").val(),
		b = $("#tel input").val(),
		c = $("#city input").val(),
		d = $("#street input").val(),
		e = $("#addr textarea").val();
		// 生成新地址
		$("#arealist").append('<li class="point"><div class="nap"><span class="name"></span><span class="phone"></span></div><p class="area"><span></span><span></span><span></span></p><div class="btn"><span value="true">默认地址</span><span>编辑</span><span>删除</span></div></li>');
		// 代入数据
		$(".point .name").text(a),
		$(".point .phone").text(b),
		$(".point .area span").eq(0).text(c),
		$(".point .area span").eq(1).text(d),
		$(".point .area span").eq(2).text(e);
		$("#mark").removeClass('markshow');
		$(".point").removeClass('point');
	});

	// 选择地区
	$("#city").click(function(){
		$("#areaWarper p").trigger('click');
		$("#areaBox").addClass('markshow');
	});

	// 选择地址
	$("#areaWarper").on('click', 'ul li', function(event) {
		event.preventDefault();
		// 点击li选择内容后在p里生成一个span
		if ($("#areaWarper p span").length < 3) {
			$("#areaWarper p").append('<span></span>');
			$("#areaWarper p span:last").text($(this).text());
		}else{
			alert("够了");
		};
	});
	// 删除已选地址
	$("#areaWarper p").on('click', function(event) {
		event.preventDefault();
		$(this).html("");
	});
	// 取消选择地址
	$("#areaclose").click(function(){
		$("#areaWarper p").trigger('click');
		$("#areaBox").removeClass('markshow');
	});
	// 确认选择的地址
	$("#areasave").click(function(){
		areaArr.length = 0;
		$("#areaWarper p span").each(function(){
			areaArr[areaArr.length] = $(this).text();
		});
		$("#city input").val(areaArr.join(""));
		$("#areaBox").removeClass('markshow');
	});
});