'use strict';
var mask = document.getElementById("mask");
// 常用分类选择
var screenNav = document.getElementById("screenNav");
var screenOne = document.getElementById("screenOne");
var screenTow = document.getElementById("screenTow");
var screenThree = document.getElementById("screenThree");
var screenFour = document.getElementById("screenFour");
var detap = true;
tap(screenNav,function(){
	var target = event.target || event.srcElement;
	var point = target.getAttribute("point");
	if (detap) {
		detap = false;
		screenNav.querySelector(".active").classList.remove("active");
		target.classList.add("active");
		load.addBox("加载中...");
		setTimeout(function(){
			switchFun();
			load.removeBox();
			detap = true;
		},1000);
	}
	// 模拟ajax加载数据中
	function switchFun(){
		switch(point){
			case "1": {
				screenOne.style.display = "block";
				screenTow.style.display = "none";
				screenThree.style.display = "none";
				screenFour.style.display = "none";
			}; break;
			case "2": {
				screenOne.style.display = "none";
				screenTow.style.display = "block";
				screenThree.style.display = "none";
				screenFour.style.display = "none";
			}; break;
			case "3": {
				screenOne.style.display = "none";
				screenTow.style.display = "none";
				screenThree.style.display = "block";
				screenFour.style.display = "none";
			}; break;
			case "4": {
				screenOne.style.display = "none";
				screenTow.style.display = "none";
				screenThree.style.display = "none";
				screenFour.style.display = "block";
			}; break;
		}
	}
})
// 已完成订单删除操作
tap(screenFour,function(){
	var target = event.target || event.srcElement;
	if (target.className == "getOrder") {
		warns("确定要删除该条订单信息",function(){
			target.parentNode.remove();
		})
	}
})

// 刷新按钮
var refresh = document.getElementById("refresh");
tap(refresh,function(){
	load.addBox("加载数据中...");
	setTimeout(function(){load.removeBox()},2000);
})