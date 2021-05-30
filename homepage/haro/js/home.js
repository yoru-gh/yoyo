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
		displayBottomButton("fab,footerMenu","show");
	} else {
		this.setAttribute("active","hide")
		this.classList.remove("active");
		// 
		searchTool.classList.remove("active");

		// 
		displayBottomButton("fab,footerMenu","hide");
	}
})

// 搜索框搜索事件
inputBar.addEventListener("search", function(){
	searchIcon.setAttribute("active","hide")
	searchIcon.classList.remove("active");
	// 
	searchTool.classList.remove("active");

	// 
	displayBottomButton("fab,footerMenu","hide");
})
inputBar.addEventListener("blur", function(){
	searchIcon.setAttribute("active","hide")
	searchIcon.classList.remove("active");
	searchTool.classList.remove("active");
	displayBottomButton("fab","hide");
})

// 菜单按钮
var menu = document.getElementById("menu");
var sideMenu = document.getElementById("sideMenu");
var sideMenuWrap = document.getElementById("sideMenuWrap");
var smWrap = document.getElementById("smWrap");
// 用来阻止弹出层滑动时 body 的滑动
sideMenu.addEventListener("touchmove", function(event){
	var target = event.target;
	if (target.id == "sideMenu") {
		event.preventDefault();
	}
})
function addPreventDefault(event){
	event.preventDefault();
}

// 侧栏菜单到顶到底是否挂起 touchmove 事件
var isSmWrapLock = false;

// 当前页面执行 getScrollPath 后才能获取到全局变量 isDcs
getScrollPath();

smWrap.addEventListener("touchmove", function(event){
	var seftHright = this.offsetHeight;
	var parentHeight = sideMenuWrap.offsetHeight;
	var parentScrollTop = sideMenuWrap.scrollTop;
	if (seftHright > parentHeight) {
		if (parentScrollTop == 0 && !isDcs) {
			// 到顶挂起
			document.body.classList.add("active");
			isSmWrapLock = true;
			event.preventDefault();
		} else if ((parentScrollTop == seftHright-parentHeight+10) && isDcs) {
			// 到底挂起
			document.body.classList.add("active");
			isSmWrapLock = true;
			event.preventDefault();
		} else {
			document.body.classList.remove("active");
			isSmWrapLock = false;
			event.returnValue = true;
		}
	} else {
		event.preventDefault();
	}
})
// 点击弹出层遮罩部分收起弹出层
sideMenu.touch(function(event){
	var target = event.target;
	if (target.id == "sideMenu") {
		document.body.classList.remove("active");
		sideMenu.classList.remove("active");
	}
})
// 打开侧边菜单
menu.touch(function(){
	sideMenu.classList.add("active");
})

// 消息按钮
var message = document.getElementById("message");
message.touch(function(){
	tip.slogan("Hello world!",3000,[{
		name: "前往百度",
		url: "https://www.baidu.com"
	},{
		name: "前往新世界",
		url: "../slide.html"
	}])
})

// 
var fab = document.getElementById("fab");
var fabContent = document.getElementById("fabContent");
fab.touch(function(){
	fab.classList.add("active");
	fabContent.classList.add("active");
})
fabContent.touch(function(event){
	fab.classList.remove("active");
	this.classList.remove("active");
})
fabContent.addEventListener("touchmove", function(event){
	event.preventDefault();
})

// 滤镜菜单
var footerMenu = document.getElementById("footerMenu");

// 打开底部菜单
var openMenu = document.getElementById("openMenu");
openMenu.touch(function(){
	var hasClass = footerMenu.className.indexOf("active")
	if (hasClass > -1) {
		footerMenu.classList.remove("active");
	} else {
		footerMenu.classList.add("active");
	}
})

// 关闭谷歌
var closeStar = document.getElementById("closeStar");
closeStar.touch(function(){
	fab.classList.remove("active");
	fabContent.classList.remove("active");
	footerMenu.classList.remove("active");
})

// 返回顶部
var returnTop = document.getElementById("returnTop");
returnTop.touch(function(){
	easeRunToTop(); // 返回顶部函数
	footerMenu.classList.remove("active");
})

var list = document.getElementById("list");
// point 为沿抛物线运动的点
var point = document.getElementById("point");
// 为列表添加事件委托
list.touch(function(event){
	// touchEvent 原型上是没有 client offset 之类的属性的
	// 所以构造函数 touch 事件中 this 带当前触控位置坐标
	var target = event.target;
	
	if (target.nodeName.toLowerCase() == "span" || target.nodeName.toLowerCase() == "svg" || target.nodeName.toLowerCase() == "use") {
		// 初始化提示点的坐标
		point.style.cssText = "top:"+this.touches.Y+"px;left:"+this.touches.X+"px";

		// 抛物线函数
		// 提示元素/目标元素/各种设置
		parabola(point, fab, {
			speed: 200, // 数值越大速度越快
			curvature: 0.005, // 曲线的开口大小
			progress: function(){
				// 抛物运动时经过每一个点时触发
			},
			complete: function(){
				// 抛物运动结束时时
				// 提示点复位
				point.style.cssText = "top:-20px;left:-20px";
				tip.toast("收藏成功");
			}
		}).mark().init();
	}
})


var lis = '<li class="new"><span><svg><use xlink:href="#icon-star" fill="#4285f4"></use></svg></span></li>';
for (var i = 0; i < 3; i++) {
	lis += lis;
};
var delay = .8;
preload("#content",function(){
	var dom = createDOM(lis);
	for (var i = 0; i < dom.length; i++) {
		delay += .2;
		dom[i].style.animationDelay = delay+"s";
		dom[i].style.webkitAnimationDelay = delay+"s";
		list.appendChild(dom[i]);
	};
	delay = .8;
})

// 隐藏底部俩按钮
function displayBottomButton(IDstr,tag){
	var arr = IDstr.split(",");
	for (var i = 0; i < arr.length; i++) {
		var obj = document.getElementById(arr[i]);
		if (tag == "show") {
			obj.classList.add("fadeOut")
		} else {
			obj.classList.remove("fadeOut")
		}
	}
}