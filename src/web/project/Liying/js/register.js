'use strict';
var mask = document.getElementById("mask");

var selectType = null; // 选择列表类型 目前有 school grade
// 选择学校
var selectSchool = document.getElementById("selectSchool");
tap(selectSchool,function(){
	selectType = "school";
	createList(10);
	mask.classList.add("active");
	selectWrap.classList.add("active");
})

// 选择服务类型
var selectGrade = document.getElementById("selectGrade");
tap(selectGrade,function(){
	selectType = "grade";
	createList(4);
	mask.classList.add("active");
	selectWrap.classList.add("active");
})

// 选择列表事件委托
var selectWrap = document.getElementById("selectWrap");
tap(selectWrap,function(){
	var target = event.target || event.srcElement;
	if (target.id == "selectWrap") {
		selectWrap.classList.remove("active");
		mask.classList.remove("active");
	} else if (target.nodeName.toLowerCase() == "li") {
		switch(selectType){
			case "school": school(); break;
			case "grade": grade(); break;
		}
		selectWrap.classList.remove("active");
		mask.classList.remove("active");
	}
	function school(){ // 当选择的是学校时
		selectSchool.setAttribute("value",target.innerText); // 把选择的内容保存到节点中
		selectSchool.childNodes[5].innerText = target.innerText;
	}
	function grade(){ // 当选择的是服务类型时
		selectGrade.setAttribute("value",target.innerText); // 把选择的内容保存到节点中
		selectGrade.childNodes[5].innerText = target.innerText;
	}
})

// 测试用模拟生成列表
var selscter = document.getElementById("selscter");
function createList(num){
	var text = null;
	selscter.innerHTML = null;
	for (var i = 0; i < num; i++) {
		var li = document.createElement("li");
		selectType == "school" ? text = "某某某学校" : text = "年级";
		li.innerText = text+(i+1)+"号";
		selscter.appendChild(li);
	};
}

// 上传图片部分
var pictureButton = document.getElementById("pictureButton");
var picture = document.getElementById("picture");
pictureButton.addEventListener("change", function(){
	var files = this.files;
	console.log(files)
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var imageType = /^image\//;
		if ( !imageType.test(file.type) ) {
			tip("请选择图片文件");
			continue;
		}
		var reader = new FileReader();
		reader.addEventListener("load",function(event){
			picture.src = event.target.result; // 把 input 获得本地图片路径写入 img 标签中
		})
		reader.readAsDataURL(file);
	}
})

// 获取验证码
var time = 60;
var phoneNum = document.getElementById("phoneNum");	
var getCode = document.getElementById("getCode");	
function settime(obj) {
	if (time == 0) {
		obj.innerHTML = "重新获取验证码";
		obj.setAttribute("value",true); 
		time = 60;
	} else { 
		obj.innerHTML = "重新发送 " + time; 
		time--;
		var timer = setTimeout(function() {
			settime(obj);
		},1000);
	}     
}
tap(getCode,function(){
	if (getCode.getAttribute("value") == "true" && phoneNum.value != "") {
		getCode.setAttribute("value",false);
		settime(getCode);
	} else {
		tip("请输入手机号");
	}
})