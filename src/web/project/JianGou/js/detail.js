// 全局变量部分
var body = document.body;
var userAgent = navigator.userAgent;
var loadingFlag = false; // 等待动画状态
var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // 检测 IE
var isIE11 = userAgent.indexOf("Trident/7.0") > -1 && userAgent.indexOf("rv:11.0") > -1; // 检测 IE11
var isFF = userAgent.indexOf("Firefox") > -1; // 检测火狐
var eventHend = isFF ? "DOMMouseScroll" : "mousewheel"; // 火狐滚动事件句柄

var code64 = new Base64;

var contentScroll = $(".content").niceScroll("#msg",{
	cursorcolor: "#00a57f",
	cursorwidth: "5px",
	cursorborder: "none"
})

// var aqNewRd = getUrlParam("a");
var aqNewRd = "a";
// var topTitle = code64.decode(getUrlParam("b"));
var topTitle = "标题";
$(".msgBox .title span").text(topTitle);

var flag = true; // 判断是否固定了图书介绍内容导航

// 控制左侧导航浮动函数
function floatTime(){
	var topVal = contentScroll.getScrollTop();
	var obj = $(".nav span,.fnav span");
	if (topVal > navTabArr[0] && topVal < navTabArr[1]) {
		obj.eq(1).addClass('active').siblings('span').removeClass('active');
	} else if (topVal > navTabArr[1] && topVal < navTabArr[2]) {
		obj.eq(2).addClass('active').siblings('span').removeClass('active');
	} else if (topVal > navTabArr[2] && topVal < navTabArr[3]) {
		obj.eq(3).addClass('active').siblings('span').removeClass('active');
	} else if (topVal > navTabArr[3] && topVal < navTabArr[4]) {
		obj.eq(4).addClass('active').siblings('span').removeClass('active');
	} else if (topVal > navTabArr[4] && topVal < navTabArr[5]) {
		obj.eq(5).addClass('active').siblings('span').removeClass('active');
	} else if (topVal > navTabArr[5] && topVal < navTabArr[6]) {
		obj.eq(6).addClass('active').siblings('span').removeClass('active');
	} else if (topVal > navTabArr[6] && topVal < navTabArr[7]) {
		obj.eq(7).addClass('active').siblings('span').removeClass('active');
	} else if (topVal > navTabArr[7] && topVal < navTabArr[8]) {
		obj.eq(8).addClass('active').siblings('span').removeClass('active');
	}
}

// $("#msg").height(835);
// $("#msgWrap .innerWrap").height(1300);
var msgScroll;
// var scrollVal = 0;
$("#msg,.fnav").mousewheel(function(event){
	// console.log(contentScroll.getScrollTop())
	// 页面滚动方向，true 为页面卷起
	// scrollVal = scrollVal + event.deltaFactor*event.deltaY;
	// console.log(event.deltaFactor,$(document).scrollTop())
	// var fx = event.originalEvent.wheelDeltaY > 0 ? false : true;
	// if (isFF) {
	//  fx = event.originalEvent.detail > 0 ? true : false;
	// } else {
	//  fx = event.originalEvent.wheelDeltaY > 0 ? false : true;
	// }
	// console.log(content.scrollTop,fx); // -126
	if (event.deltaY < 0) { // 向上卷起
		// 显示简要的图书信息及荐购按钮
		if (contentScroll.getScrollTop() > 320 && flag) {
			flag = false;
			$(".bookMsg,.nav,.fnav,.frecBtn").addClass('active');
		} else if (contentScroll.getScrollTop() > 320 && !flag) {
			// 根据卷起的高度左侧导航自动切换到对应位置
			// 切换依据：卷起高度 - 头部高度(126px)
			// console.log("now: "+content.scrollTop)
			floatTime()
		}
	} else { // 回看卷起
		if (contentScroll.getScrollTop() < 424 && !flag) {
			flag = true;
			$(".bookMsg,.nav,.fnav,.frecBtn").removeClass('active');
		} else if (contentScroll.getScrollTop() > 294 && !flag) {
			floatTime()
		}
	}
})

var msgScrollFlag = true;

