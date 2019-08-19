'use strict';
var mask = document.getElementById("mask");

var selectType = null; // 选择列表类型 目前有 school server wuliu zhongliang shijian
// 选择学校
var selectSchool = document.getElementById("selectSchool");
tap(selectSchool,function(){
	selectType = "school";
	createList(10);
	mask.classList.add("active");
	selectWrap.classList.add("active");
})

// 选择服务类型
var selectServer = document.getElementById("selectServer");
tap(selectServer,function(){
	selectType = "server";
	createList(4);
	mask.classList.add("active");
	selectWrap.classList.add("active");
})

// 详细点击清除内容
var task = document.getElementById("task");
task.addEventListener("focus",function(){
	if (this.value == "要求与详细...") this.value = "";
})
task.addEventListener("blur",function(){
	if (this.value == "") this.value = "要求与详细...";
})

// 选择物流
var other1 = document.getElementById("other1");
tap(other1,function(){
	selectType = "wuliu";
	createList(6);
	mask.classList.add("active");
	selectWrap.classList.add("active");
})

// 选择重量
var other2 = document.getElementById("other2");
tap(other2,function(){
	selectType = "zhongliang";
	createList(4);
	mask.classList.add("active");
	selectWrap.classList.add("active");
})

// 选择完成时间
var selectTime = document.getElementById("selectTime");
tap(selectTime,function(){
	mask.classList.add("active");
	timeSelecter.classList.add("active");
})

// 选择完成时间期限
var timeWrap = document.getElementById("timeWrap");
var ima = document.getElementById("ima");
var ashita = document.getElementById("ashita");
var timerText = document.getElementById("timerText");
var timer = document.getElementById("timer");
var whatDay = true; // 默认今天 false为明天
var whatTime = "08:00"; // 默认08:00
timer.addEventListener("change",function(){
	whatTime = this.value;
	if (whatDay) {
		timerText.innerText = "有效期至 今天 "+whatTime+" 前";
	} else {
		timerText.innerText = "有效期至 明天 "+whatTime+" 前";
	}
})
tap(ima,function(){
	whatDay = true;
	timerText.innerText = "有效期至 今天 "+whatTime+" 前";
	ima.classList.add("active");
	ashita.classList.remove("active");
})
tap(ashita,function(){
	whatDay = false;
	timerText.innerText = "有效期至 明天 "+whatTime+" 前";
	ashita.classList.add("active");
	ima.classList.remove("active");
})

// 时间选择面板确定取消操作
var timeSelecter = document.getElementById("timeSelecter");
var timeCel = document.getElementById("timeCel");
var timeCom = document.getElementById("timeCom");
timeSelecter.addEventListener("touchend",function(){
	var target = event.target || event.srcElement;
	if (target.id == "timeSelecter" || target.id == "timeCel") {
		mask.classList.remove("active");
		timeSelecter.classList.remove("active");
	} else if (target.id == "timeCom") { // 点确定按钮时
		if (whatDay) {
			selectTime.childNodes[5].innerText = "今天 "+whatTime+" 前";
			selectTime.setAttribute("value",whatWeek()+whatTime+"前");
		} else {
			selectTime.childNodes[5].innerText = "明天 "+whatTime+" 前";
			selectTime.setAttribute("value",whatWeek("Hello")+whatTime+"前");
		}	
		mask.classList.remove("active");
		timeSelecter.classList.remove("active");
	}
	// 显示今明天是周几写入标签 value
	function whatWeek(whenChange){
		// whenChange 有 true 跟 false 两个值
		var week = new Date().getDay();
		var str = null;
		whenChange == undefined ? whenChange = false : whenChange = true;
		whenChange ? week = week + 1 : null;
		week > 6 ? week = 0 : null;
		switch(week){
			case 0: str = "周日"; break; 
			case 1: str = "周一"; break; 
			case 2: str = "周二"; break; 
			case 3: str = "周三"; break; 
			case 4: str = "周四"; break; 
			case 5: str = "周五"; break; 
			case 6: str = "周六"; break; 
		}
		return str;
	}
})


