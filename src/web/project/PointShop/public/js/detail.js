$(document).ready(function(){
	var viewWid = $(window).width();
	$('#banner,#banner img').css('height',viewWid);
	var navSwiper = new Swiper('#banner', {
		loop : true, //设置环路
		autoplay: 5000, //自动播放
		autoplayDisableOnInteraction: false, //点击或滑动后回复自动播放
		pagination: '.swiper-pagination', //设置分页点
		lazyLoading: true, //懒加载
		slidesPerView : 'auto', //自动适应现实内容的个数
	});

	// 商品收藏按钮
	$("#collection").click(function(event) {
		event.preventDefault();
		if ($(this).hasClass('coll')) {
			$(this).removeClass('coll');
			tip(2000,"取消收藏成功");
		}else{
			$(this).addClass('coll');
			tip(2000,"收藏成功");
		};
	});

	// 显示属性选择面板
	$("#cashwayBtn,#twowayBtn,#pointwayBtn").click(function(){
		event.preventDefault();
		$("#attrMark").addClass('markshow');
	});
	// 关闭属性选择面板
	$("#closeMark").click(function(){
		$("#attrMark").removeClass('markshow');
	});

	// 参与一元购
	$("#luckyjoin").click(function(){
		tip(2000,"参加成功");
	});

	// 属性选择
	$("#attrWarp").on('click', 'li span', function(event) {
		event.preventDefault();
		$(this).addClass('spaned').siblings('span').removeClass('spaned');
	});

	// 查看详细按钮
	$("#readmore").click(function(){
		$(this).hide();
		$("#more").show();
	});

	// 返回顶部
	$("#returnTop").click(function () {
		$('body,html').animate({ scrollTop: 0 }, 300);
		$(this).hide();
		return false;
	});
	// 监听页面卷起高度
	$(window).scroll(function(event) {
		if ($(document).scrollTop() > 400) {
			$("#returnTop").show();
		}else if($(document).scrollTop() < 380) {
			$("#returnTop").hide();
		};
	});

	// 改变数量
	$("#minus span").click(function(){
		if (parseInt($("#inp input").val()) < 2) {
			$("#inp input").val(1);
		}else{
			$("#inp input").val(parseInt($("#inp input").val())-1);
		};
	});
	$("#plus span").click(function(){
		$("#inp input").val(parseInt($("#inp input").val())+1);
	});
});