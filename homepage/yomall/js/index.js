'use strict';
// 获取浏览器能识别的动画类型
var transitionEventEnd = checkTransitionEventEnd();
// 获取设备类型
var mobileType = checkMobileType();

// 点击搜索框自动获取焦点
function autoGetFocus(event){
	// ios 不是用该方法
	if (mobileType != "iOS") {
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
		// inputBar.setAttribute("autofocus","autofocus")
		console.log("iOS 设备不支持浏览器端的自动获取焦点");
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

// 消息按钮
var message = document.getElementById("message");
var txt = '<a href="https://www.baidu.com">前往百度</a>'
message.touch(function(){
	tip.slogan(txt,3000)
})

// 焦点图轮播
var slide = new Slide({
	el: "#banner", // 实际运动的元素
	time: 4000, // 自动切换时间, 单位 ms
	complete: function(){},
	pagination: true
})

// 
var fab = document.getElementById("fab");
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

// 关闭谷歌
// var closeStar = document.getElementById("closeStar");
// closeStar.touch(function(){
// 	fab.classList.remove("active");
// 	fabContent.classList.remove("active");
// 	fab.classList.remove("active");
// })

// 返回顶部
var returnTop = document.getElementById("returnTop");
window.onscroll = throttle(function(){
	// var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	var drc = getScrollDirection.Y();
	var scrollTop = window.pageYOffset;
	// 给没有绑定返回顶部事件的按钮绑定事件
	var isBind = returnTop.getAttribute("isbind");
	if (isBind == "false") {
		returnTop.touch(function(){
			// document.body.scrollTop = 0;
			easeRunToTop(); // 返回顶部函数
			this.classList.remove("active");
		});
		returnTop.setAttribute("isbind",true);
	}
	// 到达一定距离显示或隐藏发回顶部按钮
	if (drc && scrollTop > 400) {
		returnTop.classList.add("active");
	} else if (!drc && scrollTop < 200) {
		returnTop.classList.remove("active");
	}
},300)
// console.log(returnTop.prototype.event)
// returnTop.touch(function(){
// 	easeRunToTop(); // 返回顶部函数
// 	this.classList.remove("active");
// })

// var product = document.getElementById("product");
// 为列表添加事件委托
// product.touch(function(event){
// 	// touchEvent 原型上是没有 client offset 之类的属性的
// 	// 所以构造函数 touch 事件中 this 带当前触控位置坐标
// 	var target = event.target;
// 	var targetName = target.nodeName.toLowerCase();
// 	var activeNode = target.parentNode;
// 	if (targetName == "svg" || targetName == "use") {
// 		if (targetName == "svg") {
// 			if (activeNode.className.indexOf("active") > -1) {
// 				activeNode.classList.remove("active");
// 				tip.toast("已取消收藏");
// 			} else {
// 				activeNode.classList.add("active");
// 				tip.toast("收藏成功");
// 			}
// 		} else {
// 			activeNode = activeNode.parentNode;
// 			if (activeNode.className.indexOf("active") > -1) {
// 				activeNode.classList.remove("active");
// 				tip.toast("已取消收藏");
// 			} else {
// 				activeNode.classList.add("active");
// 				tip.toast("收藏成功");
// 			}
// 		}
// 	}
// })

// var lis = '<li class="new"><span><svg><use xlink:href="#icon-heart"></use></svg></span></li>';
// for (var i = 0; i < 3; i++) {
// 	lis += lis;
// };
// var content = document.getElementById("content");

// var delay = .8;
// preload({
// 	el: content,
// 	callback: function(){
// 		var dom = createDOM(lis);
// 		for (var i = 0; i < dom.length; i++) {
// 			delay += .2;
// 			dom[i].style.animationDelay = delay+"s";
// 			dom[i].style.webkitAnimationDelay = delay+"s";
// 			product.appendChild(dom[i]);
// 		};
// 		delay = .8;
// 	},
// 	cut: Math.ceil(window.screen.availWidth*0.6),
// 	upbtn: returnTop
// })

var user = document.getElementById("user");
// 隐藏底部俩按钮
function displayBottomButton(IDstr,tag){
	// var arr = IDstr.split(",");
	// for (var i = 0; i < arr.length; i++) {
	// 	var obj = document.getElementById(arr[i]);
	// 	if (tag == "show") {
	// 		obj.classList.add("fadeOut")
	// 	} else {
	// 		obj.classList.remove("fadeOut")
	// 	}
	// }
	if (tag == "show") {
		footer.classList.add("fadeOut");
		footerFab.classList.add("fadeOut");
		returnTop.classList.add("fadeOut");
		user.classList.add("fadeOut");
	} else {
		footer.classList.remove("fadeOut");
		footerFab.classList.remove("fadeOut");
		returnTop.classList.remove("fadeOut");
		user.classList.remove("fadeOut");
	}
}