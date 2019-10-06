'use strict';
// 详细点击清除内容
var task = document.getElementById("task");
task.addEventListener("focus",function(){
	if (this.value == "要求与详细...") this.value = "";
})
task.addEventListener("blur",function(){
	if (this.value == "") this.value = "要求与详细...";
})

// 上传图片部分
var picWrap = document.getElementById("picWrap");
tap(picWrap,function(){
	var target = event.target || event.srcElement;
	if (target.nodeName.toLowerCase() == "input") {
		target.addEventListener("change",function(){
			var files = target.files;
			var img = target.parentNode.children[1];
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var imageType = /^image\//;
				if ( !imageType.test(file.type) ) {
					tip("请选择图片文件");
					continue;
				}
				var reader = new FileReader();
				reader.addEventListener("load",function(event){
					// 把 input 获得本地图片路径写入 img 标签中
					img.src = event.target.result;
				})
				reader.readAsDataURL(file);
			}
		})
	}
})

// 选择列表事件委托
var selectWrap = document.getElementById("selectWrap");
tap(selectWrap,function(){
	var target = event.target || event.srcElement;
	if (target.id == "selectWrap") {
		// 关闭该面板
		selectWrap.classList.remove("active");
		mask.classList.remove("active");
	} else if (target.nodeName.toLowerCase() == "li") {
		selectType.children[2].innerText = target.innerText;
		selectType.setAttribute("value",target.innerText);
		selectWrap.classList.remove("active");
		mask.classList.remove("active");
	}
})
var selscter = document.getElementById("selscter");
function createList(num){
	selscter.innerHTML = null;
	for (var i = 0; i < num; i++) {
		var li = document.createElement("li");
		li.innerText = "type "+i;
		selscter.appendChild(li);
	}
}
// 打开选择列表操作
var selectType = document.getElementById("selectType");
tap(selectType,function(){
	createList(10);
	selectWrap.classList.add("active");
	mask.classList.add("active");
})