$(document).ready(function(){
	// $(function() {
	// // 去除300ms延迟
	// 	FastClick.attach(document.body);
	// });
	var viewHei = $(window).height();
	$('#swiperBody').css('height',viewHei-45);
	$('#showList img').css('height',$('#showList img').outerWidth(true));
	//首页轮播插件
	var navSwiper = new Swiper('#banner', {
		loop : true, //设置环路
		autoplay: 5000, //自动播放
		autoplayDisableOnInteraction: false, //点击或滑动后回复自动播放
		pagination: '.swiper-pagination', //设置分页点
		lazyLoading: true, //懒加载
		slidesPerView : 'auto', //自动适应现实内容的个数
	});

	// 主体下来刷新上拉加载
	var conSwiper = new Swiper('#swiperBody', {
		lazyLoading: true, //懒加载
		direction : 'vertical', //设置垂直向
		slidesPerView : 'auto', //自动适应现实内容的个数
		freeMode : true, //free模式
		freeModeMomentum : true, //反弹抵抗,
		onSetTranslate: function(swiper){
			// 监听swiperBody的偏移量
			positinScreen(Math.round(conSwiper.getWrapperTranslate('y')));
		},
		onTouchEnd: function(swiper){
			// 判断是否到达底部 isBeginning 和 isEnd 分别为顶部和底部
			if (conSwiper.isEnd){
				upLoad();
				// 动态生成新的数据后重新初始化拖拽
				listUpdate();
			};
		}
	});

	// 监听页面是否在运动
	var checkAnimating = function (){
		if (conSwiper.animating) {
			// 获取卷起高度
			positinScreen(Math.round(conSwiper.getWrapperTranslate('y')));
		};
	};
	setInterval(checkAnimating, 100);

	function positinScreen(a){
		// 定位首页显示帅选栏
		if (a < -226) {
			if ($("#screenBox").hasClass('fly')) {
				return false
			}else{
				var b = $("#screenBox").clone(true);
				$("#screenBox").remove();
				$("#content").append(b);
				$("#screenBox").addClass('fly');
				// 显示返回头部按钮
				$("#returnTop").show();
			};			
		}else if(a > -226){
			if ($("#screenBox").hasClass('fly')) {
				var b = $("#screenBox").clone(true);
				$("#screenBox").remove();
				$("#screenWarpBox").append(b);
				$("#screenBox").removeClass('fly');
				// 隐藏返回头部按钮
				$("#returnTop").hide();
			}else{
				return false
			};
		};
	};

	// 计算显示商品的高度
	function listUpdate(){
		$('#showList li').css("height",($('#showList li').outerWidth())+55);
		var a = $('#showList li').outerHeight(true),
		b = Math.ceil($('#showList li').length / 2);
		$('#swiperBodyLi').css("height",a*b+293)
		conSwiper.update();
	};
	// 动态生成新的数据后重新初始化拖拽
	listUpdate();

	// 上拉加载函数
	function upLoad(){
		$('#showList').append('<li><a href="detail.html"><img src="../public/img/phone.jpg"></a><p>2016最新款 iPhone pro 双摄像头 A10 处理器 256G 内存</p><span>目标人数: 88888</span><span>参与人数: 88888</span><p><span>积分：<b>35</b> 现金：<b>10</b></span></p><button></button></li><li><a href="detail.html"><img src="../public/img/phone.jpg"></a><p>2016最新款 iPhone pro 双摄像头 A10 处理器 256G 内存</p><span>目标人数: 88888</span><span>参与人数: 88888</span><p><span>积分：<b>35</b> 现金：<b>10</b></span></p><button></button></li><li><a href="detail.html"><img src="../public/img/phone.jpg"></a><p>2016最新款 iPhone pro 双摄像头 A10 处理器 256G 内存</p><span>目标人数: 88888</span><span>参与人数: 88888</span><p><span>积分：<b>35</b> 现金：<b>10</b></span></p><button></button></li><li><a href="detail.html"><img src="../public/img/phone.jpg"></a><p>2016最新款 iPhone pro 双摄像头 A10 处理器 256G 内存</p><span>目标人数: 88888</span><span>参与人数: 88888</span><p><span>积分：<b>35</b> 现金：<b>10</b></span></p><button></button></li>');
	};

	// 头部刷新按钮
	$("#refresh").click(function(){
		window.location.reload();
	});
 
	// 首页显示筛选选中效果
	$("#screenBox").on('click', 'li', function(event) {
		event.preventDefault();
		$(this).addClass('seled').siblings('li').removeClass('seled');
	});

	// 返回展示顶部
	$("#returnTop").on('click', function(event) {
		conSwiper.setWrapperTranslate(-226);
	});

	// 商品收藏按钮
	$("#showList").on('click', 'li button', function(event) {
		event.preventDefault();
		if ($(this).hasClass('coll')) {
			$(this).removeClass('coll');
			tip(2000,"取消收藏成功");
		}else{
			$(this).addClass('coll');
			tip(2000,"收藏成功");
		};
	});
});