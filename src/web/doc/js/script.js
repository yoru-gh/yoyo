"use strict";
// import ImitateScrollBar from './module/ImitateScrollBar.js'
let REG_URL = Symbol('REG_URL'); // Symbol 说白了只是声明一个唯一的变量名
let regObj = {
	[REG_URL]: '123',
	test: '123'
}

!(function() {
	let lastTime = 0;
	let vendors = ['webkit', 'moz'];
	for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		// name has changed in Webkit
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	// 兼容处理
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			let currTime = new Date().getTime();
			// 一般显示器刷新率为每秒60次(60Hz) 1000/60≈16.67
			let timeToCall = Math.max(0, 16.67 - (currTime - lastTime));
			let id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		}
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		}
	}
}())

// 缓动函数
var Tween = {
	linear: function(t, b, c, d) { 
		return c * t / d + b; 
	},
	cubicEaseOut: function(t, b, c, d) {
		return c * ((t = t/d - 1) * t * t + 1) + b;
	}
}

// JS 模拟事件
!(function(){
	let ievent = document.createEvent('MouseEvents')
	ievent.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, 0, null)
	
	let box = document.getElementById('box')
	box.addEventListener('click', function(){
		let color = `rgb(${~~(Math.random()*255)},${~~(Math.random()*255)},${~~(Math.random()*255)})`
		this.innerHTML = color
		this.style.backgroundColor = color
	}, false)
	
	let button = document.getElementById('button')
	button.addEventListener('click', function(){
		box.dispatchEvent(ievent)
	}, false)
})

hljs.initHighlightingOnLoad();
hljs.setLineNumber(); // 添加行号

// 点击左侧栏内容跳到相应的锚点
let anchorPointArray = [];
let anchorList = document.querySelectorAll('.anchor')
anchorList.forEach(element => {
	anchorPointArray.push(element.offsetTop)
});

let mainBox = document.getElementById('mainBox')
let sideBox = document.getElementById('sideBox')
let sideMenu = document.getElementById('sideMenu')
let sideMenuBg = document.getElementById('sideMenuBg')

let sideMenuTags = sideMenu.getElementsByTagName('li')
// 点击对应菜单滚动到对应位置
sideMenu.addEventListener('click', event => {
	let target = event.target
	if(target.nodeName.toLowerCase() === 'li') {
		let value = Number(target.dataset.value)
		if(value == undefined) {
			return
		}
		let activeList = sideMenu.getElementsByClassName('active')
		if(activeList.length > 0) {
			sideMenu.getElementsByClassName('active')[0].classList.remove('active')
		}
		target.classList.add('active')
		iScrollBar.scrollTo(anchorPointArray[value] - 10)
	}
})

// 初始化实例
let iScrollBar = new ImitateScrollBar({
	el: '#mainBox'
})

let sideScrollBar = new ImitateScrollBar({
	el: '#sideMenuContent',
	createScrollBar: true, // 自动添加滚动条 HTML 代码，会添加到 el 的父节点上
	scrollBarSkin: 'orange', // 设置滚动条颜色
	disableDrag: true, // 禁用拖拽滚动条
	float: 'left', // 设置滚动条在左/右
})

let button = document.getElementById('button')
let loadingBox = document.getElementById('loadingBox')
button.addEventListener('click', event => {
	let _this = event.target
	let value = Number(_this.dataset.value)
	if(value == 0) {
		_this.dataset.value = 1
		loadingBox.classList.add('active')
	} else {
		_this.dataset.value = 0
		loadingBox.classList.remove('active')
	}
})

let vh = document.body.offsetHeight
const HYPOTENUSE = Math.ceil(Math.sqrt(Math.pow(80, 2) + Math.pow(vh, 2))) //斜边长度
const INCLUDED_ANGLE = Number((Math.atan2(80, vh)*180/Math.PI).toFixed(2)) // 夹角角度
let hypotenuseStyle = [
	'.hypotenuse {',
		`height: ${HYPOTENUSE}px;`,
		`transform: rotate(${INCLUDED_ANGLE}deg)`,
	'}'
]
let hypotenuseStyleEl = document.createElement('style')
hypotenuseStyleEl.type = 'text/css'
hypotenuseStyleEl.innerHTML = hypotenuseStyle.join('');
document.getElementsByTagName('head')[0].appendChild(hypotenuseStyleEl)

let createButton = document.getElementById('createList')
createButton.addEventListener('click', event => {
	let tar = sideMenu.getElementsByTagName('ul')[0]
	let li = document.createElement('li')
	li.classList.add('heightli')
	tar.append(li)
	sideScrollBar.refresh()
})

// 菜单动画
let menuIcon = document.getElementById('menuIcon')
menuIcon.addEventListener('click', () => {
	let value = Number(menuIcon.dataset.value)
	if(value == 0) {
		menuIcon.dataset.value = 1
		menuIcon.classList.add('active')
		sideMenu.classList.add('active')
		sideMenuBg.classList.add('active')
	} else {
		menuIcon.dataset.value = 0
		menuIcon.classList.remove('active')
		sideMenu.classList.remove('active')
		sideMenuBg.classList.remove('active')
	}
})