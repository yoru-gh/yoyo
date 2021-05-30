mui.init({
	swipeBack: false
});
$(function(){
	var closebtn = document.getElementById("close"),
	 	forgetpass = document.getElementById("forgetpass"),
	 	orderPage = document.getElementById("orderPage"),
	 	waiterPage = document.getElementById("waiterPage"),
	 	openTable = document.getElementById("openTable");
	 
	 // 退出
	 closebtn.addEventListener("tap", function(){
	 	mui.openWindow({
			id:'login.html',
		    url:'login.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'zoom-fade-out',duration:200},
		    waiting:{autoShow:true}
		});
	 });
	 // 修改密码
	 forgetpass.addEventListener("tap", function(){
	 	mui.openWindow({
			id:'forget.html',
		    url:'forget.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'zoom-fade-out',duration:200},
		    waiting:{autoShow:true}
		});
	 });
	 // 订单详细
	 orderPage.addEventListener("tap", function(){
	 	mui.openWindow({
			id:'order.html',
		    url:'order.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'zoom-fade-out',duration:200},
		    waiting:{autoShow:true}
		});
	 });
	 // 服务员菜单
	 waiterPage.addEventListener("tap", function(){
	 	mui.openWindow({
			id:'waiterMenu.html',
		    url:'waiterMenu.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'zoom-fade-out',duration:200},
		    waiting:{autoShow:true}
		});
	});
	 // 开台
	 openTable.addEventListener("tap", function(){
	 	mui.openWindow({
			id:'open.html',
		    url:'open.html',
		    styles: {top:'0px',bottom:'0px',
				hardwareAccelerated:true
			},
		    extras:{},
		    createNew:false,
		    show:{autoShow:true,aniShow:'zoom-fade-out',duration:200},
		    waiting:{autoShow:true}
		});
	 });
})