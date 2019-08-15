'use strict';
// 2018/08/28 面向对象思维改写
// 获取用于请求 url 字符串
var URLarr = document.URL.split("/");
var URLstr = URLarr[0]+"//"+URLarr[2]+"/";

// 随处可见的 requestAnimationFrame
(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		// name has changed in Webkit
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	// 兼容处理
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			// 一般显示器刷新率为每秒60次(60Hz) 1000/60≈16.67
			var timeToCall = Math.max(0, 16.67 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		}
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		}
	}
}())

// Chrome 51 开始加入的被动监听事件 Passive event listeners
// eg
// elem.addEventListener('touchstart', fn,
// 	supportsPassive ? { passive: true } : false
// );
var supportsPassive = false;
try {
	var opts = Object.defineProperty({}, 'passive', {
		get: function() {
			supportsPassive = true;
		}
	});
	window.addEventListener("test", null, opts);
} catch (e) {}

// DOM 扩展方法, 实际上是为了解决 iOS 设备 touch 事件误触穿透以及 iOS 设备 click 300ms 延迟等问题
// 不使用 fastclick 的原因是, 几十行代码能实现的为什么要加载个20k+的 JS 文件
// 用法: DOM.touch(function(){})
HTMLElement.prototype.touch = function(fn,eventType){
	// fn 待执行函数  eventType == false 强制使用 click
	// hold 是否长按触发,布尔值
	// bubble 是否阻止冒泡，默认为阻止，不阻止为 bubble 字符串(暂停使用)
	// bubble == "bubble" ? bubble = false : null;
	var bubble = supportsPassive ? {passive: true} : false;
	eventType === false ? eventType = true : null;

	var UA = navigator.userAgent;

	if (UA.indexOf("Mac OS X") > -1 && !eventType) {
		// touch 事件在 iOS 下实际上是为 DOM 绑定 touchstart,touchmove,touchend 三个 touch 事件，并且拥有 touchend 的全部属性
		var starX = 0,
			starY = 0,
			moveX = 0,
			moveY = 0,
			isMove = false;

		function whenStar(event){
			// var e = window.event || arguments.callee.caller.arguments[0];
			var e = event || window.event;
			starY = e.touches[0].clientY;
			starX = e.touches[0].clientX;
			// console.log(starY,starX)
		}
		function whenMove(event){
			var e = event || window.event;
			moveY = e.changedTouches[0].clientY-starY;
			moveX = e.changedTouches[0].clientX-starX;

			// 处于触碰状态中触碰点发生偏移时返回 false
			if (Math.abs(moveX) > 30 || Math.abs(moveY) > 30) {
				isMove = true;
				// console.log(moveX,moveY)
			}
		}
		function whenEnd(event){
			var e = event || window.event;
			if (!isMove) {
				// 返回触控点
				var point = {
					X: starX,
					Y: starY
				};
				// 给构造函数中 this 添加点击位置的坐标
				this.touches = point;

				if (typeof fn == "function" && fn != undefined) {
					fn.call(this,e);
				}
			} else {
				isMove = false;
				return
			}
		}

		this.addEventListener("touchstart",whenStar,bubble);
		this.addEventListener("touchmove",whenMove,bubble);
		this.addEventListener("touchend",whenEnd,bubble);
	} else {
		// 非 iOS 设备将继续使用原生 click 事件
		this.addEventListener("click",whenClick,bubble);
		function whenClick(event){
			var e = event || window.event;
			if (typeof fn == "function" && fn != undefined) {
				fn.call(this,e);
			}
		}
	}	
}

