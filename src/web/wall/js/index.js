'use strict';
// 获取浏览器能识别的动画类型
var transitionEventEnd = checkTransitionEventEnd();
// 获取设备类型
var mobileType = checkMobileType();

// 返回顶部
var returnTop = document.getElementById("returnTop");
// window.onscroll = throttle(function(){
// 	// var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
// 	var drc = getScrollDirection.Y();
// 	var scrollTop = window.pageYOffset;
// 	// 给没有绑定返回顶部事件的按钮绑定事件
// 	var isBind = returnTop.getAttribute("isbind");
// 	if (isBind == "false") {
// 		returnTop.touch(function(){
// 			// document.body.scrollTop = 0;
// 			easeRunToTop(); // 返回顶部函数
// 			this.classList.remove("active");
// 		});
// 		returnTop.setAttribute("isbind",true);
// 	}
// 	// 到达一定距离显示或隐藏发回顶部按钮
// 	if (drc && scrollTop > 400) {
// 		returnTop.classList.add("active");
// 	} else if (!drc && scrollTop < 200) {
// 		returnTop.classList.remove("active");
// 	}
// },300)