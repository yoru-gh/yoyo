window.addEventListener("load",function(){
	// 搜索那妞点击事件
	var searchbtn = document.getElementById("searchbtn");
	searchbtn.addEventListener("touchend", function(){
		tipShow("没有");
	});
	
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
	});

	// 查看导游详细
	var listSelf = document.getElementById("listSelf");
	listSelf.addEventListener("touchend",function(event){
		var target = event.target || event.srcElement;
		if(target.className == "callbtn"){
			event.stopPropagation(); //阻止默认事件防止点击穿透到父级 li
			tipShow("车主不在服务区内")
		};
	});

	var newData = '<li><a href="carMes.html"><div class="imgbox"><img src="img/tou.jpg" /></div><p><span class="gtip">空闲</span>宝马 Z4</p><p>车主：藤原拓海</p><p>车牌号：AE86</p><p>简介 _(:3 」∠)_ </p></a><a class="callBtn" href="tel://10086"></a></li><li><a href="carMes.html"><div class="imgbox"><img src="img/tou.jpg" /></div><p><span class="gtip">空闲</span>阿斯顿马丁 DB9</p><p>车主：藤原拓海</p><p>车牌号：AE86</p><p>简介 _(:3 」∠)_ </p></a><a class="callBtn" href="tel://10086"></a></li><li><a href="carMes.html"><div class="imgbox"><img src="img/tou.jpg" /></div><p><span class="gtip">空闲</span>AE86 スプリンタートレノ GT-APEX</p><p>车主：藤原拓海</p><p>车牌号：AE86</p><p>简介 _(:3 」∠)_ </p></a><a class="callBtn" href="tel://10086"></a></li><li><a href="carMes.html"><div class="imgbox"><img src="img/tou.jpg" /></div><p><span class="gtip">空闲</span>Rolls-Royce Silver Dawn</p><p>车主：Frederick Henry Royce</p><p>车牌号：FBI007</p><p>简介 _(:3 」∠)_ </p></a><a class="callBtn" href="tel://10086"></a></li><li><a href="carMes.html"><div class="imgbox"><img src="img/tou.jpg" /></div><p><span class="gtip">空闲</span>法拉利 F430</p><p>车主：藤原拓海</p><p>车牌号：AE86</p><p>简介 _(:3 」∠)_ </p></a><a class="callBtn" href="tel://10086"></a></li>';

	// 下拉刷新上拉加载
	slideud({
	    el: "#content",
	    downRefresh: function(e){
	        //松手之后执行逻辑,ajax请求数据，数据返回后隐藏加载中提示
	        var downRefreshObject = this;
	        setTimeout(function(){
	            downRefreshObject.back.call();
	            tipShow("加载完成");
	        }, 1500);
	    },
	    upload: function(e){
	    	var uploadObject = this;
	        listSelf.innerHTML += newData;
	    }
	}); 
})
