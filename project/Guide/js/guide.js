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
			tipShow("还不能直接呼叫导游")
		};
	});

	var newData = '<li class="male"><a href="guideMes.html"><div class="imgbox"><img src="img/tou.jpg" /></div><p><span class="gtip">空闲</span>某某某</p><p>888 个好评</p><p>简介爱上胶带机删掉撒娇地阿斯加简介爱上胶带机删掉撒娇地阿斯加 _(:3 」∠)_ </p>					</a><a class="callBtn" href="tel://10086"></a></li><li class="female"><a href="guideMes.html"><div class="imgbox"><img src="img/tou.jpg" /></div><p><span class="gtip">空闲</span>某某某</p><p>888 个好评</p><p>简介爱上胶带机删掉撒娇地阿斯加简介爱上胶带机删掉撒娇地阿斯加 _(:3 」∠)_ </p>					</a><a class="callBtn" href="tel://10086"></a></li><li class="male"><a href="guideMes.html"><div class="imgbox"><img src="img/tou.jpg" /></div><p><span class="gtip">空闲</span>某某某</p><p>888 个好评</p><p>简介爱上胶带机删掉撒娇地阿斯加简介爱上胶带机删掉撒娇地阿斯加 _(:3 」∠)_ </p>					</a><a class="callBtn" href="tel://10086"></a></li><li class="male"><a href="guideMes.html"><div class="imgbox"><img src="img/tou.jpg" /></div><p><span class="gtip">空闲</span>某某某</p><p>888 个好评</p><p>简介爱上胶带机删掉撒娇地阿斯加简介爱上胶带机删掉撒娇地阿斯加 _(:3 」∠)_ </p>					</a><a class="callBtn" href="tel://10086"></a></li>';

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

	function Animal(name){      
		this.name = name;      
		this.showName = function(){      
			console.warn(this.name);      
		}      
	}      
    
	function Cat(name){    
		Animal.call(this, name);    
	}      
    
	var cat = new Cat("Black Cat");     
	cat.showName(); 
})
