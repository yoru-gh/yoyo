'use strict';
var tip = {
	data: {
		toastTimer: null,
		sloganTimer: null,
		sloganStr: "",
		waitStr: "",
		confirmStr: "",
		confirmMethod: function(){},
		formula: function(min,max){
			// 产生 min 到 max 之间的随机整数
			var val = parseInt(Math.random()*(max-min+1)+min,10);
			return val
		}
	},
	toast: function(txt,time){
		// 需要有 id 为 toast 的容器及其 CSS
		// 当页面不存在 id 为 toast 的元素时会 JS 生成该节点, 但是这里建议预先在页面准备好该元素
		// 接受两个参数, 文本(必选) 自动消失时间(可选)
		// tip.toast(txt,time)
		// 目前只支持最多 11 个中文字符
		if (txt == undefined) { return } else {
			time == undefined ? time = 3000 : null;

			var isActive,Obj;
			Obj = document.getElementById("toast");
			Obj == undefined ? tip.createDiv("toast") : null;

			function continueRun(){
				Obj = document.getElementById("toast");
				if (Obj == undefined) { continueRun() } else {
					isActive = Obj.getAttribute("active");
					if (isActive == "true") {
						Obj.classList.remove("active");
						// 清除延时器
						clearTimeout(tip.data.toastTimer);
						// 重新设置延时器
						Obj.innerText = txt;
						// 延时添加类名, 不然冲重新添加类名的效果无效
						setTimeout(function(){ Obj.classList.add("active") },20);

						tip.data.toastTimer = setTimeout(function(){
							Obj.classList.remove("active");
							Obj.setAttribute("active","false");
						}, time);
					} else {
						Obj.setAttribute("active","true");
						Obj.innerHTML = txt;
						Obj.classList.add("active");
						tip.data.toastTimer = setTimeout(function(){
							Obj.classList.remove("active");
							Obj.setAttribute("active","false");
						}, time);
					}
				}
			}
			continueRun()
		}
	},
	slogan: function(txt,time){
		// 接受 txt time 两个参数, 文本/链接(必选) 自动消失时间(可选)
		// 需要有 id 为 slogan 的容器及其 CSS
		// 当页面不存在 id 为 slogan 的元素时会 JS 生成该节点, 但是这里建议预先在页面准备好该元素
		// 接受两个参数, 文本(必选) 自动消失时间(可选
		// txt 允许含有多个 a 标签链接, txt 可以是节点字符
		// tip.slogan(txt,time)
		if (txt == undefined) { return } else {
			time == undefined ? time = 3000 : null;

			var isActive,Obj;
			Obj = document.getElementById("slogan");
			Obj == undefined ? tip.createDiv("slogan") : null;

			function continueRun(){
				Obj = document.getElementById("slogan");
				if (Obj == undefined) { continueRun() } else {
					isActive = Obj.getAttribute("active");
					// 检查内容与上一次不一样则重新写入
					if (txt != tip.data.sloganStr) {
						Obj.innerHTML = tip.data.sloganStr = txt;
					}
					if (isActive == "true") {
						Obj.classList.remove("active");
						// 清除延时器
						clearTimeout(tip.data.sloganTimer);
						// 重新设置延时器
						// 延时添加类名, 不然冲重新添加类名的效果无效
						setTimeout(function(){ Obj.classList.add("active") },20);
						tip.data.sloganTimer = setTimeout(function(){
							Obj.classList.remove("active");
							Obj.setAttribute("active","false");
						}, time);
					} else {
						Obj.setAttribute("active","true");
						Obj.classList.add("active");
						tip.data.sloganTimer = setTimeout(function(){
							Obj.classList.remove("active");
							Obj.setAttribute("active","false");
						}, time);
					}
				}
			}
			continueRun()
		}
	},
	dialog: function(ops){
		ops = {
			txt: ops.txt || false,
			type: ops.type || "alert", // alert 或者是 confirm
			sure: ops.sure || function(){ return },
			suretext: ops.suretext || "确定", // 确认按钮文本
			canceltext: ops.canceltext || "取消", // 取消按钮文本
		}
		// txt 不限于文本, 可以是任何字符或是元素
		if (!ops.txt) { return }
		// if (ops.type == "alert") {} else if (true) {}
		var Obj = document.getElementById("dialog");
		// 禁止背景滚动
		var Objbind = Obj.getAttribute("bind") || false;
		if (Objbind != "true") {
			Obj.setAttribute("bind", true)
			Obj.addEventListener("touchmove", event => {
				event.preventDefault()
			}, {passive: false})
		}
		Obj.classList.add("active");

		// 更新警告提示文本
		var content = Obj.getElementsByClassName("dialog-content")[0];
		// 内容跟上一次相同时不改变当前内容
		if (ops.txt != tip.data.confirmStr) {
			content.innerHTML = tip.data.confirmStr = ops.txt;
		}

		if (ops.type == "alert") {
			// 隐藏取消按钮
			var cancel = Obj.getElementsByClassName("cancel")[0];
			cancel.classList.add("hide");
			tip.data.confirmMethod = ops.sure;
		} else if (ops.type == "confirm") {
			// 更新确认执行的函数
			if (typeof ops.sure == "function" && ops.sure != undefined) {
				tip.data.confirmMethod = ops.sure;
			}
			// 取消按钮绑定关闭警告框事件
			var cancel = Obj.getElementsByClassName("cancel")[0];
			cancel.classList.remove("hide");
			var cancelbind = cancel.getAttribute("bind") || false;
			if (cancelbind != "true") {
				cancel.setAttribute("bind", true)
				cancel.touch(() => {
					Obj.classList.remove("active");
				})
			}
		}

		// 确定按钮绑定确定执行事件
		var sure = Obj.getElementsByClassName("sure")[0];
		var cancel = Obj.getElementsByClassName("cancel")[0];
		var surebind = sure.getAttribute("bind") || false;
		if (surebind != "true") {
			sure.setAttribute("bind", true)
			sure.touch(() => {
				Obj.classList.remove("active");
				tip.data.confirmMethod();
			})
		}

		// 自定义按钮文本
		sure.innerText = ops.suretext;
		cancel.innerText = ops.canceltext;
	},
	wait: function(oOrc,txt){
		// oOrc open/close 默认值 open
		// 接受 oOrc txt 两个参数, 开/关(必选) 提示文本(可选)
		// 目前只支持单行文本
		oOrc == ("open" || "close") ? oOrc = "open" : null;
		var Obj = document.getElementById("wait");
		if (Obj == undefined) { tip.toast("结构不存在") } else {
			if (arguments.length == 2 && txt != tip.data.waitStr) {
				// 检查内容与上一次不一样则重新写入
				var target = Obj.getElementsByClassName("wait-right")[0];
				target.innerText= tip.data.waitStr = txt;
			}
			if (oOrc == "close") {
				Obj.classList.remove("active");
			} else {
				Obj.classList.add("active");
			}
		}
	},
	createDiv: function(id,fn){
		var div = document.createElement("div");
		div.className = id;
		div.id = id;
		div.setAttribute("active", false);
		document.body.appendChild(div);
	},
	createSheet: function(){
		var styleDOM = document.createElement('style'),
		styleSheet = styleDOM.sheet;
		styleSheet.addRule('.box', 'height: 100px');
		styleSheet.insertRule('.box {height: 100px}', 0);
		document.head.appendChild(styleDOM);
	}
}

