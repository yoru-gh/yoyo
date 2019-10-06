'use strict';
// 全部数据数组, 下标对应菜式, 台号, 分类, 茶, 纸巾
var thisData = document.getElementById("thisData").getAttribute("value");
var localData = JSON.parse(thisData);
var foodData = null; // 菜式数据
var tableData = null; // 台数据
var classData = null; // 分类数据
var teaData = null; // 茶巾数据
var napkinData = null; // 纸巾数据
// JSON.stringify(json) // json转字符串
// JSON.parse(JSONString) // json字符串转json
//
// 本地存储操作
// #######################################################################
var isOpen = false; // 是否开了台(不含加菜操作)
var isSelTable = null; // 是否选择了台号(含加菜操作)
(function(){
	// localStorage.removeItem("serverData"); // 清除指定数据
	localStorage.clear(); // 清除全部数据
	var upDataTime = 0; // 更新时间
	var nowTime = new Date().getTime();
	var isDataIn = localStorage.getItem("serverData");
	//
	function inputData(){
		try{
			localStorage.setItem("serverData",JSON.stringify(localData));
			localStorage.setItem("isOpen",false); // 保存当前开台状态
			localStorage.setItem("upDataTime",nowTime); // 保存当前时间
			// tip("写入成功",2000);
		}catch(oException){
			if(oException.name == 'QuotaExceededError'){// 本地存储满了则全清后重写
				console.warn('本地存储已满');
				localStorage.clear();
				localStorage.setItem("serverData",JSON.stringify(localData));
				localStorage.setItem("isOpen",false); // 保存当前开台状态
				localStorage.setItem("upDataTime",nowTime); // 保存当前时间
				// tip("写入成功",2000);
			}
		}
	}

	if(isDataIn == null){ inputData(); }

	upDataTime = localStorage.getItem("upDataTime") - nowTime;
	if(upDataTime >= 600000){
		console.log("距离上次写入数据已经过了10分钟");
		inputData();
	} // 每10分钟更新一次数据

	foodData = JSON.parse(localStorage.getItem("serverData"))[0]; // 菜式数据
	tableData = JSON.parse(localStorage.getItem("serverData"))[1]; // 台数据
	classData = JSON.parse(localStorage.getItem("serverData"))[2]; // 分类数据
	teaData = JSON.parse(localStorage.getItem("serverData"))[3]; // 茶巾数据
	napkinData = JSON.parse(localStorage.getItem("serverData"))[4]; // 纸巾数据
	isOpen = localStorage.getItem("isOpen"); // 获取本地开台状态
	isOpen == "true" ? isOpen = true : isOpen = false; // 转换成布尔值
})()
// #######################################################################
// 
var mask = document.getElementById("mask");
var searchMask = document.getElementById("searchMask");
var superLoadAnimate = document.getElementById("superLoadAnimate");

var tableBox = document.getElementById("tableBox");
var readOrder = document.getElementById("readOrder");
var listBox = document.getElementById("listBox");

var tableNum = document.getElementById("tableNum");
var peoNum = document.getElementById("peoNum");
var total = document.getElementById("total");

// 查看已点
var isMin = false; // 是否最小化了选择菜单
readOrder.addEventListener("touchend", function(){
	if (isMin) {
		tableBox.classList.remove('active');
		readOrder.innerHTML = "查看已点";
		isMin = false;
	} else {
		tableBox.classList.add('active');
		readOrder.innerHTML = "继续点菜";
		isMin = true;
	}
})
// 生成台号列表
function createTableList(){
	listBox.innerHTML = null; // 清空内容
	tipArr.length = 0;
	mess.innerHTML = null; // 清空提示
	pageIndex = 0; // 重置翻页索引
	classIndex = 0; // 生成分类索引
	var tableLength = tableData.length; // 这里要获取数据数组的长度，即数据的数量
	var tableGroup = Math.ceil(tableLength/20); // 根据数据数量分页，一页20个数据
	createList(tableLength,tableGroup,tableData,"table"); // 执行数据生成函数
}
// 生成分类列表
function createClassList(){
	listBox.innerHTML = null;
	pageIndex = 0;
	classIndex = 1;
	var classLength = classData.length;
	var classGroup = Math.ceil(classLength/20);
	createList(classLength,classGroup,classData,"class");
}
// 生成菜式列表
function createFoodList(req,reqType){
	// reqType 目前接受分类ID查找 type 跟编号查找 code, 以后可能会有更多的查询方式...
	// 没有参数传进来已经为 null 感觉上这句是没有用的...
	req == undefined ? req = undefined : req = req;
	reqType == undefined ? reqType = "type" : reqType = reqType;
	listBox.innerHTML = null;
	pageIndex = 0;
	classIndex = 2;
	var foodLength = foodData.length;
	var foodGroup = Math.ceil(foodLength/20);
	createList(foodLength,foodGroup,foodData,"food",req,reqType);
}
// 生成口味列表
var tasteBox = document.getElementById("tasteBox");
function createTasteList(obj){
	tasteBox.innerHTML = null;
	classIndex = 3;
	for (var i = 0; i < obj.taste.length; i++) {
		var ti = document.createElement("li");
		ti.innerHTML = obj.taste[i].TasteName;
		ti.setAttribute("value",obj.taste[i].TasteId+","+obj.taste[i].TasteName+","+obj.taste[i].TastePrice);
		tasteBox.appendChild(ti);
		tasteBox.style.display = "block";
	}
}
function removeTasteList(){
	classIndex = 2;
	tasteBox.innerHTML = null;
	tasteBox.style.display = "none";
}

