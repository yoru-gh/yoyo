$(function(){
	var forgetpass = document.getElementById("forgetpass"),
		login = document.getElementById("login"),
		register = document.getElementById("register");
		
	forgetpass.addEventListener("tap", function(){
		mui.openWindow({
			id: 'forget.html',
		    url: 'forget.html',
		    styles: { top: '0px', bottom: '0px', bounce: 'vertical',
//				hardwareAccelerated: true
			},
		    extras:{},
		    createNew: false,
		    show:{ autoShow: true, aniShow: 'zoom-fade-out', duration: 200 },
		    waiting:{ autoShow: true }
		})
	});
	
	login.addEventListener("tap", function(){
		mui.toast('还没页面');
	});
	
	register.addEventListener("tap", function(){
		mui.openWindow({
			id: 'register.html',
		    url: 'register.html',
		    styles: { top: '0px', bottom: '0px', bounce: 'vertical',
//				hardwareAccelerated: true
			},
		    extras:{},
		    createNew: false,
		    show:{ autoShow: true, aniShow: 'zoom-fade-out', duration: 200 },
		    waiting:{ autoShow: true }
		})
	});
});
