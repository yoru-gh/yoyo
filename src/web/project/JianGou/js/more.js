// 全局变量部分
var userAgent = navigator.userAgent;
var loadingFlag = false; // 等待动画状态
var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // 检测 IE
var isIE11 = userAgent.indexOf("Trident/7.0") > -1 && userAgent.indexOf("rv:11.0") > -1; // 检测 IE11
var isFF = userAgent.indexOf("Firefox") > -1; // 检测火狐

var code64 = new Base64;

var mLib = "gdut";
var urlStr = "[SessLib={{"+mLib+"}}][SessFun={{web}}][SessPrd={{acqu}}]\x26x=?\x26y=11";

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
// 动画兼容处理
function trans(obj,active){
	if (isIE) {
		obj.style.msTransform = active;
	} else if (isFF) {
		obj.style.transform = active;
	} else {
		obj.style.WebkitTransform = active;
	}
}

// 状态控制
var pageStatus = new Array(); // Clcno PublishD PublishC InColl
function statusController(){
	var a = getUrlParam("a"); // Clcno 或 InColl
	var b = code64.decode(getUrlParam("b")); // 标题或者交所关键字
	var c = getUrlParam("c"); // 标记需要调用的接口类型
	if (a == "undefined") { a = "" }
	if (b.indexOf("检索条件：") > -1) {
		b = b.split("检索条件：")[1];
	} else if (b.indexOf("类 ") > -1) {
		b = b.split("类 ")[1];
	}
	pageStatus[0] = a;
	pageStatus[1] = b;
	pageStatus[2] = c;
	pageStatus[3] = 1; // 当前页码
	pageStatus[4] = 0; // 每页数量
	pageStatus[5] = 0; // 总数
	pageStatus[6] = ""; // 检索条件
	// console.log(pageStatus)
}statusController();

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
		// console.log(superSearchVal)
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
					pageStatus[0] = "";
					pageStatus[1] = text[1];
					pageStatus[2] = "search";
					pageStatus[6] = "[Input={{title("+text[1]+")author("+text[2]+")publish("+text[3]+")isbn("+text[4]+")}}]";
					clearInput("superSearch");
					bookListTitle = "检索条件："+text.notempty().join(",");
					setFilter(getlist(data));
					createList(data.acqu_ifu_AqNew_GetList_list1);
					setPageSelecter(data);
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
					pageStatus[0] = "";
					pageStatus[1] = text;
					pageStatus[2] = "search";
					pageStatus[6] = "[Input={{"+text+"}}]";
					clearInput("superSearch");
					bookListTitle = "检索条件："+text;
					setFilter(getlist(data));
					createList(data.acqu_ifu_AqNew_GetList_list1);
					setPageSelecter(data);
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

// 字母导航
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

// 侧边栏分页点击事件
$(".sidebar .memory").on("click","li",function(event){
	event.preventDefault();
	$(this).addClass("active").siblings('li').removeClass('active');
	pageStatus[3] = parseInt($(this).text());
	setPageActive();
})
// 侧边栏跳转点击事件
$(".sidebar .gotoPage").click(function(){
	var val = $(".sidebar .pageInt").val();
	if (val == "") {
		alert("请输入正确的页码")
	} else {
		pageStatus[3] = parseInt(val);
	}
	setPageActive();
	$(".sidebar .pageInt").val("");
})

// 返回顶部
$("#returnTop").click(function(){ 
	// 调用 nicescroll 产检内置方法返回顶部
	$("body").getNiceScroll(0).doScrollTop(0);
	// console.log($("body").getNiceScroll(0).scrollTop())
})

// 用户操作
$("#mine").click(function(){
	isShow(".userBox")
})

$("#loadWrap").show();
// var firstOpenPoint = 0;
var bookListTitle = ""; // 新数据标题

