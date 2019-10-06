tip("数据加载中...",1500);
// music
var audioBtn = document.getElementById("audioBtn"),
	mediaBox = document.getElementById("media"),
	music = document.getElementById("music");
function musicPlay(sw){
	if (sw == true) {
		mediaBox.play();
		audioBtn.setAttribute("class", "on");
		audioBtn.setAttribute("value", "on");
		music.classList.add("active");
	} else {
		mediaBox.pause();
		audioBtn.setAttribute("class", "off");
		audioBtn.setAttribute("value", "off");
		music.classList.remove("active");
	}
}

mediaBox.volume = .5;
// mediaBox.addEventListener("canplaythrough", function() {
// 	tip("音乐加载完成");
// 　　musicPlay(true);
// })

audioBtn.addEventListener("touchend", function(){
	var audioValue = audioBtn.getAttribute("value");
	if (audioValue == "on") {
		musicPlay(false)
	} else if (audioValue == "off") {
		musicPlay(true)
	}
})

// swiper
var swiper = new Swiper ('.content', {
	direction: 'vertical',
	effect: 'slide',
	loop: true,
	speed: 300,
	pagination: '.bigPagination',
	onTransitionEnd: function(swiper){ // Re:0
		pageChange(swiper) // 监测当前 slide 的索引对应触发动画
	}
})
var swiper2 = new Swiper ('.littleSwiper', {
	direction: 'horizontal',
	effect: 'slide',
	speed: 300,
	// freeMode: true,
	pagination: '.littlePagination',
	paginationType : 'progress'
})

// page
$(".pageTow .wrap").height($(".pageTow .wrap .list")[0].offsetHeight);
$(".pageThree .wrap").height($(".pageThree .wrap .first")[0].offsetHeight+145);
$(".pageFour .wrap").height($(".pageFour .wrap .fav")[0].offsetHeight+80);

var preIndex = swiper.realIndex;
var once = false;
function pageChange(obj){
	if (obj.realIndex != preIndex && once) {
		preIndex = obj.realIndex;
		switch(obj.realIndex){
			case 0: pageOneActive(); break;
			case 1: pageTowActive(); break;
			case 2: pageThreeActive(); break;
			case 3: pageFourActive(); break;
			case 4: pageFiveActive(); break;
			case 5: pageSixActive(); break;
			case 6: pageSevenActive(); break;
			case 7: pageEightActive(); break;
			case 8: pageNineActive(); break;
			case 9: pageTenActive(); break;

			// case 0: pageTenActive(); break;
			// case 1: pageOneActive(); break;
			// case 2: pageTowActive(); break;
			// case 3: pageThreeActive(); break;
			// case 4: pageFourActive(); break;
			// case 5: pageFiveActive(); break;
			// case 6: pageSixActive(); break;
			// case 7: pageSevenActive(); break;
			// case 8: pageEightActive(); break;
			// case 9: pageNineActive(); break;
			// case 10: pageTenActive(); break;
			// case 11: pageOneActive(); break;
		}
	}
}

function delayfun(num) {
	num = num*100;
	return { duration: 400, delay: num, }
}

function reActive(){
	var animation = {
		opacity: 0,
		translateX: "0px"
	};
	$(".pageOne").each(function(){
		$(this).children('.wrap').children('li').eq(0).velocity(animation, delayfun(0));
		$(this).children('.wrap').children('li').eq(1).velocity(animation, delayfun(0));
		$(this).children('.wrap').children('li').eq(2).velocity(animation, delayfun(0));
		$(this).children('.wrap').children('li').eq(3).velocity(animation, delayfun(0));
		$(this).children('.wrap').children('li').eq(4).velocity(animation, delayfun(0));
	});
}