// 查询本地存储生成展示数据
function createList(dataNum,pageNum,arrObj,what,requ,requType){
	// dataNum:数据总数(需要循环的次数), pageNum:分页数, arrObj:要生成的数据
	// what--> table:台号, class:分类, food:菜式
	// requ 查询条件
	var listWarpper = null; // 用来储存生成的组
	var nowG = 0; // 用来储存当前组索引

	// 先循环生成分组
	if (pageNum > 1) { // 多于20个时
		for (var i = 0; i < pageNum; i++) {
			var ul = document.createElement("ul");
			ul.classList.add("listWarpper");
			if (i > 0) ul.classList.add("displayNone"); // 第二个开始添加新类名		
			listBox.appendChild(ul);
		}	
	} else { // 少于20个时
		var ul = document.createElement("ul");
		ul.classList.add("listWarpper");
		listBox.appendChild(ul);
	}

	listWarpper = listBox.querySelectorAll(".listWarpper"); // 这是一个数组
	switch(what) { // 根据不同类型查询对应数据
		case "table": beforeQuery(queryTable); break;
		case "class": beforeQuery(queryClass); break;
		case "food": beforeQuery(queryFood); break;
	}
	function beforeQuery(fun){
		// 开始循环生成分组里的数据
		for (var i = 1; i <= dataNum; i++) { // 这里的 i 是从 1 开始的!!
			var li = document.createElement("li");
			nowG = Math.ceil(i/20)-1; // 20个一组，超出的放进下一组
			fun(i,li);
		}
	}

	// 台号查询
	function queryTable(eq,li){ // Status
		if (arrObj[eq-1].Status == 2) { // 判断是否使用中
			li.classList.add("statusNo");
			li.innerHTML = arrObj[eq-1].tableCode+"<br>使用中";
		} else {
			li.innerHTML = arrObj[eq-1].tableCode+"<br>"+arrObj[eq-1].tableName; // 输出台名称
		}
		li.setAttribute("value",arrObj[eq-1].id+","+arrObj[eq-1].Status); // 储存台id跟状态
		listWarpper[nowG].appendChild(li);
	}
	// 分类查询
	function queryClass(eq,li){
		li.innerHTML = arrObj[eq-1].TypeName; // 输出分类名称
		li.setAttribute("value",arrObj[eq-1].MenuTypeId); // 储存台id
		listWarpper[nowG].appendChild(li);
	}
	// 菜式查询
	function queryFood(eq,li){
		var foodObj = arrObj[eq-1]; // 把当前菜式对象存起来	
		if (requ == undefined) { // 没有输入查询条件时不循环查询数据
			li.innerHTML = foodObj.MenuName;
		} else { // 带有查询条件时
			// var reg = new RegExp(".*"+requ+"*."); // 模糊查询条件
			var reg = new RegExp(requ); // 模糊查询条件
			switch(requType){
				case "type": classIdSearch(); break;
				case "code": codeSearch(); break;
			}
		}
		function classIdSearch(){
			if (foodObj.MenuTypeId == requ) {
				li.innerHTML = foodObj.MenuName;
				li.setAttribute("value",foodObj.MenuId+","+foodObj.MenuName+","+foodObj.MenuPrice);
				if (foodObj.taste != undefined) {
					var span = document.createElement("span");
					span.classList.add("taste");
					span.innerHTML = "口味";
					li.appendChild(span); // 添加口味按钮
				}
				listWarpper[nowG].appendChild(li);
			} else if(eq == dataNum && listWarpper[nowG].children.length == 0) { // 没有需要的数据时
				li.classList.add("noData");
				li.innerHTML = "没有该菜式的数据";
				listWarpper[nowG].appendChild(li);
			}
		}
		function codeSearch(){
			if (reg.test(foodObj.MenuCode)) {
				li.innerHTML = foodObj.MenuName;
				li.setAttribute("value",foodObj.MenuId+","+foodObj.MenuName+","+foodObj.MenuPrice);
				if (foodObj.taste != undefined) {
					var span = document.createElement("span");
					span.classList.add("taste");
					span.innerHTML = "口味";
					li.appendChild(span); // 添加口味按钮
				}
				listWarpper[nowG].appendChild(li);
			} else if(eq == dataNum && listWarpper[nowG].children.length == 0) { // 没有需要的数据时
				li.classList.add("noData");
				li.innerHTML = "没有该菜式的数据";
				listWarpper[nowG].appendChild(li);
			}
		}
	}
}

