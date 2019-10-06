mui.init({
	swipeBack: false,
	preloadPages:[{
		id: 'home.html',
		url: 'template/home.html'
	}]
});
window.onload = function(){
	var viewWidth = document.documentElement.clientWidth;
	var nowel = document.getElementById("nowel");
	var welcome = document.getElementById("welcome");
	var pageOne = document.getElementById("page-one");
	var pageTow = document.getElementById("page-tow");
	var pageThree = document.getElementById("page-three");
	var letisgo = document.getElementById("letisgo");
	var pageTip = document.getElementById("page-tip");
	var tipSlide = document.getElementById("tip-slide");
	var len = welcome.getElementsByTagName("li").length;
	var lateVal = 0; // 页面过渡值
	var slideVal = 0; // 进度条过渡值
	var indexVal = 0; // 当前索引值
	// 打开首页
	var homepage = function(){
		mui.openWindow({
			id: 'home.html',
		    url: 'template/home.html',
		    styles: {top:'0px',bottom:'0px',hardwareAccelerated:true},
		    extras:{},
		    show:{autoShow:true,aniShow:'fade-in',duration:500},
		    waiting:{autoShow:false}
		});
	};
	var activeFun = function(){
		switch(indexVal){
			case 0: 
					welcome.style.backgroundColor = "#F49775";
					for(i=0;i<3;i++){
						pageTow.getElementsByTagName("span")[i].className = "";
						pageOne.getElementsByTagName("span")[i].className = "active";
					};
			break;
			case 1: 
					letisgo.className = "";
					welcome.style.backgroundColor = "#BF89E3";
					for(i=0;i<3;i++){
						pageOne.getElementsByTagName("span")[i].className = "";
						pageThree.getElementsByTagName("span")[i].className = "";
						pageTow.getElementsByTagName("span")[i].className = "active";
					};
			break;
			case 2: 
					welcome.style.backgroundColor = "#4DB4F7";
					letisgo.className = "active";
					for(i=0;i<3;i++){
						pageTow.getElementsByTagName("span")[i].className = "";
						pageThree.getElementsByTagName("span")[i].className = "active";
					};
			break;
		};
		welcome.removeEventListener("webkitTransitionEnd",activeFun); // 解除监听阻止冒泡
	};
	// 显示欢迎页
	var showWelcomePage = function(){
//		welcome.style.cssText += "display:block";
//		pageTip.style.cssText += "display:block";
		for(i=0;i<3;i++){
			welcome.getElementsByTagName("li")[i].style.width = viewWidth+"px";
			pageOne.getElementsByTagName("span")[i].className = "active";
		};
		
		var touchs = 0,touche = 0;
		document.addEventListener("touchstart",function(){
			touchs = event.touches[0].clientX;
		});
		document.addEventListener("touchend",function(){
			touche = event.changedTouches[0].clientX;
			if((touchs-touche) > 40){
				goRight();
			}else if((touchs-touche) < (-40)){
				goLeft();
			};
		});
		
		// 向左滑动
		var goRight = function(){
			if(lateVal == viewWidth*2){
				lateVal = viewWidth*2;
				slideVal = 40;
				indexVal = 2;
			}else{
				lateVal += viewWidth;
				indexVal += 1;
				slideVal += 20;
				welcome.style.cssText += "-webkit-transform: translateX(-"+lateVal+"px)";
				tipSlide.style.cssText += "-webkit-transform: translateX("+slideVal+"px)";
			};
			welcome.addEventListener("webkitTransitionEnd",activeFun);
		};
		// 向右滑动
		var goLeft = function(){
			if(lateVal == 0){
				lateVal = 0;
				slideVal = 0;
				indexVal = 0;
			}else{
				lateVal -= viewWidth;
				indexVal -= 1;
				slideVal -= 20;
				welcome.style.cssText += "-webkit-transform: translateX(-"+lateVal+"px)";
				tipSlide.style.cssText += "-webkit-transform: translateX("+slideVal+"px)";
			};
			welcome.addEventListener("webkitTransitionEnd",activeFun);
		};
	};
	
	// 节流函数
	var debounce = function(func,wait){
		var timeout;
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
	
	// 点击打开首页
	letisgo.addEventListener("tap",function(){
		homepage(); // 打开首页
	});
	
//	localStorage.clear(); // 清除全部本地存储
//	localStorage.removeItem("once"); // 清除指定数据
	var lsmes = localStorage.getItem("once");
	if(lsmes == "true"){
		setTimeout(homepage,200);
	}else{
		try{
			localStorage.setItem("once",true);
		}catch(oException){
			if(oException.name == 'QuotaExceededError'){
				console.warn('本地存储已满');
				localStorage.clear();
				localStorage.setItem("once",true);
			};
		};
		nowel.style.display = "none"; // 隐藏欢迎图片
		showWelcomePage();
	};
	
	window.addEventListener("openHome",function(){
		if(lsmes == "true"){
//			setTimeout(homepage,500);
		}
	});
};