var navTabArr = new Array(); // 存放图书简介位置 固定九项
var navTabLen = $(".msgWrap .box").length;
// for (var i = 0; i < navTabLen; i++) {
// 	navTabArr[i] = $(".msgWrap .box").eq(i).offset().top - 154;
// }
// console.log(navTabArr)

// $("body").height($(".content").height()); // IE 需要这样，我也很绝望

$(".msgWrap .titleBox").on('click', 'li', function(event) {
	event.preventDefault();
	$(this).addClass('active').siblings('li').removeClass('active');
	var nth = $(this).index();
	console.log(contentScroll)
	$(".msgWrap .tableBox table").eq(nth).css("display","table").siblings('table').css("display","none");
	contentScroll.resize();
})

// 左侧导航点击
$(".nav,.fnav").on('click', 'span', function(event) {
	event.preventDefault();
	$(this).addClass('active').siblings('span').removeClass('active');
	var nth = $(this).index();
	if (flag) {
		flag = false;
		$(".bookMsg,.nav,.fnav,.frecBtn").addClass('active');
		$(".fnav span").eq(nth).addClass('active').siblings('span').removeClass('active');
		contentScroll.doScrollTop(navTabArr[nth], 200);
	} else {
		contentScroll.doScrollTop(navTabArr[nth], 200);
	}
	
	// var th = $(".msgWrap .box").eq(nth).offset().top;
	
})

// 获取数据
var mLib = "gdut";
var iUserNo = 007;
function getBookDetail(code){
	var url = "http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetDetail.ashx?a=[AqNewRd={{"+code+"}}][Lib={{"+mLib+"}}][UserNo={{"+iUserNo+"}}]&x=?&y=11";
	// $.getJSON(url, function (data){
	// 	if (0 != data.error) {
	// 		console.log(data.errorname)
	// 		return
	// 	} else {
	// 		console.log(data)
	// 		var list1 = data.acqu_ifu_AqNew_GetDetail_list1[0];
	// 		var list2 = data.acqu_ifu_AqNew_GetDetail_list2[0];
	// 		// createList(data.acqu_ifu_AqNew_GetTopList_list1,false)
	// 		$(".brief .bookCover").attr("src",code64.decode(list1.JdCover2Url));
	// 		$(".brief .title").text(code64.decode(list1.Title));
	// 		$(".brief .list li").eq(0).text("ISBN："+code64.decode(list1.Isbn));
	// 		$(".brief .list li").eq(1).text("作者信息："+code64.decode(list1.Author));
	// 		$(".brief .list li").eq(2).text("出版信息："+code64.decode(list1.Publish));
	// 		$(".brief .list li").eq(3).text("分类编号："+code64.decode(list1.Clcno));
	// 		$(".brief .list li").eq(4).text("分类："+code64.decode(list1.ClcnoStrName));
	// 		$(".brief .list li").eq(5).text("馆藏数："+code64.decode(list1.CollCount));
	// 		$(".brief .list li").eq(6).text("最近采购的时间："+code64.decode(list1.UserFlag)); //?
	// 		$(".brief .list li").eq(7).text("最近采购的数量："+code64.decode(list1.UserFlag)); //?

	// 		// $(".innerWrap box").eq(0).children("p").eq(1).text(list2.);
	// 		$(".innerWrap .box").eq(1).children("p").eq(1).html(code64.decode(list2.Contents));
	// 		$(".innerWrap .box").eq(2).children("p").eq(1).html(code64.decode(list2.AIntro));
	// 		$(".innerWrap .box").eq(3).children("p").eq(1).html(code64.decode(list2.Preface));
	// 		$(".innerWrap .box").eq(4).children("p").eq(1).html(code64.decode(list2.CIntro));
	// 		$(".innerWrap .box").eq(5).children("p").eq(1).html(code64.decode(list2.CmEditor));

	// 		$("#msg").height($("#msgWrap .innerWrap").height()+480);

	// 		for (var i = 0; i < navTabLen; i++) {
	// 			navTabArr[i] = $(".msgWrap .box").eq(i).offset().top - 154;
	// 		}
	// 	}
	// })

	$("#msg").height($("#msgWrap .innerWrap").height()+480);

	for (var i = 0; i < navTabLen; i++) {
		navTabArr[i] = $(".msgWrap .box").eq(i).offset().top - 154;
	}
}

getBookDetail(aqNewRd)