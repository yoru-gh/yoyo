"use strict";
// var REG_URL = Symbol(/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])/); // 链接
let REG_URL = Symbol('REG_URL'); // Symbol 说白了只是声明一个唯一的变量名
	// [REG_URL] = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])/;
let regObj = {
	[REG_URL]: '123',
	test: '123'
}
// console.log(regObj)

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
sideBox.addEventListener('click', event => {
	let target = event.target
	if(target.nodeName.toLowerCase() === 'li') {
		let value = Number(target.dataset.value)
		if(value == 0) {
			sideMenu.classList.add('active')
		} else {
			sideMenu.classList.remove('active')
		}
	}
})

// 模拟滚动条类
class ImitateScrollBar {
	constructor(options) {
		this.scrollBarContent = document.getElementById('scrollBar')
		this.scrollBar = this.scrollBarContent.children[0]
		this.mainBox = document.getElementById(options.el.split('#')[1])
		this.windowHeight = document.body.offsetHeight // 页面高度
		this.scrollBarArea = this.windowHeight - this.scrollBar.offsetHeight - 4 // 模拟滚动条的运动范围
		this.mainBoxHieght = 0 // 如果有设置内下边距就需要加上边距的值
		this.isScrollBarHold = false // 判断是否处于鼠标拖动模拟滚动条状态
		this.mouseHoldStartPointY = 0 // 用来记录按住鼠标左键拖动滚动条时鼠标的 Y 坐标
		this.lastMouseUpPointY = 0 // 用来记录松开鼠标左键拖时的 Y 坐标，或者说是模拟滚动条最后的距离滚动条容器顶部的停留位置

		for(let ele of this.mainBox.children) {
			this.mainBoxHieght += ele.offsetHeight
		}

		this.mainBoxScroll = eve => {
			if(!this.isScrollBarHold) {
				let point = Math.round(eve.target.scrollTop * this.scrollBarArea / (this.mainBoxHieght - this.windowHeight))
				this.scrollBar.style.transform = `translateY(${point}px)`
				this.lastMouseUpPointY = point
				this.scrollBar.dataset.late = this.lastMouseUpPointY
			}
		}
		this.scrollBarMouseDown = eve => {
			eve.preventDefault()
			this.isScrollBarHold = true
		}
		this.scrollBarMouseUp = eve => {
			eve.preventDefault()
			this.isScrollBarHold = false
			this.scrollBar.dataset.late = this.lastMouseUpPointY
		}
		this.bodyMouseDown = eve => {
			if(this.isScrollBarHold) {
				this.mouseHoldStartPointY = eve.y
			}
		}
		this.bodyMouseUp = eve => {
			this.isScrollBarHold = false
			this.scrollBar.dataset.late = this.lastMouseUpPointY
		}
		this.bodyMouseMove = eve => {
			if(this.isScrollBarHold) {
				let currentPoint = Number(this.scrollBar.dataset.late)
				let point = currentPoint + eve.y - this.mouseHoldStartPointY
				if(point < 0 || point > this.scrollBarArea - 4) {
					return
				}
				this.scrollBar.style.transform = `translateY(${point}px)`
				this.lastMouseUpPointY = point
				
				let scrollTopValue = Math.round((this.mainBoxHieght - this.windowHeight) * point / this.scrollBarArea)
				this.mainBox.scrollTop = scrollTopValue
			}
		}

		this.mainBox.addEventListener('scroll', this.mainBoxScroll)
		this.scrollBar.addEventListener('mousedown', this.scrollBarMouseDown)
		this.scrollBar.addEventListener('mouseup',  this.scrollBarMouseUp)
		document.body.addEventListener('mousedown',  this.bodyMouseDown)
		document.body.addEventListener('mouseup',  this.bodyMouseUp)
		document.body.addEventListener('mousemove',  this.bodyMouseMove)
	}
	destroy() {
		this.scrollBar.style.opacity = '0'
		this.scrollBar.style.transform = `translateY(0px)`
		this.mainBox.removeEventListener('scroll', this.mainBoxScroll)
		this.scrollBar.removeEventListener('mousedown', this.scrollBarMouseDown)
		this.scrollBar.removeEventListener('mouseup', this.scrollBarMouseUp)
		document.body.removeEventListener('mousedown', this.bodyMouseDown)
		document.body.removeEventListener('mouseup', this.bodyMouseUp)
		document.body.removeEventListener('mousemove', this.bodyMouseMove)
	}
}
// 初始化实例
let iScrollBar = new ImitateScrollBar({
	el: '#mainBox'
})