function pageOneActive(){
	var animation = {
		opacity: 1,
		translateX: "50px"
	};
	$(".pageOne").each(function(){
		$(this).children('.wrap').children('li').eq(0).velocity(animation, delayfun(0));
		$(this).children('.wrap').children('li').eq(1).velocity(animation, delayfun(1));
		$(this).children('.wrap').children('li').eq(2).velocity(animation, delayfun(2));
		$(this).children('.wrap').children('li').eq(3).velocity(animation, delayfun(3));
		$(this).children('.wrap').children('li').eq(4).velocity(animation, delayfun(4));
	});	

	$(".pageTow .list li").velocity("reverse");
	$(".pageThree .first,.pageThree .last").velocity("reverse");
	$(".pageFour .fav").velocity("reverse");
	$(".pageFive .chartist").velocity("reverse");
	$(".pageSix .list li").velocity("reverse");
	$(".pageSeven .ct-bar").velocity("reverse");
	$(".pageEight .chartist3").velocity("reverse");
	$(".pageNine .chartist4").velocity("reverse");
}

function pageTowActive(){
	var animation = {
		opacity: 1,
	};
	$(".pageTow .list li").eq(0).velocity(animation, delayfun(0));
	$(".pageTow .list li").eq(1).velocity(animation, delayfun(2));
	$(".pageTow .list li").eq(2).velocity(animation, delayfun(4));
	$(".pageTow .list li").eq(3).velocity(animation, delayfun(6));
	$(".pageTow .list li").eq(4).velocity(animation, delayfun(8));

	reActive();
	$(".pageThree .first,.pageThree .last").velocity("reverse");
	$(".pageFour .fav").velocity("reverse");
	$(".pageFive .chartist").velocity("reverse");
	$(".pageSix .list li").velocity("reverse");
	$(".pageSeven .ct-bar").velocity("reverse");
	$(".pageEight .chartist3").velocity("reverse");
	$(".pageNine .chartist4").velocity("reverse");
}

function pageThreeActive(){
	$(".pageThree .wrap .first").velocity({
		translateX: "95px",
		opacity: 1
	});
	$(".pageThree .wrap .last").velocity({
		translateX: "-95px",
		opacity: 1
	});

	reActive();
	$(".pageTow .list li").velocity("reverse");
	$(".pageFour .fav").velocity("reverse");
	$(".pageFive .chartist").velocity("reverse");
	$(".pageSix .list li").velocity("reverse");
	$(".pageSeven .ct-bar").velocity("reverse");
	$(".pageEight .chartist3").velocity("reverse");
	$(".pageNine .chartist4").velocity("reverse");
}

function pageFourActive(){
	$(".pageFour .fav").velocity({
		opacity: 1,
		translateY: "80px"
	});

	reActive();
	$(".pageTow .list li").velocity("reverse");
	$(".pageThree .first,.pageThree .last").velocity("reverse");
	$(".pageFive .chartist").velocity("reverse");
	$(".pageSix .list li").velocity("reverse");
	$(".pageSeven .ct-bar").velocity("reverse");
	$(".pageEight .chartist3").velocity("reverse");
	$(".pageNine .chartist4").velocity("reverse");
}

function pageFiveActive(){
	$(".pageFive .chartist").velocity({
		opacity: .5,
		translateX: "100px"
	});

	reActive();
	$(".pageTow .list li").velocity("reverse");
	$(".pageThree .first,.pageThree .last").velocity("reverse");
	$(".pageFour .fav").velocity("reverse");
	$(".pageSix .list li").velocity("reverse");
	$(".pageSeven .ct-bar").velocity("reverse");
	$(".pageEight .chartist3").velocity("reverse");
	$(".pageNine .chartist4").velocity("reverse");
}

function pageSixActive(){
	var animation = {
		translateX: "95px",
		opacity: 1
	};
	var animation2 = {
		translateX: "-95px",
		opacity: 1
	};
	$(".pageSix .list li").eq(0).velocity(animation);
	$(".pageSix .list li").eq(2).velocity(animation);
	$(".pageSix .list li").eq(4).velocity(animation);
	$(".pageSix .list li").eq(6).velocity(animation);
	$(".pageSix .list li").eq(1).velocity(animation2);
	$(".pageSix .list li").eq(3).velocity(animation2);
	$(".pageSix .list li").eq(5).velocity(animation2);
	$(".pageSix .list li").eq(7).velocity(animation2);

	reActive();
	$(".pageTow .list li").velocity("reverse");
	$(".pageThree .first,.pageThree .last").velocity("reverse");
	$(".pageFour .fav").velocity("reverse");
	$(".pageFive .chartist").velocity("reverse");
	$(".pageSeven .ct-bar").velocity("reverse");
	$(".pageEight .chartist3").velocity("reverse");
	$(".pageNine .chartist4").velocity("reverse");
}

