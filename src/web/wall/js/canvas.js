'use strict';
!(function(){
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var ctx = canvas.getContext('2d');
	
	// 绘制圆角正方形
	ctx.beginPath();
	ctx.moveTo(40.5, 20.5);
	ctx.lineTo(115.5, 20.5);
	ctx.arc(115.5, 45.5, 25, -.5*Math.PI, 0);
	ctx.lineTo(140.5, 120.5);
	ctx.lineTo(40.5, 120.5);
	ctx.lineTo(40.5, 20.5);
	// ctx.closePath();
	// ctx.fillStyle = 'rgba(66,133,244,1)';
	// ctx.fill();
	ctx.strokeStyle = 'rgb(66,133,244)';
	ctx.lineWidth = 1;
	ctx.stroke();

	// 绘制一个贪吃的脸
	var radius = Math.PI/180*30;
	// 计算开口的右上坐标
	var tx = Math.cos(-radius)*50 + 250;
	var ty = Math.sin(-radius)*50 + 70;
	// 计算开口的右下坐标
	var bx = Math.cos(radius)*50 + 250;
	var by = Math.sin(radius)*50 + 70;

	// console.log(tx, ty);
	// console.log(bx, by);
	ctx.beginPath();
	ctx.moveTo(bx, by);
	ctx.lineTo(250, 70);
	ctx.lineTo(tx, ty);
	ctx.arc(250, 70, 50, -radius, radius, true); // 逆时针
	// 绘制圆眼睛
	ctx.moveTo(243, 56)
	ctx.arc(240, 56, 3, 0, 2*Math.PI);
	ctx.strokeStyle = 'rgb(66,133,244)';
	ctx.stroke();

	// 贝塞尔曲线
	// 二次贝塞尔曲线
	ctx.beginPath();
	ctx.moveTo(40, 160);
	ctx.quadraticCurveTo(90, 140, 140, 160);
	ctx.quadraticCurveTo(160, 210, 140, 260);
	ctx.quadraticCurveTo(90, 280, 40, 260);
	ctx.quadraticCurveTo(20, 210, 40, 160);
	ctx.strokeStyle = 'rgb(66,133,244)';
	ctx.stroke();

	// 三次贝塞尔曲线
	ctx.beginPath();
	ctx.moveTo(200, 160);
	ctx.bezierCurveTo(210, 130, 290, 130, 300, 160);
	ctx.bezierCurveTo(330, 170, 330, 250, 300, 260);
	ctx.bezierCurveTo(290, 290, 210, 290, 200, 260);
	ctx.bezierCurveTo(170, 250, 170, 170, 200, 160);
	ctx.strokeStyle = 'rgb(66,133,244)';
	ctx.stroke();
})()