// 返回上一级分类 翻页
// #######################################################################
var preClass = document.getElementById("preClass");
var prePage = document.getElementById("prePage");
var nextPage = document.getElementById("nextPage");
var submitOrder = document.getElementById("submitOrder");
var pageIndex = 0; // 翻页用索引
// 返回上一级分类
preClass.addEventListener("touchend", function(){
	if (isSelTable) {
		switch(classIndex){
			case 2: createClassList(); break;
			case 3: removeTasteList(); break;
		}
		tipArr.splice(1,10); // 保留台号删除其他
		mess.innerHTML = tipArr.join(" > ");
	} else {
		switch(classIndex){
			case 1: createTableList(); break;
			case 2: createClassList(); break;
			case 3: removeTasteList(); break;
		}
		tipArr.pop(); // 删除已选数组里最后一位
		mess.innerHTML = tipArr.join(" > ");
	}
})
// 上一页
prePage.addEventListener("touchend", function(){
	var listPage = listBox.getElementsByClassName("listWarpper");
	if (pageIndex != 0) {
		listPage[pageIndex-1].classList.remove("displayNone");
		listPage[pageIndex-1].classList.add("active");
		listPage[pageIndex].classList.add("displayNone");
		listPage[pageIndex].classList.remove("active");
		pageIndex--;
	}
})
// 下一页
nextPage.addEventListener("touchend", function(){
	var listPage = listBox.getElementsByClassName("listWarpper");
	if (pageIndex < listPage.length-1) {
		listPage[pageIndex+1].classList.remove("displayNone");
		listPage[pageIndex+1].classList.add("active");
		listPage[pageIndex].classList.add("displayNone");
		listPage[pageIndex].classList.remove("active");
		pageIndex++;
	}
})
// 提交订单
var orderType = null; // 订单类型 新开台点餐为, 0加菜为 1
var isReadySubmit = false; // 是否可以提交
var submitOrderJson = null; // 最终要提交的订单数据
submitOrder.addEventListener("touchend", function(){
	if (isOrdered) { 
		// 从加菜生成新订单时
		submitOrderJson.order = orderTicket;
	} else {
		// 从新开台生成订单时
		// 这里要做更改本地开台状态, 选择台状态, 收集订单数据提交, 清除订单数据, 生成订单号
		if (isReadySubmit) {
			var date = new Date();
			var creatOrderCode = "FS"+date.getFullYear()+(date.getMonth()+1)+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+parseInt(10*Math.random())+parseInt(10*Math.random())+parseInt(10*Math.random())+parseInt(10*Math.random())+parseInt(10*Math.random())+parseInt(10*Math.random()); // 订单号
			// 生成数据
			submitOrderJson = {
				orderType: orderType,
				orderCode: creatOrderCode, // 订单号
				tableCode: openMes[6], // 台号ID
				people: openMes[0], // 人数
				teaId: openMes[1], // 茶ID
				napkinId: openMes[3], // 纸巾ID
				napkinNum: openMes[2], // 纸巾数
				order: orderTicket // 订单, 这是一个数组, 数组长度就是菜式数量, 数组每一位都是一个 json 格式数据, 按顺序包括 ID 名称 价格 口味ID 口味价格 数量
			};
			whenSubmitOrder();
			window.history.go(0); // 提交完刷新页面
		} else {
			tip("网络错误")
		}
	}
	console.log(submitOrderJson);
})
// #######################################################################


var mess = document.getElementById("mess"); // 显示当前进度
var classIndex = 0; // 分类用索引
var tipArr = new Array(); // 存放已选

// 主列表选择事件委托 ####################################################
listBox.addEventListener("touchend", function(){
	var target = event.target || event.srcElement; // 兼容写法
	var thisMes = null;
	var classId = null; // 按分类筛选菜式时需要用到的分类 ID
	var foodMes = new Array(); // 生成订单时要传递的信息
	if(target.nodeName.toLowerCase() == "li"){ // 正常点菜
		// 储存已选信息并打印
		if (classIndex == 0) { // 选台号时
			thisMes = target.innerHTML.split("<br>")[1];
			whenCheckTable(target,continFun);
		} else {
			if (target.className != "noData") { // 没口味数据点击不执行
				isSelTaste = false;
				tipArr[1] = target.innerHTML;
				thisMes = target.innerHTML;	
				classIndex == 1 ? classId = target.getAttribute("value") : null;
				classIndex == 2 ? foodMes = target.getAttribute("value").split(",") : null;
				continFun();
			}
		}
	} else if(target.className == "taste") { // 选口味
		var pointDOM = document.querySelector(".point");
		pointDOM === null ? pointDOM = null : pointDOM.classList.remove("point");
		target.parentNode.classList.add("point"); // 添加标记

		var preObj = target.parentNode.getAttribute("value").split(",");
		tipArr[tipArr.length] = preObj[1];
		// 查询菜式
		for (var i = 0; i < foodData.length; i++) {
			if (foodData[i].MenuId == preObj[0]) {
				createTasteList(foodData[i]);
				break;
			}
		}
		continFun(); // 需要判断直接按编号搜索时返回
	}
	function continFun(ssr){
		mess.innerHTML = tipArr.join(" > ");
		switch(classIndex){ // 根据当前分类索引生成下一级分类
			case 0: createClassList(); break;
			case 1: createFoodList(classId); break;
			case 2: createOrder(foodMes); break;
		}
	}
})

// 选口味
var isSelTaste = false; // 用于判断是否选择了口味
tasteBox.addEventListener("touchend", function(){
	var target = event.target || event.srcElement; // 兼容写法
	var parAdd = document.querySelector(".point");
	var thisMes = target.getAttribute("value").split(","); //
	parAdd.setAttribute("value",parAdd.getAttribute("value")+","+thisMes[0]+","+thisMes[2]); // 添加口味ID跟价格 
	tasteBox.style.display = "none";
	isSelTaste = true;
	createOrder(parAdd.getAttribute("value").split(","),target.innerHTML);
})

// 切换台号
var selTable = document.getElementById("selTable");
selTable.addEventListener("touchend", function(){
	warns("确定要重选台号么",function(){
		tipArr.length = 0;
		createTableList();
		clearSome("open");
		tableBox.classList.remove('active');
		readOrder.innerHTML = "查看已点";
		isMin = false;
	})
})