// 获取地址传过来的接口调用类型
// search 时用参数 a 查询， detail 时用参数 b
function getlist(data){
	var arr = new Array();
	for( var key in data) {
		if (key.indexOf("_list") > -1) {
			arr[arr.length] = data[key]
		}
	}
	return arr
}
function setFilter(arr){
	if (pageStatus[2] == "search") {
		var titleArr = ["出版时间：","出版社：","馆藏状态：","排序："];
		var str = "";
		var liStr1 = "";
		var liStr2 = "";
		var liStr3 = "";
		var liStr3 = "";
		for (var x = 0; x < arr[1].length; x++) {
			liStr1 = liStr1+'<li val="[PublishD={{'+code64.decode(arr[1][x].PublishD)+'}}]">'+code64.decode(arr[1][x].Show)+'</li>';
		}
		for (var x = 0; x < arr[2].length; x++) {
			liStr2 = liStr2+'<li val="[PublishC={{'+code64.decode(arr[2][x].PublishC)+'}}]">'+code64.decode(arr[2][x].Show)+'</li>';
		}
		for (var x = 0; x < arr[3].length; x++) {
			liStr3 = liStr3+'<li val="[InColl={{'+code64.decode(arr[3][x].InColl)+'}}]">'+code64.decode(arr[3][x].Show)+'</li>';
		}
		console.log(arr[3])
		liStr4 = '<li val="[Od_PublishD={{desc}}]">出版时间</li><li val="[Od_RecomCount={{desc}}]">荐购数</li>';
		str = '<li><span>'+titleArr[0]+'</span><ul>'+liStr1+'</ul></li>'
			+ '<li><span>'+titleArr[1]+'</span><ul>'+liStr2+'</ul></li>'
			+ '<li><span>'+titleArr[2]+'</span><ul>'+liStr3+'</ul></li>'
			+ '<li><span>'+titleArr[3]+'</span><ul>'+liStr4+'</ul></li>';
		$(".filler .list").html("");
		$(".filler .list").append($(str));
		$(".filler").show();
	} else if(pageStatus[2] == "detail") {
		$(".filler").hide();
		// console.log("栏目详细没有筛选")
	}
}

// 进入页面加载数据
!function(){
	// 获取栏目
	$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_Colu_GetList.ashx?a="+urlStr, function (data){
		if (0 != data.error) {
			console.log(data.errorname)
			return
		} else {
			// console.log(data)
			var dataList = data.acqu_ifu_Colu_GetList_list1;
			var $firstClass = $("#firstMenu .firstClass");
			for (var i = 0; i < dataList.length; i++) {
				$firstClass.append("<span dataColuNo="+code64.decode(dataList[i].ColuNo)+">"+code64.decode(dataList[i].ColuName)+"</span>");
				bookListTitle[i] = code64.decode(dataList[i].ColuName);
			}
		}
	})

	// 根据 url 参数生成图书列表
	// console.log(pageStatus[2])
	if (pageStatus[2] == "detail") {
		var col = getUrlParam('a');
		$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_Colu_GetDetailList.ashx?a=[_PageNo={{1}}][_PageCount={{20}}][ColuNo={{"+col+"}}][ListFactor={{1}}]"+urlStr, function (data){
			if (0 != data.error) {
				console.log(data.errorname)
				return
			} else {
				console.log(data);
				setFilter();
				pageStatus[6] = "[ColuNo={{"+col+"}}]";
				bookListTitle = code64.decode(data.acqu_ifu_Colu_GetDetailList_list1[0].ColuName); // 获取标题
				createList(data.acqu_ifu_Colu_GetDetailList_list2);
				setPageSelecter(data);
				// console.log(data.acqu_ifu_Colu_GetDetailList_list1[0])
			}
		})
	} else if (pageStatus[2] == "search") {
		var text;
		var prahead = code64.decode(getUrlParam("b"));
		if (prahead.indexOf("检索条件") > -1) {
			text = code64.decode(getUrlParam("b")).split("检索条件：")[1];
		} else if (prahead.indexOf("类 ") > -1) {
			text = code64.decode(getUrlParam("b")).split("类 ")[1];
		}
		// console.log(text)
		$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetList.ashx?a=[_PageNo={{1}}][_PageCount={{50}}][Input={{"+text+"}}][Clcno={{}}][InColl={{}}][PublishD={{}}][PublishC={{}}][ListFactor={{1}}]"+urlStr, function (data){
			if (0 != data.error) {
				console.log(data.errorname)
				return
			} else {
				if (data.RecordCount == 0) {
					alert("找不到你要找的图书")
				} else {
					// console.log(data)
					setFilter(getlist(data));
					pageStatus[6] = "[Input={{"+text+"}}]";
					bookListTitle = code64.decode(getUrlParam("b"));
					createList(data.acqu_ifu_AqNew_GetList_list1);
					setPageSelecter(data);
				}
			}
		})
	}
}()

