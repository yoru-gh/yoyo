window.onload = function(){
	mui.init({
		keyEventBind: {
			menubutton: false // 禁用手机菜单键
		}
	});	
	// 获得侧滑主窗口webview对象
	var main = null;
	mui.plusReady(function () {
		main = plus.webview.currentWebview().opener();
	//	mui.fire(main,"activeTap");
	});
	function closeMenu () {
		mui.fire(main,"menu:swipeleft");
	};
	// 优化显示出来的侧滑菜单，只需监听该菜单的左滑事件，然后将其关闭即可；在菜单上右滑，不做任何操作；
	window.addEventListener("swipeleft", closeMenu);  
	mui.menu = closeMenu;
	mui.back = function() {
		closeMenu();
	};
	
	window.addEventListener("activeTap",function(){
		console.log(1);
	});
	
	var useredit = document.getElementById("useredit"),
		trail = document.getElementById("trail"),
		information = document.getElementById("information"),
		service = document.getElementById("service"),
		loginBtn = document.getElementById("loginBtn");
	// 修改个人信息
	useredit.addEventListener("tap", function(){
	//	window.addEventListener("mesedit", function(){
		mui.openWindow({
			id: 'mesedit.html',
		    url: 'mesedit.html',
		    styles: { top: '0px', bottom: '0px',
				hardwareAccelerated: true
			},
		    extras:{},
		    createNew: false,
		    show:{ autoShow: true, aniShow: 'zoom-fade-out', duration: 200 },
		    waiting:{ autoShow: true }
		});
		closeMenu();
	});
	// 我的轨迹
	trail.addEventListener("tap", function(){
	//	window.addEventListener("trail", function(){
		mui.toast('还没页面');
	});
	// 我的信息
	information.addEventListener("tap", function(){
	//	window.addEventListener("mes", function(){
		mui.openWindow({
			id: 'mes.html',
		    url: 'mes.html',
		    styles: { top: '0px', bottom: '0px',
				hardwareAccelerated: true
			},
		    extras:{},
		    createNew: false,
		    show:{ autoShow: true, aniShow: 'zoom-fade-out', duration: 200 },
		    waiting:{ autoShow: true }
		});
		closeMenu();
	});
	// 其他服务
	service.addEventListener("tap", function(){
	//	window.addEventListener("other", function(){
		mui.openWindow({
			id: 'other.html',
		    url: 'other.html',
		    styles: { top: '0px', bottom: '0px',
				hardwareAccelerated: true
			},
		    extras:{},
		    createNew: false,
		    show:{ autoShow: true, aniShow: 'zoom-fade-out', duration: 200 },
		    waiting:{ autoShow: true }
		});
		closeMenu();
	});
	
	loginBtn.addEventListener("tap", function(){
	//	window.addEventListener("login", function(){
		mui.openWindow({
			id: 'login.html',
		    url: 'login.html',
		    styles: { top: '0px', bottom: '0px',
				hardwareAccelerated: true
			},
		    extras:{},
		    createNew: false,
		    show:{ autoShow: true, aniShow: 'zoom-fade-out', duration: 200 },
		    waiting:{ autoShow: true }
		});
		closeMenu();
	});
}
