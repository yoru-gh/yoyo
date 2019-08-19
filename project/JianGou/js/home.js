// 全局变量部分
var userAgent = navigator.userAgent;
var loadingFlag = false; // 等待动画状态
var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // 检测 IE
var isIE11 = userAgent.indexOf("Trident/7.0") > -1 && userAgent.indexOf("rv:11.0") > -1; // 检测 IE11
var isFF = userAgent.indexOf("Firefox") > -1; // 检测火狐

var code64 = new Base64;

var mLib = "gdut";
var urlStr = "[SessLib={{"+mLib+"}}][SessFun={{web}}][SessPrd={{acqu}}]\x26x=?\x26y=11";

function setNiceScroll(){
	var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
	 
	if (isIE || isIE11 || isFF) {
		var IEver = parseFloat(RegExp.$1);
		if (IEver < 9) {
			alert("为了让您活的更好的浏览体验，我们不再对 IE9 以下版本的 IE 浏览器进行适配，我们建议您使用 谷歌浏览器 或者最新版极速模式下的 QQ浏览器、360浏览器、搜狗浏览器以及 UC浏览器 等浏览器")
		}
	} else {
		// niceScroll 3.7.6 ver
		$("body").niceScroll({
			cursorcolor: "#00a57f",
			cursorwidth: "5px",
			cursorborder: "none"
		})
	}
}

$("body").niceScroll({
	cursorcolor: "#00a57f",
	cursorwidth: "5px",
	cursorborder: "none"
})

// 显示关闭窗口处理函数
function isShow(tag){
	//  tag 为要显示或关闭的 DOM
	var dom = $(tag);
	var thisDate = dom.attr("value");
	if (thisDate == "hide" || thisDate == undefined) {
		dom.show();
		setTimeout(function(){
			dom.addClass('active');
			dom.attr("value","show");
		}, 50);
	} else {
		dom.removeClass('active');
		setTimeout(function(){
			dom.hide();
			dom.attr("value","hide");
		}, 200)
	}
}

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 高级检索  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 点击高级检索
$("#superSearchBtn").click(function(){
	$("#heightSearch").val($("#lowSearch").val());
	isShow("#superSearch");
})
// 关闭高级检索
$("#superSearch,#superSearchSubmit,#searchBtn").click(function(event){
	var target = event.target || event.srcElement;
	event.preventDefault();
	event.stopPropagation();

	if (target.id == "superSearch") {
		isShow("#superSearch");
	} else if (target.id == "searchBtn") {
		var lowSearchVal = $("#lowSearch").val();
		getSearch(false,lowSearchVal);
	} else if (target.id == "superSearchSubmit") {
		var superSearchVal = new Array();
		$("#superSearch input").each(function(){
			superSearchVal[superSearchVal.length] = $(this).val() || "";
		})
		console.log(superSearchVal)
		getSearch(true,superSearchVal);
		isShow("#superSearch");
	}
})

