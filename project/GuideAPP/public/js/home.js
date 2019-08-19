mui.init({
	swipeBack: false
});

var oindex = null;
mui.plusReady(function(){
	oindex = plus.webview.currentWebview().opener();
});

// 监听加载状态
document.onreadystatechange = function(){
	if(document.readyState == "complete"){
		mui.fire(oindex,'openHome');
		console.log(document.readyState);
	}
};

window.onload = function(){		
	var bodyWidth = document.documentElement.clientWidth, // window.innerWidth
		bodyHeight = document.documentElement.clientHeight,
//		$videoBox = $("#videoBox"),
//		video = document.getElementById("myvideo"),
//		$video = $("#myvideo"),
//		$play = $("#playbtn"),
//		$pause = $("#pausebtn"),		
		$textContentUl = $("#textContent ul"),
		textContentUlLenght = $("#textContent ul li").length,
		textTransVal = 1,
		$active = $("#active"),
		$activeimg = $("#active img"),
		$footer = $("#footer"),
		$footerdiv = $("#footer div"),
		footerBtn = document.getElementById("footerBtn");
	
	// 顶部菜单动画
	var menuBtn = document.getElementById("menu");
	var menuPath = menuBtn.getElementsByTagName("path");
	var menuVal = false; // header菜单键动画判断值
	var popoverList = document.getElementById("popover"); // 
	menuBtn.addEventListener("tap",function(){
		if(!menuVal){
			// 判断安卓设备版本，回避低版本系统无法提供HTML5 的 DOM Element 对象具有 classList 属性的报错，同时取消按钮动画
			if((navigator.userAgent.indexOf("Android 4.1") > -1) || (navigator.userAgent.indexOf("Android 4.2")) > -1){}else{
				menuBtn.classList.add("active");
			};
			menuVal = true;
			popoverList.classList.add('popovershow'); // 显示顶部 menu
		}else{			
			if((navigator.userAgent.indexOf("Android 4.1") > -1) || (navigator.userAgent.indexOf("Android 4.2")) > -1){}else{
				menuBtn.classList.remove("active");
			};
			menuVal = false;
			popoverList.classList.remove('popovershow'); // 收起顶部 menu
		}
	});

	// 扫面二维码
	var scan = document.getElementById("scan");
	scan.addEventListener("tap", function(){
		mui.openWindow({
			id: 'scan.html',
		    url: 'scan.html',
			styles: {top: '0px',bottom: '0px', hardwareAccelerated: true},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'slide-in-bottom', duration: 200 },
		    waiting:{ autoShow: true }
		});
	});
	
	// 首页热点点击事件
	$("#active").on("tap", "div", function(){
		mui.openWindow({
			id: 'activeWarpper.html',
		    url: 'activeWarpper.html',
		    styles: {top: '0px',bottom: '0px',hardwareAccelerated: true},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'slide-in-right', duration: 200 },
		    waiting:{ autoShow: true }
		});
	});
	
	// 底部菜单部分
	var giftbtn = document.getElementById("gift"),
		callbtn = document.getElementById("call"),
		sharebtn = document.getElementById("share"),
		otherbtn = document.getElementById("other");
	// 活动页面
	giftbtn.addEventListener("tap", function(){
		mui.openWindow({
			id: 'active.html',
		    url: 'active.html',
		    styles: {top: '0px',bottom: '0px',hardwareAccelerated: true},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'pop-in', duration: 300 },
		    waiting:{ autoShow: true }
		});
	});
	// 呼叫导游页面
	callbtn.addEventListener("tap", function(){
		mui.openWindow({
			id: 'call.html',
		    url: 'call.html',
		    styles: {top: '0px',bottom: '0px',hardwareAccelerated: true},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'pop-in', duration: 200 },
		    waiting:{ autoShow: true }
		});
	});
	// 分享页面
	sharebtn.addEventListener("tap", function(){
		mui.toast('还没页面');
	});
	// 其他页面
	otherbtn.addEventListener("tap", function(){
		mui.openWindow({
			id: 'other.html',
		    url: 'other.html',
		    styles: {top: '0px',bottom: '0px',hardwareAccelerated: true},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'pop-in', duration: 200 },
		    waiting:{ autoShow: true }
		});
	});
	
	// 侧边菜单部分
	var main,menu,aside,mask = mui.createMask(),
		showMenu = false; // 侧栏菜单是否显示判断值
	// plusReady事件后，自动创建menu窗口；
	mui.plusReady(function() {
		main = plus.webview.currentWebview(); // 获取当前窗口对象
		aside = plus.webview.getWebviewById('menu.html');
//		plus.nativeUI.showWaiting( "等待中..." ); // 系统等待框
//		plus.nativeUI.closeWaiting();
		// setTimeout的目的是等待窗体动画结束后，再执行create webview操作，避免资源竞争，导致窗口动画不流畅；
		setTimeout(function () {
			// 侧滑菜单默认隐藏，这样可以节省内存；
			menu = mui.preload({
				id: 'menu.html',
				url: 'menu.html',
				styles: {
					left: '-80%',
					top: '0px',
					width: '80%'
				}
			});
		},300);
	});
	// 显示菜单菜单
	function openMenu() {
		mui.fire(aside,'activeTap');
		if (!showMenu) {
			// 侧滑菜单处于隐藏状态，则立即显示出来；显示完毕后，根据不同动画效果移动窗体；
			menu.show('none', 0, function() {
				menu.setStyle({
					left: '0%',
					transition: {duration: 200}
				});
			});
			mask.show();
			showMenu = true;
		};
		popoverList.classList.remove('popovershow');
	};
	// 关闭侧滑菜单（业务部分）
	function closeMenu() {
		if (showMenu) {
			// 关闭左菜单
			menu.setStyle({
				left: '-80%',
				transition: {duration: 200}
			});
			// 等窗体动画结束后，隐藏菜单webview，节省资源；
			setTimeout(function() {
				menu.hide();
				showMenu = false; // 改变标志位
			}, 300);	
		};
		mask.close();
	};
	// 点击左上角图标，打开侧滑菜单；
	var userBtn = document.getElementById("user");
	userBtn.addEventListener('tap', openMenu);
	// 在android4.4中的swipe事件，需要preventDefault一下，否则触发不正常，故，在dragleft，dragright中preventDefault
	window.addEventListener('dragleft', function(e) {
		e.detail.gesture.preventDefault();
	});
	// 主界面向左滑动，若菜单已显示，则关闭菜单；否则，不做任何操作；
//	window.addEventListener("swipeleft", closeMenu);
	// menu页面向左滑动，关闭菜单；
	window.addEventListener("menu:swipeleft", closeMenu);
	
	// 劫持 mui.js 里对遮罩层的点击事件 mui-backdrop 为 mui 下的遮罩层
	$('body').on('tap', '.mui-backdrop', function(){
		closeMenu();
	});
	
//	window.addEventListener("activeTap",function(){
//		console.log(1);
//	});
	
	// 劫持本页面的返回键
	var firstback = null; // 返回键判断值，再点退出应用
	mui.back = function() {
		if (!firstback) {
			firstback = new Date().getTime();
			mui.toast('再次点击退出应用');
			setTimeout(function() {
				firstback = null;
			}, 1000);
		} else {
			if (new Date().getTime() - firstback < 1000) {
				plus.runtime.quit();
			}
		}
	};
};
