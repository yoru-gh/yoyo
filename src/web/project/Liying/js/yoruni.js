'use strict';
// 依赖 yoruni.css + weui.icon.css 文件
function createDom(type,mes){
	// 该方法依赖 weui.icon.css 文件
	// mes 需要提示的文本信息
	// type 有下面这些
	// success successCircle successNoCircle
	// warn waiting waitingCircle circle
	// download info infoCircle cancel
	var wrap = document.createElement("div");
	var i = document.createElement("i");
	var p = document.createElement("p");
	switch(type){
		case "success": i.classList.add("weui-icon-success"); break;
		case "successCircle": i.classList.add("weui-icon-success-circle"); break;
		case "successNoCircle": i.classList.add("weui-icon-success-no-circle"); break;
		case "warn": i.classList.add("weui-icon-warn"); break;
		case "waiting": i.classList.add("weui-icon-waiting"); break;
		case "waitingCircle": i.classList.add("weui-icon-waiting-circle"); break;
		case "circle": i.classList.add("weui-icon-circle"); break;
		case "download": i.classList.add("weui-icon-download"); break;
		case "info": i.classList.add("weui-icon-info"); break;
		case "infoCircle": i.classList.add("weui-icon-info-circle"); break;
		case "cancel": i.classList.add("weui-icon-cancel"); break;
	}
	p.innerHTML = mes;
	wrap.appendChild(i);
	wrap.appendChild(p);
	return wrap
}
// toast显示
function tip(mes,time){
	// mes 需要提示的文本信息
	// time 为可选参数 默认经过2500ms自动消失
	var thisTime = time || 2500;
	var as = null,bs = null;
	var oldobj = document.getElementById("tips");
	if (!(oldobj == null)) oldobj.parentNode.removeChild(oldobj);	
	var obj = document.createElement("div");
	obj.id = "tips";
	obj.innerHTML = mes;
	document.body.appendChild(obj);
	as = setTimeout(function(){
		obj.classList.add("active");
	}, 50);
	bs = setTimeout(function(){
		// 短时间内频繁调用此方法会造成此函数内存泄漏，原因浏览器没有及时回收 setTimeout 造成节点对象为 null 的报错，判断上一次调用函数时是否删除了上一次的节点内存，防止报错
		if (obj.parentNode == null) return;
		obj.parentNode.removeChild(obj)
	}, thisTime);
};
// warn 警告框
function warns(some,fun){
	// some 为必选参数, 可以使文本信息也可以是 DOM 结构
	// fun 理论上为必选参数, 用于点击确定后执行其他方法函数
	var masks = document.getElementById("mask");
	var obj1 = document.createElement("div");
	var obj2 = document.createElement("div");
	var obj3 = document.createElement("span");
	var obj4 = document.createElement("span");

	obj1.setAttribute("id","warns");
	obj2.classList.add("warnText");
	typeof some == "object" ? obj2.appendChild(some) : obj2.innerHTML = some;
	obj3.classList.add("warnCan");
	obj3.innerText = "取消";
	obj4.classList.add("warnCom");
	obj4.innerText = "确定";
	
	obj1.appendChild(obj2);
	obj1.appendChild(obj3);
	obj1.appendChild(obj4);
	document.body.appendChild(obj1);
	masks.classList.add("active");

	obj3.addEventListener("touchend", function(){
		masks.classList.remove("active");
		obj1.remove();
	})
	obj4.addEventListener("touchend", function(){
		masks.classList.remove("active");
		if (fun != undefined) fun();
		obj1.remove();
	})
}
// 加载提示
var load = {
	// 该方法依赖 weui.icon.css 文件
	// 触添加提示 提示不建议超过6个字
	addBox: function(mes){
		var preDom = document.getElementById("loadingTip");
		preDom == undefined ? null : preDom.remove();
		mes == undefined ? mes = "加载中..." : null;
		var div = document.createElement("div");
		var i = document.createElement("i");
		div.innerText = mes;
		div.setAttribute("id","loadingTip");
		div.appendChild(i);
		document.body.appendChild(div);
	},
	// 触发移除提示
	removeBox: function(){
		var loadingTip = document.getElementById("loadingTip");
		loadingTip == null ? null : loadingTip.remove();
	}	
}
// 简单的节流函数
//fun 要执行的函数
//delay 延迟
//time  在time时间内必须执行一次
function throttle(fun,delay,time) {
	var timeout, startTime = new Date();
	return function() {
		var context = this, args = arguments, curTime = new Date();
		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if (curTime - startTime >= time) {
			fun.apply(context,args);
			startTime = curTime;
			// 没达到触发间隔，重新设定定时器
		} else {
			timeout = setTimeout(fun,delay);
		}
	}
}

// 解决 click 时间 300ms 延迟?
/*window.addEventListener('load', function () {
	FastClick.attach(document.body);
}, false);*/

// 解决触屏设备 HTML5 touch 事件容易误触问题, 按需求使用
function tap(obj,fun,bubble){
	var star = 0, move = 0, end = true;
	bubble == undefined ? bubble = false : null;
	// 如果传入的是 JQuery 对象则转换为 JS 对象
	// [object Object] 为 JQuery 对象
	// [object HTMLElement] 为 JS 对象
	// [object Array] 为数组对象
	toString.apply(obj) === "[object Object]" ? obj = obj[0] : null;

	obj.addEventListener("touchstar",whenStar,bubble);
	obj.addEventListener("touchmove",whenMove,bubble);
	obj.addEventListener("touchend",whenEnd,bubble);

	function whenStar(){
		event.stopPropagation();
		star = event.touches[0].clientY;
	}
	function whenMove(){
		event.stopPropagation();
		move = event.changedTouches[0].clientY;
		Math.abs(move-star) > 20 ? end = false : end = true;
	}
	function whenEnd(){
		event.stopPropagation();
		if (end && typeof fun == "function" && fun != undefined) fun();
		// 由于该方法是全局 touch 事件公用的, 函数结束要初始化判断变量
		star = 0; move = 0; end = true;
	}
}

// 判断页面滚动方向
var isDirection = {
	scrollTopStart: 0,
	scrollTopEnd: 0,
	scrollTopOpen: true, // true 为向上滑
	isState: function (obj){
		obj == undefined ? obj = document.body : null;
		this.scrollTopEnd = obj.scrollTop; // 储存当前卷起值
		if (this.scrollTopEnd > this.scrollTopStart) {
			this.scrollTopStart = this.scrollTopEnd;
			this.scrollTopOpen = true;
		}else if (this.scrollTopStart > this.scrollTopEnd) {
			this.scrollTopStart = this.scrollTopEnd;
			this.scrollTopOpen = false;
		}
		return this.scrollTopOpen
		// return {
		// 	scrollTopStart: this.scrollTopStart,
		// 	scrollTopEnd: this.scrollTopEnd,
		// 	scrollTopOpen: this.scrollTopOpen
		// }
	}
}

// 组织弹出层滚动时 body 跟随滚动(移动端卡机)
var bodyScroll = {
	stop: function(){
		var body = document.body;
		var nowScroll = body.scrollTop;
		body.setAttribute("value",nowScroll);
		body.style.cssText += "position: fixed; top: -"+nowScroll+"px; height: 100%;";
	},
	star: function(){
		var body = document.body;
		var nowTop = body.getAttribute("value");
		body.style.cssText -= "position: fixed; height: 100%;";
		body.scrollTop = nowTop;
	}
}