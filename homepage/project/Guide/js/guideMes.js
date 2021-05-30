window.addEventListener("load",function(){
	var bodyWidth = document.documentElement.clientWidth,
		bodyHeight = document.documentElement.clientHeight;

	var content = document.getElementById("content");
	var contentUl = content.getElementsByTagName("ul")[0];
	var posBox = document.getElementById("posBox");
	var posBoxSpan = posBox.getElementsByTagName("span")[0];
	var otherMes = document.getElementById("otherMes");
	var otherMesLi = otherMes.getElementsByTagName("li");

	var testData1 = '<li id="jianjie"><img src="img/tou.jpg" width="100%"><p>昨天晚上和同学玩到十一点半才回家。一个人孤独地走在路上。忽然看见远处灯光下一个模糊的身影，我的眼眸顿时湿润了，心里暖暖的。这么晚了，他还在小区门口等我。这就是我一生最爱的人，我的父亲。。。 就是他手上拿着的棍子让我有点尴尬。。 _(:3 」∠)_ </p><p>大概每个姑娘都会有忧心自己嫁不出去的时候，但是没关系，不要在意这个。你只需要安心过好现在的生活，做自己喜欢的事，成为自己喜欢的人，然后， 几年后你就会发现，你担心的事情原来是真的。</p></li>';
	var testData2 = '<li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li><li id="pingjia"><ul id="assessmentList"><li><div class="imgbox"><img src="img/tou.jpg" /></div><p>匿名网友</p><p> _(:3 」∠)_ </p><p>评分：3.3</p><p>2016-10-30</p></li></ul></li>';

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
})
