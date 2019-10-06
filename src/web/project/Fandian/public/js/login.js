mui.init({
	swipeBack: false
});
$(function(){
	var forgetpass = document.getElementById("forgetpass"),
		login = document.getElementById("login"),
		register = document.getElementById("register");
	
	register.addEventListener("tap", function(){
		mui.openWindow({
			id:'register.html',
		    url:'register.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'slide-in-right',duration:200},
		    waiting:{autoShow:true}
		});
	})
});