// 获取筛选栏已选条件
function getFillerActive(){
	var act = $(".filler .list .active");
	var str = "";
	for (var i = 0; i < act.length; i++) {
		str = str + $(act[i]).attr("val");
	}
	console.log(pageStatus[0],pageStatus[1])
	str = str +'[Clcno={{'+pageStatus[0]+'}}][Input={{'+pageStatus[1]+'}}]';
	return str
}
// 筛选点击事件
$(".filler .list").on('click', 'li > ul > li', function(event) {
	event.preventDefault();
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
	} else {
		$(this).addClass("active").siblings('li').removeClass('active');
	}
	$("#loadWrap").show();
	// "[Input={{搜索关键词}}][Clcno={{字母分类}}][InColl={{出版日期}}][PublishD={{出版社}}][PublishC={{馆藏}}][Od_PublishD={{按出版社排序desc}}][Od_RecomCount={{按出荐购数排序desc}}]";
	var tip = getFillerActive();
	console.log(tip)
	$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetList.ashx?a=[_PageNo={{1}}][_PageCount={{50}}]"+tip+urlStr, function (data){
		if (0 != data.error) {
			console.log(data.errorname)
			return
		} else {
			// bookListTitle = code64.decode(getUrlParam("b")); // 设置标题
			if (data.acqu_ifu_AqNew_GetList_list1.length == 0) {
				// alert("抱歉，没有您要找的图书");
				console.log("抱歉，没有您要找的图书");
				console.log(data);
				$("#loadWrap").hide();
			} else {
				pageStatus[6] = tip;
				createList(data.acqu_ifu_AqNew_GetList_list1);
				setPageSelecter(data);
			}
		}
	})
})

// 获取栏目分类下的图书数据
function getBookList(coluNo,page){
	var num = page == undefined ? 1 : page;
	$.getJSON("http://mz2.s1.natapp.cc/Acqu/acqu_ifu_ColuBook_GetList.ashx?a=[_PageNo={{"+num+"}}][_PageCount={{30}}][ColuNo={{"+coluNo+"}}]"+urlStr, function (data){
		if (data.error != 0) {
			console.log(data.errorname)
			return
		} else {
			// console.log(data)
			var dataList = data.acqu_ifu_ColuBook_GetList_list1;
			if (dataList.length == 0) {
				alert("抱歉，没有您要找的图书")
			} else {
				pageStatus[2] = "detail";
				pageStatus[6] = "[ColuNo={{"+coluNo+"}}]";
				setFilter();
				createList(dataList);
				setPageSelecter(data);
			}
		}
	})
}

// 传入数据创建图书列表输出
function createList(data){
	// console.log(data)
	var $content = $("#content");
	var $block = $("<div class='block'></div>");
	var $title = $("<p class='title'></p>");
	var $list = $("<ul class='list clearAll'></ul>");
	var str = "";

	// 设置 block 的标题
	// if (typeof bookListTitle == "object") {
		// $title.append("<span>"+bookListTitle[firstOpenPoint-1]+"</span>");
	// } else if (typeof bookListTitle == "string"){
		$title.append("<span>"+bookListTitle+"</span>");
	// }

	for (var i = 0; i < data.length; i++) {
		// var tti = code64.encode($title.children('span').text());
		var tti = code64.encode(bookListTitle);
		var imgSrc = code64.decode(data[i].Cover) == "" ? "img/book.jpg" : code64.decode(data[i].Cover);
		str = str
		+'<li>'
			// +'<a href="'+data[i].BigCover+'">'
			+'<a href="detail.html?a='+code64.decode(data[i].AqNewRd)+'&b='+tti+'">'
				// +'<img src="img/book.jpg" dateUrl="'+data[i].BigCover+'">'
				+'<img src="'+imgSrc+'" dateUrl="'+imgSrc+'">'
				+'<p title="'+code64.decode(data[i].Title)+'">'+code64.decode(data[i].Title)+'</p>'
				+'<p title="'+code64.decode(data[i].Author)+'">'+code64.decode(data[i].Author)+'</p>'
				+'<span>馆藏 '+code64.decode(data[i].CollCount)+' 本</span>'
				+'<span>荐购 '+code64.decode(data[i].RecomCount)+' 次</span>'
				+'<span>直采 '+code64.decode(data[i].KfRecomCount)+' 本</span>'
			+'</a>'
		+'</li>';
	}

	$list.append($(str));
	$block.append($title);
	$block.append($list);

	// 首次进入不隐藏
	// if (firstOpenPoint == 0 || typeof bookListTitle == "string") {
	// 	$content.children('.block').hide();
	// } else {
	// 	firstOpenPoint -= 1;
	// }
	$content.children('.block').remove();
	$content.append($block);
	// 设置独立 ID，用于唤醒操作记录
	// $block.attr("id", "B"+new Date().getTime());
	// console.log(firstOpenPoint,typeof bookListTitle)
	// if (firstOpenPoint == 0 || typeof bookListTitle == "string") {
		$("#loadWrap").hide();
		$("footer").removeClass("active");
		$("body").height($("#content").height()+32);
		$("body").getNiceScroll().resize();
	// }
}

