'use strict';
var selectorButton = document.getElementById("selectorButton");
var selectorLayer = document.getElementById("selectorLayer");
var selectorWrap = document.getElementById("selectorWrap");
var selectorContent = document.getElementById("selectorContent");

function showLayer(is){
	if (is) {
		selectorContent.style.transform = "translate3d(0px,0px,0px)";
		selectorContent.style.webkitTransform = "translate3d(0px,0px,0px)";
		selectorLayer.classList.add("active");
	} else {
		selectorLayer.classList.remove("active");
	}
}

selectorLayer.touch((event) => {
	showLayer()
})
// 阻止遮罩部分滑动默认事件
selectorLayer.addEventListener("touchmove", function(event){
	var target = event.target;
	if (target.id == "selectorLayer") {
		event.preventDefault();
	}
}, {passive: false})

// 列表点击事件
var list = document.getElementById("list");
list.touch((event) => {
	var target = event.target;
	if (target.nodeName == "LI") {
		selectorButton.innerText = "您选择了 "+target.innerText;
		showLayer()
	}
})

selectorButton.touch((event) => {
	showLayer(true)
})

var layer = new SuperScroll({
	el: selectorWrap
})