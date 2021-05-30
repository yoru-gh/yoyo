$(function(){
	var $banner = $("#banner"),
		$setmenulist = $("#setmenulist"),
		$mask = $("#mask"),
		$sellist = $("#sellist"),
		bodyWidth = document.body.clientWidth;

	// 首页轮播
	$banner.css("height",bodyWidth); // 图片1:1
	var banner = new Swiper ('#banner', {
		loop : true, // 设置环路
		autoplay: 5000, // 自动播放
		autoplayDisableOnInteraction: false, // 点击或滑动后回复自动播放
		pagination: '.swiper-pagination', // 设置分页点
		lazyLoading: true, // 懒加载
		slidesPerView : 'auto', // 自动适应现实内容的个数
	});

	// 热点拖拽
	var hotlist = new Swiper('#hot', {
		lazyLoading: true, //懒加载
		direction : 'horizontal', //设置垂直向
		slidesPerView : 'auto', //自动适应现实内容的个数
		freeMode : true, //free模式
		freeModeMomentum : true, //反弹抵抗,
	});

	// 自定义套餐
	$setmenulist.on('tap', 'li', function(event) {
		event.preventDefault();
		$(this).addClass("point");
		$mask.addClass('maskshow');
		$sellist.addClass('active');
	});
	// 自定义套餐
	$sellist.on('tao', 'li', function(event) {
		event.preventDefault();
		$mask.removeClass('maskshow');
		$sellist.removeClass('active');
		$(".point").text($(this).text());
		$(".point").removeClass("point");
	});
})