// 检索
function getSearch(val,text){
	if (val) {
		$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetList.ashx?a=[_PageNo={{1}}][_PageCount={{100}}][Input={{title("+text[1]+")author("+text[2]+")publish("+text[3]+")isbn("+text[4]+")}}][ListFactor={{1}}]"+urlStr, function (data){
			if (0 != data.error) {
				console.log(data.errorname)
				return
			} else {
				if (data.RecordCount == 0) {
					alert("找不到你要找的图书")
				} else {
					console.log(data);
					whereGet = "search";
					clearInput("superSearch");
					bookListTitle = "检索条件："+text.notempty().join(",");
					createList(data.acqu_ifu_AqNew_GetList_list1);
				}
			}
		})
	} else {
		$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetList.ashx?a=[_PageNo={{1}}][_PageCount={{100}}][Input={{"+text+"}}][Clcno={{}}][InColl={{}}][PublishD={{}}][PublishC={{}}][ListFactor={{1}}]"+urlStr, function (data){
			if (0 != data.error) {
				console.log(data.errorname)
				return
			} else {
				if (data.RecordCount == 0) {
					alert("找不到你要找的图书")
				} else {
					console.log(data);
					whereGet = "search";
					clearInput("superSearch");
					bookListTitle = "检索条件："+text;
					createList(data.acqu_ifu_AqNew_GetList_list1);
				}
			}
		})
	}	
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 高级检索  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 自主荐购  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 点击自主荐购
$("#recommendBtn").click(function(){
	// $("#heightSearch").val($("#lowSearch").val());
	isShow("#recommendBox");
})
// 关闭自主荐购
$("#recommendBox,#setRecommend").click(function(event){
	var target = event.target || event.srcElement;
	event.preventDefault();
	event.stopPropagation();

	if (target.id == "recommendBox") {
		isShow("#recommendBox");
		clearInput("recommendBox");
	}else if (target.id == "setRecommend") {
		var recommendVal = new Array();
		$("#recommendBox input").each(function(){
			recommendVal[recommendVal.length] = $(this).val() || "";
		})
		if (recommendVal[1] == "" || recommendVal[4] == "") {
			alert("图书名称和荐购理由不能为空")
		} else {
			getRecommend(recommendVal);
			isShow("#recommendBox");
		}	
	}
})
function getRecommend(val){
	$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqRecomList_Ins2.ashx?a=[Title={{"+val[1]+"}}][RecomExp={{"+val[4]+"}}]"+urlStr, function (data){
		// console.log(data)
		if (0 != data.error) {
			console.log(data.errorname)
			return
		} else {
			if (data.RecordCount == 0) {
				alert("找不到你要找的图书")
			} else {
				console.log(data);
				clearInput("recommendBox");
				// bookListTitle = "检索条件："+text.notempty().join(",");
				// createList(data.acqu_ifu_AqNew_GetList_list1);
			}
		}
	})
}
// 验证 ISBN
$("#checkISBN").click(function(){
	var val = $(this).siblings('input').val();
	if (val == "") {
		alert("ISBN 不能为空")
	} else {
		var iUserNo = 7;
		$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_Recom_GetBook.ashx?a=[Isbn={{"+val+"}}][UserNo={{"+iUserNo+"}}]"+urlStr,function (data){
			if (data.error != 0) {
				alert(data.errorname)
			} else {
				$("#checkISBN").text("ISBN 可用")
			}
		})
	}
})
// 清除输入内容
function clearInput(obj){
	$("#"+obj+" input").each(function(){
		$(this).val("");
	})
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 自主荐购  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 字母导航部分
// 菜单
$("#menu").click(function(){
	if (!$("#letterMenu").is(":visible")) {
		isShow("#firstMenu");
	}
})
// 点击空白关闭菜单
$("#firstMenu").click(function(event){
	var target = event.target || event.srcElement;
	if (target.id == "firstMenu") {
		// 关闭一级菜单
		isShow("#firstMenu");
	}
})

// 26字母导航
// 鼠标移入字母导航时设置 navTimer，鼠标移出字母导航或者鼠标移入二级菜单是都要清除 navTimer
// 鼠标移出二级菜单时清除 letterMenuTime 和 navTimer
// 当鼠标从二级菜单移到字母导航时清除 letterMenuTime
var pointTag = ""; // 用于记录当前显示的是什么字母
var keyFlag = false; // 用于记录是否还停留在当前字母
var letterFlag = false; // 用于记录鼠标是否移入二级菜单

// 鼠标移入字母导航栏时
var navTimer; // 字母导航的计时器
var letterMenuTime; // 二级菜单的计时器
$("#keyNav li").on("mouseenter",function(event){
	event.preventDefault();
	event.stopPropagation();

	keyFlag = true;

	clearTimeout(navTimer);
	clearTimeout(letterMenuTime);
	var thisVal = $(this).attr("dataVal");
	var thisInd = $(this).index();
	if (pointTag == thisVal && $(".letterMenu").is(":visible")) {
		// 当菜单已显示，鼠标移出当前字母再移入当前字母时
		return
	} else if (pointTag != thisVal && $(".letterMenu").is(":visible")){
		// 当菜单已显示，鼠标移向其他字母时
		pointTag = thisVal;
		var thisVal = $(this).attr("dataVal");
		var thisInd = $(this).index();
		// 改变指标位置
		$(".letterMenu").children('span').css("left",63+thisInd*52);
		// 这里调用接口或者查询本地数据显示对应的菜单
		// $(".letterMenu .title").text(thisVal+" 类 马克思主义、列宁主义");
		showLetterMenu(thisVal);
	} else {
		// 当菜单没显示，鼠标移入某个字母时
		pointTag = thisVal;
		var thisVal = $(this).attr("dataVal");
		var thisInd = $(this).index();
		// 停留时间记录器
		navTimer = setTimeout(function(){
			if (keyFlag) {
				// 加载数据
				// 改变指标位置
				$(".letterMenu").children('span').css("left",63+thisInd*52);
				// 这里调用接口或者查询本地数据显示对应的菜单
				// $(".letterMenu .title").text(thisVal+" 类 马克思主义、列宁主义");
				showLetterMenu(thisVal);

				isShow(".letterMenu");
			} else {
				clearTimeout(navTimer)
			}
		}, 500)
	}
}).on("mouseleave",function(event){
	event.preventDefault();

	keyFlag = false;
	
	clearTimeout(navTimer);
	navTimer= setTimeout(function(){
		if (!keyFlag && !letterFlag && $(".letterMenu").is(":visible")) {
			isShow(".letterMenu");
		}
	}, 1000)
})

// 字母二级菜单在鼠标离开当前区域 1 秒后消失 
$(".letterMenu").on("mouseenter",function(event){
	event.stopPropagation();

	letterFlag = true;

	clearTimeout(letterMenuTime);
	clearTimeout(navTimer);
}).on("mouseleave",function(event){
	event.stopPropagation();

	letterFlag = false;

	if ($(".letterMenu").is(":visible")) {
		letterMenuTime = setTimeout(function(){
			if (!letterFlag) {
				isShow(".letterMenu");
			} else {
				clearTimeout(letterMenuTime);
			}
		}, 1000)
	}
})

// 筛选点击事件
$(".filler .list > li > ul").on('click', 'li', function(event) {
	event.preventDefault();
	if (loadingFlag) {
		return
	} else {
		$(this).addClass("active").siblings('li').removeClass('active');
		loadingFlag = true;
		$("#loadWrap").show();
		var timer = setTimeout(function(){
			$("#loadWrap").hide();
			clearTimeout(timer);
			loadingFlag = false;
		}, 3000)
	}
})

// 侧边栏回溯导航点击事件
$(".sidebar .memory").on("click","li",function(event){
	event.preventDefault();
	$(this).addClass("active").siblings('li').removeClass('active');
})

// 返回顶部
$("#returnTop").click(function(){ 
	// 调用 nicescroll 产检内置方法返回顶部
	$("body").getNiceScroll(0).doScrollTop(0,200);
	// console.log($("body").getNiceScroll(0).scrollTop())
})

function trans(obj,active){
	if (isIE) {
		obj.style.msTransform = active;
	} else if (isFF) {
		obj.style.transform = active;
	} else {
		obj.style.WebkitTransform = active;
	}
}

// 用户操作
$("#mine").click(function(){
	isShow(".userBox")
})

$("#loadWrap").show();
var firstOpenPoint = 0;
var bookListTitle = new Array(); // 新数据标题
// 获取独立自定义分类数据
// $.getJSON(Acqu.getUrl(Link["mIfq"] + "Acqu/acqu_ifu_Colu_GetList.ashx?a=" + encodeURIComponent("[_PageNo={{1}}][_PageCount={{15}}][Lib={{" + mLib + "}}]")), function (data) {
// 获取栏目并生成栏目图书列表
// $.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_Colu_GetList.ashx?a=[_PageNo={{1}}][_PageCount={{15}}]"+urlStr, function (data){
// 	if (0 != data.error) {
// 		console.log(data.errorname)
// 		return
// 	} else {
// 		var dataList = data.acqu_ifu_Colu_GetList_list1;

// 		var $firstClass = $("#firstMenu .firstClass");
// 		for (var i = 0; i < dataList.length; i++) {
// 			$firstClass.append("<span dataColuNo="+code64.decode(dataList[i].ColuNo)+">"+code64.decode(dataList[i].ColuName)+"</span>");
// 			bookListTitle[i] = code64.decode(dataList[i].ColuName);
// 		}
// 		bookListTitle = bookListTitle.reverse(); // 数组倒序
// 		// 记录首次进入需要加载多少个 block
// 		firstOpenPoint = dataList.length;
// 		$firstClass.children('span').eq(0).addClass('active');

// 		getBookList($firstClass.children('span').eq(0).attr('dataColuNo'));
// 		getBookList($firstClass.children('span').eq(1).attr('dataColuNo'));
// 		getBookList($firstClass.children('span').eq(2).attr('dataColuNo'));
// 	}
// })

// 获取栏目分类下的图书数据
function getBookList(coluNo){
	$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_ColuBook_GetList.ashx?a=[_PageNo={{1}}][_PageCount={{15}}][ColuNo={{"+coluNo+"}}]"+urlStr, function (data){
		if (data.error != 0) {
			console.log(data.errorname)
			return
		} else {
			// console.log(data)
			var dataList = data.acqu_ifu_ColuBook_GetList_list1;

			// var $content = $("#content");
			// var $block = $("<div class='block'></div>");
			// var $title = $("<p class='title'></p>");
			// var $more = $("<a href='#'>更多</a>");
			// var $list = $("<ul class='list clearAll'></ul>");
			// var str = "";

			// for (var i = 0; i < dataList.length; i++) {
			// 	str = str
			// 	+'<li>'
			// 		// +'<a href="'+dataList[i].BigCover+'">'
			// 		+'<a href="detail.html">'
			// 			// +'<img src="img/book.jpg" dateUrl="'+dataList[i].BigCover+'">'
			// 			+'<img src="'+dataList[i].Cover+'" dateUrl="'+dataList[i].BigCover+'">'
			// 			+'<p title="'+dataList[i].Title+'">'+dataList[i].Title+'</p>'
			// 			+'<p title="'+dataList[i].Author+'">'+dataList[i].Author+'</p>'
			// 			+'<span>馆藏 '+dataList[i].CollCount+' 本</span>'
			// 			+'<span>荐购 '+dataList[i].RecomCount+' 次</span>'
			// 			+'<span>直采 '+dataList[i].KfRecomCount+' 本</span>'
			// 		+'</a>'
			// 	+'</li>';
			// }
			// $more.attr("href","http://www.baidu.com");

			// // 设置 block 的标题
			// if (typeof bookListTitle == "string") {
			// 	$title.append("<span>"+bookListTitle+"</span>").append($more);
			// } else {
			// 	$title.append("<span>"+bookListTitle[firstOpenPoint-1]+"</span>").append($more);
			// }

			// $list.append($(str));
			// $block.append($title);
			// $block.append($list);

			// // 首次进入不隐藏
			// if (firstOpenPoint == 0 || typeof bookListTitle == "string") {
			// 	$content.children('.block').hide();
			// } else {
			// 	firstOpenPoint -= 1;
			// }

			// $content.append($block);
			// // 设置独立 ID，用于唤醒操作记录
			// $block.attr("id", "B"+new Date().getTime());
			// // console.log(firstOpenPoint,typeof bookListTitle)
			// if (firstOpenPoint == 0 || typeof bookListTitle == "string") {
			// 	$("#loadWrap").hide();
			// 	$("footer").removeClass("active");
			// 	$("body").height($("#content").height()+32);
			// 	$("body").getNiceScroll().resize();
			// }

			createList(dataList,coluNo)
		}
	})
}
var whereGet = "detail"; // search/detail 用于判断更多按钮调用的接口 
// function createList(data,col){
// 	// console.log(data,col)
// 	var $content = $("#content");
// 	var $block = $("<div class='block'></div>");
// 	var $title = $("<p class='title'></p>");
// 	var $more = $("<a href='#'>更多</a>");
// 	var $list = $("<ul class='list clearAll'></ul>");
// 	var str = "";
// 	var tti = ""; // 用于存储标题

