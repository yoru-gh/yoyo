'use strict';
// 获取浏览器能识别的动画类型
var transitionEventEnd = checkTransitionEventEnd();

// 点击搜索框自动获取焦点
function autoGetFocus(event){
	// ios 不是用该方法
	if (DEVICE != "iOS") {
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
		// console.log("您的设备大部分浏览器都不支持自动获取焦点");
	}
}

// 筛选层
var filter = document.getElementById("filter");
var sideLayer = document.getElementById("sideLayer");
var sideWrap = document.getElementById("sideWrap");
var sideContent = document.getElementById("sideContent");
var closeSide = document.getElementById("closeSide");
var scrollActive = new SuperScroll({
	el: sideWrap
});
// 打开筛选层
filter.touch(() => { 
	sideLayer.classList.add("active");
})
// 
sideLayer.addEventListener("touchmove", event => {
	event.preventDefault();
}, {passive: false})
// 关闭筛选层
sideLayer.touch(event => {
	var target = event.target;
	if (target.id == "sideLayer") {
		sideLayer.classList.remove("active");
	}
})
closeSide.touch(() => {
	sideLayer.classList.remove("active");
})
// *********

var loading = document.getElementById("loading");
var searchIns = document.getElementById("searchIns");
var searchIcon = document.getElementById("searchIcon");
var getSearch = document.getElementById("getSearch");
var sortLayer = document.getElementById("sortLayer");
var sortBar = document.getElementById("sortBar");
var getSearch = document.getElementById("getSearch");

// 搜索按钮, 弹出搜索层
searchIns.touch(function(event){
	// 
	sortLayer.classList.add("active");
	sortLayer.addEventListener(transitionEventEnd, autoGetFocus);

	content.classList.add("active");
})
searchIcon.touch(function(event){
	// 
	sortLayer.classList.add("active");
	sortLayer.addEventListener(transitionEventEnd, autoGetFocus);

	content.classList.add("active");
})

// 监听虚拟键盘搜索按钮搜索事件
sortBar.addEventListener("search", () => { searchActive() })
// 搜索按钮
getSearch.touch(() => { searchActive() })

function searchActive(){
	searchIcon.setAttribute("active","hide")
	var focusEl = document.activeElement;
	if (focusEl.id == "sortBar") {
		sortBar.blur();
		// 延迟300毫秒执行的原因是等待虚拟键盘收起
		window.setTimeout(function(){
			loading.classList.add("active");
			window.setTimeout(function(){
				loading.classList.remove("active");
				sortLayer.classList.remove("active");
				content.classList.remove("active");
			},2000)
		}, 300)
	} else {
		loading.classList.add("active");
		window.setTimeout(function(){
			loading.classList.remove("active");
			sortLayer.classList.remove("active");
			content.classList.remove("active");
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
			searchIcon.setAttribute("active","hide");
			sortLayer.classList.remove("active");
			content.classList.remove("active");
		}, 300)
	} else {
		searchIcon.setAttribute("active","hide");
		sortLayer.classList.remove("active");
		content.classList.remove("active");
	}
})

// 切换列表显示模式
var rowMode = document.getElementById("rowMode");
var product = document.getElementById("product");
rowMode.touch(function(){
	var isActive = this.getAttribute("active");
	if (isActive == "false") {
		this.classList.add("active");
		this.setAttribute("active", true);
		product.classList.remove("block");
		product.classList.add("line");
	} else {
		this.classList.remove("active");
		this.setAttribute("active", false);
		product.classList.remove("line");
		product.classList.add("block");
	}
})

// 排序栏操作
var sorting = document.getElementById("sorting");
sorting.touch(function(event){
	var target = event.target;
	if (target.nodeName.toLowerCase() == "li" && target.id != "classify") {
		if (target.className.indexOf("active") > -1) {
			target.classList.remove("active");
			tip.toast("OK");
		} else {
			target.classList.add("active");
			tip.toast("OK");
		}
	}
})

// 分类按钮
var classify = document.getElementById("classify");
var classifyLayer = document.getElementById("classifyLayer");
classify.touch(function(event){
	classifyLayer.classList.add("active");
})
classifyLayer.addEventListener("touchmove", event => {
	event.preventDefault();
}, {passive: false})
classifyLayer.touch(event => {
	var target = event.target;
	if (target.id == "classifyLayer") {
		classifyLayer.classList.remove("active");
	}
})

var content = document.getElementById("content");
var product = document.getElementById("product");
var returnTop = document.getElementById("returnTop");

var DOMSTR = '<li class="lay"><a href="detail.html"><div><svg><use xlink:href="../icon/sprite.svg#icon-picture"></use></svg></div><p>●●●●●●●●</p><p><span>带赠品</span><span class="light">满5000减200</span></p><span><i>￥</i>99<i>.00</i><b>●●● 999+</b></span></a></li>';
for (var i = 0; i < 4; i++) {
	DOMSTR += DOMSTR;
};
var delay = .8;
var isLast = 3; // 加载两次后模拟无数据
// 加载数据
preload({
	el: content,
	cut: 95,
	upbtn: returnTop,
	callback: function(){
		if (isLast == 0) {
			var li = document.createElement("li");
			li.className = "last";
			li.innerText = "╮(╯▽╰)╭ 没有了呀";
			product.appendChild(li);
			isLast = 4;
		} else if (isLast > 0 && isLast < 4) {
			var DOM = createDOM(DOMSTR);
			for (var i = 0; i < DOM.length; i++) {
				delay += .1;
				DOM[i].style.animationDelay = delay+"s";
				DOM[i].style.webkitAnimationDelay = delay+"s";
				product.appendChild(DOM[i]);
			};
			delay = .8;
			isLast -= 1;
		}
	}
})