// 输入菜式编号搜索
var searchIn = document.getElementById("searchIn");
var menuBtn = document.getElementById("menuBtn");
var menuWrap = document.getElementById("menuWrap");
var mwContent = document.getElementById("mwContent");
var menuWrapClose = document.getElementById("menuWrapClose");
var menuWrapSubmit = document.getElementById("menuWrapSubmit");
var mwBind = null;
menuBtn.addEventListener("touchend", function(){
	// var len = mwContent.getElementsByTagName("li");
	for (var i = 0; i < tableData.length; i++) {
		var li = document.createElement("li");
		if (tableData[i].Status == 2) { // 判断是否使用中
			li.classList.add("statusNo");
			li.innerHTML = tableData[i].tableCode+"<br>使用中";
		} else {
			li.innerHTML = tableData[i].tableCode+"<br>"+tableData[i].tableName; // 输出台名称
		}
		li.setAttribute("value",tableData[i].id+","+tableData[i].Status); // 储存台id跟状态
		mwContent.appendChild(li);
	}
	menuWrap.classList.add("active");
})
menuWrapClose.addEventListener("touchend", function(){
	menuWrap.classList.remove("active");
	mwContent.innerHTML = null;
})
menuWrapSubmit.addEventListener("touchend", function(){
	// loading.addfun("功能开发中...");
	// setTimeout(loading.removefun,2000);
	var lee = mwContent.children;
	for (var i = 0; i < lee.length; i++) {
		if (lee[i].className.indexOf("active") > -1) {
			console.log(lee[i].innerText+" : "+lee[i].getAttribute("value"));
		}
	}
})
// 选择台号
tap(menuWrap,function(){
	var target = event.target;
	if (target.className.indexOf("active") > -1) {
		target.classList.remove("active");
	} else {
		target.classList.add("active");
	}
})

searchIn.addEventListener("touchend", function(){
	if (isSelTable) {
		searchIn.innerHTML = " | ";
		searchMask.classList.add("active");
		keyboard.classList.add("active");
	} else {
		tip("请先选择台桌");
	}	
})



// 键盘操作
// #######################################################################
var keyArr = new Array(); // 储存输入值数组
var keyboard = document.getElementById("keyboard");
keyboard.addEventListener("touchend",function(event){
	var target = event.target || event.srcElement;
	var thisText = event.target.innerHTML;
	switch(thisText){
		case "0": numShow(0); break;
		case "1": numShow(1); break;
		case "2": numShow(2); break;
		case "3": numShow(3); break;
		case "4": numShow(4); break;
		case "5": numShow(5); break;
		case "6": numShow(6); break;
		case "7": numShow(7); break;
		case "8": numShow(8); break;
		case "9": numShow(9); break;
		case "回退": backFun(); break;
		case "搜索": completeFun(); break;
	}
})
// 输入操作
function numShow(num){
	keyArr[keyArr.length] = num; // 把输入的值存进数组
	searchIn.innerHTML = keyArr.join('');
}
// 回退操作
function backFun(){
	keyArr.pop(); // 删除数组中最后一位
	searchIn.innerHTML = keyArr.join('');
}
// 确定操作
function completeFun(){
	var reg = new RegExp("^[0-9]*$"); // 数字限定
	var val = keyArr.join('');
	if(reg.test(val)) {
		createFoodList(val,"code"); // 传入查询条件
		clearSome("keyboard"); // 重置编号搜索
		tableBox.classList.remove('active');
		readOrder.innerHTML = "查看已点";
		isMin = false;
	} else {
		tip("请输入数字");
	}
}
// #######################################################################
var isOpenSel = false; // 是否在开台界面打开了纸巾茶选择列表+
mask.addEventListener("touchend", function(){
	if (isOpenSel) {
		sellist.classList.remove("active");
		mask.classList.remove("active");
		isOpenSel = false;
	}
})
// 点击遮罩层关闭模拟键盘
searchMask.addEventListener("touchend", function(){
	clearSome("keyboard");
})

// 清理函数 重置编号搜索，关闭虚拟键盘，关闭遮罩层
function clearSome(type){
	switch(type){
		case "keyboard": closeKeyboard(); break;
		case "mask": closeMask(); break;
		case "open": openNew(); break;
		case "all": openNew(); break;
	}
	function closeMask(){
		mask.classList.remove("active");
	}
	function closeKeyboard(){
		searchIn.innerHTML = "请输入菜编号...";
		keyArr.length = 0;
		searchMask.classList.remove("active");
		keyboard.classList.remove("active");
	}
	function openNew(){
		keyArr.length = 0; // 清空键盘输入
		tableNum.innerHTML = "台号："; // 还原台号
		peoNum.innerHTML = "人数："; // 还原人数
		total.innerHTML = "订单总额："; // 还原订单金额
		orderList.innerHTML = null; // 清空订单列表
		localStorage.setItem("isOpen",false); // 设置本地开台状态为未开台
		isOpen = localStorage.getItem("isOpen"); // 状态改为未开台
		isSelTable = false; // 状态改为未选台桌
		createTableList();
	}
	function clearAll(){
		openMes.length = 0; // 清空开台信息数组
		orderTicket.length = 0; // 清空订单数据数组
		keyArr.length = 0;
		tableNum.innerHTML = "台号：";
		peoNum.innerHTML = "人数：";
		total.innerHTML = "订单总额：";
		orderList.innerHTML = null;
		localStorage.setItem("isOpen",false); // 设置本地开台状态为未开台
		isOpen = localStorage.getItem("isOpen"); // 状态改为未开台
		isSelTable = false; // 状态改为未选台桌
		createTableList();
		mask.classList.remove("active");
	}
}