function pageSevenActive(){
	var animation = {
		opacity: 1
	};
	$(".pageSeven .ct-bar").eq(0).velocity(animation, delayfun(0))
	$(".pageSeven .ct-bar").eq(1).velocity(animation, delayfun(2))
	$(".pageSeven .ct-bar").eq(2).velocity(animation, delayfun(4))
	$(".pageSeven .ct-bar").eq(3).velocity(animation, delayfun(6))

	reActive();
	$(".pageTow .list li").velocity("reverse");
	$(".pageThree .first,.pageThree .last").velocity("reverse");
	$(".pageFour .fav").velocity("reverse");
	$(".pageFive .chartist").velocity("reverse");
	$(".pageSix .list li").velocity("reverse");
	$(".pageEight .chartist3").velocity("reverse");
	$(".pageNine .chartist4").velocity("reverse");
}

function pageEightActive(){
	$(".pageEight .chartist3").velocity({
		opacity: .5,
		translateX: "100px"
	});

	reActive();
	$(".pageTow .list li").velocity("reverse");
	$(".pageThree .first,.pageThree .last").velocity("reverse");
	$(".pageFour .fav").velocity("reverse");
	$(".pageFive .chartist").velocity("reverse");
	$(".pageSix .list li").velocity("reverse");
	$(".pageSeven .ct-bar").velocity("reverse");
	$(".pageNine .chartist4").velocity("reverse");
}

function pageNineActive(){
	$(".pageNine .chartist4").velocity({
		opacity: .7,
		translateX: "100px"
	});

	reActive();
	$(".pageTow .list li").velocity("reverse");
	$(".pageThree .first,.pageThree .last").velocity("reverse");
	$(".pageFour .fav").velocity("reverse");
	$(".pageFive .chartist").velocity("reverse");
	$(".pageSix .list li").velocity("reverse");
	$(".pageSeven .ct-bar").velocity("reverse");
	$(".pageEight .chartist3").velocity("reverse");
}

function pageTenActive(){
	reActive();
	$(".pageTow .list li").velocity("reverse");
	$(".pageThree .first,.pageThree .last").velocity("reverse");
	$(".pageFour .fav").velocity("reverse");
	$(".pageFive .chartist").velocity("reverse");
	$(".pageSix .list li").velocity("reverse");
	$(".pageSeven .ct-bar").velocity("reverse");
	$(".pageEight .chartist3").velocity("reverse");
	$(".pageNine .chartist4").velocity("reverse");
}

//
function getSearchParamObj() {
	var iSearch = decodeURIComponent(window.location.search.substring(1));
	var iRegx = /([\d\w\_\$]+)=([^=^&]+)/g;
	var iObj = {};
	while (r = (iRegx.exec(iSearch))) {
		iObj[r[1]] = r[2];
	}
	return iObj;
}
var mParamObj = getSearchParamObj();
var iPatronRd = mParamObj["a"] || "";
var iLib = mParamObj["b"] || "";
var mBase64 = new Base64();
if (iLib == "") {
	iLib = getCookie('TrackLib');
} else {
	setCookie('TrackLib',iLib);
}
if (iPatronRd == "") {
	iPatronRd = getCookie('PatronRd');
} else {
	setCookie('PatronRd',iPatronRd);
}

// $.getJSON("http://if4.zhaobenshu.com:7781/Track/track_ifc_Byj_GetList.ashx?a=[Lib={{gdut}}][PatronRd={{5EF5FAN3R7}}][Type={{lv1}}][Model={{003w}}]&y=10&x=?",
// 	function (json){
// 		if (json["error"] != 0) {
// 			alert(json["errorname"]);
// 			return false;
// 		}
// 		// console.log(json)
// 		// pageOne
// 		var list1 = json["track_ifc_Byj_GetList_list1"][0];
// 		if (list1["SexName"]=="女") {
// 			$(".pageOne .wrap").addClass('nv')
// 		};
// 		$(".pageOne .name").text("亲爱的 "+list1["PName"]+" 同学");
// 		$(".pageOne .org").text("所属学院："+list1["XyName"]);
// 		$(".pageOne .class").text("所在年级："+list1["PName"]);
// 		$(".pageOne .card").text("你的卡号："+list1["CardNo"]);
// 		$(".pageOne .date").text("办理时间："+list1["CardNo"]);

