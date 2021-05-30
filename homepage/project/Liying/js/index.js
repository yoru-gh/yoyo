'use strict';
// localStorage.clear();
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
// warns 方法用于显示警告框 createDom 方法用于组装节点, 详情查阅 yoruni.js 文件
warns(createDom("warn","请使用手机查看页面"));

tap(btn1,function(){
	tip("自动消失提示框",3000);
})
tap(btn2,function(){
	load.addBox("加载中...");
	setTimeout(load.removeBox,2000); // 手动设置触发移除等待提示
})
tap(btn3,function(){
	warns("警告框",function(){
		console.log("这是函数输出")
	});
})