// 生成订单列表, 收集需要提交到服务器的数据
// #######################################################################
var orderList = document.getElementById("orderList");
var orderTicket = new Array(); // 储存订单
function createOrder(dataObj,selName){ // 创建一道菜添加到订单
	var pretid = JSON.parse(JSON.stringify(foodData)); // 深拷贝 json 对象, 不拷贝会修改原 json 对象
	var tid = new Array; // 获取改到菜式数据
	var isNoTaste = false; // 无口味数据项目的判断依据
	if (dataObj.length < 6) {
		if (!isSelTaste) { // 没选口味自动补充默认口味
			for (var i = 0; i < pretid.length; i++) {
				if (pretid[i].MenuId == dataObj[0]) {
					if (pretid[i].taste == undefined) { // 不存在口味数据时填充伪数据
						isNoTaste = true;
						// tid = pretid[i];
						// tid["taste"] = new Array(); // json 添加新元素
						// tid.taste[0] = {
						// 	"TasteId": 0,
						// 	"TastePrice": 0,
						// };
						// dataObj[3] = tid.taste[0].TasteId; // 口味ID
						// dataObj[4] = tid.taste[0].TastePrice; // 口味价格
						dataObj[3] = 0; // 口味ID
						dataObj[4] = 0; // 口味价格
					} else {
						isNoTaste = false;
						tid = pretid[i].taste;console.log(tid[0])
						dataObj[3] = tid[0].TasteId; // 口味ID
						dataObj[4] = tid[0].TastePrice; // 口味价格
					}
					break;
				}
			}
		}
		dataObj[5] = 1; // 添加菜式数量
	}

	var li = document.createElement("li");
	var p = document.createElement("p");
	var span1 = document.createElement("span");
	var span2 = document.createElement("span");
	var span3 = document.createElement("span");
	// 添加样式
	p.classList.add("text");
	span1.classList.add("foodSun");
	span2.classList.add("deleteButton");
	span3.classList.add("moreButton");
	// 输入显示信息
	selName == null ? p.innerText = dataObj[1]+"_原味" : p.innerText = dataObj[1]+"_"+selName;
	span1.innerText = 1;
	// 添加节点
	li.appendChild(p);
	li.appendChild(span1);
	li.appendChild(span2);
	isNoTaste ? null : li.appendChild(span3); // 无口味数据的项目无法修改数量
	// 记录菜式信息
	li.setAttribute("value",dataObj); // 把信息写到标签内
	orderList.appendChild(li);
	
	orderTicket[orderTicket.length] = dataObj; // 保存该道菜, 目前没有同菜合并
	createClassList();
	tip(dataObj[1]+" 点菜成功");
	tipArr.splice(1,10); // 删除第二位之后的全部
	mess.innerHTML = tipArr.join();
	// 计算价格
	total.innerText = "订单总额："+(parseInt(openMes[4])+countOne(dataObj[2],dataObj[4],dataObj[5]));
	openMes[4] = parseInt(openMes[4])+countOne(dataObj[2],dataObj[4],dataObj[5]);
	isReadySubmit = true; // 已准备好提交
}
// #######################################################################

// 订单修改，删除事件委托
var orderList = document.getElementById("orderList");
var tasteWrap = document.getElementById("tasteWrap");
orderList.addEventListener("touchend", function(){
	var target = event.target || event.srcElement; // 兼容写法
	switch(target.className){
		case "moreButton": moreFun(); break;
		case "deleteButton": deleteFun(); break;
	}

	function moreFun(){ // 修改菜式内容
		var pointMes = target.parentNode.getAttribute("value").split(",");
		var pointDOM = document.querySelector(".point");
		pointDOM === null ? pointDOM = null : pointDOM.classList.remove("point");
		target.parentNode.classList.add("point"); // 添加标记

		// 查询该道菜的口味
		for (var i = 0; i < foodData.length; i++) {
			if (foodData[i].MenuId == pointMes[0]) {
				for (var i1 = 0; i1 < foodData[i].taste.length; i1++) {
					var span = document.createElement("span");
					i1 == 0 ? span.classList.add("active") : null;
					span.innerHTML = foodData[i].taste[i1].TasteName; // 输出口味名称
					span.setAttribute("value",foodData[i].taste[i1].TasteId+","+foodData[i].taste[i1].TastePrice+","+foodData[i].taste[i1].TasteName); // 记录ID跟价格名字
					tasteWrap.appendChild(span);
				}
				break;
			}
		}
		
		document.getElementById("num").innerText = pointMes[5]; // 记录数量

		orderChange.style.display = "block";
		mask.classList.add("active");
	}
	function deleteFun(){ // 删除菜式	
		var nowIndex = 0; // 标记节点的索引
		var price = 0; // 记录该道菜的价格
		var pmes = target.parentNode.getAttribute("value").split(",");
		price = (parseInt(pmes[2])+parseInt(pmes[4]))*parseInt(pmes[5]);
		
		// 警示框函数
		warns("确定要删除该道菜么",function(){
			target.parentNode.setAttribute("ready","readyDelete");
			// 获取标记节点的索引, 按索引值修改订单数组里对应数据
			for (var i = 0; i < orderList.childNodes.length; i++) {
				if (orderList.childNodes[i].getAttribute("ready") == "readyDelete") {
					nowIndex = i;
					break;
				}
			}
			// 计算价格
			total.innerText = "订单总额："+(parseInt(openMes[4])-price);
			openMes[4] = parseInt(openMes[4])-price;
			// 删除订单数组里该道菜的数据
			orderTicket.splice(nowIndex,1);
			target.parentNode.remove();
			tip("已删除该道菜");
			// 无菜式则无法提交
			orderList.childNodes.length == 0 ? isReadySubmit = false : null;
		})
	}
})

