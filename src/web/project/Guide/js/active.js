window.addEventListener("load",function(){
	// 分类点击事件
	var classify = document.getElementById("classify");
	var classifyli = classify.getElementsByTagName("li");
	classify.addEventListener("touchend",function(){
		var target = event.target || event.srcElement;
		if(target.nodeName.toLowerCase() == "li"){
			for(var i = 0; i < classifyli.length; i++){
				classifyli[i].classList.remove("selected");
			};
			target.classList.add("selected");
		};
	})

	// 搜索那妞点击事件
	var searchbtn = document.getElementById("searchbtn");
	searchbtn.addEventListener("touchend", function(){
		tipShow("没有");
	})
})
