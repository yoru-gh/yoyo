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
		// 当 transform 动画结束时执行
		if (event.propertyName == "transform") {
			if (this.className.indexOf("active") > -1) {
				sortBar.focus();
			} else {
				sortBar.blur();
				this.removeEventListener(transitionEventEnd, autoGetFocus);
			}
		}
	} else {
		console.log("您的设备大部分浏览器都不支持自动获取焦点");
	}
}

var loading = document.getElementById("loading");
var searchIcon = document.getElementById("searchIcon");
var getSearch = document.getElementById("getSearch");
var sortBox = document.getElementById("sortBox");
var sortBar = document.getElementById("sortBar");
var getSearch = document.getElementById("getSearch");

// 搜索按钮, 弹出搜索层
searchIcon.touch(function(event){
	sortBox.classList.add("active");
	sortBox.addEventListener(transitionEventEnd, autoGetFocus);
})

// 监听虚拟键盘搜索按钮搜索事件
sortBar.addEventListener("search", () => { searchActive() })
// 搜索按钮
getSearch.touch(() => { searchActive() })

function searchActive(){
	var focusEl = document.activeElement;
	if (focusEl.id == "sortBar") {
		sortBar.blur();
		// 延迟300毫秒执行的原因是等待虚拟键盘收起
		window.setTimeout(function(){
			loading.classList.add("active");
			window.setTimeout(function(){
				loading.classList.remove("active");
				sortBox.classList.remove("active");
			},2000)
		}, 300)
	} else {
		loading.classList.add("active");
		window.setTimeout(function(){
			loading.classList.remove("active");
			sortBox.classList.remove("active");
		},2000)
	}
}

// 关闭搜索层
var sortBack = document.getElementById("sortBack");
sortBack.touch(function(){
	var focusEl = document.activeElement;
	if (focusEl.id == "sortBar") {
		sortBar.blur();
		// 延迟200毫秒执行的原因是等待虚拟键盘收起
		window.setTimeout(function(){
			sortBox.classList.remove("active");
		}, 300)
	} else {
		sortBox.classList.remove("active");
	}
})

// 左栏选中
var sortLeft = document.getElementById("sortLeft");
sortLeft.touch(function(event){
	var target = event.target;
	if (target.nodeName.toLowerCase() == "span") {
		this.getElementsByClassName("active")[0].classList.remove("active");
		target.parentNode.classList.add("active");
	}
})