var orderChange = document.getElementById("orderChange");
var selectTaste = document.getElementById("selectTaste");
var changeNum = document.getElementById("changeNum");
var comChange = document.getElementById("comChange");
var canChange = document.getElementById("canChange");
// 修改口味
selectTaste.addEventListener("touchend", function(){
	var target = event.target || event.srcElement;
	if (target.nodeName.toLowerCase() == "span") {
		var pointDOM = document.querySelector(".active");
		pointDOM.classList.remove("active");
		target.classList.add("active");
	}
})
// 修改数量
changeNum.addEventListener("touchend", function(){
	var target = event.target || event.srcElement;
	var triDOM = document.querySelector(".mpBox").getElementsByTagName("li");
	var priText = parseInt(triDOM[1].innerText);
	if (target.className == "minus") {
		if (priText == 1) {} else {
			triDOM[1].innerText = priText - 1;
		}
	} else if (target.className == "plus") {
		triDOM[1].innerText = priText + 1;
	}
})
// 确定操作
comChange.addEventListener("touchend", function(){
	var pointIndex = null; // 标记节点的索引
	var prePrice = 0; // 记录修改前的价格
	var afterPrice = 0; // 记录修改后的价格
	var ctaste = selectTaste.getElementsByClassName("active")[0].getAttribute("value").split(",");
	var cnum = parseInt(changeNum.getElementsByClassName("num")[0].innerText);

	var pointDOM = orderList.querySelector(".point");
	var pointVal = pointDOM.getAttribute("value").split(",");

	prePrice = (parseInt(pointVal[2])+parseInt(pointVal[4]))*parseInt(pointVal[5]);
	// 把修改后的数据写入记录标签
	pointVal[3] = ctaste[0]; // id
	pointVal[4] = ctaste[1]; // 价格
	pointVal[5] = cnum; // 该道菜的数量
	pointDOM.setAttribute("value",pointVal);
	pointDOM.getElementsByClassName("foodSun")[0].innerText = cnum; // 显示修改后的数量
	pointDOM.getElementsByClassName("text")[0].innerText = pointDOM.getElementsByClassName("text")[0].innerText.split("_")[0] +"_"+ ctaste[2]; // 显示修改后的口味

	tasteWrap.innerHTML = null; // 清除修改框里的东西

	// 获取标记节点的索引, 按索引值修改订单数组里对应数据
	for (var i = 0; i < orderList.childNodes.length; i++) {
		if (orderList.childNodes[i].className == "point") {
			pointIndex = i;
			break;
		}
	}
	orderTicket[pointIndex] = pointVal; // 修改该道菜道菜属性
	// 计算修改后的价格
	afterPrice = (parseInt(pointVal[2])+parseInt(pointVal[4]))*parseInt(pointVal[5]);
	total.innerText = "订单总额："+(parseInt(openMes[4])+afterPrice-prePrice);
	openMes[4] = parseInt(openMes[4])+afterPrice-prePrice;

	orderChange.style.display = "none";
	mask.classList.remove("active");
})
// 取消操作
canChange.addEventListener("touchend", function(){
	var pointDOM = orderList.querySelector(".point");
	pointDOM === null ? pointDOM = null : pointDOM.classList.remove("point");
	tasteWrap.innerHTML = null;
	orderChange.style.display = "none";
	mask.classList.remove("active");
})

// 计算价格函数
function countOne(pri1,pri2,nu){
	return (parseInt(pri1)+parseInt(pri2))*parseInt(nu)
}

// 开台部分
// #######################################################################
var openMes = new Array(); // 记录开台信息
var openTableBox = document.getElementById("openTableBox");
var goBack = document.getElementById("goBack");
var goOpen = document.getElementById("goOpen");
var teaWrap = document.getElementById("teaWrap");
var napkinWrap = document.getElementById("napkinWrap");
var listWrap = document.getElementById("listWrap");

var teaSum = document.getElementById("teaSum");
var teaPrice = document.getElementById("teaPrice");
var napkinSum = document.getElementById("napkinSum");
var napkinPrice = document.getElementById("napkinPrice");
var tablePrice = document.getElementById("tablePrice");

var rs = document.getElementById("rs");
var zs = document.getElementById("zs");
var tableHao = document.getElementById("tableHao");

var whatSel = true; // 记录选择的是茶还是纸巾, true 为茶