// 提示框组件, 依赖 yoruni.css 文件
var tip = {
	data: {
		toastTimer: null,
		sloganTimer: null,
		confirmMethod: function(){},
		formula: function(min,max){
			var val = parseInt(Math.random()*(max-min+1)+min,10);
			return val
		}
	},
	toast: function(txt,time){
		// 需要有 id 为 toast 的容器及其 CSS
		// 当页面不存在 id 为 toast 的元素时会 JS 生成该节点, 但是这里建议预先在页面准备好该元素
		// 接受两个参数, 文本(必选) 自动消失时间(可选)
		// tip.toast(txt,time)
		// 目前只支持最多 11 个中文字符
		if (txt == undefined) { return } else {
			time == undefined ? time = 3000 : null;

			var isActive,Obj;
			Obj = document.getElementById("toast");
			Obj == undefined ? tip.createDiv("toast") : null;

			function continueRun(){
				Obj = document.getElementById("toast");
				if (Obj == undefined) { continueRun() } else {
					isActive = Obj.getAttribute("active");
					if (isActive == "true") {
						Obj.classList.remove("active");
						// 清除延时器
						clearTimeout(tip.data.toastTimer);
						// 重新设置延时器
						Obj.innerText = txt;
						// 延时添加类名, 不然冲重新添加类名的效果无效
						setTimeout(function(){ Obj.classList.add("active") },20);

						tip.data.toastTimer = setTimeout(function(){
							Obj.classList.remove("active");
							Obj.setAttribute("active","false");
						}, time);
					} else {
						Obj.setAttribute("active","true");
						Obj.innerHTML = txt;
						Obj.classList.add("active");
						tip.data.toastTimer = setTimeout(function(){
							Obj.classList.remove("active");
							Obj.setAttribute("active","false");
						}, time);
					}
				}
			}
			continueRun()
		}
	},
	slogan: function(txt,time){
		// 接受 txt time 两个参数, 文本/链接(必选) 自动消失时间(可选)
		// 需要有 id 为 slogan 的容器及其 CSS
		// 当页面不存在 id 为 slogan 的元素时会 JS 生成该节点, 但是这里建议预先在页面准备好该元素
		// 接受两个参数, 文本(必选) 自动消失时间(可选
		// txt 允许含有多个 a 标签链接, txt 可以是节点字符
		// tip.slogan(txt,time)
		if (txt == undefined) { return } else {
			time == undefined ? time = 3000 : null;

			var isActive,Obj;
			Obj = document.getElementById("slogan");
			Obj == undefined ? tip.createDiv("slogan") : null;

			function continueRun(){
				Obj = document.getElementById("slogan");
				if (Obj == undefined) { continueRun() } else {
					isActive = Obj.getAttribute("active");
					if (isActive == "true") {
						Obj.classList.remove("active");
						// 清除延时器
						clearTimeout(tip.data.sloganTimer);
						// 重新设置延时器
						Obj.innerHTML = txt;
						// 延时添加类名, 不然冲重新添加类名的效果无效
						setTimeout(function(){ Obj.classList.add("active") },20);

						tip.data.sloganTimer = setTimeout(function(){
							Obj.classList.remove("active");
							Obj.setAttribute("active","false");
						}, time);
					} else {
						Obj.setAttribute("active","true");
						Obj.innerHTML = txt;
						Obj.classList.add("active");
						tip.data.sloganTimer = setTimeout(function(){
							Obj.classList.remove("active");
							Obj.setAttribute("active","false");
						}, time);
					}
				}
			}
			continueRun()
		}
	},
	dialog: function(ops){
		ops = {
			txt: ops.txt || false,
			type: ops.type || "alert", // alert 或者是 confirm
			sure: ops.sure || function(){ return },
			suretext: ops.suretext || false, // 确认按钮文本
			canceltext: ops.canceltext || false, // 取消按钮文本
		}
		// txt 不限于文本, 可以是任何字符或是元素
		if (!ops.txt) { return }
		// if (ops.type == "alert") {} else if (true) {}
		var Obj = document.getElementById("dialog");
		// 禁止背景滚动
		var Objbind = Obj.getAttribute("bind") || false;
		if (Objbind != "true") {
			Obj.setAttribute("bind", true)
			Obj.addEventListener("touchmove", event => {
				event.preventDefault()
			}, {passive: false})
		}
		Obj.classList.add("active");

		// 更新警告提示文本
		var content = Obj.getElementsByClassName("dialog-content")[0];
		var preStr = content.innerHTML.toString();
		// 内容跟上一次相同时不改变当前内容
		if (ops.txt != preStr) {
			content.innerHTML = ops.txt;
		}

		if (ops.type == "alert") {
			// 隐藏取消按钮
			var cancel = Obj.getElementsByClassName("cancel")[0];
			cancel.classList.add("hide");
			tip.data.confirmMethod = ops.sure;
		} else if (ops.type == "confirm") {
			// 更新确认执行的函数
			if (typeof ops.sure == "function" && ops.sure != undefined) {
				tip.data.confirmMethod = ops.sure;
			}
			// 取消按钮绑定关闭警告框事件
			var cancel = Obj.getElementsByClassName("cancel")[0];
			cancel.classList.remove("hide");
			var cancelbind = cancel.getAttribute("bind") || false;
			if (cancelbind != "true") {
				cancel.setAttribute("bind", true)
				cancel.touch(() => {
					Obj.classList.remove("active");
				})
			}
		}

		// 确定按钮绑定确定执行事件
		var sure = Obj.getElementsByClassName("sure")[0];
		var surebind = sure.getAttribute("bind") || false;
		if (surebind != "true") {
			sure.setAttribute("bind", true)
			sure.touch(() => {
				Obj.classList.remove("active");
				tip.data.confirmMethod();
			})
		}
	},
	createDiv: function(id,fn){
		var div = document.createElement("div");
		div.className = id;
		div.id = id;
		div.setAttribute("active", false);
		document.body.appendChild(div);
	},
	createSheet: function(){
		var styleDOM = document.createElement('style'),
		styleSheet = styleDOM.sheet;
		styleSheet.addRule('.box', 'height: 100px');
		styleSheet.insertRule('.box {height: 100px}', 0);
		document.head.appendChild(styleDOM);
	}
}

// 判断页面滚动方向，此方法适用于特定 DOM 的 touchmove 事件中
var getScrollDirection = {
	startY: 0,
	endY: 0,
	directionY: true, // true 为由下往上划动
	Y: function (Obj){
		// var body = document.body.scrollTop ? document.body : document.documentElement;
		var scrollY = Obj === undefined ? scrollY = window.pageYOffset : Obj.scrollTop;
		this.endY = scrollY; // 储存当前卷起值
		if (this.endY > this.startY) {
			this.startY = this.endY;
			this.directionY = true;
		}else if (this.startY > this.endY) {
			this.startY = this.endY;
			this.directionY = false;
		}
		return this.directionY
	},
	X: function(Obj){}
}

// 给 body 绑定 touch 事件自动记录手指垂直方向的滑动方向
var touchDrc = null; // true 手指由下往上划
// 目前只能用于判断纵坐标方向
var getTouchDirection = () => {
	var body = document.body;
	var bubble = supportsPassive ? { passive: true } : false;
	// var startX = ''; // 触摸开始时的横坐标
	var startY = ''; // 触摸开始时的纵坐标
	// var moveX = ''; // 触摸移动中的横坐标
	var moveY = ''; // 触摸移动中的纵坐标
	  
	function touch (event) {
		// var e = window.event || arguments.callee.caller.arguments[0];
		var e = event || window.event;
		switch(e.type){
			case "touchstart": 
				// startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
			break;
			case "touchmove":
				// e.preventDefault();
				// moveX = e.touches[0].clientX;
				moveY = e.touches[0].clientY;
				if (moveY > startY) {
					// 手指由上往下划
					touchDrc = false;
				} else {
					// 手指由下往上划
					touchDrc = true;
				}
			break;
		}
	}

	body.addEventListener('touchstart',touch, bubble);
	body.addEventListener('touchmove',touch, bubble);
}

