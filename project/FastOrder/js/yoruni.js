'use strict';
// 依赖 yoruni.css 文件
// toast显示
function tip(mes,time){
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
	}, 20);
	bs = setTimeout(function(){
		// 短时间内频繁调用此方法会造成此函数内存泄漏，原因浏览器没有及时回收 setTimeout 造成节点对象为 null 的报错，判断上一次调用函数时是否删除了上一次的节点内存，防止报错
		if (obj.parentNode == null) return;
		obj.parentNode.removeChild(obj)
	}, thisTime);
};
// warn 警告框
function warns(text,fun){
	var masks = document.getElementById("mask");
	var obj1 = document.createElement("div");
	var obj2 = document.createElement("div");
	var obj3 = document.createElement("span");
	var obj4 = document.createElement("span");

	obj1.setAttribute("id","warns");
	obj2.classList.add("warnText");
	obj2.innerText = text;
	obj3.classList.add("warnCan");
	obj3.innerText = "取消";
	obj4.classList.add("warnCom");
	obj4.innerText = "确定";

	masks.classList.add("active");
	document.body.appendChild(obj1);
	obj1.appendChild(obj2);
	obj1.appendChild(obj3);
	obj1.appendChild(obj4);

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
var loading = {
	addfun: function(mes){
		var div = document.createElement("div");
		div.innerText = mes;
		div.setAttribute("id","loadingTip");
		document.body.appendChild(div);
	},
	removefun: function(){
		var loadingTip = document.getElementById("loadingTip");
		loadingTip == null ? null : loadingTip.remove();
	}	
}
// 下拉刷新上拉加载
function slideud(option) {
	var defaults = {
		el: '',
		downRefresh: function(e){}, // 下拉刷新回调
		upload: function(e){} // 上拉加载回调
	};
	var start,end,length,
		isLock = false, //是否锁定整个操作
		isCanDo = false, //是否移动滑块
		returnTop = false; //返回头部按钮显示值

	var obj = document.querySelector(option.el);
	var loading = obj.firstElementChild;
	var thisListSelf = obj.getElementsByTagName("ul")[0];
	var offset = loading.clientHeight; //获取提示盒子的高度
	var objParent = obj.parentElement;
	var listli = thisListSelf.firstElementChild.clientHeight; // 获取列表单个子元素高度
	var parentClientHeight = objParent.clientHeight; // 获取列表高度
	var uploadPos = thisListSelf.clientHeight - parentClientHeight; // 获取列表高度与视区de差值

	var fn = {
		//移动容器
		translate: function (diff) {
			obj.style.webkitTransform = 'translate3d(0,'+diff+'px,0)';
			obj.style.transform = 'translate3d(0,'+diff+'px,0)';
		},
		//设置效果时间
		setTransition: function (time) {
			obj.style.webkitTransition = 'all '+time+'s';
			obj.style.transition = 'all '+time+'s';
		},
		//收起加载提示返回到初始位置
		back: function () {
			fn.translate(-offset);
			isLock = false; //标识操作完成
		}
	};
	// 一系列的拖拽
	fn.translate(-offset);
	obj.addEventListener("touchstart",start);
	obj.addEventListener("touchmove",move,false);
	obj.addEventListener("touchend",end);

	//滑动开始
	function start(e) {
		var even = typeof event == "undefined" ? e : event;
		if (objParent.scrollTop <= 0 && !isLock) {
			//标识操作进行中
			isLock = true;
			isCanDo = true;
			length = -offset;
			//保存当前鼠标Y坐标
			start = even.touches[0].clientY;
			//消除滑块动画时间
			fn.setTransition(0);
			loading.innerHTML='下拉刷新数据';
		}
	}
	//滑动中
	function move(e) {
		var even = typeof event == "undefined" ? e : event;
		if (objParent.scrollTop <= 0 && isCanDo) {		
			//保存当前鼠标Y坐标
			end = even.changedTouches[0].clientY;
			if (start < end) {
				even.preventDefault();
				fn.setTransition(0); //消除滑块动画时间
				length += 3;
				if (length > 15) length = 15; // 限制下拉最大高度，这个高度未包含刷新提示框的高度
				fn.translate(length);
			}
		}
	}
	//滑动结束
	function end(e) {
		if (isCanDo) {
			isCanDo = false;
			//判断滑动距离是否大于等于指定值
			if (end - start >= offset) {
				fn.setTransition(.4); //设置滑块回弹时间
				fn.translate(0); //保留提示部分
				//执行回调函数
				loading.innerHTML='正在刷新数据';
				if (typeof option.downRefresh == "function") {
					option.downRefresh.call(fn, e);
				}
			} else {				
				fn.back();//返回初始状态
			}
		}
	}
	// 监听滚动
	var returnTopBtn = document.getElementById("returnTopBtn");
	var returnTopPos = uploadPos; // 返回顶部判断值
	// 页面滚动式执行的函数
	function scrollFun(event){
		// 当页面即将到达页面底部时进行更多数据的加载
		if(objParent.scrollTop >= (uploadPos-1.5*listli)) {
			if (typeof option.upload == "function") {
				option.upload();
				// 更新列表定点加载列表值
				uploadPos = thisListSelf.clientHeight - parentClientHeight;
			};
		};
		if (!returnTop && objParent.scrollTop >= returnTopPos) {
			returnTopBtn.classList.add("active");
			returnTop = true;
		}else if (returnTop && objParent.scrollTop <= returnTopPos) {
			returnTopBtn.classList.remove("active");
			returnTop = false;
		};
	}
	// 对滚动元素添加节流函数
	objParent.addEventListener("scroll",throttle(scrollFun,200,500),false);
	// 返回顶部按钮
	returnTopBtn.addEventListener("touchend",function(event){
		event.preventDefault();
		objParent.scrollTop = 0;
		returnTopBtn.classList.remove("active");
		returnTop = false;
		tip("已返回顶部",1500);
	})
}

// 监听滚动方向，在存在上面的下拉加载函数情况下下面的方法似乎没啥用(上面自带上拉加载判断)，但是只要求上拉加载时就有用了
var isScrollDirection = {
	scrollTopStart: 0, // 滚动过程中的前一个值
	scrollTopEnd: 0, // 滚动过程中的后一个值
	scrollTopOpen: true, // true 为向上滑
	isState: function (obj){ // obj为滚动元素父级元素，相当于浏览器默认滚动时的 body 元素
		this.scrollTopEnd = obj.scrollTop; // 储存当前卷起值
		if (this.scrollTopEnd > this.scrollTopStart) {
			this.scrollTopStart = this.scrollTopEnd;
			this.scrollTopOpen = true;
		}else if (this.scrollTopStart > this.scrollTopEnd) {
			this.scrollTopStart = this.scrollTopEnd;
			this.scrollTopOpen = false;
		};
		return {
			start: this.scrollTopStart,
			end: this.scrollTopEnd,
			open: this.scrollTopOpen
		} // 返回判断结果
	}
}

// 简单的节流函数
//fun 要执行的函数
//delay 延迟
//time  在time时间内必须执行一次
function throttle(fun, delay, time) {
	var timeout, startTime = new Date();
	return function() {
		var context = this, args = arguments, curTime = new Date();
		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if (curTime - startTime >= time) {
			fun.apply(context, args);
			startTime = curTime;
			// 没达到触发间隔，重新设定定时器
		} else {
			timeout = setTimeout(fun, delay);
		}
	}
}

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