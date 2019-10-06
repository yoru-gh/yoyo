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
// 搜索按钮
searchIcon.touch(function(event){
	var isShow = this.getAttribute("active")
	if (isShow == "hide") {
		this.setAttribute("active","show")
		this.classList.add("active");
		// 
		searchTool.classList.add("active");

		searchTool.addEventListener(transitionEventEnd, autoGetFocus);

		// 
		displayBottomButton("fab","show");
	} else {
		this.setAttribute("active","hide")
		this.classList.remove("active");
		// 
		searchTool.classList.remove("active");

		// 
		displayBottomButton("fab","hide");
	}
})

// 搜索框搜索事件
inputBar.addEventListener("search", function(){
	searchIcon.setAttribute("active","hide")
	searchIcon.classList.remove("active");
	// 
	searchTool.classList.remove("active");

	// 
	displayBottomButton("fab","hide");
})
inputBar.addEventListener("blur", function(){
	searchIcon.setAttribute("active","hide")
	searchIcon.classList.remove("active");
	searchTool.classList.remove("active");
	displayBottomButton("fab","hide");
})

var historyBack = document.getElementById("historyBack");

// 隐藏底部俩按钮
function displayBottomButton(IDstr,tag){
	if (tag == "show") {
		historyBack.classList.add("fadeOut");
		footer.classList.add("fadeOut");
		footerFab.classList.add("fadeOut");
	} else {
		historyBack.classList.remove("fadeOut");
		footer.classList.remove("fadeOut");
		footerFab.classList.remove("fadeOut");
	}
}

var footerFab = document.getElementById("footerFab");
var footer = document.getElementById("footer");

// 打开底部菜单
// var openMenu = document.getElementById("openMenu");
footerFab.touch(function(){
	var hasClass = footerFab.className.indexOf("active")
	if (hasClass > -1) {
		footerFab.classList.remove("active");
		footer.classList.remove("active");
	} else {
		footerFab.classList.add("active");
		footer.classList.add("active");
	}
})

var sortLeft = document.getElementById("sortLeft");
var sortRight = document.getElementById("sortRight");
sortLeft.touch(function(event){
	var target = event.target;
	if (target.nodeName.toLowerCase() == "span") {
		this.getElementsByClassName("active")[0].classList.remove("active");
		target.parentNode.classList.add("active");
	}
})