// 	// 设置 block 的标题
// 	if (typeof bookListTitle == "object") {
// 		$title.append("<span>"+bookListTitle[firstOpenPoint-1]+"</span>").append($more);
// 	} else if(typeof bookListTitle == "string"){
// 		// if (!col) {
// 			// $title.append("<span>"+bookListTitle+"</span>");
// 		// } else {
// 			$title.append("<span>"+bookListTitle+"</span>").append($more);
// 		// }
// 	}

// 	for (var i = 0; i < data.length; i++) {
// 		nowTitle = code64.encode($title.children('span').text());
// 		var imgSrc = code64.decode(data[i].Cover) == "" ? "img/book.jpg" : code64.decode(data[i].Cover);
// 		// 构建列表
// 		str = str
// 		+'<li>'
// 			// +'<a href="'+data[i].BigCover+'">'
// 			+'<a href="detail.html?a='+code64.decode(data[i].AqNewRd)+'&b='+nowTitle+'">'
// 				// +'<img src="img/book.jpg" dateUrl="'+data[i].BigCover+'">'
// 				+'<img src="'+imgSrc+'" dateUrl="'+imgSrc+'">'
// 				+'<p title="'+code64.decode(data[i].Title)+'">'+code64.decode(data[i].Title)+'</p>'
// 				+'<p title="'+code64.decode(data[i].Author)+'">'+code64.decode(data[i].Author)+'</p>'
// 				+'<span>馆藏 '+code64.decode(data[i].CollCount)+' 本</span>'
// 				+'<span>荐购 '+code64.decode(data[i].RecomCount)+' 次</span>'
// 				+'<span>直采 '+code64.decode(data[i].KfRecomCount)+' 本</span>'
// 			+'</a>'
// 		+'</li>';
// 	}
// 	// 设置 更多 按钮的属性
// 	// a coluNo ,b 标题或者所属分类名称, c 用于 more.html 接口调用
// 	$more.attr({
// 		"href": "more.html?a="+col+"&b="+nowTitle+"&c="+whereGet,
// 		"val": col
// 	});