// 指定性别 1男 2女 3男女
var selSex = document.getElementById("selSex");
var selfemale = document.getElementById("selfemale");
var selmale = document.getElementById("selmale");
var isfemale = true;// 记录当前选择
var ismale = true;// 记录当前选择
tap(selfemale,function(){
	var isSel = selfemale.getAttribute("value");
	if (isSel == "1") {
		if (!ismale) {
			tip("至少得选一个啊")
		} else {
			selfemale.childNodes[0].setAttribute("class","weui-icon-circle");
			selfemale.setAttribute("value",0);
			isfemale = false;
		}	
	} else {
		selfemale.childNodes[0].setAttribute("class","weui-icon-success");
		selfemale.setAttribute("value",1);
		isfemale = true;
	}
	isSex();
})
tap(selmale,function(){
	var isSel = selmale.getAttribute("value");
	if (isSel == "1") {
		if (!isfemale) {
			tip("至少得选一个啊")
		} else {
			selmale.childNodes[0].setAttribute("class","weui-icon-circle");
			selmale.setAttribute("value",0);
			ismale = false;
		}
	} else {
		selmale.childNodes[0].setAttribute("class","weui-icon-success");
		selmale.setAttribute("value",1);
		ismale = true;
	}
	isSex();
})
function isSex(){
	if (isfemale && ismale) {
		selSex.setAttribute("value",3);
	} else if (isfemale && !ismale) {
		selSex.setAttribute("value",2);
	} else if (!isfemale && ismale) {
		selSex.setAttribute("value",1);
	} else if (!isfemale && !ismale) {

	}
}

// 选择失效时间
var selectInvalid = document.getElementById("selectInvalid");
tap(selectInvalid,function(){
	selectType = "shijian";
	createList(4);
	mask.classList.add("active");
	selectWrap.classList.add("active");
})

// 选择额外有偿服务, 价格写在自订属性 price 内
var selectSabisi = document.getElementById("selectSabisi");
var sabisi1 = document.getElementById("sabisi1");
var sabisi2 = document.getElementById("sabisi2");
tap(selectSabisi,function(){
	var target = event.target || event.srcElement;
	if (target.getAttribute("value") == "0") {
		target.classList.add("active");
		target.setAttribute("value","1");
	} else {
		target.classList.remove("active");
		target.setAttribute("value","0");
	}
})

// 选择列表事件委托
var selectWrap = document.getElementById("selectWrap");
var noDisplayList = document.getElementById("noDisplayList");
var selectOther = document.getElementById("selectOther");
var selectSabisi = document.getElementById("selectSabisi");
tap(selectWrap,function(){
	var target = event.target || event.srcElement;
	if (target.id == "selectWrap") {
		// 关闭该面板
		selectWrap.classList.remove("active");
		mask.classList.remove("active");
	} else if (target.nodeName.toLowerCase() == "li") {
		switch(selectType){
			case "school": school(); break;
			case "server": server(); break;
			case "wuliu": wuliu(); break;
			case "zhongliang": zhongliang(); break;
			case "shijian": shijian(); break;
		}
		selectWrap.classList.remove("active");
		mask.classList.remove("active");
	}
	function school(){ // 当选择的是学校时
		selectSchool.setAttribute("value",target.innerText); // 把选择的内容保存到节点中
		selectSchool.querySelector(".right-span").innerText = target.innerText;
	}
	function server(){ // 当选择的是服务类型时
		selectServer.setAttribute("value",target.innerText);
		selectServer.querySelector(".right-span").innerText = target.innerText;
		// 判断服务的类型
		if (target.innerText.indexOf("快递") > 0) {
			selectOther.style.display = "block";
			selectSabisi.style.display = "block";
		} else {
			selectOther.style.display = "none";
			selectSabisi.style.display = "none";
		}
		noDisplayList.style.display = "block";
	}
	function wuliu(){ // 当选择的是物流时
		var icon = document.createElement("i");
		icon.classList.add("right-icon");
		other1.setAttribute("value",target.innerText);
		other1.innerText = target.innerText;
		other1.appendChild(icon);
		// 
	}
	function zhongliang(){ // 当选择的是重量时
		var icon = document.createElement("i");
		icon.classList.add("right-icon");
		other2.setAttribute("value",target.innerText);
		other2.innerText = target.innerText;
		
		// 选择了重量之后改变额外服务价格
		switch(target.innerText){
			case "1kg": {
				sabisi1.innerText = "送上楼+"+5+"元";
				sabisi1.setAttribute("price",5);
			}
			break;
			case "2kg": {
				sabisi1.innerText = "送上楼+"+10+"元";
				sabisi1.setAttribute("price",10);
			}
			break;
			case "3kg": {
				sabisi1.innerText = "送上楼+"+20+"元";
				sabisi1.setAttribute("price",20);
			}
			break;
			case "4kg": {
				sabisi1.innerText = "送上楼+"+40+"元";
				sabisi1.setAttribute("price",40);
			}
			break;
		}
		other2.appendChild(icon);
	}
	function shijian(){ // 当选择的是失效时间时
		var whatHour = target.innerText.split("")[0];
		selectInvalid.setAttribute("value",whatHour);
		selectInvalid.querySelector(".right-span").innerText = whatHour+"小时后自动取消订单";
	}
})

