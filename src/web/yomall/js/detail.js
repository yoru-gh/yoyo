'use strict';
// 返回顶部
var returnTop = document.getElementById("returnTop");
var content = document.getElementById("content");
var scrollBody, scrollDrcObj, isAndroid;
// 安卓设备下添加视差效果
if (DEVICE == "Android") {
	document.body.classList.add('parallax');
	scrollBody = content;
	scrollDrcObj = content;
	isAndroid = true;
} else {
	scrollBody = window;
	scrollDrcObj = undefined;
	isAndroid = false;
}
scrollBody.addEventListener('scroll', throttle(function(){
	var scrollLate, drc = getScrollDirection.Y(scrollDrcObj);
	isAndroid ? scrollLate = scrollBody.scrollTop : scrollLate = window.pageYOffset;
	// 给没有绑定返回顶部事件的按钮绑定事件
	var isBind = returnTop.getAttribute("isbind");
	if (isBind == "false") {
		returnTop.touch(function(){
			easeRunToTop(scrollDrcObj); // 返回顶部函数
			this.classList.remove("active");
		}, false);
		returnTop.setAttribute("isbind",true);
	}
	// 到达一定距离显示或隐藏发回顶部按钮
	if (drc && scrollLate > 800) {
		returnTop.classList.add("active");
	} else if (!drc && scrollLate < 400) {
		returnTop.classList.remove("active");
	}
},300))

var pic = document.querySelector(".scroll-content .pic");
pic.touch(() => {
	tip.toast("可以点击")
})

var configHas = document.getElementById("configHas");
var inCart = document.getElementById("inCart");
var buy = document.getElementById("buy");
var formInCart = false; // 判断唤起选择套餐窗是否来自加购物车按钮
inCart.touch(() => {
	formInCart = true;
	var isHas = configHas.getAttribute('value')
	if (isHas == 'false') {
		configLayer.classList.add('active')
	} else {
		window.location.href = '../cart.html';
	}
})
buy.touch(() => {
	tip.toast("敬请期待")
})

var detail = document.getElementById("detail");
var showDetail = document.getElementById("showDetail");
var imgs = detail.getElementsByTagName('img');
showDetail.touch(() => {
	var imgCount = 0, timer;
	showDetail.classList.add('active');

	imgs[imgCount].src = imgs[imgCount].getAttribute('data-src');
	imgs[imgCount].classList.add('active');
	imgCount++;

	timer = setInterval(function(){
		imgs[imgCount].src = imgs[imgCount].getAttribute('data-src');
		imgs[imgCount].classList.add('active');
		imgCount++;
		if (imgCount == imgs.length) {
			clearInterval(timer)
		}
	}, 1000)
})

// 选配置
var configLayer = document.getElementById("configLayer");
var configWrap = document.getElementById("configWrap");
var configClose = document.getElementById("configClose");
var configOK = document.getElementById("configOK");
configLayer.addEventListener('touchmove', event => {
	event.preventDefault()
}, {passive: false})
configLayer.touch(event => {
	var target = event.target;
	if (target.id == 'configLayer') {
		formInCart = false;
		configLayer.classList.remove('active')
	}
})
configClose.touch(event => {
	formInCart = false;
	configLayer.classList.remove('active')
})
configOK.touch(event => {
	console.log('已选配置')
	configHas.setAttribute('value',true)
	if (formInCart) {
		window.location.href = '../cart.html';
	} else {
		configLayer.classList.remove('active')
	}
})

var configLayerActive = new SuperScroll({ el: configWrap })

var config = document.getElementById("config");
config.touch(event => {
	configLayer.classList.add('active')
})


// 产看参数
var paramLayer = document.getElementById("paramLayer");
var paramWrap = document.getElementById("paramWrap");
var paramOK = document.getElementById("paramOK");
paramLayer.addEventListener('touchmove', event => {
	event.preventDefault()
}, {passive: false})
paramLayer.touch(event => {
	var target = event.target;
	if (target.id == 'paramLayer') {
		paramLayer.classList.remove('active')
	}
})
paramOK.touch(event => {
	paramLayer.classList.remove('active')
})

var paramLayerActive = new SuperScroll({ el: paramWrap })

var param = document.getElementById("param");
param.touch(event => {
	paramLayer.classList.add('active')
})

// 购买数量
var buyCount = document.getElementById("buyCount");
buyCount.touch(event => {
	var child = buyCount.children;
	var target = event.target;
	var val = parseInt(child[1].value);
	if (target == child[0]) {
		if (val > 1) {
			child[1].value = val - 1;
		}
	} else if (target == child[2]) {
		child[1].value = val + 1;
	}
})