'use strict';
// 节流函数
function throttle(fn,delay,time) {
	// 简单的节流函数
	//fun 要执行的函数 delay 延迟 time 在time时间内必须执行一次
	var timeout, startTime = new Date();
	if (arguments.length < 3) { time = delay };

	return function() {
		var context = this, args = arguments, curTime = new Date();
		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if (curTime - startTime >= time) {
			fn.apply(context,args);
			startTime = curTime;
			// 没达到触发间隔，重新设定定时器
		} else {
			timeout = setTimeout(fn,delay);
		}
	}
}
// 获取当前浏览器 event 的 transitionEnd 类型
var checkTransitionEventEnd = () => {
	var t;
	var el = document.createElement('check');
	var transitions = {
		'transition':'transitionend',
		'OTransition':'oTransitionEnd',
		'MozTransition':'transitionend',
		'WebkitTransition':'webkitTransitionEnd'
	}
	for(t in transitions){
		if( el.style[t] !== undefined ){
			return transitions[t];
		}
	}
}
// 滑动轮播
function Slide(op){
	// ep
	// slide({
	// 	el: "#div", // 实际运动的元素
	// 	autoplay: true || false, // 自动切换
	// 	time: 3000, // 自动切换时间, 单位 ms
	// 	enter: true || false, // 鼠标移入是否停止自动切换
	// 	complete: function(){
	// 		// 每次切换完成时执行
	// 		console.log("complete");
	// 	},
	// 	pagination: true / false // 是否显示分页标识
	// })
	// DOM 结构  <div>  <ul><li></li></ul>  </div>
	
	// defult
	if (op == undefined || op.el == undefined) { 
		console.log("找不到对象")
		return
	} else {
		var option = {
			el: op.el.split("#")[1],
			autoplay: op.autoplay || false,
			time: op.time || 5000,
			enter: op.enter || true,
			complete: op.complete || function(){},
			pagination: op.pagination || true
		}

		var slideBox = document.getElementById(option.el);

		var pageMark = slideBox.getElementsByClassName("pagination")[0] || slideBox;
		var Obj = slideBox.children[0];
		var slideLength = Obj.children.length-1; // 获取划动元素的页数
		var slideWidth = slideBox.offsetWidth.toFixed(2); // 宽度
		
		// 自动适应子元素个数
		Obj.style.width = (slideLength+1) * 100 + "%";
		for (var i = 0; i <= slideLength; i++) {
			var span = document.createElement("span");
			i == 0 ? span.classList.add("active") : null;
			pageMark.appendChild(span);
		}

		var pagePoint = pageMark.getElementsByTagName("span") || false;
		
		var lateX = 0, // 记录上一次滑动后的 translateX 的值
			isfirst = true, // 自动播放挂起
			lock = false, // 自动播放挂起
			islr = true; // true 为左

		var translateTime = .6; // 过渡时间

		// var activeX = .3*slideWidth; // 切换到上一页或下一页所需划过距离的最小值
		var slideIndex = 0; // 标记当前位置索引
		var TRANSX_REX = /\d{1,4}/; // 匹配4位数字正则表达式

		// 自动播放定时器
		var slideTimer;

		var touchActive = {
			transformX: function(diff){
				// 利用 translate3d 开启设备 GPU 加速渲染
				Obj.style.transform = "translate3d("+diff+"px,0px,0px)";
				Obj.style.webkitTransform = "translate3d("+diff+"px,0px,0px)";
			},
			transformInx: function(inx){
				// inx 为目标元素的索引值
				var diff = -inx*slideWidth;
				Obj.style.transform = "translate3d("+diff+"px,0px,0px)";
				Obj.style.webkitTransform = "translate3d("+diff+"px,0px,0px)";
			},
			transition: function(time,tween){
				tween == undefined ? tween = "ease" : null;
				Obj.style.transition = "all "+time+"s "+tween;
				Obj.style.webkitTransition = "all "+time+"s "+tween;
			},
		}
		// touchActive.transition(translateTime, 'cubic-bezier(0.53, 0, 0.76, 1.15)');
		touchActive.transition(translateTime);
		// 淡入淡出效果把第一个参数设置成 0
		// touchActive.transition(0);
		
		if (option.enter) {
			// 鼠标移入时
			slideBox.addEventListener('mouseenter', function(event){
				lock = true; // 鼠标移入时即挂起自动播放的定时器
				// 鼠标移入轮播区域时挂起自动播放
				clearInterval(slideTimer)
			},false)
			// 鼠标移出时
			slideBox.addEventListener('mouseleave', function(event){
				resetIndex()
				lock = false;
				// 鼠标移出时重新设置自动播放的定时器
				option.autoplay ? autoIs() : null;
			},false)
		}

		// 自动播放设置
		function autoIs(){
			// touchActive.transition(translateTime);
			// 整个运行过程始终保持改变的值有 slideIndex lateX
			slideTimer = setInterval(function(){
				if (lock) {
					clearInterval(slideTimer)
				} else {
					slideIndex >= slideLength ? slideIndex = 0 : slideIndex++;
					touchActive.transformInx(slideIndex);
					resetIndex()
				}
				// 这里执行一遍切换分页标识是为了让切换动画更自然
				option.pagination ? pageAactive(slideIndex) : null;
			}, option.time)
		}
		// 根据参数判断是否自动播放
		option.autoplay ? autoIs() : null;

		// 点击按钮切换
		function buttonIs(isLeft){
			resetIndex()
			if (isLeft) {
				if (slideIndex == 0) {
					touchActive.transformInx(slideLength);
				} else {
					touchActive.transformInx((slideIndex-1));
				}
			} else {
				if (slideIndex == slideLength) {
					touchActive.transformInx(0);
				} else {
					touchActive.transformInx((slideIndex+1));
				}
			}
			resetIndex()
			pageAactive(slideIndex)
		}

		var switchBtn = slideBox.getElementsByClassName("switch-button");
		switchBtn[0].addEventListener("click", function(){
			buttonIs(true)
		})
		switchBtn[1].addEventListener("click", function(){
			buttonIs(false)
		})

		var transitionEventEnd = checkTransitionEventEnd();
		Obj.addEventListener(transitionEventEnd, function(event){
			// 每一次切换结束时触发
			if (!isfirst) {
				// 初始化时不触发
				option.complete();
			} else { isfirst = false }
		})

		// 分页标识
		function pageAactive(flag){
			flag == undefined ? flag = Math.ceil(Math.abs(lateX/slideWidth)) : null;
			pageMark.getElementsByClassName("active")[0].classList.remove("active");
			pagePoint[flag].classList.add("active");

			// 淡入淡出效果
			if (flag == 0 || flag == slideLength) {
				Obj.classList.add("active")
			} else {
				Obj.classList.remove("active")
			}
			Obj.getElementsByClassName("active")[0].classList.remove("active");
			Obj.children[flag].classList.add("active");
		}

		// 刷新当前 slideIndex
		function resetIndex(){
			// 记录当前的translateX值
			lateX = parseInt(Obj.style.transform.split(",")[0].split("3d(")[1]) || 0;
			// 刷新当前位置索引
			slideIndex = Math.ceil(Math.abs(lateX/slideWidth)) || 0;
		}
	}
}
Slide({
	el: "#banner",
	autoplay: false, // 自动切换
	time: 5000, // 自动切换时间, 单位 ms
})

