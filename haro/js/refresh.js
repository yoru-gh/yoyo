'use strict';
// 消息按钮
var message = document.getElementById("message");
message.touch(function(){
	tip.slogan("Hello world!",3000,[{
		name: "前往百度",
		url: "https://www.baidu.com"
	},{
		name: "返回引导页",
		url: "../index.html"
	}])
})

// 返回顶部
var returnTop = document.getElementById("returnTop");
returnTop.touch(function(){
	easeRunToTop();
})

// getScrollPath(); // 获取 isDcs
// 下拉刷新
// 该方法只适用于浏览器没有自带下拉刷新或者用于开发 Web App
function refresh(Obj,fn){
	var ACTIVE_LATE = 220; // 触发刷新需要的下拉距离
	var MAX_LATE = 280; // 下拉距离上限

	var isActive = false; // 是否触发刷新
	var startY = 0; // 手指点下时 Y 轴坐标
	var moveY = 0; // 手指划过的距离
	var endY = 0; // 手指离开时 Y 轴坐标
	var beforeY = 0; // 用于记录手指离开时的前一个 endY
	// var isTb = true; // 判断滑动方向 true 为下

	// 用于记录是否阻止了默认事件, 与 event.cancelable 作用相同
	// 不用 cancelable 的原因是 cancelable 不稳定
	var inRun = false;
	// 被动监听事件
	var bubble = supportsPassive ? { passive: true } : false;

	var touchActive = {
		transformY: function(DOM,diff){
			DOM.style.transform = "translate3d(0px,"+diff+"px,0px)";
			DOM.style.webkitTransform = "translate3d(0px,"+diff+"px,0px)";
		},
		transition: function(DOM,time,tween){
			tween == undefined ? tween = "ease" : null;
			DOM.style.transition = "all "+time+"s "+tween;
			DOM.style.webkitTransition = "all "+time+"s "+tween;
		}
	}

	// 下拉刷新提示动画对象
	var tipDOM = document.getElementById("uploadTip");

	// 手指按下时
	var start = event => {
		// event.preventDefault();
		touchActive.transition(Obj,0); // 
		touchActive.transformY(tipDOM,0); // 
		startY = event.touches[0].clientY; // 记录起始坐标X值
	}
	// 手指上下滑动时
	var move = event => {
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		// 到达页面顶部时
		if (scrollTop <= 0) {
			// 判断默认事件是否被取消
			if (!inRun) { touchmovePreventDefault(); }
			
			beforeY = endY;
			endY = event.changedTouches[0].clientY; // 记录手指离开时的坐标
			moveY = endY-startY;
			// endY > beforeY ? isTb = true : isTb = false; // 判断方向

			// 到达指定聚利时改变刷新判断值
			moveY >= ACTIVE_LATE ? isActive = true : isActive = false;
			
			// 限制下拉的最大距离
			if (moveY >= MAX_LATE) {
				moveY = MAX_LATE;
			}
			touchActive.transformY(Obj,moveY/2);

			// 刷新提示跟随下拉动画
			tipDOM.style.opacity = moveY/MAX_LATE;
			touchActive.transition(tipDOM,0);
			touchActive.transformY(tipDOM,moveY*80/MAX_LATE);

			// console.log(moveY)
		}
	}
	// 手指离开时
	var end = event => {
		// if (isTb || moveY > 0) {
		// 	touchActive.transition(Obj,.2);
		// 	touchActive.transformY(Obj,0);
		// }
		
		// 手指离开屏幕后主体恢复到原来的位置
		touchActive.transition(Obj,.2);
		touchActive.transformY(Obj,0);
		// 执行 callback
		if (isActive) { fn() }
		touchmoveReturnVal(); // 恢复 touchmove 的默认事件

		// 刷新提示过渡消失
		touchActive.transition(tipDOM,.2);
		tipDOM.style.opacity = 0;
		touchActive.transformY(tipDOM,0);
	}

	var touchmoveReturnVal = event => {
		Obj.addEventListener("touchmove", event => {
			event.returnValue = true;
		}, {passive: false});
		inRun = false;
	}
	var touchmovePreventDefault = event => {
		Obj.addEventListener("touchmove", event => {
			event.preventDefault();
		}, {passive: false});
		inRun = true;
	}

	Obj.addEventListener("touchstart", start, bubble);
	Obj.addEventListener("touchmove", move, {passive: false});
	Obj.addEventListener("touchend", end, bubble);
}

// 
var content = document.getElementById("content");
refresh(content,() => {
	tip.toast("数据加载中")
})