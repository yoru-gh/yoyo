$(function(){
	mui.plusReady(function(){
		var thisView = plus.webview.currentWebview();
		// 监听返回键关闭当前 webview
		mui.back = function() {
			thisView.close();
		};
	})
	var $user = $("#user"),
		$headerAnimateSpan = $("#animate span"),
		menuVal = true, // footer菜单键动画判断值
		headerAnimateA = new TimelineMax({
			delay: .5
		});
	// 底部菜单部分
	var giftbtn = document.getElementById("gift"),
		callbtn = document.getElementById("call"),
		sharebtn = document.getElementById("share"),
		otherbtn = document.getElementById("other");
		
	var $active = $("#active"),
		$activeimg = $("#active img");
		
	$activeimg.height($activeimg.width()/2); // 保持首页热点图片宽高比为 2:1

	// 分类点击事件
	mui("#classify").on("tap", "li", function(){
		$(this).addClass('taped').siblings('li').removeClass('taped');
	});
	
	// 首页热点点击事件
	mui("#active").on("tap", "div", function(){
		mui.openWindow({
			id: 'void.html',
		    url: 'void.html',
		    styles: {
				top: '0px',
				bottom: '0px',
				bounce: 'vertical',
				hardwareAccelerated: true
			},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'slide-in-right', duration: 200 },
		    waiting:{ autoShow: true }
		});
	});
	
	// 底部菜单打开新页面
	// 活动页面
	giftbtn.addEventListener("tap", function(){
		mui.toast('已经到了...');
	});
	// 呼叫导游页面
	callbtn.addEventListener("tap", function(){
		mui.openWindow({
			id: 'void.html',
		    url: 'void.html',
		    styles: {
				top: '0px',
				bottom: '0px',
				bounce: 'vertical',
				hardwareAccelerated: true
			},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'slide-in-right', duration: 200 },
		    waiting:{ autoShow: true }
		});
	});
	// 分享页面
	sharebtn.addEventListener("tap", function(){
		mui.openWindow({
			id: 'void.html',
		    url: 'void.html',
		    styles: {
				top: '0px',
				bottom: '0px',
				bounce: 'vertical',
				hardwareAccelerated: true
			},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'slide-in-right', duration: 200 },
		    waiting:{ autoShow: true }
		});
	});
	// 其他页面
	otherbtn.addEventListener("tap", function(){
		mui.openWindow({
			id: 'void.html',
		    url: 'void.html',
		    styles: {
				top: '0px',
				bottom: '0px',
				bounce: 'vertical',
				hardwareAccelerated: true
			},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'slide-in-right', duration: 200 },
		    waiting:{ autoShow: true }
		});
	});
});