// 	$list.append($(str));
// 	$block.append($title);
// 	$block.append($list);

// 	// 首次进入不隐藏
// 	if (firstOpenPoint == 0 || typeof bookListTitle == "string") {
// 		$content.children('.block').hide();
// 	} else {
// 		firstOpenPoint -= 1;
// 	}

// 	$content.append($block);
// 	// 设置独立 ID，用于唤醒操作记录
// 	$block.attr("id", "B"+new Date().getTime());
// 	// console.log(firstOpenPoint,typeof bookListTitle)
// 	if (firstOpenPoint == 0 || typeof bookListTitle == "string") {
// 		$("#loadWrap").hide();
// 		$("footer").removeClass("active");
// 		$("body").height($("#content").height()+32);
// 		$("body").getNiceScroll().resize();
// 	}
// }

function createList(){
	var $content = $("#content");
	// var $block = $("<div class='block'></div>");
	var $block = $("#content .block");
	var $title = $("<p class='title'></p>");
	var $more = $("<a href='#'>更多</a>");
	var $list = $("<ul class='list clearAll'></ul>");
	var str = "";
	var tti = ""; // 用于存储标题
	var str = "";

	for (var i = 0; i < 20; i++) {
		str = str
		+'<li>'
			+'<a href="detail.html">'
				+'<img src="img/book.jpg">'
				+'<p title="">书名</p>'
				+'<p title="">文字说明</p>'
				+'<span>馆藏 888 本</span>'
				+'<span>荐购 888 次</span>'
				+'<span>直采 888 本</span>'
			+'</a>'
		+'</li>';
	};

	$list.append($(str));
	$block.append($title);
	$block.append($list);
	// $content.append($block);
	 setTimeout(function(){
	 	$("#loadWrap").hide();
		$("footer").removeClass("active");
		$("body").height($("#content").height()+32);
		$("body").getNiceScroll().resize();
	 }, 1500);
}
createList();

