'use strict';
var mask = document.getElementById("mask");

var goSearch = document.getElementById("goSearch");
var inputSearch = document.getElementById("inputSearch");
var cancelBtn = document.getElementById("cancelBtn");
// 搜索操作
tap(goSearch,function(){
	goSearch.style.display = "none";
	inputSearch.style.display = "block";
	cancelBtn.style.display = "block";
	inputSearch.focus();
})
// 取消操作
tap(cancelBtn,function(){
	goSearch.style.display = "block";
	inputSearch.style.display = "none";
	cancelBtn.style.display = "none";
	inputSearch.value = null;
	inputSearch.blur();
})
// 利用键盘自带的确认按钮监听输入框
inputSearch.addEventListener("change",function(){
	tip(inputSearch.value);
})

// 常用分类选择
var screenNav = document.getElementById("screenNav");
tap(screenNav,function(){
	var target = event.target || event.srcElement;
	screenNav.querySelector(".active").classList.remove("active");
	target.classList.add("active");
	//
	load.addBox("加载中...");
	setTimeout(function(){load.removeBox()},2000);
})

// 更多分类选择窗口弹出操作
var more = document.getElementById("more");
var moreScreen = document.getElementById("moreScreen");
var screenList = document.getElementById("screenList");
var screenCancel = document.getElementById("screenCancel");
var screenComplate = document.getElementById("screenComplate");
tap(more,function(){ // 打开操作
	mask.classList.add("active");
	moreScreen.classList.add("active");
})
// 关闭面板
tap(moreScreen,function(){
	var target = event.target || event.srcElement;
	if (target.id == "moreScreen" || target.id == "screenCancel") { // 关闭操作
		mask.classList.remove("active");
		moreScreen.classList.remove("active");
	} else if (target.id == "screenComplate") { // 确认操作
		var activeDom = screenList.querySelector(".active");
		if (activeDom == undefined) {
			tip("请先选择分类");
		} else {
			tip("你选择了"+activeDom.innerText);
			load.addBox("加载中..."); // 添加加载提示
			setTimeout(function(){load.removeBox()},2000); // 2s后移除加载提示
			mask.classList.remove("active");
			moreScreen.classList.remove("active");
		}	
	}
})
// 弹出窗选择分类操作
tap(screenList,function(){
	var target = event.target || event.srcElement;
	if (target.className != "title") {
		var activeDom = screenList.querySelector(".active");
		activeDom == undefined ? null : activeDom.classList.remove("active");
		target.classList.add("active");
	}
})

// 刷新以及返回顶部
var searchContainer = document.getElementById("searchContainer");
var containerWrap = document.getElementById("containerWrap");
var buttonWrap = document.getElementById("buttonWrap");
var refresh = document.getElementById("refresh");
var goTop = document.getElementById("goTop");
tap(refresh,function(){ // 刷新操作
	warns(createDom("info","这里用ajax刷新数据"),function(){
		load.addBox("加载中...");
		setTimeout(function(){load.removeBox()},2000);
	});
})
// 这里要监听 click 防止 ios 设备点击穿透
var declick = true; // 防止监听的 scroll 收起按钮事件触发
goTop.addEventListener("click",function(){
	declick = false;
	document.body.scrollTop = 0;
	buttonWrap.classList.remove("active");
	tip("已返回顶部");
	declick = true;
})

// 监听页面主要内容滚动触发预加载以及显示返回顶部按钮
var bodyHeight = window.screen.availHeight;
var wrapHeight = searchContainer.offsetHeight;
window.addEventListener("scroll",function(){
	throttle(showScrollTop(),200,400);
	throttle(preLoad(),200,400);
	// 显示返回顶部按钮函数
	function showScrollTop(){
		if (document.body.scrollTop > 300) {
			buttonWrap.classList.add("active");
		} else if (document.body.scrollTop <= 300 && declick) {
			buttonWrap.classList.remove("active");
		}
	}
	function preLoad(){
		if (isDirection.isState()) {			
			if (wrapHeight-bodyHeight-document.body.scrollTop < 150) {
				createData(containerWrap);
				wrapHeight = searchContainer.offsetHeight; // 更新主体高度
			}
		}
	}
})
function createData(obj){
	if (obj.children.length < 20) {
		// 一次生成四个测试数据
		for (var i = 0; i < 4; i++) {
			var li = obj.childNodes[1].cloneNode(true);
			obj.appendChild(li);
		}
	} else {
		tip("已没有更多数据")
	}
}

// 页面接单按钮绑定
tap(containerWrap,function(){
	var target = event.target || event.srcElement;
	if (target.className == "getOrder") {
		tip(target.innerText)
	}
})