// 选择栏目分类
$("#firstMenu .firstClass").on('click', 'span', function(event) {
	event.preventDefault();
	$(this).addClass("active").siblings('span').removeClass('active');
	bookListTitle = $(this).text();
	getBookList($(this).attr("dataColuNo"));
	isShow("#firstMenu");
})

// 选择一级字母分类
$("#firstMenu .secondClass").on('click', 'li', function(event) {
	event.preventDefault();
	isShow("#firstMenu"); //
	var key = $(this).attr("val");
	bookListTitle = $(this).text();
	$("#loadWrap").show();
	var url = "http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetList.ashx?a=[_PageNo={{1}}][_PageCount={{50}}][Input={{}}][Clcno={{"+key+"}}][InColl={{}}][PublishD={{}}][PublishC={{}}][ListFactor={{1}}]"+urlStr;
	$.getJSON(url, function (data){
		if (0 != data.error) {
			console.log(data.errorname)
			return
		} else {
			// console.log(data)
			pageStatus[0] = key;
			pageStatus[1] = "";
			pageStatus[2] = "search";
			pageStatus[6] = "[Clcno={{"+key+"}}]";
			setFilter(getlist(data));
			createList(data.acqu_ifu_AqNew_GetList_list1);
			setPageSelecter(data);
		}
	})
})

// 加载一级菜单数据
!function(){
	var $secondClass = $("#firstMenu .secondClass");
	var secondClassList = "";
	for (var i = 0; i < menuJson.list.length; i++) {
		secondClassList = secondClassList
			+'<li val="'+menuJson.list[i].Clcno+'">'+menuJson.list[i].Clcno+"类 "+menuJson.list[i].ClcnoName+'</li>';
	}
	$secondClass.append($(secondClassList));
}()

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
	isShow(".letterMenu"); //
	var key = $(this).attr("val");
	bookListTitle = $(this).text();
	$("#loadWrap").show();
	var url = "http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetList.ashx?a=[_PageNo={{1}}][_PageCount={{50}}][Input={{}}][Clcno={{"+key+"}}][InColl={{}}][PublishD={{}}][PublishC={{}}][ListFactor={{1}}]"+urlStr;
	$.getJSON(url, function (data){
		if (0 != data.error) {
			console.log(data.errorname)
			return
		} else {
			// console.log(data)
			pageStatus[0] = key;
			pageStatus[1] = "";
			pageStatus[2] = "search";
			pageStatus[6] = "[Clcno={{"+key+"}}]";
			setFilter(getlist(data));
			createList(data.acqu_ifu_AqNew_GetList_list1);
			setPageSelecter(data);
		}
	})
})