// 选择栏目分类
$("#firstMenu .firstClass").on('click', 'span', function(event) {
	event.preventDefault();
	$(this).addClass("active").siblings('span').removeClass('active');
	bookListTitle = $(this).text();
	whereGet = "detail";
	getBookList($(this).attr("dataColuNo"));
	isShow("#firstMenu");
})

// 选择一级字母分类
$("#firstMenu .secondClass").on('click', 'li', function(event) {
	event.preventDefault();
	$(this).addClass("active").siblings('li').removeClass('active');
	isShow("#firstMenu");
	event.preventDefault();
	var key = $(this).attr("val");
	bookListTitle = $(this).text();
	whereGet = "search";
	// getBookList(coluNo)
	var url = "http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetTopList.ashx?a=[Clcno={{"+key+"}}][TopCnt={{20}}][_PageNo={{1}}][_PageCount={{20}}]"+urlStr;
	$.getJSON(url, function (data){
		if (0 != data.error) {
			console.log(data.errorname)
			return
		} else {
			console.log(data)
			createList(data.acqu_ifu_AqNew_GetTopList_list1,key); // false 不显示更多按钮
		}
	})
})

// 加载一级菜单数据
var $secondClass = $("#firstMenu .secondClass");
var secondClassList = "";
for (var i = 0; i < menuJson.list.length; i++) {
	secondClassList = secondClassList
		+'<li val="'+menuJson.list[i].Clcno+'">'+menuJson.list[i].Clcno+"类 "+menuJson.list[i].ClcnoName+'</li>';
}
$secondClass.append($(secondClassList));

