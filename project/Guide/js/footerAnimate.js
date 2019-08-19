$(function(){
	var bodyClientWidth = document.documentElement.clientWidth, // window.innerWidth
		$footer = $("#footer"),
		$footerdiv = $("#footer div"),
		$footerbtn = $("#footerBtn"),
		dspeed = .6, // 底部菜单运动时间
		menuVal = true, // footer菜单键动画判断值
		transX = bodyClientWidth-42;
		
	var footertransX = new TimelineMax({}).set($footer, { x: transX }); // 设置底部菜单位置，让其显示提示箭头 
	
	// 底部菜单弹出动画部分
	$footerbtn.click(function(){
		if(menuVal){
			var footerAnimateShow = new TimelineMax({}) // 定义底部弹出菜单动画
				.to($footer, dspeed, { x: "-1px", opacity: 1, ease: Back.easeOut }, 0)
//				.to($footerdiv, dspeed, { borderRadius: "0px", ease: Linear.easeNone }, 0)
				.to($footerbtn, dspeed, { rotationZ: "+=180deg", ease: Back.easeOut }, 0);
			menuVal = false;
		}else{
			var footerAnimateHide = new TimelineMax({}) // 定义底部弹出菜单动画
				.to($footer, dspeed, { x: transX, opacity: .7, ease: Back.easeOut }, 0)
//				.to($footerdiv, dspeed, { borderRadius: "22px 0 0 22px", ease: Linear.easeNone }, 0)
				.to($footerbtn, dspeed, { rotationZ: "-=180deg", ease: Back.easeOut }, 0);
			menuVal = true;
		}
	});
});