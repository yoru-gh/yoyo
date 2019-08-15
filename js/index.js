'use strict';
!(function(){
	var DEVICE = checkMobileType();

	var content = document.getElementById("content");
	content.addEventListener("touchmove", event => {
		event.preventDefault()
	}, {passive: false})

	var background = document.getElementById("background");
	var spanList = background.getElementsByTagName("span");

	var lateX = 0, lateY = 0, moveX = 0, moveY = 0;
	var first = true;

	function deviceMotionHandler(DeviceMotionEvent) {
		var acceleration = DeviceMotionEvent.accelerationIncludingGravity;
		// console.log(DeviceMotionEvent)
		var x = acceleration.x || 0; // 竖屏时左倾大于零
		var y = acceleration.y || 0; // 横屏时左倾小于零
		x = x.toFixed(2);
		y = y.toFixed(2);
		
		lateX = x*10;
		lateY = y*9;
		if (Math.abs(moveX-lateX) > 10 || Math.abs(moveY-lateY) > 10 || first) {
			first = false;
			moveX = lateX;
			moveY = lateY;

			spanList[0].style.transform = "translate3d("+-(moveX*.5)+"px, "+-(moveY*.5)+"px, 0px)";
			spanList[1].style.transform = "translate3d("+moveX+"px, "+moveY+"px, 0px)";
			spanList[2].style.transform = "translate3d("+-(moveX*.5)+"px, "+-(moveY*.5)+"px, 0px)";
			spanList[3].style.transform = "translate3d("+(moveX*.7)+"px, "+(moveY*.7)+"px, 0px)";
		}
	}

	var UA = navigator.userAgent;
	if (UA.indexOf("Chrome") > -1) {
		var CHROME_VER_REX = /Chrome\/[\d.]+/gi;
		var BVer = parseInt(UA.match(CHROME_VER_REX)[0].split("/")[1]) || 60;
	}
	if (window.DeviceMotionEvent && DEVICE == "Android" && BVer > 64) {
		window.setTimeout(function(){
			background.classList.add("motion");
			background.classList.remove("active");
			// devicemotion API 只是个实验性功能, Chrome 未来将会移除该 API
			window.addEventListener('devicemotion', deviceMotionHandler, false);
			window.addEventListener("compassneedscalibration", event => { // 校准
				event.preventDefault();
			}, true);
		}, 6200)
	}

	window.setTimeout(function(){
		background.classList.add("active")
	}, 100)
}())