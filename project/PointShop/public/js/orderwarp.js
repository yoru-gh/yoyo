$(document).ready(function(){
	// 保存新添加收货地的信息
	var areaArr = new Array();
	// 显示跟换地址面板
	$("#selectarea").click(function(){
		$("#selectBox").addClass('markshow');
	});

	// 选择地址按钮
	$("#sellist").on('click', '.btn span', function(event) {
		event.preventDefault();
		$("#arealist .nap").html($(this).parent('div').siblings('.nap').html());
		$("#arealist .area").html($(this).parent('div').siblings('.area').html());
		$("#selectBox").removeClass('markshow');
	});

	function clearText(){
		// 清除数据函数
		$("#name input").val("");
		$("#tel input").val("");
		$("#city input").val("请选择地区...");
		$("#street input").val("");
		$("#addr textarea").val("输入详细地址...");
	};

	// 添加新地址
	$("#address").click(function(){
		clearText();
		$("#mark").addClass('markshow');
	});
	// 取消选择地址
	$("#noadd").click(function(){
		clearText();
		$("#selectBox").removeClass('markshow');
	});

	// 地址编辑栏关闭/保存
	$("#setclose").click(function(){
		$("#mark").removeClass('markshow');
		$(".point").removeClass('point');
		clearText();
	});
	$("#setsave").click(function(){
		// 收集数据
		var a = $("#name input").val(),
		b = $("#tel input").val(),
		c = $("#city input").val(),
		d = $("#street input").val(),
		e = $("#addr textarea").val();
		// 生成新地址
		$("#sellist").append('<li class="point"><div class="nap"><span class="name"></span><span class="phone"></span></div><p class="area"><span></span><span></span><span></span></p><div class="btn"><span>选择</span></div></li>');
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
		// 把选择的地区存起来
		$("#areaWarper p span").each(function(){
			areaArr[areaArr.length] = $(this).text();
		});
		$("#city input").val(areaArr.join(""));
		$("#areaBox").removeClass('markshow');
	});

	// 确认订单按钮，先支付积分
	$("#payPoint").click(function(){
		$("#pointMark").addClass('markshow');
		$("#pointPayBox input").val("");
		$("#pointPayBox p b").text($("#btnJifen").text());
	});

	// 取消支付积分按钮
	$("#pointPayBox button:nth-of-type(1)").click(function(){
		$("#pointMark").removeClass('markshow');
		$("#tess").attr('class','');
		$("#pointPayBox p,#pointPayBox input").show();
	});

	// 确定支付积分按钮
	$("#pointPayBox button:nth-of-type(2)").click(function(){
		$("#tess").attr('class','');
		$("#pointPayBox p,#pointPayBox input").hide();
		if ($("#pointPayBox input").val()=="") {
			// 支付失败显示失败图片
			$("#tess").removeClass('paySuccess').addClass('payFail');
		}else{
			// 支付成功显示成功图片
			$("#tess").removeClass('payFail').addClass('paySuccess');
			// 支付成功后等待 2s 自动跳到百度。。。
			setTimeout(function () { 
				window.location.href = "http://www.baidu.com";
			}, 2000);
		};
		
	});
});