// 滚动显示悬浮菜单
var nav = document.getElementById("nav");
window.addEventListener("scroll", throttle(function(){
	var pageYOffset = this.pageYOffset;
	if (pageYOffset > 400) {
		nav.classList.add("active");
	} else {
		nav.classList.remove("active");
	}
},200))

var User = new Vue({
	el: '#regBox',
	data: {
		welcometxt: 'Hi, Mario!',
		username: 'Mario',
		button: [
			{
				href: 'https://yoruni.com',
				text: '个人中心'
			},
			{
				href: 'https://baidu.com',
				text: '充值'
			},
			{
				href: 'https://yoruni.com',
				text: '退出'
			}
		]
	}
})

// Vue.component('msg-list',{
// 	props: ['fKey'], // HTML 中大小写不敏感需要写成对应的帕斯卡式命名
// 	template: '<li><a v-bind:href="fKey.href">{{ fKey.text }}</a></li>'
// })

var msgBoxData = [
	{
		button: {
			txt: "公告",
			active: true
		},
		list: [
			{
				href: 'https://yoruni.com',
				text: '第一栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第一栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第一栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第一栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第一栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '更多',
				classname: 'last'
			}
		]
	},
	{
		button: {
			txt: "公告",
			active: false
		},
		list: [
			{
				href: 'https://yoruni.com',
				text: '第二栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第二栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第二栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第二栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第二栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '更多',
				classname: 'last'
			}
		]
	},
	{
		button: {
			txt: "公告",
			active: false
		},
		list: [
			{
				href: 'https://yoruni.com',
				text: '第三栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第三栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第三栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第三栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '第三栏公告信息'
			},
			{
				href: 'https://yoruni.com',
				text: '更多',
				classname: 'last'
			}
		]
	}
];