// 配置分页器
function setPageSelecter(data){
	var pageNo = parseInt(data.PageNo); // 当前页码
	var pageCount = parseInt(data.PageCount); // 每页数量
	var recordCount = parseInt(data.RecordCount); // 总数
	// console.log(pageNo,pageCount,recordCount);
	pageStatus[3] = pageNo;
	pageStatus[4] = pageCount;
	pageStatus[5] = recordCount;
	var thisCount = Math.ceil(recordCount/pageCount); // 共有几页
	if (pageCount < recordCount) {
		var str = '<span></span><span>搜索结果 '+recordCount+' 条，共 '+thisCount+' 页，每页 '+pageCount+' 本图书，当前第 '+pageNo+' 页，您可以在页面右侧菜单跳转页面</span>';
		$(".block .title").append($(str));
		// 右侧菜单添加页码
		$(".sidebar .memory").html("");
		$(".pageInt,.gotoPage").show();
		if (thisCount < 5) {
			for (var i = 0; i < thisCount; i++) {
				$(".sidebar .memory").append($('<li>'+(i+1)+'</li>'));
			}
		} else {
			for (var i = 0; i < 5; i++) {
				$(".sidebar .memory").append($('<li>'+(i+1)+'</li>'));
			}
		}
		$(".sidebar .memory li").eq(0).addClass('active');
		setPageActive();
	} else {
		var str = '<span></span><span>搜索结果 '+recordCount+' 条，共 1 页，每页 '+pageCount+' 本图书，当前第 1 页</span>';
		$(".block .title").append($(str));
		$(".sidebar .memory").html("");
		$(".pageInt,.gotoPage").hide();
	}
}
// 设置分页定位
function setPageActive(){
	var num = Math.ceil(pageStatus[5]/pageStatus[4])-2;
	if (pageStatus[3] <= 3) {
		var setNum = 1;
		$(".sidebar .memory li").each(function(){
			$(this).text(setNum);
			setNum ++;
		})
		if (pageStatus[3] == 3) {
			$(".sidebar .memory li").eq(2).addClass('active').siblings('li').removeClass('active');
		} else {
			$(".sidebar .memory li").eq((pageStatus[3]-1)).addClass('active').siblings('li').removeClass('active');
		}
	} else if (pageStatus[3] > 3 && pageStatus[3] < num) {
		var nowNum = pageStatus.join("-").split("-")[3]-2; // 换页器头一个的页码
		$(".sidebar .memory li").each(function(){
			$(this).text(nowNum);
			nowNum ++;
		});
		$(".sidebar .memory li").eq(2).addClass('active').siblings('li').removeClass('active');
	} else if(pageStatus[3] >= num) {
		var nowNum = pageStatus.join("-").split("-")[3]-2; // 换页器头一个的页码
		var point = 2-(num-pageStatus[3]);
		if (pageStatus[3] == num) {
			$(".sidebar .memory li").each(function(){
				$(this).text(nowNum);
				nowNum ++;
			})
		} else {
			var setNum = num-2;
			$(".sidebar .memory li").each(function(){
				$(this).text(setNum);
				setNum ++;
			})
		}
		$(".sidebar .memory li").eq(point).addClass('active').siblings('li').removeClass('active');
	}

	// 根据页码进行跳转
	if(dateInGet) {
		dateInGet = false;
	} else {
		getDateFormPager();
	}
}

// 来自于分页器的获取数据
var dateInGet = true; // 防止循环执行
function getDateFormPager(){
	var url = "";
	if (pageStatus[2] == "detail") {
		url = "http://mz2.s1.natapp.cc/Acqu/acqu_ifu_ColuBook_GetList.ashx?a=[_PageNo={{"+pageStatus[3]+"}}][_PageCount={{30}}][ListFactor={{1}}]"+pageStatus[6]+urlStr;
		$.getJSON(url, function (data){
			if (data.error != 0) {
				console.log(data.errorname)
				return
			} else {
				var dataList = data.acqu_ifu_ColuBook_GetList_list1;
				if (dataList.length == 0) {
					alert("抱歉，没有您要找的图书")
				} else {
					console.log(data)
					// setFilter();
					createList(dataList);
					setPageSelecter(data);
				}
			}
		})
		
	} else if (pageStatus[2] == "search") {
		url = "http://mz2.s1.natapp.cc/Acqu/acqu_ifu_AqNew_GetList.ashx?a=[_PageNo={{"+pageStatus[3]+"}}][_PageCount={{50}}][ListFactor={{1}}]"+pageStatus[6]+urlStr;
		$.getJSON(url, function (data){
			if (data.error != 0) {
				console.log(data.errorname)
				return
			} else {
				var dataList = data.acqu_ifu_AqNew_GetList_list1;
				if (dataList.length == 0) {
					alert("抱歉，没有您要找的图书")
				} else {
					console.log(data)
					// setFilter(getlist(data));
					createList(dataList);
					setPageSelecter(data);
				}
			}
		})
	}
	dateInGet = true;
}