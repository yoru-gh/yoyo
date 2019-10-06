// 依赖 JQuery / zepto
// mask显示
function ymaskshow(callback){
	var obj = $('<div id="mask"></div>');
	$("#mask").remove();
	$("body").append(obj);
	setTimeout(function(){
		obj.addClass("maskshow");
	}, 10);
	obj.click(function(){
		obj.removeClass("maskshow");
		setTimeout(function(){
			obj.remove();
			if (callback == undefined) {
				return
			}else{
				callback();
			};
		}, 350);
	});
};

// toast显示
function ytoastshow(mes){
	var obj = $('<div id="ytoast"></div>');
	$("#ytoast").remove();
	$("body").append(obj);
	obj.text(mes);
	setTimeout(function(){
		obj.addClass("ytoastshow");
	}, 10);
	setTimeout(function(){
		obj.remove();
	}, 2500);
};

// alert显示
function yalertshow(mes,callback){
	var objp = $('<div id="yalertbox"></div>');
	var objc = $('<div id="yalert"></div>');
	var objt = $('<p id="alerttext"></p>');
	var objb = $('<span id="alertbtn">确定</span>');
	$("#yalertbox").remove();
	$("body").append(objp);
	objp.append(objc);
	objc.append(objt);
	objc.append(objb);
	objt.text(mes);
	setTimeout(function(){
		objp.addClass("maskshow");
		objc.addClass("yalertshow");
	}, 10);
	objb.click(function(){
		objp.removeClass("maskshow");
		objc.removeClass("yalertshow");
		setTimeout(function(){
			objp.remove();
			if (callback == undefined) {
				return
			}else{
				callback();
			};
		}, 350);
	});
};

// confirm显示
function yconfirmshow(mes,callback){
	var objp = $('<div id="yconfirmbox"></div>');
	var objc = $('<div id="yconfirm"></div>');
	var objt = $('<p id="confirmtext"></p>');
	var objb = $('<span id="confirmclose">取消</span><span id="confirmok">确定</span>');
	$("#yconfirmbox").remove();
	$("body").append(objp);
	objp.append(objc);
	objc.append(objt);
	objc.append(objb);
	objt.text(mes);
	setTimeout(function(){
		objp.addClass("maskshow");
		objc.addClass("yconfirmshow");
	}, 10);
	// 取消按钮
	objp.on("click", "#confirmclose", function(event){
		event.stopPropagation();
		objp.removeClass("maskshow");
		objc.removeClass("yconfirmshow");
		setTimeout(function(){
			objp.remove();
		}, 350);
	});
	// 确定按钮
	objp.on("click", "#confirmok", function(event){
		event.stopPropagation();
		objp.removeClass("maskshow");
		objc.removeClass("yconfirmshow");
		setTimeout(function(){	
			if (callback == undefined) {
				return
			}else{
				callback();
			};
			objp.remove();
		}, 350);
	});
};