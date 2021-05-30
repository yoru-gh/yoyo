$(document).ready(function(){
	var viewHei = $(window).height();
	$('#swiperBody').css('height',viewHei-74);
	// $('#showList img').css('height',$('#showList img').outerWidth(true));
	//首页轮播插件
	var navSwiper = new Swiper('#nav', {
		slidesPerView : 'auto',
		freeMode : true,
		freeModeMomentum : false
	});

	// 分类选中效果
	$('#nav ul li,#menu ul li').on('click',function(){
		var thisInd = $(this).index();
		$('#nav ul li').eq(thisInd).addClass('selectLi').siblings('li').removeClass('selectLi');
		$('#menu ul li').eq(thisInd).addClass('selectLi').siblings('li').removeClass('selectLi');
	});

	// 显示关闭分类菜单
	$('#menuMore span').click(function(){
		var spanVal = $(this).attr('value');
		if(spanVal == 0){
			$(this).removeClass('reRotateSpan').addClass('rotateSpan');
			$('#menu').slideDown('fast');
			$(this).attr('value',1);
		}else{
			$(this).removeClass('rotateSpan').addClass('reRotateSpan');
			$('#menu').slideUp('fast');
			$(this).attr('value',0);
		};
	});

	// 主体下来刷新上拉加载
	var conSwiper = new Swiper('#swiperBody', {
		lazyLoading: true,
		direction : 'vertical',
		slidesPerView : 'auto',
		freeMode : true,
		freeModeMomentum : true,
		onSetTranslate: function(swiper){
			// 监听swiperBody的偏移量
			positinScreen(Math.round(conSwiper.getWrapperTranslate('y')));
		},
		onTouchEnd: function(swiper){
			// isBeginning 和 isEnd 分别为顶部和底部
			var a = Math.round(conSwiper.getWrapperTranslate('y'));
			// 判断下拉刷新
			if (a > 30 && conSwiper.isBeginning) {
				window.location.reload();
			};
			// 判断上拉加载
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
			positinScreen(Math.round(conSwiper.getWrapperTranslate('y')));
		};
	};
	setInterval(checkAnimating, 100);

	function positinScreen(a){
		// 判断偏移量显示隐藏返回展示头部按钮
		if (a < -300) {
			if ($("#retuenTop").is(':visible')) {
				return false
			}else{
				$("#retuenTop").show();
			};		
		}else{
			if ($("#retuenTop").is(':visible')) {
				$("#retuenTop").hide();
			}else{
				return false
			};	
		};
	};

	// 计算显示商品的高度
	function listUpdate(){
		var a = $('#showList li').outerHeight(true),
		b = Math.ceil($('#showList li').length);
		$('#swiperBodyLi').css("height",a*b)
		conSwiper.update();
	};
	// 动态生成新的数据后重新初始化拖拽
	listUpdate();

	// 上拉加载函数
	function upLoad(){
		$('#showList').append('<li><a href=""><img src="../public/img/phone.jpg"></a><p>积分：<b>35</b> 现金：<b>10</b></p><p>2016最新款 iPhone pro 双摄像头 A10 处理器 256G 内存 颜色随机</p><span>目标人数: 88888&nbsp;&nbsp;&nbsp;参与人数: 88888</span><span>剩余揭晓时间: <b>02:23:54</b></span></li><li><a href=""><img src="../public/img/phone.jpg"></a><p>积分：<b>35</b> 现金：<b>10</b></p><p>2016最新款 iPhone pro 双摄像头 A10 处理器 256G 内存 颜色随机</p><span>目标人数: 88888&nbsp;&nbsp;&nbsp;参与人数: 88888</span><span>剩余揭晓时间: <b>02:23:54</b></span></li><li><a href=""><img src="../public/img/phone.jpg"></a><p>积分：<b>35</b> 现金：<b>10</b></p><p>2016最新款 iPhone pro 双摄像头 A10 处理器 256G 内存 颜色随机</p><span>目标人数: 88888&nbsp;&nbsp;&nbsp;参与人数: 88888</span><span>剩余揭晓时间: <b>02:23:54</b></span></li><li><a href=""><img src="../public/img/phone.jpg"></a><p>积分：<b>35</b> 现金：<b>10</b></p><p>2016最新款 iPhone pro 双摄像头 A10 处理器 256G 内存 颜色随机</p><span>目标人数: 88888&nbsp;&nbsp;&nbsp;参与人数: 88888</span><span>剩余揭晓时间: <b>02:23:54</b></span></li>');
	};

	// 返回展示顶部
	$("#retuenTop").on('click', function(event) {
		conSwiper.setWrapperTranslate(0);
	});

	// 立即参与按钮
	$("#showList").on('click', '.haBtn', function(event) {
		event.preventDefault();
		alert("立即参与");
	});
});