// 		// pageTow
// 		$(".pageTow .enterDay").text(list1["St_EnterDay"]);
// 		$(".pageTow .loanTotal").text(list1["St_LoanTotal"]);
// 		$(".pageTow .loanFavo").text(list1["St_LoanFavo_Show"]);
// 		$(".pageTow .loanRank").text(list1["St_LoanRank"]);

// 		// pageThree
// 		var list2 = json["track_ifc_Byj_GetList_list2"][0];
// 		var list3 = json["track_ifc_Byj_GetList_list3"][0];
// 		$(".pageThree .first .pic").attr("src",list2["CoverUrl"]);
// 		$(".pageThree .first .bookName").text("《"+list2["Title"]+"》");
// 		$(".pageThree .first .author").text(list2["Author"]);
// 		$(".pageThree .first .publishC").text(list2["PublishC"]);
// 		$(".pageThree .first .isbn").text(list2["Isbn"]);
// 		$(".pageThree .first .ctrlNo").text("索书号："+list2["CtrlNo"]);

// 		$(".pageThree .last .pic").attr("src",list3["CoverUrl"]);
// 		$(".pageThree .last .bookName").text("《"+list3["Title"]+"》");
// 		$(".pageThree .last .author").text(list3["Author"]);
// 		$(".pageThree .last .publishC").text(list3["PublishC"]);
// 		$(".pageThree .last .isbn").text(list3["Isbn"]);
// 		$(".pageThree .last .ctrlNo").text("索书号："+list3["CtrlNo"]);

// 		// pageFour
// 		var list4 = json["track_ifc_Byj_GetList_list4"][0];
// 		$(".pageFour .pic").attr("src",list4["CoverUrl"]);
// 		$(".pageFour .bookName").text("《"+list4["Title"]+"》");
// 		$(".pageFour .author").html(list4["Author"]+"&nbsp;&nbsp;&nbsp;"+list4["PublishC"]);
// 		$(".pageFour .isbn").text(list4["Isbn"]);
// 		$(".pageFour .ctrlNo").text("索书号："+list4["CtrlNo"]);

// 		// pageFive
// 		var list5Obj = json["track_ifc_Byj_GetList_list5"];
// 		var data = { series: [list5Obj[0]["Ratio"], list5Obj[1]["Ratio"], list5Obj[2]["Ratio"], list5Obj[3]["Ratio"], list5Obj[4]["Ratio"],] };
// 		new Chartist.Pie(".chartist", data, {
// 			labelInterpolationFnc: function(value) { // 不显示图标内的文字
// 				return value[0]
// 			}
// 		});
// 		for (var i = 0; i < 5; i++) {
// 			$(".pageFive .list").append('<li>'+list5Obj[i]["CallnoCatName"]+'</li>')
// 		};

// 		// pageSix
// 		var list6Obj = json["track_ifc_Byj_GetList_list6"];
// 		for(var i = 0; i < 8; i++){
// 			$(".pageSix .list").append('<li><span class="pic"></span><span class="name">'+list6Obj[i]["PName"]+'</span></li>')
// 		}

// 		// pageSeven
// 		var list7Obj = json["track_ifc_Byj_GetList_list7"];
// 		var list7Data = {
// 			labels: [list7Obj[0]["LoanYear"],list7Obj[1]["LoanYear"],list7Obj[2]["LoanYear"],list7Obj[3]["LoanYear"]],
// 			series: [list7Obj[0]["Cnt"],list7Obj[1]["Cnt"],list7Obj[2]["Cnt"],list7Obj[3]["Cnt"]]
// 		}
// 		new Chartist.Bar('.chartist2', list7Data, {
// 			distributeSeries: true
// 		});
// 		for (var i = 0; i < 4; i++) {
// 			$(".pageSeven .list").append('<li>'+list7Obj[i]["Cnt"]+' 册</li>')
// 		};

