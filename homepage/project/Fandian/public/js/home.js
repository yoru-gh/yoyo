mui.init({
	swipeBack: false
});
$(function(){
	var $banner = $("#banner"),
		iamuser = document.getElementById("iamuser"),
		iamwaiter = document.getElementById("iamwaiter"),
		bodyWidth = document.body.clientWidth;

	// 首页轮播
	$banner.css("height",3*bodyWidth/4);
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
	
	// 用户入口
	iamuser.addEventListener("tap", function(){
		mui.openWindow({
			id:'menu.html',
		    url:'menu.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'pop-in',duration:300},
		    waiting:{autoShow:true}
		});
	});
	// 服务员入口
	iamwaiter.addEventListener("tap", function(){
		mui.openWindow({
			id:'login.html',
		    url:'login.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'pop-in',duration:300},
		    waiting:{autoShow:true}
		});
	});
	// 首页轮播点击
	mui("#banner").on("tap", ".swiper-slide", function(){
		mui.openWindow({
			id:'food.html',
		    url:'food.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'pop-in',duration:300},
		    waiting:{autoShow:true}
		});
	});
	// 首页推荐点击
	mui("#hot").on("tap", ".swiper-slide", function(){
		mui.openWindow({
			id:'food.html',
		    url:'food.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'pop-in',duration:300},
		    waiting:{autoShow:true}
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