// AJAX
var ajax = options => {
	// ep:
	// ajax({
	// 	url: "./TestXHR.aspx",              //请求地址
	// 	type: "POST",                       //请求方式
	// 	data: { name: "super", age: 20 },        //请求参数
	// 	dataType: "json",
	// 	success: function (response, xml) {},
	// 	fail: function (status) {}
	// });
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json" || "jsonp";
	var params = formatParams(options.data);
	var contentType = "application/x-www-form-urlencoded";

	// if (options.dataType == "jsonp") {
	// 	contentType = "application/json";
	// }

	//创建 - 非IE6 - 第一步
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { 
		//IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	//接收 - 第三步
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				options.success && options.success(xhr.responseText, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	//连接 和 发送 - 第二步
	if (options.type == "GET") {
		xhr.open("GET", options.url + "?" + params, true);
		xhr.send(null);
	} else if (options.type == "POST") {
		xhr.open("POST", options.url, true);
		//设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type", contentType);
		xhr.send(params);
	} else {
		xhr.open(options.type, options.url, true);
		//设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type", contentType);
		xhr.send(params);
	}

	//格式化参数
	function formatParams(data) {
		var arr = [];
		for (var name in data) {
			arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
		}
		arr.push(("v=" + Math.random()).replace(".",""));
		return arr.join("&");
	}
}

// 箭头函数不绑定 this 和 arguments 且没有 prototype 属性
// 获取元素 CSS 属性
var getCSS = (element, attr) => {
	if(element.currentStyle) {
		return element.currentStyle[attr];
	} else {
		// 这里的 attr 为 CSS 里的写法
		return getComputedStyle(element, false)[attr];
	}
}

// HTML 字符串转 DOM
var createDOM = str => {
	var div = document.createElement("div");
	div.innerHTML = str;
	return div.childNodes
}

// 获取当前浏览器 event 的 transitionEnd 类型
var checkTransitionEventEnd = () => {
	var t, el = document.createElement('check');
	var transitions = {
		'transition':'transitionend',
		'OTransition':'oTransitionEnd',
		'MozTransition':'transitionend',
		'WebkitTransition':'webkitTransitionEnd'
	}
	for(t in transitions){
		if( el.style[t] !== undefined ){
			return transitions[t];
		}
	}
}

// 检测移动设备类型
var checkMobileType = () => {
	var UA = navigator.userAgent;
	if (UA.indexOf("Android") > -1) {
		return "Android"
	} else if (UA.indexOf("Mac OS X") > -1) {
		return "iOS"
	} else {
		return "Unknow"
	}
}
var DEVICE = checkMobileType(); // Android / iOS / Unkonw

// 返回顶部函数
var easeRunToTop = Obj => {
	if (Obj != undefined) {
		if (Obj.scrollTop > 0) {
			var START = 0, DURING = 80;
			var letsGO = function(){
				START ++;
				// 这里用 window.pageYOffset 的原因是传入的参数需要是两个变量
				var nv = Tween.cubicEaseOut(START,Obj.scrollTop,-Obj.scrollTop,DURING);

				Obj.scrollTop = nv;
				
				if (START < DURING && Obj.scrollTop > 0) {
					window.requestAnimationFrame(letsGO);
				} else {
					window.cancelAnimationFrame(letsGO);
				}
			};
			letsGO();
		}
	} else {
		var bodyArr = [document.body,document.documentElement];
		// var scrollY = window.pageYOffset;
		var body = document.body;
		// 解决使用 Chrome 61 及以下版本浏览器内核 root 对象获取问题
		// 获取安卓 Chrome 版本号
		var UA = navigator.userAgent;
		if (UA.indexOf("Chrome") > -1) {
			var CHROME_VER_REX = /Chrome\/[\d.]+/gi;
			var BVer = parseInt(UA.match(CHROME_VER_REX)[0].split("/")[1]) || 62;
			if (BVer > 62) { body = bodyArr[1] }
		}
		if (body.scrollTop > 0) {
			var START = 0, DURING = 80;
			var letsGO = function(){
				START ++;
				// 这里用 window.pageYOffset 的原因是传入的参数需要是两个变量
				var nv = Tween.cubicEaseOut(START,window.pageYOffset,-window.pageYOffset,DURING);

				body.scrollTop = nv;
				
				if (START < DURING && body.scrollTop > 0) {
					window.requestAnimationFrame(letsGO);
				} else {
					window.cancelAnimationFrame(letsGO);
				}
			};
			letsGO();
		}
	}
}

// 缓动函数
var Tween = {
	linear: function(t, b, c, d) { 
		return c * t / d + b; 
	},
	cubicEaseOut: function(t, b, c, d) {
		return c * ((t = t/d - 1) * t * t + 1) + b;
	}
}
Math.tween = Tween;

// cookie 操作
var cookies = {
	set: (name,val,expiredays) => {
		// expiredays 过期时间, 默认 3 天
		expiredays == undefined ? expiredays = 3 : null;
		var exdate = new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie = name+ "=" +escape(val)+((expiredays == null) ? "" : ";expires="+exdate.toGMTString());
	},
	get: (name) => {
		if (document.cookie.length > 0) {
			var start = document.cookie.indexOf(name + "=");
			if (start != -1) { 
				start = start + name.length+1 
				var end = document.cookie.indexOf(";",start)
				if (end == -1) { end = document.cookie.length; }
				// 截取 = 到 ; 之间的字符串, 即键值
				return unescape(document.cookie.substring(start, end))
			} 
		}
		return null
	},
	del: (name) => {
		// 参数为 all 时删除全部 cookie
		if (name == "all") {
			var data = document.cookie.split("; ");
			for (var i = 0; i < data.length; i++) {
				cookies.set(data[i].split("=")[0],"",-1)
			}
		} else {
			cookies.set(name,"",-1)
		}
	}
}

// base64 编码+解码 JS 自带方法只适用于当前页面的互转
var base = {
	encode: (str) => {
		var afterStr;
		afterStr = window.btoa(encodeURIComponent(str));
		return afterStr
	},
	decode: (str) => {
		var afterStr;
		afterStr = encodeURIComponent(window.atob(str));
		return afterStr
	}
}

// 滑动轮播
// 移动端不自动适应滑动元素个数
function Slide(op){
	// ep
	// slide({
	// 	el: "#div", // 实际运动的元素
	// 	autoplay: true || false, // 自动切换
	// 	time: 3000, // 自动切换时间, 单位 ms
	// 	isback: true || false, // 是否边缘回弹
	// 	touch: true || false, // 是否手指滑动切换
	// 	complete: function(){
	// 		// 每次切换完成时执行
	// 		console.log("complete");
	// 	},
	// 	pagination: true / false // 是否显示分页标识
	// })
	// DOM 结构  <div>  <ul><li></li></ul>  </div>
	// defult
	if (op == undefined || op.el == undefined) { 
		console.log("找不到对象")
		return
	} else {
		var option = {
			el: op.el.split("#")[1],
			autoplay: op.autoplay === false ? false : true,
			time: op.time || 4000,
			isback: op.isback === false ? false : true,
			touch: op.touch === false ? false : true,
			complete: op.complete || function(){},
			pagination: op.pagination || false
		}
	
		// var slideWidth = document.body.clientWidth;
		// var bodyHeight = document.body.clientHeight;

		var slideBox = document.getElementById(option.el);
		var pageMark = slideBox.getElementsByClassName("pagination")[0] || slideBox;
		var pagePoint = pageMark.getElementsByTagName("span") || false;
		var Obj = slideBox.children[0];
		var slideLength = Obj.children.length-1; // 获取划动元素的页数
		var slideWidth = slideBox.offsetWidth.toFixed(2); // 宽度
		// var slideWidth = (document.body.clientWidth*0.94).toFixed(2); // 宽度

		var lateX = 0, // 记录上一次滑动后的 translateX 的值
			moveX = 0, // 元素行内当前 translateX 的动态值
			slideX = 0, // 手指点下到手指离开 X 轴划过的距离
			startX = 0, // 手指点下时的 X 坐标
			startT = 0, // 手指点下时时间
			endX = 0, // 手指离开时 X 坐标
			endT = 0, // 手指离开时时间
			preendX = 0, // 记录上一次手指离开时 X 坐标
			inback = false, // 自动播放挂起
			lock = false, // 自动播放挂起
			islr = true; // true 为左

		var activeX = .3*slideWidth; // 切换到上一页或下一页所需划过距离的最小值
		var slideIndex = 0; // 标记当前位置索引
		var self = this; // 用于返回当前实例的 slider 的索引值 this.index
		var TRANSX_REX = /\d{1,4}/; // 匹配4位数字正则表达式

		// 自动播放定时器
		var slideTimer;

		var touchActive = {
			transformX: function(diff){
				// Obj.style.transform = "translateX("+diff+"px) translateZ(0)";
				// Obj.style.webkitTransform = "translateX("+diff+"px) translateZ(0)";
				
				// 利用 translate3d 开启设备 GPU 加速渲染
				Obj.style.transform = "translate3d("+diff+"px,0px,0px)";
				Obj.style.webkitTransform = "translate3d("+diff+"px,0px,0px)";
			},
			transformInx: function(inx){
				// inx 为目标元素的索引值
				// var diff = -inx/(slideLength+1) * 100;
				// Obj.style.transform = "translate3d("+diff+"%,0px,0px)";
				// Obj.style.webkitTransform = "translate3d("+diff+"%,0px,0px)";
				var diff = -inx*slideWidth;
				Obj.style.transform = "translate3d("+diff+"px,0px,0px)";
				Obj.style.webkitTransform = "translate3d("+diff+"px,0px,0px)";
			},
			transition: function(time,tween){
				tween == undefined ? tween = "ease" : null;
				Obj.style.transition = "all "+time+"s "+tween;
				Obj.style.webkitTransition = "all "+time+"s "+tween;
			}
		}
		// touchActive.transformX(0);
		
		if (option.touch) {
			slideBox.addEventListener('touchstart', function(event){
				lock = true; // 手指点下时即挂起自动播放的定时器
				startX = event.touches[0].clientX; // 记录起始坐标X值
				startT = new Date().getTime();
				touchActive.transition(0); // 禁用CSS3动画的过渡时间
				// 手指点击轮播区域时挂起自动播放
				clearInterval(slideTimer)
			}, {passive: true})

			slideBox.addEventListener('touchmove', function(event){

				preendX = endX; // 记录上一个点的X坐标
				endX = parseInt(event.changedTouches[0].clientX); // 获取当前点X坐标
				// endT = new Date().getTime();
				endX < preendX ? islr = true : islr = false; // 判断方向
				
				slideX = endX-startX; // 计算每次滑动的距离
				// console.log(moveX,lateX,slideX)
				moveX = lateX+slideX; // 划动时的 translateX 动态值

				// 禁止超出 / 添加回弹效果
				if (option.isback) {
					if (moveX >= activeX) {
						// 到达始段时回弹
						moveX = activeX;
						inback = true;
					} else if (moveX <= (-slideWidth*slideLength-activeX)) {
						// 到达末段时回弹
						moveX = (-slideWidth*slideLength-activeX);
						inback = true;
					}
				} else {
					if (moveX >= 0) {
						moveX = 0;
						inback = true;
					} else if (moveX <= (-slideWidth*slideLength)) {
						// 到达始末段时
						moveX = (-slideWidth*slideLength);
						inback = true;
					}
				}
				touchActive.transformX(moveX);
			}, {passive: true})

			slideBox.addEventListener('touchend', function(event){
				endT = new Date().getTime();
				var ts = endT-startT;
				var Acc = (Math.abs(slideX)*2) / Math.pow(ts,2) * 100; // 求加速度
				// 标记当前位置索引
				slideIndex = Math.ceil(Math.abs(lateX/slideWidth));
				self.touchLeave(moveX,slideIndex,Acc);
				// 记录当前的translateX值
				lateX = parseInt(Obj.style.transform.split(",")[0].split("3d(")[1]);
				// lateX = -parseInt(TRANSX_REX.exec(Obj.style.transform)[0]);
				// console.log(lateX)
				
				lock = false; // 手指离开时重新设置自动播放的定时器
				option.autoplay ? self.autoPlay() : null;
			}, {passive: true})
		}

		// 手指离开后判断切换上下一页或停留在当前
		Slide.prototype.touchLeave = function(a,b,Ac){
			// Ac 加速度
			// a:当前translateX值, b:当前所在屏索引, c:当前所在屏的后一个索引, d:划过距离的绝对值
			var c = 0, d = Math.abs(slideX);
			b == slideLength ? c = b : c = b+1;

			var isLeftOK = false; 
			if (a < slideWidth*c && a < 0 && b !=slideLength && d > activeX) {
				isLeftOK = true
			} else {
				isLeftOK = false
			}

			var isRightOK = false; 
			if (a > -slideWidth*b && b !=0 && d > activeX) {
				isRightOK = true
			} else {
				isRightOK = false
			}

			touchActive.transition(.4);

			// Ac 大于某个值时也切换, 手指在屏幕上快速滑动时
			if (islr) { // 手指从右往左划时(要满足5个条件才触发,崩...)
				if (isLeftOK || Ac > 2) {
					// c 为目标位置 index
					slideIndex = c;
					touchActive.transformX(-slideWidth*slideIndex);
					
				} else {
					touchActive.transformX(-slideWidth*b);
				}
			} else { // 手指从左往右划时
				if (isRightOK || (Ac > 2 && b !=0)) {
					// b-1 为目标位置 index
					slideIndex = b-1;
					touchActive.transformX(-slideWidth*slideIndex);
				} else {
					touchActive.transformX(-slideWidth*b);
				}
			}
			// 为了分页标识更自然的切换
			option.pagination ? self.pageAactive(slideIndex) : null;
			self.index = slideIndex;
		}

		// 自动播放设置
		Slide.prototype.autoPlay = function(){
			touchActive.transition(.4);
			// 整个运行过程始终保持改变的值有 slideIndex lateX
			slideTimer = setInterval(function(){
				// timerLate == slideLength ? timerLate = 0 : timerLate++;
				// touchActive.transition(.4);
				// touchActive.transformInx(timerLate)
				if (lock) {
					clearInterval(slideTimer)
				} else {
					slideIndex >= slideLength ? slideIndex = 0 : slideIndex++;
					touchActive.transformInx(slideIndex);
					self.resetIndex()
				}
				// 这里执行一遍切换分页标识是为了让切换动画更自然
				option.pagination ? self.pageAactive(slideIndex) : null;
			},option.time)
		}
		// 根据参数判断是否自动播放
		option.autoplay ? self.autoPlay() : null;

		var transitionEventEnd = checkTransitionEventEnd();
		Obj.addEventListener(transitionEventEnd, function(event){
			// option.pagination ? pageAactive() : null;
			// 每一次切换结束时触发
			// 回弹动画时也触发了
			if (!inback) {
				// 非到达始末端回弹时才触发
				option.complete();
			}
		})

		// 分页标识
		Slide.prototype.pageAactive = function(flag){
			flag == undefined ? flag = Math.ceil(Math.abs(lateX/slideWidth)) : null;
			pageMark.getElementsByClassName("active")[0].classList.remove("active");
			pagePoint[flag].classList.add("active");
		}

		// 刷新当前 slideIndex
		Slide.prototype.resetIndex = function(){
			// 记录当前的translateX值
			lateX = parseInt(Obj.style.transform.split(",")[0].split("3d(")[1]) || 0;
			// 刷新当前位置索引
			slideIndex = Math.ceil(Math.abs(lateX/slideWidth)) || 0;
			self.index = slideIndex;
		}
	}
}

// 节流函数
function throttle(fn,delay,time) {
	// 简单的节流函数
	//fun 要执行的函数 delay 延迟 time 在time时间内必须执行一次
	var timeout, startTime = new Date();
	if (arguments.length < 3) { time = delay };

	return function(){
		var context = this, args = arguments, currentTime = new Date();
		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if (currentTime - startTime >= time) {
			fn.apply(context,args);
			startTime = currentTime;
			// 没达到触发间隔，重新设定定时器
		} else {
			timeout = setTimeout(fn,delay);
		}
	}
}

// 列表预加载
function preload(pra){
	// op.el 为滚动主体  cut 为需要减去的高度 callback 为需要执行的函数
	// 参数至少要传入 obj callback
	// cut 为 list 距离 body 顶部的距离
	// ep:
	// preload({
	// 	el: dom,
	// 	callback: fn,
	// 	cut: number,
	// 	upbtn: dom
	// })
	if (pra.el == undefined) { return } else {
		var op = {
			el: pra.el || false,
			cb: pra.callback || false,
			// 如果没有传入 cut 参数，设置默认值为 body 的 paddingTop
			cu: pra.cut || parseInt(getCSS(document.body,"paddingTop")),
			// 传入返回顶部按钮这个节点对象
			ro: pra.upbtn || false,
			// 原 preloadVal; 未展示过的内容高度默认值为 300, 当列表高度 减去 页面卷起高度再 减去 浏览区展示区域高度的值小于 pv 时触发加载新内容事件
			pv: pra.preloadHeight || 300
		}

		var thisFlag = false; // 用来阻止首次打开页面时执行一次新数据加载

		// 获取浏览器可视区域高度
		var viewHeight = window.screen.availHeight - op.cu;
		var scrollObjHeight = op.el.clientHeight; // 包含 padding 值但不包括 margin border 值
		// var li = op.el.children[0].children[0]; // 获取 op.el list 的头一个 li
		// 获取 op.el list 的头一个 li
		// if(!li){ return }
		// var li = op.el.getElementsByTagName("ul")[0].children[0];
		// 获取 li 的高度 包括 border margin
		// var liHeight = li.offsetHeight + parseInt(getCSS(li,"marginBottom"));
		// 设置未显示部分剩余多少时加载新内容
		// var preloadVal = liHeight*3;

		// 滚动主体总高度小于浏览器显示区域高度时不执行
		if (viewHeight > scrollObjHeight-op.pv) {
			return
		} else {
			// 添加滚动事件
			window.onscroll = throttle(function(){
				// var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				var drc = getScrollDirection.Y();
				var scrollTop = window.pageYOffset;
				// 更新滚动主体的高度，不更新的话每次向上滑动都会加载新数据，因为上次记录的滚动主体高度没有人为改变，下面判断是还是用没有加载数据时的高度判断了
				scrollObjHeight = op.el.clientHeight;
				// 当向上滑动 且 滚动主体高度 减去 可视区域高度 减去 滚动主体卷起高度 大于 op.pv 时加载新数据
				if (thisFlag) {
					thisFlag = true;
				} else {
					var activeVal = scrollObjHeight-viewHeight-scrollTop;
					if (drc && activeVal < op.pv) {
						// 执行传入的回调函数
						op.cb()
					}

					// 监听返回顶部按钮
					// 按钮标准
					// <button isbind="false"></button>
					if (op.ro == false) {
						// console.log("找不到返回顶部按钮")
					} else {
						// 给没有绑定返回顶部事件的按钮绑定事件
						var isBind = op.ro.getAttribute("isbind");
						if (isBind == "false") {
							op.ro.touch(function(){
								easeRunToTop(); // 返回顶部函数
								this.classList.remove("active");
							}, 'click');
							op.ro.setAttribute("isbind",true);
						}
						// 到达一定距离显示或隐藏发回顶部按钮
						if (drc && scrollTop > 400) {
							op.ro.classList.add("active");
						} else if (!drc && scrollTop < 200) {
							op.ro.classList.remove("active");
						}
					}
				}
			},300)
		}
	}
}

// 点到点的抛物线动画
function parabola(element,target,options){
	// 修改于大神的 DEMO
	// 出处 http://www.zhangxinxu.com/wordpress/?p=3855
	// 网页模拟现实需要一个比例尺
	// 如果按照1像素就是1米来算，显然不合适，因为页面动不动就几百像素
	// 页面上，我们放两个物体，200~800像素之间，我们可以映射为现实世界的2米到8米，也就是100:1
	// 不过，本方法没有对此有所体现，因此不必在意
	

	// ep:
	// 提示元素(起始位置)/目标元素(终点位置)/各种设置
	// parabola(runDOM, targetDOM, {
	// 	speed: number,
	// 	curvature: 0.005 number,
	// 	progress: fn,
	// 	complete: fn
	// }).mark().init();
	
	var defaults = {
		// 每帧移动的像素大小，每帧（对于大部分显示屏）大约16~17毫秒
		speed: 166.67,
		// 实际指焦点到准线的距离，你可以抽象成曲率，这里模拟扔物体的抛物线，因此是开口向下的
		curvature: 0.001,
		progress: function() {},
		complete: function() {}
	};
	
	var params = {}; options = options || {};
	
	for (var key in defaults) {
		params[key] = options[key] || defaults[key];
	}
	
	var exports = {
		mark: function() { return this; },
		position: function() { return this; },
		move: function() { return this; },
		init: function() { return this; }
	};
	
	var moveStyle = "margin", testDiv = document.createElement("div");
	if ("oninput" in testDiv) {
		["", "webkit"].forEach(function(prefix) {
			var transform = prefix + (prefix? "T": "t") + "ransform";
			if (transform in testDiv.style) {
				moveStyle = transform;
			}
		});		
	}
	
	// 根据两点坐标以及曲率确定运动曲线函数（也就是确定a, b的值）
	/* 公式： y = a*x*x + b*x + c;
	*/
	var a = params.curvature, b = 0, c = 0;
	
	// 是否执行运动的标志量
	var flagMove = true;
	
	if (element && target && element.nodeType == 1 && target.nodeType == 1) {
		var rectElement = {}, rectTarget = {};
		
		// 移动元素的中心点位置，目标元素的中心点位置
		var centerElement = {}, centerTarget = {};
		
		// 目标元素的坐标位置
		var coordElement = {}, coordTarget = {};
		
		// 标注当前元素的坐标
		exports.mark = function() {
			if (flagMove == false) return this;
			if (typeof coordElement.x == "undefined") this.position();
			element.setAttribute("data-center", [coordElement.x, coordElement.y].join());
			target.setAttribute("data-center", [coordTarget.x, coordTarget.y].join());
			return this;
		}
		
		exports.position = function() {
			if (flagMove == false) return this;
			
			var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			
			// 初始位置
			element.style[moveStyle] = "translate3d(0, 0, 0)";
			
			// 四边缘的坐标
			rectElement = element.getBoundingClientRect();
			rectTarget = target.getBoundingClientRect();
			
			// 移动元素的中心点坐标
			centerElement = {
				x: rectElement.left + (rectElement.right - rectElement.left) / 2 + scrollLeft,
				y: rectElement.top + (rectElement.bottom - rectElement.top) / 2	+ scrollTop
			};
			
			// 目标元素的中心点位置
			centerTarget = {
				x: rectTarget.left + (rectTarget.right - rectTarget.left) / 2 + scrollLeft,
				y: rectTarget.top + (rectTarget.bottom - rectTarget.top) / 2 + scrollTop		
			};
			
			// 转换成相对坐标位置
			coordElement = {
				x: 0,
				y: 0	
			};
			coordTarget = {
				x: -1 * (centerElement.x - centerTarget.x),
				y:  -1 * (centerElement.y - centerTarget.y)	
			};
			
			// 因为经过(0, 0), 因此c = 0
			// 于是：
			// y = a * x * x + b * x;
			// y1 = a * x1 * x1 + b * x1;
			// y2 = a * x2 * x2 + b * x2;
			// 利用第二个坐标：
			// b = (y2 + a * x2 * x2) / x2
			// 于是
			b = (coordTarget.y - a * coordTarget.x * coordTarget.x) / coordTarget.x;	
			
			return this;
		};		
		
		// 按照这个曲线运动
		exports.move = function() {
			// 如果曲线运动还没有结束，不再执行新的运动
			if (flagMove == false) return this;
			
			var startx = 0, rate = coordTarget.x > 0? 1: -1;

			var step = function() {
				// 切线 y'=2ax+b
				var tangent = 2 * a * startx + b; // = y / x
				// y*y + x*x = speed
				// (tangent * x)^2 + x*x = speed
				// x = Math.sqr(speed / (tangent * tangent + 1));
				startx = startx + rate * Math.sqrt(params.speed / (tangent * tangent + 1));
				
				// 防止过界
				if ((rate == 1 && startx > coordTarget.x) || (rate == -1 && startx < coordTarget.x)) {
					startx = coordTarget.x;
				}
				var x = startx, y = a * x * x + b * x;
				
				// 标记当前位置，这里有测试使用的嫌疑，实际使用可以将这一行注释
				element.setAttribute("data-center", [Math.round(x), Math.round(y)].join());
				
				// x, y目前是坐标，需要转换成定位的像素值
				element.style[moveStyle] = "translate3d("+ [x + "px", y + "px"].join() +",0)";
				
				if (startx !== coordTarget.x) {
					params.progress(x, y);
					window.requestAnimationFrame(step);
				} else {
					// 运动结束，回调执行
					params.complete();
					flagMove = true;
				}
			};
			window.requestAnimationFrame(step);
			flagMove = false;
			
			return this;
		};
		
		// 初始化方法
		exports.init = function() {
			this.position().mark().move();
		};
	}
	return exports
}

// 随处可见的 base64 编码+解码
function Base64(){
	// ep 
	// var B = new Base64();
	// B.encode(str)
	// B.decode(str)
	// private property
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// base64 编码
	this.encode = function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
 
	// base64 解码
	this.decode = function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
 
	// 对非 ASCII 字符(中文)的编码
	var _utf8_encode = function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
		return utftext;
	}
 
	//  对非 ASCII 字符(中文)的解码
	var _utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

// 移动端模拟物体的惯性运动/模拟原生的滚动效果(流畅度还能接受...)
function SuperScroll(op){
	// DOM: <div id=""><div class="wrap"></div></div>
	var op = {
		el: op.el, // 滚动主体对象
		ib: op.rebound === false ? false : true, // 是否回弹
		dc: op.direction || "Y", // Y == horizontal , X == vertical, 纵横
	};

	// 用于判断滑动方向
	var HOV = true; // 纵向
	op.dc == "Y" ? HOV = true : HOV = false;

	var Obj = op.el.getElementsByClassName("wrap")[0];

	var MAX_LATE = 0; // 回弹距离上限
	var REBOUND_LATE = 0; // 回弹距离上限
	// 设置回弹效果时给 MAX_LATE, REBOUND_LATE 赋值
	if (op.ib) {
		MAX_LATE = 50;
		REBOUND_LATE = 10;
	}

	// 获取容器高度
	var viewHeight = op.el.offsetHeight;
	var wrapHeight = Obj.offsetHeight;
	var viewLate = wrapHeight - viewHeight;
	// 上移上限
	var MaxLate = viewLate + MAX_LATE;

	// 内容没超出容器范围则不执行下面代码
	if (viewLate < 0) { return } else {
		var lateV = 0; // 记录 Obj 的对应 translate 值
		var startV = 0; // 手指点下时 Y 轴坐标
		var moveV = 0; // 手指划过的距离
		var endV = 0; // 手指离开时 Y 轴坐标
		var beforeV = 0; // 用于记录手指离开时的前一个 endV
		var isTbPre = true; // 记录上一个 isTb
		var isTb = true; // 判断滑动方向 true 为手指由下往上

		var Acc = 0; // 加速度
		var firstSpeed = 0; // 手指离开屏幕时 Obj 的平均移动速度
		var timerready = true; // 用于移动开始时记录开始时间
		var firstT = 0; // 手指开始滑动屏幕时的时间
		var lastT = 0; // 手指离开屏幕时的时间
		var moveT = 0; // 位移所使用的时间

		// 用于记录是否触发回弹
		var isBack = false;

		// 锁定惯性运动, 到达顶部或者底部时锁定
		var stepLock = true;

		// 惯性运动中手指点击屏幕即停止运动
		var touching = false;

		// 手指滑动过程中方向发生改变, 发生改变后的第一次 move 时才为 true
		var dsChange = false;

		// 手指划动时滚动元素实际移动的距离
		var targetV = 0;

		// 被动监听事件
		var bubble = supportsPassive ? { passive: true } : false;

		// CSS3 设置方法
		var TA = {
			tf: function(diff){
				if (HOV) {
					Obj.style.transform = "translate3d(0px,"+diff+"px,0px)";
					Obj.style.webkitTransform = "translate3d(0px,"+diff+"px,0px)";
				} else {
					Obj.style.transform = "translate3d("+diff+"px,0px,0px)";
					Obj.style.webkitTransform = "translate3d("+diff+"px,0px,0px)";
				}
			},
			ti: function(time,tween){
				tween == undefined ? tween = "ease" : null;
				Obj.style.transition = "all "+time+"s "+tween;
				Obj.style.webkitTransition = "all "+time+"s "+tween;
			}
		}

		// 手指按下时
		var start = event => {
			// event.preventDefault();
			getTransLate(HOV);

			TA.ti(0); // 
			if (HOV) {
				startV = event.touches[0].clientY; // 记录起始坐标Y值
			} else {
				startV = event.touches[0].clientX; // 记录起始坐标Y值
			}

			touching = true;
		}
		// 手指上下滑动时
		var move = event => {
			event.preventDefault();

			// 当移动开始的时候开始记录时间
			if (timerready == true) {
				firstT = new Date().getTime();
				timerready = false;
			}
				
			beforeV = endV;

			// 记录手指离开时的坐标
			if (HOV) {
				endV = event.changedTouches[0].clientY;
			} else {
				endV = event.changedTouches[0].clientX;
			}

			endV > beforeV ? isTb = false : isTb = true; // 判断方向

			// 目标 translate 值 / 对象跟随手指移动
			moveV = endV - startV;
			targetV = lateV + moveV;

			// 判断划动中各种状态下是否触发惯性运动
			if (isTb) {
				// 手指由下往上划动时
				if (lateV != -viewLate && targetV > -MaxLate) {
					stepLock = false;
				} else if (targetV >= -MaxLate && targetV < -viewLate) {
					stepLock = true;
				}
			} else {
				// 手指由上往下划动时
				if (lateV != 0 && targetV < 0) {
					stepLock = false;
				} else if (targetV > 0 && targetV <= MAX_LATE) {
					stepLock = true;
				}
			}
			
			// 限制回弹距离
			targetV = Math.max(-MaxLate,targetV);
			targetV = Math.min(MAX_LATE,targetV);

			// 手指划动过程中切换方向了
			if (isTbPre != isTb) {
				isTbPre = isTb;
				dsChange = true;
				// 到达端点时发生切换方向时,让转折点成为 startV
				if (targetV == -MaxLate || targetV == MAX_LATE) {
					startV = endV;
					getTransLate(HOV);
				}
			} else {
				dsChange = false;
			}

			// 回弹距离内移动速度减半，模拟大阻尼效果
			// if ((targetV > 0 && targetV <= MAX_LATE) || (targetV >= -MaxLate && targetV < -viewLate)) {
			// 	var newV = targetV*2;
			// 	TA.tf(newV/4);
			// } else {
			// 	TA.tf(targetV);
			// }
			TA.tf(targetV);

			// console.log("%c MOVE:  isTb: "+isTb+" , targetV: "+targetV+" , lateV: "+lateV+" , moveV: "+moveV+" , endV: "+endV+" , startV: "+startV+" , stepLock: "+stepLock, "color: #4285f4");
		}
		// 手指离开时
		var end = event => {
			// event.preventDefault();
			
			lastT = new Date().getTime();
			// 计算手指按下到离开的时间
			moveT = lastT - firstT;
			// 速度，每一个自然刷新此时移动的距离 (60Hz 刷新率的屏幕)
			var speed = moveV/moveT * 16.666;

			// 经测试，2~60多px不等
			// 将当前的速度保存为衰减速率, 数值越小, 衰减越快, 手指离开后继续位移的距离越短
			var rate = Math.min(30, Math.abs(speed));
			
			timerready = true;
			touching = false;

			// 获取当前对应的 translate 值
			getTransLate(HOV);

			var stepMoveChangeVal = 0;
			// 速度计算法
			function bili() {
				if (touching == true) {
					return
				} else {
					// 将手指离开屏幕前的平均速度转换为惯性运动的位移量, 每一个物理刷新时逐渐减少到 0
					speed = speed - speed/rate;
					// 减速率的每一个物理刷新时的减少值
					stepMoveChangeVal = stepMoveChangeVal - Math.abs(speed);

					// 下一个位置变化的值(目标 translate 值) = 当前 translate 值 ± 减速率减少值
					var stepMove = isTb ? lateV + stepMoveChangeVal : lateV - stepMoveChangeVal;
					
					// console.log("stepMove: "+stepMove," lateV: "+lateV," stepMoveChangeVal: "+stepMoveChangeVal," speed: "+speed," moveV: "+moveV)
					
					// 设置位置变化 只保留两位小数
					stepMove = parseFloat(stepMove.toFixed(2));
					TA.tf(stepMove);

					// 惯性运动过程中减速率小于 1 时或者目标 translate 值到达内容端点时停止惯性运动
					// ±REBOUND_LATE 是为了到达端点处时添加一点碰撞反弹的效果
					if (Math.abs(speed) < 1 || stepMove <= (-viewLate-REBOUND_LATE) || stepMove > REBOUND_LATE) {
						window.cancelAnimationFrame(bili)
						reback()
					} else {
						window.requestAnimationFrame(bili)
					}
				}
			}

			// 内容不在两端点处时划动内容区域才触发惯性运动
			if (stepLock) {
				reback()
			} else {
				if (Math.abs(speed) > 8) {
					// 速度大于一定值时才模拟惯性滚动
					bili()
				}
			}
		}

		// 获取 translate 值
		function getTransLate(HorV){
			if (Obj.style.transform != "") {
				if (HorV) { // 获取 translateY
					lateV = parseFloat(Obj.style.transform.split(",")[1].split("px")[0]);
				} else { // 获取 translateX
					lateV = parseFloat(Obj.style.transform.split("3d(")[1].split(",")[0]);
				}
			}
		}

		// 回弹函数
		function reback() {
			getTransLate(HOV);
			if (lateV > 0) {
				TA.ti(.2);
				TA.tf(0);
				lateV = 0;
			} else if (lateV <= (-viewLate)) {
				TA.ti(.2);
				TA.tf(-viewLate);
				lateV = -viewLate;
			}
		}

		// 绑定 touch 事件
		Obj.addEventListener("touchstart", start, bubble);
		Obj.addEventListener("touchmove", move, {passive: false});
		Obj.addEventListener("touchend", end, bubble);
	}

	// 实例化后返回的方法
	// SuperScroll.prototype.getOptions = () => { return op }
	SuperScroll.prototype.regetViewSize = () => {
		viewHeight = op.el.offsetHeight;
		wrapHeight = Obj.offsetHeight;
		viewLate = wrapHeight - viewHeight;
	}
}