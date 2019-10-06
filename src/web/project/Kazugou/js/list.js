'use strict';
// 节流函数
function throttle(fn,delay,time) {
	// 简单的节流函数
	//fun 要执行的函数 delay 延迟 time 在time时间内必须执行一次
	var timeout, startTime = new Date();
	if (arguments.length < 3) { time = delay };

	return function() {
		var context = this, args = arguments, curTime = new Date();
		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if (curTime - startTime >= time) {
			fn.apply(context,args);
			startTime = curTime;
			// 没达到触发间隔，重新设定定时器
		} else {
			timeout = setTimeout(fn,delay);
		}
	}
}

// 滚动显示悬浮菜单
var nav = document.getElementById("nav");
window.addEventListener("scroll", throttle(function(){
	var pageYOffset = this.pageYOffset;
	if (pageYOffset > 400) {
		nav.classList.add("active");
	} else {
		nav.classList.remove("active");
	}
},200))

var selected = document.getElementById("selected");

var catalog = document.getElementById("catalog");
var mode = document.getElementById("mode");
var modeBtn = mode.getElementsByTagName("button");
mode.addEventListener("click", event => {
	var target = event.target.getAttribute("md") || false;
	if (target == "list") {
		modeBtn[1].classList.add("active");
		modeBtn[0].classList.remove("active");
		catalog.classList.add("cata-list");
		catalog.classList.remove("cata-block");
	} else if ( target == "block") {
		modeBtn[0].classList.add("active");
		modeBtn[1].classList.remove("active");
		catalog.classList.add("cata-block");
		catalog.classList.remove("cata-list");
	}
})
// 收藏
catalog.addEventListener("click", event => {
	var target = event.target || "";
	var targetType = target.nodeName.toLowerCase();
	var targetName = target.className.indexOf("collect");
	if (targetType == "button" && targetName > -1) {
		if (target.className.indexOf("active") > -1) {
			target.classList.remove("active")
		} else {
			target.classList.add("active")
		}
	}
})

var loadWrap = document.getElementById("loadWrap");

// 鼠标移入分类字母时显示对应的列表
!function(){
	var keyListTimer;
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var keyList = document.getElementById("keyList");
	var keyListChild = keyList.getElementsByTagName("li");
	var keyBox = document.getElementById("keyBox");
	var keyPin = keyBox.getElementsByClassName("pin")[0];
	var keyWrap = keyBox.getElementsByClassName("list")[0];
	keyList.addEventListener("mouseenter", event => {
		var target = event.target;
		clearTimeout(keyListTimer);
		keyBox.classList.add("active");
	})
	keyList.addEventListener("mouseleave", event => {
		keyListTimer = setTimeout(() => {
			keyBox.classList.remove("active");
		}, 600)
	})
	keyBox.addEventListener("mouseenter", event => {
		var target = event.target;
		clearTimeout(keyListTimer);
	})
	keyBox.addEventListener("mouseleave", event => {
		keyListTimer = setTimeout(() => {
			keyBox.classList.remove("active");
		}, 800)
	})
	for (var i = 0; i < keyListChild.length; i++) {
		// 200毫秒内阻止多次触发
		keyListChild[i].addEventListener("mouseenter", throttle(event => {
			var target = event.target || "";
			var targetVal = target.innerText || "";
			var inx = keyStr.indexOf(targetVal);
			// 每个 li 的宽度加上边距为 45px
			keyPin.style.transform = "translateX("+(inx*45)+"px) rotate(45deg)";

			// some function
			var objArr;
			var elementStr = "";
			keyWrap.innerHTML = "";
			// parseInt(Math.random()*(max-min+1)+min,10)
			var len = parseInt(Math.random()*(20)+1,10);
			for (var i = 0; i < len; i++) {
				elementStr += "<li>"+targetVal+(i+1)+"</li>";
			}

			!function(){
				var div = document.createElement("div");
				div.innerHTML = elementStr;
				objArr = div.childNodes;
			}()

			var arrlen = parseInt(objArr.length);
			for (var x = 0; x < arrlen; x++) {
				var obj = objArr[x];
				// objArr[0] 这里下标为 0 的原因是 keyWrap 每添加一个子节点 objArr 中相应的元素会被删除
				keyWrap.appendChild(objArr[0])
			}
		},200))
	}
	// 列表内选项的事件委托
	keyBox.addEventListener("click", event => {
		var target = event.target || "";
		if (target.nodeName.toLowerCase() == "li") {
			clearTimeout(keyListTimer);
			keyBox.classList.remove("active");

			selected.innerHTML = target.innerText;
			selected.setAttribute("data",target.innerText);

			area.getElementsByClassName("active")[0].classList.remove("active");
			area.getElementsByTagName("li")[0].classList.add("active");

			price.getElementsByClassName("active")[0].classList.remove("active");
			price.getElementsByTagName("li")[0].classList.add("active");

			// 加载动画
			loadWrap.classList.add("active");
			window.setTimeout(() => {
				loadWrap.classList.remove("active");
			}, 2000)

			console.log(target.innerText)
		}
	})
}()

// 选区
var area = document.getElementById("area");
area.addEventListener("click", event => {
	var target = event.target || "";
	if (target.nodeName.toLowerCase() == "li") {
		area.getElementsByClassName("active")[0].classList.remove("active");
		target.classList.add("active");

		var selectData = selected.getAttribute("data");
		var dataArr = selectData.split(" / ");
		selected.innerHTML = dataArr[0]+" / "+target.innerText;
		selected.setAttribute("data",selected.innerHTML);

		// 加载动画
		loadWrap.classList.add("active");
		window.setTimeout(() => {
			loadWrap.classList.remove("active");
		}, 2000)

		console.log(target.innerText)
	}
})
// 选价格
var price = document.getElementById("price");
price.addEventListener("click", event => {
	var target = event.target || "";
	if (target.nodeName.toLowerCase() == "li") {
		price.getElementsByClassName("active")[0].classList.remove("active");
		target.classList.add("active");

		var selectData = selected.getAttribute("data");
		var dataArr = selectData.split(" / ");
		selected.innerHTML = dataArr[0]+" / "+dataArr[1]+" / "+target.innerText;
		selected.setAttribute("data",selected.innerHTML);

		// 加载动画
		loadWrap.classList.add("active");
		window.setTimeout(() => {
			loadWrap.classList.remove("active");
		}, 2000)

		console.log(target.innerText)
	}
})