mui.init({
	swipeBack: false
});
$(function(){
	var $menu = $("#menu"),
		$aside = $("aside"),
		$mask = $("#mask"),
		$toast = $("#toast"),
		$car = $("#car"),
		$gocar = $("#gocar"),
		$goprice = $("#goprice"),
		$gopricei = $("#gopricei");
	var $banner = $("#banner"),
		menuWarpper = document.getElementById("menuWarpper"),
		userCenter = document.getElementById("userCenter"),
		orderPage = document.getElementById("orderPage"),
		weightPage = document.getElementById("weightPage"),
		bodyWidth = document.body.clientWidth;

	// 左上角菜单按钮点击事件
	$menu[0].addEventListener("tap",function(){
		if ($menu.attr("value")=="true") {
			$menu.attr("class","menuchange");
			$menu.attr("value",false);
			menushow();
		}else{
			$menu.attr("class","menureset");
			$menu.attr("value",true);
			menuhide();
		};	
	});
	$mask[0].addEventListener("tap",function(){
		$menu.attr("class","menureset");
		$menu.attr("value",true);
		menuhide();		
	});
	// 菜单显示关闭
	function menushow(){	
		$aside.addClass("asideshow");
		$mask.addClass("maskshow");
	};
	function menuhide(){
		$aside.removeClass("asideshow");		
		$mask.removeClass("maskshow");
	};

	// 左边分类选择
	mui("#classify").on('tap', 'ul li', function(event) {
		event.preventDefault();
		var ythis = $(this);
		yconfirmshow("你确定要选这个分类？", function(){
			ythis.addClass("classed").siblings('li').removeClass("classed");
		});	
	});
	
	// 主体下来刷新上拉加载
	var menuWarpper = new Swiper('#menuWarpper', {
		topTranslate: 0,
		bottomTranslate: 0,
		lazyLoading: true,
		direction : 'vertical',
		slidesPerView : 'auto',
		freeMode : true,
		freeModeMomentum : true,
		onTouchEnd: function(swiper){
			// isBeginning 和 isEnd 分别为顶部和底部
			topTranslate = Math.round(menuWarpper.getWrapperTranslate('y'));
		},
		onTransitionEnd: function(swiper){
			// isBeginning 和 isEnd 分别为顶部和底部
			// 判断下拉偏移量超过80px时刷新
			if (topTranslate > 80) {
				window.location.reload(); // 刷新页面
			};
			// 判断上拉加载
			if (menuWarpper.isEnd){
				upLoad();
			};
		},
		onSetTranslate: function(swiper){
			// 监听swiperBody的偏移量
			// positinScreen(Math.round(menuWarpper.getWrapperTranslate('y')));
		},
	});


	var uu = '<li class="swiper-slide"><a href="food.html"><img src="img/img.jpg"><h3 class="fname">2016年新款汉堡</h3><p class="fprice">88元/份</p></a><p class="ftext">简介：2016年最新款汉堡</p><ul class="buybtn"><li class="minus"></li><li class="text">0</li><li class="plus" value="true"></li></ul></li><li class="swiper-slide"><a href="food.html"><img src="img/img.jpg"><h3 class="fname">2016年新款汉堡</h3><p class="fprice">88元/份</p></a><p class="ftext">简介：2016年最新款汉堡</p><ul class="buybtn"><li class="minus"></li><li class="text">0</li><li class="plus" value="true"></li></ul></li><li class="swiper-slide"><a href="food.html"><img src="img/img.jpg"><h3 class="fname">2016年新款汉堡</h3><p class="fprice">88元/份</p></a><p class="ftext">简介：2016年最新款汉堡</p><ul class="buybtn"><li class="minus"></li><li class="text">0</li><li class="plus" value="true"></li></ul></li>';
	// 上拉加载函数
	function upLoad(){
		$("#menuWarpper .swiper-wrapper").append(uu);
		menuWarpper.update(); // 动态生成新的数据后重新初始化拖拽，此句放在此函数最后
	};

	// 加一份菜
	mui("#menuWarpper").on("tap", "li.plus", function(event) {
		event.preventDefault();
		var p = $(this).parent('.buybtn').children();
		if ($(this).attr("value") == "true") {
			p[0].classList.add('minusshow');
			p[1].classList.add('textshow');
			p[1].setAttribute("value",true);
			p[1].innerHTML = 1;
			p[2].setAttribute("value",false);
		}else{
			p[1].innerHTML = parseInt(p[1].innerHTML) + 1;
		};
		pagesum();
	});
	// 减一份菜
	mui("#menuWarpper").on("tap", "li.minus", function(event) {
		event.preventDefault();
		var p = $(this).parent('.buybtn').children();
		if (parseInt(p[1].innerHTML) < 2) {
			p[0].classList.remove('minusshow');
			p[1].classList.remove('textshow');
			p[1].setAttribute("value",false);
			p[2].setAttribute("value",true);
		}else{
			p[1].innerHTML = parseInt(p[1].innerHTML) - 1;
		};
		pagesum();
	});
	// 进入菜式详细
	mui("#menuWarpper").on("tap", ".swiper-slide a", function(event) {
		event.preventDefault();
		mui.openWindow({
			id:'food.html',
		    url:'food.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,duration:300},
		    waiting:{autoShow:true}
		});
	});
	// 用户中心
	userCenter.addEventListener("tap", function(){
		mui.openWindow({
			id:'user.html',
		    url:'user.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,duration:200},
		    waiting:{autoShow:true}
		});
	});
	// 订单
	orderPage.addEventListener("tap", function(){
		mui.openWindow({
			id:'order.html',
		    url:'order.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,duration:200},
		    waiting:{autoShow:true}
		});
	});
	// 称重
	weightPage.addEventListener("tap", function(){
		mui.openWindow({
			id:'weight.html',
		    url:'weight.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,duration:200},
		    waiting:{autoShow:true}
		});
	});
	// 计算数量及总价
	function pagesum(){
		$gocar.text(0); // 重置总数量
		$gopricei.text(0); // 重置总价格
		$("#menuWarpper .text").each(function(){
			if($(this).attr("value") == "true"){
				var a = parseInt($(this).text()),
					b = parseInt($(this).parent("ul").siblings('a').find('i').text());
				$gocar.text(parseInt($gocar.text()) + a); // 计算数量
				$gopricei.text(parseInt($gopricei.text()) + a*b); // 计算价格			
			};
		});
	};

	$car[0].addEventListener("tap",function(){
		yconfirmshow("你确定要跳到购物车？", function(){
			mui.openWindow({
				id:'order.html',
			    url:'order.html',
			    styles: {top:'0px',bottom:'0px',
					hardwareAccelerated:true
				},
			    extras:{},
			    createNew:false,
			    show:{autoShow:true,duration:200},
			    waiting:{autoShow:true}
			});
		});
	});
	
	// 劫持本页面的返回键
	var firstback = null;
	mui.back = function() {
		if (!firstback) {
			firstback = new Date().getTime();
			mui.toast('再次点击退出');
			setTimeout(function() {
				firstback = null;
			}, 1000);
		} else {
			if (new Date().getTime() - firstback < 1000) {
				plus.runtime.quit();
			}
		}
	};
})