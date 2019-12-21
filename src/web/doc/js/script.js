"use strict";
let REG_URL = Symbol('REG_URL'); // Symbol 说白了只是声明一个唯一的变量名
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

// 计划：
// 1.提供自动或手动生成滚动条容器
// 2.提供手动设置页面和滚动条滚动到指定位置

// 模拟滚动条类
class ImitateScrollBar {
	constructor(options) {
		this.scrollBox = document.getElementById(options.el.split('#')[1])
		this.scrollBoxParent = this.scrollBox.parentNode

		if(options.createScrollBar) {
			// 自动生成滚动条时
			let scrollBarContainer = document.createElement('div')
			let scrollBar = document.createElement('span')
			scrollBarContainer.classList.add('scroll-bar')
			options.scrollBarSkin ? scrollBarContainer.classList.add(options.scrollBarSkin) : null
			scrollBarContainer.append(scrollBar)
			this.scrollBoxParent.append(scrollBarContainer)
			this.scrollBarContainer = scrollBarContainer
			this.scrollBar = this.scrollBarContainer.children[0]
		} else {
			// 手动在页面添加了滚动条容器时
			this.scrollBarContainer = document.getElementById('scrollBar')
			this.scrollBar = this.scrollBarContainer.children[0]
		}
		
		
		this.windowHeight = document.body.offsetHeight // 页面高度
		this.scrollBarArea = this.windowHeight - this.scrollBar.offsetHeight - 4 // 模拟滚动条的运动范围
		this.scrollBoxHieght = 0 // 如果有设置内下边距就需要加上边距的值
		this.isScrollBarHold = false // 判断是否处于鼠标拖动模拟滚动条状态
		this.mouseHoldStartPointY = 0 // 用来记录按住鼠标左键拖动滚动条时鼠标的 Y 坐标
		this.lastMouseUpPointY = 0 // 用来记录松开鼠标左键拖时的 Y 坐标，或者说是模拟滚动条最后的距离滚动条容器顶部的停留位置

		for(let ele of this.scrollBox.children) {
			this.scrollBoxHieght += ele.offsetHeight
		}

		this.scrollBoxScroll = eve => {
			if(!this.isScrollBarHold) {
				let point = Math.round(eve.target.scrollTop * this.scrollBarArea / (this.scrollBoxHieght - this.windowHeight))
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
		this.scrollBoxMouseDown = eve => {
			if(this.isScrollBarHold) {
				this.mouseHoldStartPointY = eve.y
			}
		}
		this.scrollBoxMouseUp = eve => {
			this.isScrollBarHold = false
			this.scrollBar.dataset.late = this.lastMouseUpPointY
		}
		this.scrollBoxMouseMove = eve => {
			if(this.isScrollBarHold) {
				let currentPoint = Number(this.scrollBar.dataset.late)
				let point = currentPoint + eve.y - this.mouseHoldStartPointY
				if(point < 0 || point > this.scrollBarArea - 4) {
					return
				}
				this.scrollBar.style.transform = `translateY(${point}px)`
				this.lastMouseUpPointY = point
				
				let scrollTopValue = Math.round((this.scrollBoxHieght - this.windowHeight) * point / this.scrollBarArea)
				this.scrollBox.scrollTop = scrollTopValue
			}
		}
		this.scrollBox.addEventListener('scroll', this.scrollBoxScroll)
		if(!options.disableDrag) {
			this.scrollBar.addEventListener('mousedown', this.scrollBarMouseDown)
			this.scrollBar.addEventListener('mouseup',  this.scrollBarMouseUp)
			this.scrollBoxParent.addEventListener('mousedown',  this.scrollBoxMouseDown)
			this.scrollBoxParent.addEventListener('mouseup',  this.scrollBoxMouseUp)
			this.scrollBoxParent.addEventListener('mousemove',  this.scrollBoxMouseMove)
		}
	}
	destroy() {
		this.scrollBar.style.opacity = '0'
		this.scrollBar.style.transform = `translateY(0px)`
		this.scrollBox.removeEventListener('scroll', this.scrollBoxScroll)
		if(!options.disableDrag) {
			this.scrollBar.removeEventListener('mousedown', this.scrollBarMouseDown)
			this.scrollBar.removeEventListener('mouseup', this.scrollBarMouseUp)
			this.scrollBoxParent.removeEventListener('mousedown', this.scrollBoxMouseDown)
			this.scrollBoxParent.removeEventListener('mouseup', this.scrollBoxMouseUp)
			this.scrollBoxParent.removeEventListener('mousemove', this.scrollBoxMouseMove)
		}
	}
}
// 初始化实例
let iScrollBar = new ImitateScrollBar({
	el: '#mainBox'
})

let sideScrollBar = new ImitateScrollBar({
	el: '#sideMenuContent',
	createScrollBar: true, // 是否程序自动在目标容器内添加滚动条 HTML 代码
	scrollBarSkin: 'orange', // 设置滚动条颜色
	disableDrag: true, // 禁用拖拽滚动条
})