// 测试用模拟生成列表
var selscter = document.getElementById("selscter");
function createList(num){
	var text = null;
	selscter.innerHTML = null;
	for (var i = 0; i < num; i++) {
		var li = document.createElement("li");
		switch(selectType){
			case "school": text = "某学校"+(i+1)+"号";
			break;
			case "server": text = "取快递"+(i+1)+"号";
			break;
			case "wuliu": text = "物流"+(i+1);
			break;
			case "zhongliang": text = (i+1)+"kg";
			break;
			case "shijian": text =  (i+1)+"小时";
			break;
		}
		li.innerText = text;
		selscter.appendChild(li);
	}
}

// 同意或不同意协议
var checkBox = document.getElementById("checkBox");
tap(checkBox,function(){
	if (checkBox.getAttribute("value")=="1") {
		checkBox.setAttribute("class","weui-icon-circle");
		checkBox.setAttribute("value","0");
	} else {
		checkBox.setAttribute("class","weui-icon-success");
		checkBox.setAttribute("value","1");
	}
})

// 收集数据用
var pageData = {
	peopleName: null, // 姓名
	phoneNumber: null, // 手机号码
	schoolName: null, // 学校名称
	address: null, // 详细地址
	serverType: null, // 服务类型
	task: null, // 任务详细
	expressName: null, // 快递名称
	weight: null, // 快递重量
	otherPrice: null, // 附加费用总和
	vaildTime: null, // 有限时限
	tipPrice: null, // 服务费用
	sex: null, // 指定性别
	invaildTime: null // 自动失效时间
};

var peopleName = document.getElementById("peopleName");
var phoneNumber = document.getElementById("phoneNumber");
var address = document.getElementById("address");
var tipPrice = document.getElementById("tipPrice");
function getData(){
	pageData.peopleName = peopleName.value;
	pageData.phoneNumber = phoneNumber.value;
	pageData.schoolName = selectSchool.getAttribute("value");
	pageData.address = address.value;
	pageData.serverType = selectServer.getAttribute("value");
	pageData.task = task.value;
	pageData.expressName = other1.getAttribute("value");
	pageData.weight = other2.getAttribute("value");
	pageData.vaildTime = selectTime.getAttribute("value");
	pageData.tipPrice = tipPrice.value;
	pageData.sex = selSex.getAttribute("value");
	pageData.invaildTime = selectInvalid.getAttribute("value");

	var p1 = sabisi1.getAttribute("value");
	var p2 = sabisi2.getAttribute("value");
	if (p1 == "1" && p2 == "0") {
		pageData.otherPrice = sabisi1.getAttribute("price");
	} else if (p1 == "0" && p2 == "1") {
		pageData.otherPrice = sabisi2.getAttribute("price");
	}  else if (p1 == "1" && p2 == "1") {
		pageData.otherPrice = parseInt(sabisi1.getAttribute("price"))+parseInt(sabisi2.getAttribute("price"));
	} else if (p1 == "0" && p2 == "0") {
		pageData.otherPrice = 0;
	}
}

// 支付
var payButton = document.getElementById("payButton");
var showMoney = document.getElementById("showMoney");
payButton.addEventListener("touchend",function(){
	getData();
	console.log(pageData);
	// warns(createDom("warn","余额不足无法支付"),function(){
	// 	showMoney.innerText = "待支付:"+0+"元";
	// });
	// warns(createDom("success","支付成功"),function(){
	// 	showMoney.innerText = "待支付: "+0+" 元";
	// });
})