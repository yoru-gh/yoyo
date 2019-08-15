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
var sortRight = document.getElementById("sortRight");
sortLeft.touch(function(event){
	var target = event.target;
	if (target.nodeName.toLowerCase() == "span") {
		this.getElementsByClassName("active")[0].classList.remove("active");
		target.parentNode.classList.add("active");
	}
})

function oldScroll(op){
	// dom
	// <div id="op.el"><div class="wrap"></div></div>
	var op = {
		el: op.el, // 滚动主体对象
		ib: op.isback || true, // 是否回弹
		dc: op.direction || "horizontal", // horizontal vertical, 纵横
	};

	var Obj = op.el.getElementsByClassName("wrap")[0];

	// 获取容器高度
	var viewHeight = op.el.offsetHeight;
	var wrapHeight = Obj.offsetHeight;

	var MAX_LATE = 160; // 回弹距离上限

	var lateV = 0; // 记录 Obj 的对应 translate 值
	var startV = 0; // 手指点下时 Y 轴坐标
	var moveV = 0; // 手指划过的距离
	var endV = 0; // 手指离开时 Y 轴坐标
	var beforeV = 0; // 用于记录手指离开时的前一个 endV
	var isTb = true; // 判断滑动方向 true 为手指由下往上

	var Acc = 0; // 加速度
	var firstSpeed = 0; // 手指离开屏幕时 Obj 的平均移动速度
	var firstT = 0; // 手指开始滑动屏幕时的时间
	var lastT = 0; // 手指离开屏幕时的时间
	var st = 0; // 位移所使用的时间

	// 用于记录是否阻止了默认事件, 与 event.cancelable 作用相同
	// 不用 cancelable 的原因是 cancelable 不稳定
	var inRun = false;
	// 被动监听事件
	var bubble = supportsPassive ? { passive: true } : false;

	var touchActive = {
		transformY: function(diff){
			Obj.style.transform = "translate3d(0px,"+diff+"px,0px)";
			Obj.style.webkitTransform = "translate3d(0px,"+diff+"px,0px)";
		},
		transition: function(time,tween){
			tween == undefined ? tween = "ease" : null;
			Obj.style.transition = "all "+time+"s "+tween;
			Obj.style.webkitTransition = "all "+time+"s "+tween;
		}
	}

	// 手指按下时
	var start = event => {
		event.preventDefault();
		if (Obj.style.transform != "") {
			lateV = parseInt(Obj.style.transform.split(",")[1].split("px")[0]);
		}

		firstT = new Date().getTime();
		// event.preventDefault();
		touchActive.transition(0); // 
		startV = event.touches[0].clientY; // 记录起始坐标X值
	}
	// 手指上下滑动时
	var move = event => {
		event.preventDefault();
		// var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		var scrollTop = op.el.scrollTop;
		// 到达页面顶部时
		// if (scrollTop <= 0) {
			
			beforeV = endV;
			endV = event.changedTouches[0].clientY; // 记录手指离开时的坐标
			endV > beforeV ? isTb = false : isTb = true; // 判断方向

			moveV = endV-startV;
			moveV = Math.round(moveV*1000)/1000;
			// moveV = moveV/4*3;

			// 限制下拉的最大距离
			// if (moveV >= MAX_LATE) {
			// 	moveV = MAX_LATE;
			// }
			touchActive.transformY(lateV+moveV);
		// }
	}
	// 手指离开时
	var end = event => {
		event.preventDefault();
		// 获取当前对应的 translate 值
		lateV = parseInt(Obj.style.transform.split(",")[1].split("px")[0]);
		// X: parseInt(Obj.style.transform.split("3d(")[1].split(",")[0]);

		// 手指离开前一般为初速度为0的匀加速运动, 手指离开后则是末速度为0的匀减速运动, 加速度方向与末速度方向相反, 整个过程中先加速再减速
		// 初速度为 0 的匀加速运动公式
		// S=1/2at²
		// 末速度为 0 的匀减速运动公式
		// S=vt-at²/2 => at²-2vt+2S=0,   ax²+bx+c=0(a≠0) => x=[-b±√(b²-4ac)]/2a
		// 这里我们假设 S = 100
		
		// *********手指离开前这部分**********
		lastT = new Date().getTime();
		// 计算手指按下到离开的时间
		st = lastT - firstT;
		// 求出加速度
		Acc = (Math.abs(moveV)*2) / Math.pow(st,2);
		Acc = Math.max(0.002,Acc).toFixed(3);
		// 加速运动中末速度 单位 px/ms
		// firstSpeed = moveV/st;
		firstSpeed = Acc*st*16.666;
		// console.log(Acc,st,firstSpeed)
		// console.log(Acc,st)

		// *********手指离开后这部分**********
		// 手指离开后在当前对应的 translate 值上再减速运动一段时间
		// S = firstSpeed*T - (Acc*T*T)/2
		// (Acc*T*T) - 2*firstSpeed*T + 2S = 0
		// var S = Math.abs(moveV)+100;
		var S = 100; // 先假设为 100px
		// var A = -2*firstSpeed;
		// var B = Math.sqrt((Math.pow(2*firstSpeed,2) + (4*Acc*S*2)));
		// var C = 2*Acc;
		// 速度减到 0 所需时间单位 s, 理论上因该是除以 1000 的
		// var T = Math.ceil((A + B) / C)/800;
		// var T = Math.ceil(getSqrt(Acc,(-2*firstSpeed),(2*S)));
		var T = getSqrt(Acc,(-2*firstSpeed),(2*S)).toFixed(3);
		console.log(T)
		var lastLate = 0;
		
		isTb > 0 ? lastLate=lateV-100 : lastLate=lateV+100;
		// console.log(isTb,lateV)

		touchActive.transition(T);
		touchActive.transformY(lastLate);


		// if (isTb || moveV > 0) {
		// 	touchActive.transition(.2);
		// 	touchActive.transformY(0);
		// }
		
		// 手指离开屏幕后主体恢复到原来的位置
		// touchActive.transition(.2);
		// touchActive.transformY(0);
		// 执行 callback
		// if (isActive) { fn() }
		
		// console.log(Acc,firstSpeed,T,lastLate)
		// console.log(T)
	}

	// 匀减速运动中已知路程,加速度,速度,求时间
	// 公式 S=vt-at²/2 => at²-2vt+2S=0,   ax²+bx+c=0(a≠0) => x=[-b±√(b²-4ac)]/2a
	function getSqrt(A,B,C){
		var X = 0;
		X = (Math.sqrt(B*B-4*A*C)-B)/2*A;
		return X
	}

	Obj.addEventListener("touchstart", start, {passive: false});
	Obj.addEventListener("touchmove", move, {passive: false});
	Obj.addEventListener("touchend", end, {passive: false});
}

// 此处用到的方法跟上面的 superScrollS 是一样的, superScroll 方法在 yoruni.js 文件内
// oldScroll 中的 move 方法内是另外一个模拟物体惯性的思路
var leftScroll = SuperScroll({
	el: sortLeft,
})

var rightScroll = SuperScroll({
	el: sortRight,
})