var toastActive = document.getElementById("toastActive");
toastActive.touch(() => {
	tip.toast("自动消失提示气泡",3000)
})

var sloganActive = document.getElementById("sloganActive");
var stxt = '顶部出现的自动消失提示框。加速度加速度家集散地到爱上降低啊<a href="https://baidu.com/">前往百度</a>，加上降低那就是按键四等奖<a href="https://baidu.com/">前往百度</a>';
sloganActive.touch(() => {
	tip.slogan(stxt,3000)
})

var alertActive = document.getElementById("alertActive");
alertActive.touch(() => {
	tip.dialog({
		type: 'alert',
		txt: '<img src="http://t.cn/RrALePN">',
		suretext: '好的'
	})
})

var confirmActive = document.getElementById("confirmActive");
var ctxt = '<h1>某协议</h1><span>不会挂起后续脚本的确认框爱江山打金色天津市的辽阔的积分是快门咖啡金灿加快速度你擦删除的么老卡卡沈昌珉触控键<a href="https://baidu.com/">前往百度</a></span>';
confirmActive.touch(() => {
	tip.dialog({
		type: "confirm",
		txt: ctxt,
		sure: () => {
			console.log("confirm completed")
		},
		suretext: '同意'
	})
})

var waitActive = document.getElementById("waitActive");
waitActive.touch(() => {
	tip.wait("open")
	window.setTimeout(() => {
		tip.wait("close")
		tip.toast("加载完成")
	}, 3000)
})

// var objProAcitve = document.getElementById("objProAcitve");
// var testObject = {};
// Object.defineProperty(objProAcitve, "prop", {
// 	set: function(value){},
// 	get: function(){
// 		return objProAcitve.prop
// 	}
// })
// objProAcitve.prop = "Hello";
// objProAcitve.touch(() => {
// 	console.log(objProAcitve.prop)
// })