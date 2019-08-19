window.addEventListener("load",function(){	
	var bodyWidth = document.documentElement.clientWidth, // window.innerWidth
		bodyHeight = document.documentElement.clientHeight;
	var mask = document.getElementById("mask"); // 遮罩层

	var slidelr = function(obj,eve,callback){
		var touchs = 0,touche = 0;
		obj.addEventListener("touchstart",function(){
			event.preventDefault(); // 防止触发浏览器默认左右滑动切换页面 以及安卓浏览器上 touchend 不触发问题
			touchs = event.touches[0].clientX;
		});
		obj.addEventListener("touchend",function(){
			touche = event.changedTouches[0].clientX;
			switch(eve){
				case "slideleft":
					if((touchs-touche) > 20){
						if (callback != undefined) callback()
					}
				break;
				case "slideright":
					if((touchs-touche) < (-20)){
						if (callback != undefined) callback()
					}
				break;
			}
		});
	};

	// 切换语言
	var lanChange = document.getElementById("lanChange");
	var lanList = document.getElementById("lanList");
	lanChange.addEventListener("touchend",function(){
		lanList.classList.add("active");
		mask.classList.add("maskshow");
	});

	// 首页媒体操作事件委托
	var topBox = document.getElementById("topBox");
	topBox.addEventListener("touchend",function(ev){
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		video = null || document.getElementById("video");
		audio = null || document.getElementById("audio");
		switch(target.id){
			case "videoplay": {
				target.style.display = "none";
				video.play();
			}
			break;
			case "videopause": video.pause();
			break;
			case "audioplay": audio.play();
			break;
			case "audiopause": audio.pause();
			break;
		}
	})

	// 激活轮播 当页面有轮播结构了再执行此方法
	function swipeInit(){
		var a = 0;
		var swipeList = document.getElementById("swipeList");
		var swipeTip = document.getElementById("swipeTip");
		var sliArr = swipeList.getElementsByTagName("li");
		var tsliArr = swipeTip.getElementsByTagName("li");
		swipeList.style.width = sliArr.length*bodyWidth+"px";
		for (var i = 0; i < sliArr.length; i++) {
			sliArr[i].style.width = bodyWidth+"px";
			swipeTip.appendChild(document.createElement("li"));
			tsliArr[i].style.cssText += "width:"+100/sliArr.length+"%";
		};
		tsliArr[0].classList.add("active");
		var slidel = function(){
			if (a < (sliArr.length - 1)) {
				a++;
				swipeList.style.cssText += "-webkit-transform: translateX(-"+a*bodyWidth+"px)";
			}else{
				a = sliArr.length - 1;
			};
			swipeTip.getElementsByClassName("active")[0].classList.remove("active");
			tsliArr[a].classList.add("active");
		};
		var slider = function(){
			if (a > 0) {
				a--;
				swipeList.style.cssText += "-webkit-transform: translateX(-"+a*bodyWidth+"px)";
			}else{
				a = 0;
			};
			swipeTip.getElementsByClassName("active")[0].classList.remove("active");
			tsliArr[a].classList.add("active");
		};
		slidelr(swipeList,"slideleft",function(){
			slidel()
		});
		slidelr(swipeList,"slideright",function(){
			slider()
		});
		// 自动播放轮播
		(function(){
			setInterval(function(){
				if (a < (sliArr.length-1)) {
					slidel()
				}else if(a == (sliArr.length-1)){
					swipeList.style.cssText += "-webkit-transform: translateX(0)";
					a = 0;
					swipeTip.getElementsByClassName("active")[0].classList.remove("active");
					tsliArr[0].classList.add("active");
				};
			},5000)
		})();
	};
	if (document.getElementById("swipeList") != null) swipeInit();

	// 阅读全文
	var topBoxHeight = topBox.clientHeight;
	var warpper = document.getElementById("warpper");
	var textWindow = document.getElementById("textWindow");
	textWindow.style.top = topBoxHeight+"px";
	var textWinWarpper = document.getElementById("textWinWarpper");
	var textBox = document.getElementById("textBox");
	var readAll = document.getElementById("readAll");
	var returnMin = document.getElementById("returnMin");

	readAll.addEventListener("touchend",function(){
		document.body.scrollTop = 0;
		warpper.style.position = "fixed";
		warpper.style.zIndex = 20;
		warpper.style.bottom = bodyHeight-topBoxHeight+"px";
		document.body.classList.add("bodyOverflowHidden");
		textWindow.classList.add("textWindowShow");
		returnMin.classList.add("textWindowShow");
		textWinWarpper.innerHTML = textBox.innerHTML;
	})
	returnMin.addEventListener("touchend",function(){
		document.body.scrollTop = 0;
		warpper.style.position = "absolute";
		warpper.style.zIndex = "";
		warpper.style.bottom = 0;
		document.body.classList.remove("bodyOverflowHidden");
		textWindow.classList.remove("textWindowShow");
		returnMin.classList.remove("textWindowShow");
	})

	// 关闭广告
	var advertisementBox = document.getElementById("advertisementBox");
	var advClose = document.getElementById("advClose");
	advClose.addEventListener("touchend",function(){
		advertisementBox.classList.add("active")
	})
})
