'use strict';
// 消息按钮
var message = document.getElementById("message");
message.touch(function(){
	tip.slogan("该功能暂时无法使用")
})

// 返回顶部
var returnTop = document.getElementById("returnTop");
returnTop.touch(function(){
	easeRunToTop();
})

var list = document.getElementById("list");
var content = document.getElementById("content");

var lis = '<li class="new"><span><svg><use xlink:href="../icon/sprite.svg#icon-star"></use></svg></span></li>';
for (var i = 0; i < 3; i++) {
	lis += lis;
};

var delay = .8;
preload({
	el: content,
	callback: function(){
		var dom = createDOM(lis);
		for (var i = 0; i < dom.length; i++) {
			delay += .1;
			dom[i].style.animationDelay = delay+"s";
			dom[i].style.webkitAnimationDelay = delay+"s";
			list.appendChild(dom[i]);
		};
		delay = .8;
		tip.toast("已加载新数据")
	}
})