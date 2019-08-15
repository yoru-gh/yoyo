'use strict';
// 获取浏览器能识别的动画类型
var transitionEventEnd = checkTransitionEventEnd();
// 获取设备类型
var mobileType = checkMobileType();

var menu = document.getElementById("menu");
var sideMenu = document.getElementById("sideMenu");
var sideMenuWrap = document.getElementById("sideMenuWrap");
var smWrap = document.getElementById("smWrap");

var scrollActive = new SuperScroll({
	el: sideMenuWrap,
	rebound: false
})

// 用来阻止弹出层滑动时 body 的滑动
sideMenu.addEventListener("touchmove", function(event){
	var target = event.target;
	if (target.id == "sideMenu") {
		event.preventDefault();
	}
}, {passive:false})


// 点击弹出层遮罩部分收起弹出层
sideMenu.touch(function(event){
	var target = event.target;
	if (target.id == "sideMenu") {
		sideMenu.classList.remove("active");
	}
})
// 打开侧边菜单
menu.touch(function(){
	sideMenu.classList.add("active");
})