// 加载二级菜单数据
function showLetterMenu(val){
	var $title = $("#letterMenu .title");
	var $list = $("#letterMenu .list");
	var letterMenuList = "";
	// 查找标题
	for (var i = 0; i < menuJson.list.length; i++) {
		if (menuJson.list[i].Clcno == val) {
			var listData = menuJson.list[i].menu;
			$title.text(val+"类 "+menuJson.list[i].ClcnoName);
			// 查找数据
			for (var x = 0; x < listData.length; x++) {
				letterMenuList = letterMenuList
					+'<li val="'+listData[x].Clcno+'">'+listData[x].Clcno+"类 "+listData[x].ClcnoName+'</li>';
			}
			$list.html($(letterMenuList));
		}
	}
}

// 二级菜单点击事件
$(".letterMenu .list").on("click","li",function(event){
	event.preventDefault();
	isShow(".letterMenu");
	var key = $(this).attr("val");
	whereGet = "search";
	bookListTitle = $(this).text();
	var url = "http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetTopList.ashx?a=[Clcno={{"+key+"}}][TopCnt={{20}}]"+urlStr;
	$.getJSON(url, function (data){
		if (0 != data.error) {
			console.log(data.errorname)
			return
		} else {
			console.log(data)
			createList(data.acqu_ifu_AqNew_GetTopList_list1,key)
		}
	})
})