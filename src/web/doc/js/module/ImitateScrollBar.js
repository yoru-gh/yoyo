"use strict";
// 计划：
// 模拟滚动条类
class ImitateScrollBar {
	constructor(options) {
		this.options = options
		this.scrollBox = document.getElementById(options.el.split('#')[1])
		this.scrollBoxParent = this.scrollBox.parentNode

		if(options.createScrollBar) {
			let target = this.scrollBoxParent.getElementsByClassName('scroll-bar')[0]
			if(target != undefined) {
				// 已存在滚动条但是滚动条是被禁用状态时
				target.classList.remove('disable')
				this.scrollBarContainer = target
			} else {
				// 自动生成滚动条时
				let scrollBarContainer = document.createElement('div')
				let scrollBar = document.createElement('span')
				scrollBarContainer.classList.add('scroll-bar')
				// 添加自定义的样式
				options.scrollBarSkin ? scrollBarContainer.classList.add(options.scrollBarSkin) : null
				scrollBarContainer.append(scrollBar)
				this.scrollBoxParent.append(scrollBarContainer)
				this.scrollBarContainer = scrollBarContainer
			}
		} else {
			// 手动在页面添加了滚动条容器时
			this.scrollBarContainer = this.scrollBoxParent.getElementsByClassName('scroll-bar')[0]
		}

		this.scrollBar = this.scrollBarContainer.children[0]
		this.windowHeight = document.body.offsetHeight // 页面高度
		this.scrollBarArea = this.windowHeight - this.scrollBar.offsetHeight - 8 // 模拟滚动条的运动范围
		this.scrollBoxHieght = 0 // 如果有设置内下边距就需要加上边距的值
		this.isScrollBarHold = false // 判断是否处于鼠标拖动模拟滚动条状态
		this.mouseHoldStartPointY = 0 // 用来记录按住鼠标左键拖动滚动条时鼠标的 Y 坐标
		this.lastMouseUpPointY = 0 // 用来记录松开鼠标左键拖时的 Y 坐标，或者说是模拟滚动条最后的距离滚动条容器顶部的停留位置

		for(let ele of this.scrollBox.children) {
			this.scrollBoxHieght += ele.offsetHeight
		}

		// 设置滚动条的停靠位置
		if(options.float == 'left') {
			this.scrollBarContainer.classList.add('float-left')
		}

		this.scrollBoxScroll = eve => {
			if(!this.isScrollBarHold) {
				let point = this.getScrollPoint()
				if(point > this.scrollBarArea) {
					point = this.scrollBarArea
				}
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

		// 滚动到指定位置
		this.scrollTo = (point = 0, time = 300) => {
			// 一个参数都没有时返回顶部
			// 目标点距离当前位置超过 10px 时才执行
			if (Math.abs(this.scrollBox.scrollTop - point) > 10) {
				const SV = point - this.scrollBox.scrollTop // 位移量
				const AT = Math.ceil(time/16.67) // time 时间内把总位移分割成 AT 份，
				let index = 0
				let apArr = this.getArithmeticProgression(SV, time)
				let go = () => {
					// 现在设定从某个位置滚动到指定位置的固定位移为 S 单位 px
					// 位移 S 所需要的时间固定为 T 单位 ms
					// 已知每执行一次 requestAnimationFrame 所用的时间为 16.67ms，用 t 表示
					// 也就是现在需要把 S 划分成 T/t 段，S/(T/t) 值的合集，如果是匀减速运动就是一个等差数列
					this.scrollBox.scrollTop += apArr[index]
					index ++
					if (index < AT) {
						window.requestAnimationFrame(go);
					} else {
						window.cancelAnimationFrame(go);
					}
				};
				go();
			}
		}

		// 需要滚动的容器内增加了新的内容后调用，重新生成实例
		this.refresh = (ops = this.options) => {
			let refreshObject = new ImitateScrollBar(ops)
			let point = this.getScrollPoint(refreshObject)
			if(point > refreshObject.scrollBarArea) {
				point = refreshObject.scrollBarArea
			}
			refreshObject.scrollBar.style.transition = `transform .2s ease`
			refreshObject.scrollBar.style.transform = `translateY(${point}px)`
			refreshObject.lastMouseUpPointY = point
			refreshObject.scrollBar.dataset.late = refreshObject.lastMouseUpPointY
			setTimeout(() => {
				refreshObject.scrollBar.style.transition = `unset`
			}, 200)
			return refreshObject
		}

		// 不需要滚动时隐藏滚动条
		if(this.scrollBoxHieght <= this.windowHeight) {
			this.scrollBarContainer.classList.add('disable')
			return
		} else {
			this.scrollBarContainer.classList.remove('disable')
		}
	}
	destroy() {
		this.scrollBar.style.opacity = '0'
		this.scrollBar.style.transform = `translateY(0px)`
		this.scrollBox.removeEventListener('scroll', this.scrollBoxScroll)
		if(!this.options.disableDrag) {
			this.scrollBar.removeEventListener('mousedown', this.scrollBarMouseDown)
			this.scrollBar.removeEventListener('mouseup', this.scrollBarMouseUp)
			this.scrollBoxParent.removeEventListener('mousedown', this.scrollBoxMouseDown)
			this.scrollBoxParent.removeEventListener('mouseup', this.scrollBoxMouseUp)
			this.scrollBoxParent.removeEventListener('mousemove', this.scrollBoxMouseMove)
		}
	}
	getScrollPoint(obj = this) {
		// 按比例计算出滚动条的位置
		return Math.round(obj.scrollBox.scrollTop * obj.scrollBarArea / (obj.scrollBoxHieght - obj.windowHeight))
    }
    // 已知总和，项数，末项，求首项和公差并返回一个等差数列数组，可以看作是一个匀减速运动每一帧的位移合集
    getArithmeticProgression(s, t, an = 0) {
        // s 总和，t 运动总时间，an 末项默认值为 0
        // 16.67 = 1000ms / 60hz，按照一般 60hz 刷新率显示器计算，每一帧的时间约等于 16.67ms
        const n = Math.ceil(t / 16.67) // 过程中的位移次数，即项数
        const a1 = 2 * s / n - an // 首项
        const d = (an - a1) / (n - 1) // 公差
        
        let arr = []
        for(let i = 0; i < n; i++) {
            arr.push(Math.round(a1 + (d * i)))
        }
        return arr
    }
}
// export default ImitateScrollBar