// 		// pageEight
// 		var list8Obj = json["track_ifc_Byj_GetList_list8"];
// 		new Chartist.Pie('.chartist3', {
// 			series: [list8Obj[0]["Cnt"],list8Obj[1]["Cnt"],list8Obj[2]["Cnt"],list8Obj[3]["Cnt"]]
// 		}, {
// 			donut: true,
// 			donutWidth: 60,
// 			donutSolid: true,
// 			startAngle: 270,
// 			showLabel: true,
// 			labelInterpolationFnc: function(value) {
// 				return value[0]
// 			}
// 		});
// 		for (var i = 0; i < 4; i++) {
// 			$(".pageEight .list").append('<li>'+list8Obj[i]["ResvYear"]+' 年 '+list8Obj[i]["Cnt"]+' 册</li>')
// 		};

// 		// pageNine
// 		var list9Obj = json["track_ifc_Byj_GetList_list9"];
// 		new Chartist.Line('.chartist4', {
// 			labels: ["周日","周一","周二","周三","周四","周五","周六"],
// 			series: [[list9Obj[0]["Cnt"],list9Obj[1]["Cnt"],list9Obj[2]["Cnt"],list9Obj[3]["Cnt"],list9Obj[4]["Cnt"],list9Obj[5]["Cnt"],list9Obj[6]["Cnt"]]]
// 		}, {
// 			low: 0,
// 			showArea: true
// 		});
// 		function changeWeek(obj){
// 			var str;
// 			obj = parseInt(obj);
// 			switch(obj){
// 				case 0: str = "日"; break;
// 				case 1: str = "一"; break;
// 				case 2: str = "二"; break;
// 				case 3: str = "三"; break;
// 				case 4: str = "四"; break;
// 				case 5: str = "五"; break;
// 				case 6: str = "六"; break;
// 			}
// 			return str;
// 		}
// 		for (var i = 0; i < 7; i++) {
// 			$(".pageNine .list").append('<li>周'+changeWeek(list9Obj[i]["Weekday"])+' '+list9Obj[i]["Cnt"]+' 册</li>')
// 		};

// 		// pageTen
// 		var list10 = json["track_ifc_Byj_GetList_list10"][0];
// 		var list11 = json["track_ifc_Byj_GetList_list11"][0];

// 		$(".pageTen").each(function(){
// 			$(this).find('.wrapOne').children('p').eq(1).children('i').text(list10["AvgLoan"]);
// 			$(this).find('.wrapOne').children('p').eq(2).children('i').text(list10["MaxLoan"]);
// 			$(this).find('.wrapOne').children('p').eq(3).children('i').text(list10["St_Cnt"]);
// 			$(this).find('.wrapOne').children('p').eq(4).children('i').text(list10["Ratio"]+"%");
// 			$(this).find('.wrapOne').children('p').eq(5).children('i').text(list10["St_YearRank"]);

// 			$(this).find('.wrapTow').children('p').eq(1).children('i').text(list11["AvgLoan"]);
// 			$(this).find('.wrapTow').children('p').eq(2).children('i').text(list11["MaxLoan"]);
// 			$(this).find('.wrapTow').children('p').eq(3).children('i').text(list11["St_LoanTotal"]);
// 			$(this).find('.wrapTow').children('p').eq(4).children('i').text(list11["Ratio"]+"%");
// 			$(this).find('.wrapTow').children('p').eq(5).children('i').text(list11["St_LoanRank"]);
// 		});

// 		$(".mask").velocity({ opacity: 0, scale: 5 }, 400)
// 		.velocity({ zIndex: "-1" }, 0, function(){
// 			$(".mask").html("");
// 			once = true;
// 			pageOneActive();
// 		});
// 	}
// )

$(".mask").velocity({ opacity: 0, scale: 5 }, 400)
.velocity({ zIndex: "-1" }, 0, function(){
	$(".mask").html("");
	once = true;
	pageOneActive();
});