// 点击开台时生成默认茶和纸巾
function beforeOpen(hao){
	var teaMes = teaData[0];
	var napkinMes = napkinData[0];

	hao == null ? tableHao.innerText = "无台号" : tableHao.innerText = hao;
	// 茶部分
	teaWrap.getElementsByTagName("span")[1].getElementsByTagName("i")[0].innerText = teaMes.TeaName;
	teaWrap.setAttribute("value",teaMes.TeaId+","+teaMes.TeaName+","+teaMes.TeaPrice);
	teaPrice.innerText = teaMes.TeaPrice;
	teaSum.innerText = teaMes.TeaPrice;
	// 纸巾部分
	napkinWrap.getElementsByTagName("span")[1].getElementsByTagName("i")[0].innerText = napkinMes.NapkinName;
	napkinWrap.setAttribute("value",napkinMes.NapkinId+","+napkinMes.NapkinName+","+napkinMes.NapkinPrice);
	napkinPrice.innerText = napkinMes.NapkinPrice;
	napkinSum.innerText = napkinMes.NapkinPrice;
	// 总价
	tablePrice.innerText = parseInt(teaMes.TeaPrice)+parseInt(napkinMes.NapkinPrice);
}
// 计算开台总价
function tablePriceSum(){
	tablePrice.innerText = parseInt(teaSum.innerText)+parseInt(napkinSum.innerText);
}

var sumBox = document.getElementsByClassName("sumBox");
// 修改人数
sumBox[0].addEventListener("touchend",function(){
	var thisPrice = teaWrap.getAttribute("value").split(",")[2];
	var textPar = parseInt(rs.innerText);
	var target = event.target || event.srcElement;
	switch(target.className){
		case "minus": minusFun(); break;
		case "plus": plusFun(); break;
	}
	function minusFun(){
		if (textPar > 1) rs.innerText = textPar-1;
		teaSum.innerHTML = parseInt(thisPrice)*parseInt(rs.innerText);
	}
	function plusFun(){
		rs.innerText = textPar+1;
		teaSum.innerHTML = parseInt(thisPrice)*parseInt(rs.innerText);
	}
	tablePriceSum();
})
// 修改纸巾数
sumBox[1].addEventListener("touchend",function(){
	var thisPrice = napkinWrap.getAttribute("value").split(",")[2];
	var textPar = parseInt(zs.innerText);
	var target = event.target || event.srcElement;
	switch(target.className){
		case "minus": minusFun(); break;
		case "plus": plusFun(); break;
	}
	function minusFun(){
		if (textPar > 0) zs.innerText = textPar-1;
		napkinSum.innerHTML = parseInt(thisPrice)*parseInt(zs.innerText);
	}
	function plusFun(){
		zs.innerHTML = textPar+1;
		napkinSum.innerHTML = parseInt(thisPrice)*parseInt(zs.innerText);
	}
	tablePriceSum();
})
// 选茶
teaWrap.addEventListener("touchend",function(){
	listWrap.innerHTML = null;
	whatSel = true;
	isOpenSel = true;
	for (var i = 0; i < teaData.length; i++) {
		var li = document.createElement("li");
		li.innerText = teaData[i].TeaName+"  "+teaData[i].TeaPrice+"元/人";
		li.setAttribute("value",teaData[i].TeaId+","+teaData[i].TeaName+","+teaData[i].TeaPrice);
		listWrap.appendChild(li);
	}
	sellist.classList.add("active");
	mask.classList.add("active");
})
// 选纸巾
napkinWrap.addEventListener("touchend",function(){
	listWrap.innerHTML = null;
	whatSel = false;
	isOpenSel = true;
	for (var i = 0; i < napkinData.length; i++) {
		var li = document.createElement("li");
		li.innerText = napkinData[i].NapkinName+"  "+napkinData[i].NapkinPrice+"元/人";
		li.setAttribute("value",napkinData[i].NapkinId+","+napkinData[i].NapkinName+","+napkinData[i].NapkinPrice);
		listWrap.appendChild(li);
	}
	sellist.classList.add("active");
	mask.classList.add("active");
})

// 选择列表事件委托
listWrap.addEventListener("touchend",function(){
	var target = event.target || event.srcElement;
	if (target.nodeName.toLowerCase()=="li") {
		var mes = target.getAttribute("value").split(",");
		if (whatSel) {
			teaWrap.getElementsByTagName("span")[1].getElementsByTagName("i")[0].innerText = mes[1];
			teaWrap.setAttribute("value",mes);
			teaPrice.innerHTML = mes[2];
			teaSum.innerHTML = parseInt(mes[2])*parseInt(rs.innerText);
		} else {
			napkinWrap.getElementsByTagName("span")[1].getElementsByTagName("i")[0].innerText = mes[1];
			napkinWrap.setAttribute("value",mes);
			napkinPrice.innerHTML = mes[2];
			napkinSum.innerHTML = parseInt(mes[2])*parseInt(zs.innerText);
		}	
		tablePriceSum();
	}
	sellist.classList.remove("active");
	mask.classList.remove("active");
	isOpenSel = false;
})

// 取消开台
goBack.addEventListener("touchend",function(){
	openTableBox.classList.remove("active");
})

