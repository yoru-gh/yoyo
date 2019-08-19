window.addEventListener("load",function(){
	var bodyWidth = document.documentElement.clientWidth,
		bodyHeight = document.documentElement.clientHeight;

	var headerBox = document.getElementById("headerBox");
	var userPic = document.getElementById("userPic");
	headerBox.style.backgroundImage = "url("+userPic.getAttribute("src")+")";

	var content = document.getElementById("content");
	var contentUl = content.getElementsByTagName("ul")[0];
	var posBox = document.getElementById("posBox");
	var posBoxSpan = posBox.getElementsByTagName("span")[0];
	var otherMes = document.getElementById("otherMes");
	var otherMesLi = otherMes.getElementsByTagName("li");

	var testData1 = '<li id="jianjie"><img src="img/ae86.jpg"><ul id="carMesList"><li>车型号：丰田 AE86 スプリンタートレノ GT-APEX</li><li>车类型：轿车</li><li>车牌号：AE86</li><li>驱动形式：前轮驱动</li><li>轴距：888</li><li>轮距：888</li><li>外形尺寸：2m*3.5m*1.5m</li><li>额定载数：4人</li><li>额定载重：1吨</li><li>最高车速：AE86</li><li>产地：AE86</li></ul></li>';
	var testData2 = '<li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-32</p></li></ul></li>';

	// 导游简介
	otherMesLi[0].addEventListener("touchend",function(){
		posBoxSpan.classList.remove("active");
		contentUl.innerHTML = testData1;
	});
	// 导游评价
	otherMesLi[1].addEventListener("touchend",function(){
		posBoxSpan.classList.add("active");
		contentUl.innerHTML = testData2;
	});

	var navBox = document.getElementById("navBox");
	var scrollOK = true;
	window.addEventListener("scroll",function(){
		if (scrollOK && document.body.scrollTop > bodyWidth*.7) {
			navBox.style.position = "fixed";
			scrollOK = false;
		}else if(!scrollOK && document.body.scrollTop <= bodyWidth*.7){
			navBox.style.position = "absolute";
			scrollOK = true;
		};
	});

	// 联系车主
	var callBtn = document.getElementById("callBtn");
	callBtn.addEventListener("touchend",function(){
		tipShow("车主不在服务区内")
	})
})
