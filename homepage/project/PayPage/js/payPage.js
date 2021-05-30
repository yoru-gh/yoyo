'use strict';
var keyboxMask = document.getElementById("keyboxMask"); // 透明遮罩层
var keyBoxHeight = document.getElementById("keybox").clientHeight; // 获取键盘高度
var keybox = document.getElementById("keybox");
var tranVal = keyBoxHeight;

// 输入金额
var priInput = document.getElementById("priInput");
priInput.addEventListener("touchend",function(){
	this.innerText = " | ";
	onePoint = false;
	priceArr.length = 0;
	showKeyBox();
})

var switchBox = document.getElementById("switchBox");
var switchBoxVal = true;
switchBox.addEventListener("touchend",function(){
	if (switchBoxVal) {
		switchBoxVal = false;
		switchBox.classList.remove('active');
	}else{
		switchBoxVal = true;
		switchBox.classList.add('active');
	}
})

// 最小化键盘
function minKeyBox(){
	keyboxMask.style.display = "none";
	keybox.classList.remove("active");
}
// 显示键盘
function showKeyBox(){
	keyboxMask.style.display = "block";
	keybox.classList.add("active");
}

// 点击遮罩层关闭键盘
keyboxMask.addEventListener("touchend",function(){
	priInput.innerText = "￥ 0.00";
	minKeyBox();
	tipSpan.style.display = "none";
})

// 键盘操作
var priceArr = new Array(); // 储存金额输入值数组
var keyList = document.getElementById("keyList");
keyList.addEventListener("touchend",function(event){
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
		case ".": numShow("."); break;
		case "回退": funcBack(); break;
		case "确定": funcComplete(); break;
	}
})

var tipSpan = document.getElementById("tipSpan");
var onePoint = false; // 控制只能输入一次 "."
function numShow(num){
	if(!onePoint && num == ".") {
		onePoint = true;
		priceArr[priceArr.length] = num;
		priInput.innerText = "￥ "+priceArr.join("");
	} else if (onePoint && num == ".") {
		tipSpan.style.display = "block";
	} else {
		tipSpan.style.display = "none";
		priceArr[priceArr.length] = num;
		priInput.innerText = "￥ "+priceArr.join("");
	}
}
// 回退操作
function funcBack(){
	tipSpan.style.display = "none";
	priceArr.pop();
	priceArr.indexOf(".") < 0 ? onePoint = false : null;
	priInput.innerText = "￥ "+priceArr.join("");
}
// 确定操作
function funcComplete(){
	if (priceArr.indexOf(".") == 0) {
		priInput.innerText = "￥ 0"+priceArr.join("");
		priInput.setAttribute("value","0"+priceArr.join(""));
	} else if (priceArr.indexOf(".") == priceArr.length-1) {
		priceArr.pop();
		priInput.innerText = "￥ "+priceArr.join("");
		priInput.setAttribute("value",priceArr.join(""));
	} else {
		priInput.innerText = "￥ "+priceArr.join("");
		priInput.setAttribute("value",priceArr.join(""));
	}
	minKeyBox();
	tipSpan.style.display = "none";
}