// 确认开台
goOpen.addEventListener("touchend",function(){
	// 保存开台数据
	openMes[0] = rs.innerText; // 人数
	openMes[1] = teaWrap.getAttribute("value").split(",")[0]; // 茶ID
	openMes[2] = zs.innerText; // 纸巾数
	openMes[3] = teaWrap.getAttribute("value").split(",")[0]; // 纸巾ID
	openMes[4] = tablePrice.innerText; // 开台价格
	openMes[5] = tableHao.innerText; // 台号
	openMes[6] = tableHao.innerText; // 台号ID

	tableNum.innerText = "台号："+openMes[5];
	peoNum.innerText = "人数："+openMes[0];
	total.innerText = "订单总额："+openMes[4];

	localStorage.setItem("isOpen",true); // 设置本地开台状态为已开台
	isOpen == "true" ? isOpen = true : isOpen = false; // 转换成布尔值
	isSelTable = true; // 状态改为已选台桌
	createClassList();
	tip("开台成功");
	openTableBox.classList.remove("active");
	// 
	tipArr[tipArr.length] = openMes[5];
	mess.innerHTML = tipArr.join(" > ");
})
// #######################################################################
// 打开页面时接受数据保存后首先生成台号表
if (isOpen) {
	createClassList();
} else {
	createTableList(); // 进页面首先生成台号列表
}
// #######################################################################
function whenCheckTable(target,fun,data){
	// ajax({
	// 	url: "./TestXHR.aspx",              //请求地址
	// 	type: "POST",                       //请求方式
	// 	data: { name: "super", age: 20 },        //请求参数
	// 	dataType: "json",
	// 	success: function (response, xml) {
	// 		// 此处放成功后执行的代码
	// 	},
	// 	fail: function (status) {
	// 		// 此处放失败后执行的代码
	// 	}
	// })
	// 
	if (target.getAttribute("value").split(",")[1] == 1) { // 新开台点餐
		// 台状态可能要先查下服务器上的数据。。。
		loading.addfun("正在查询该台状态...");
		setTimeout(function(){
			loading.removefun();
			orderType = 0;
			openMes[6] = target.getAttribute("value").split(",")[0]; // 保存台ID
			beforeOpen(target.innerHTML.split("<br>")[0]); // 传入台号进行开台
			openTableBox.classList.add("active");
		},500)	
	} else { // 使用中的台生成加菜单
		localStorage.setItem("isOpen",true); // 设置本地开台状态为已开台
		isOpen == "true" ? isOpen = true : isOpen = false; // 转换成布尔值
		isSelTable = true;
		isOrdered = true;
		tipArr[tipArr.length] = target.innerHTML.split("<br>")[0];
		tableNum.innerHTML = "台号："+target.innerHTML.split("<br>")[0];
		orderType = 1;
		// openMes[4] = 0; // 加菜时默认零元
		openMes[6] = orderedData[0]; // 保存台ID
		loading.addfun("正在对该台进行加菜...");
		setTimeout(function(){
			loading.removefun();
			fun();
			// 生成当前台的订单
			writeOrdered();
		},500)
	}
	tip("这里放查询台桌号最新状态函数")
}
function whenSubmitOrder(){
	tip("这里放提交订单时的函数")
}

// 已开台的生成已点订单
var isOrdered = false; // 是否已开台状态
function writeOrdered(){
	var orderedLen = orderedData[2].length;
	var theOrder = new Array();
	for (var i = 0; i < orderedLen; i++) {
		var li = document.createElement("li");
		var p = document.createElement("p");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");
		var span3 = document.createElement("span");
		// 添加样式
		p.classList.add("text");
		span1.classList.add("foodSun");
		span2.classList.add("orderedButton");
		// 输入显示信息
		p.innerText = orderedData[2][i].MenuName+"_"+orderedData[2][i].MenuTasteName;
		span1.innerText = orderedData[2][i].Count;
		span2.innerText = "已点";
		// 添加节点
		li.appendChild(p);
		li.appendChild(span1);
		li.appendChild(span2);
		orderList.appendChild(li);
	}
	// 设置开台数据
	openMes[0] = 0; // 人数
	openMes[1] = 0; // 茶ID
	openMes[2] = 0; // 纸巾数
	openMes[3] = 0; // 纸巾ID
	openMes[4] = 0; // 开台价格
	openMes[5] = tableHao.innerText; // 台号
	openMes[6] = orderedData[0]; // 台号ID

	peoNum.innerText = "人数："+openMes[0];
	total.innerText = "加菜订单总额："+openMes[4];
	// 生成数据
	submitOrderJson = {
		orderType: orderType,
		orderCode: orderedData[1], // 订单号
		tableCode: orderedData[0], // 台号ID
		order: null // 订单, 这是一个数组, 数组长度就是菜式数量, 数组每一位都是一个 json 格式数据, 按顺序包括 ID 名称 价格 口味ID 口味价格 数量
	};
}

var orderedData = [
	"10",
	"FS201701171628141424",
	[
		{
			"MealId":"17",
			"Count":"1",
			"MenuId":"0",
			"MenuTasteId":"",
			"MenuTasteName":"",
			"MenuName":"\u751f\u65e5\u5957\u9910"
		},
		{"MealId":"0","Count":"1","MenuId":"132","MenuTasteId":"","MenuTasteName":"","MenuName":"\u51b0\u9547\u79cb\u8475"},
		{"MealId":"0","Count":"1","MenuId":"131","MenuTasteId":"","MenuTasteName":"","MenuName":"\u51c9\u62cc\u8c46\u8150"},
		{"MealId":"0","Count":"1","MenuId":"128","MenuTasteId":"","MenuTasteName":"","MenuName":"\u51c9\u62cc\u76ae\u86cb"},
		{"MealId":"0","Count":"1","MenuId":"122","MenuTasteId":"","MenuTasteName":"","MenuName":"\u7ea2\u888d\u9738\u738b\u87f9"},
		{"MealId":"0","Count":"1","MenuId":"124","MenuTasteId":"53","MenuTasteName":"\u52a0\u70ed","MenuName":"\u7edd\u5473\u62ff\u624b"
		}
	]
];