Vue.component('Msgbox',{
	props: ['datalist','tap', 'isactive'],
	template: 
	`<div id="msg" class="msg">
		<button 
			v-for="(key, index) in datalist" 
			@click="tap(index)" 
			:class="{ active: isactive[index] }">
			{{ key.button.txt }}
		</button>
		<div class="msg-box">
			<ul v-for="key in datalist">
				<li v-for="item in key.list" :class="item.classname">
					<a :href="item.href">{{ item.text }}</a>
				</li>
			</ul>
		</div>
	</div>`,
})

var MsgBox = new Vue({
	el: '#user',
	data: {
		listData: msgBoxData,
		isActive: [],
		transTar: null,
		transVal: [],
	},
	methods: { // 公告切换
		tapSwitch(key){
			let idx = this.isActive.indexOf(true);
			if (key != idx) {
				// this.isActive[idx] = false;
				// this.isActive[key] = true;
				Vue.set(this.isActive, idx, false)
				Vue.set(this.isActive, key, true)
			}
			this.transTar.style.transform = 'translateX('+this.transVal[key]+'px)'
			// console.log(key,idx,this.isActive)
			// this.$emit('tapSwitch');
		},
		auto(){
			for (var i = 0; i < this.listData.length; i++) {
				// Vue 不响应新增数据，需要用 set 来响应
				Vue.set(this.isActive, i, this.listData[i].button.active)
				Vue.set(this.transVal, i, (-200*i))
			}
			this.transTar = this.$el.getElementsByClassName('msg-box')[0]
			this.transTar.style.width = 200*this.transVal.length+'px'
			// console.log(this.transTar, this.transVal)
		}
	},
	mounted: function(){
		// Vue 实例加载完成后执行
		this.auto()
	}
})

const name = 'Hello', age = 99
const you = {
	name,
	age
}
const hero = {
	address: 'TIANHE'
}
const json = {...you, ...hero}
// console.log(json)

class says{
	constructor(){
		this.type = 'Language'
	}
	say(txt){
		console.log(this.type + ' is ' + txt)
	}
}
// var say = new says();
// console.log(says)

class english extends says{
	constructor(){
		super();
		this.type = 'English'
	}
}
let eng = new english();
// eng.say('Hello')

// const str = 'Hello';
// console.log(`${str} World`)

// const str = `Hello
// 	world`;
// console.log(str)

// for (var i = 0; i < 5; i++) {
//   setTimeout((function(i) {
//     console.log(i);
//   })(i), i * 1000);
// }