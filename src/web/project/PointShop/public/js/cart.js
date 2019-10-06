$(document).ready(function(){
	// 删除选中
	$("#deled").click(function(){
		if ($(".cked").length == 0) {
			alert("你还没选呢")
		}else{
			$(".cked").remove();
			if ($("#suborder .radioe").is(":checked")) {
				$("#suborder .radioe").removeClass('radioed');
				$("#suborder .radioe").prop('checked',false);
			};
			sumall();
		};
	});
	// 绑定页面模拟radio点击事件
	$("#goodslist").on("click", ".radioe", function(){
		if ($(this).hasClass('radioed')) {
			$(this).removeClass("radioed");
			// 为父级li添加标记cked，方便识别选中核算
			$(this).parent('span').parent('li').removeClass("cked");
		}else{
			$(this).addClass("radioed");
			$(this).parent('span').parent('li').addClass("cked");
		};

		var a = $("#goodslist > li").length, b = $(".cked").length;
		// 判断是否全选了
		if (a == b) {
			$("#suborder .radioe").addClass('radioed');
			$("#suborder .radioe").prop('checked',true)
		}else{
			$("#suborder .radioe").removeClass('radioed');
			$("#suborder .radioe").prop('checked',false);
		};
		sumall();
	});

	// 核算
	function sumall(){
		// 第一个是金额核算，第二个是积分核算
		var sumarr = new Array(0,0);
		$(".cked").each(function(){
			var a = parseInt($(this).find('.jine').text()),
			b = parseInt($(this).find('.jifen').text()),
			c= parseInt($(this).find('.shul').val())
			sumarr[0] = sumarr[0]+a*c;
			sumarr[1] = sumarr[1]+b*c;
		});
		// 显示核算结果
		$("#suma").text(sumarr[0]);
		$("#sumb").text(sumarr[1]);
	};
	
	// 改变数量
	$("#goodslist").on('click', '.minus', function(event) {
		event.preventDefault();
		if ($(this).siblings('.inp').children('input').val() < 2) {
			$(this).siblings('.inp').children('input').val(1);
		}else{
			$(this).siblings('.inp').children('input').val(parseInt($(this).siblings('.inp').children('input').val())-1);
		};
		if ($(this).parent('ul').parent('li').hasClass('cked')) {
			sumall();
		};
	});
	$("#goodslist").on('click', '.plus', function(event) {
		event.preventDefault();
		$(this).siblings('.inp').children('input').val(parseInt($(this).siblings('.inp').children('input').val())+1);
		if ($(this).parent('ul').parent('li').hasClass('cked')) {
			sumall();
		};
	});
	$("#goodslist .shul").change(function(event) {
		if ($(this).parent('ul').parent('p').parent('li').hasClass('cked')) {
			sumall();
		};
	});

	// 全选
	$("#suborder .radioe").click(function(){
		if ($(this).is(":checked")) {
			$(this).addClass('radioed');
			$("#goodslist .radioe").addClass('radioed');
			$("#goodslist > li").addClass('cked');
			$("#goodslist .radioe").prop('checked',true);
		}else{
			$(this).removeClass('radioed');
			$("#goodslist .radioe").removeClass('radioed');
			$("#goodslist > li").removeClass('cked');
			$("#goodslist .radioe").prop('checked',false);
		};
		sumall();
	});
});