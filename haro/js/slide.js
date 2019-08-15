'use strict';
// slide 方法在 yoruni.js 文件内
// 执行函数
var slide = new Slide({
	el: "#slideWarpper",
	autoplay: true, // 自动切换
	time: 3000, // 自动切换时间, 单位 ms
	// isback: false, // 是否边缘回弹
	complete: function(){
		// console.log("complete");
		console.log("当前是第 " + (slide.index+1) + " 个");
	},
	pagination: true
})