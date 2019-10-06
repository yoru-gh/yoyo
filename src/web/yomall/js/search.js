'use strict';
// 获取浏览器能识别的动画类型
var transitionEventEnd = checkTransitionEventEnd();
// 获取设备类型
var mobileType = checkMobileType();

// 点击搜索框自动获取焦点
function autoGetFocus(event){
	// ios 不是用该方法
	if (mobileType != "iPhone") {
		// transitionend 会记录当前对象的每个动画的结束，每个动画结束一次函数就执行一次
		// 当 width 动画结束时执行
		if (event.propertyName == "width") {
			if (this.className.indexOf("active") > -1) {
				inputBar.focus()
			} else {
				inputBar.blur();
				this.removeEventListener(transitionEventEnd, autoGetFocus);
			}
		}
	} else {
		console.log("您的设备大部分浏览器都不支持自动获取焦点");
	}
}

var searchTool = document.getElementById("searchTool");
var searchIcon = document.getElementById("searchIcon");
var inputBar = document.getElementById("inputBar");
searchIcon.addEventListener("click", function(){
	if (mobileType != "iPhone") {
		inputBar.focus();
	} else {
		console.log("您的设备大部分浏览器都不支持自动获取焦点");
	}
})

// window.setTimeout(function(){
// 	searchIcon.click();
// }, 1000)