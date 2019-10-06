
// hideTime为消息框自动消失的时间
// txt为消息款的内容
// 请在加载JQuery.js文件后加载此文件使用
// 调用方法:
// $('.button').click(function(){
// 	tip(3000,"Hello");
// }); 

function tipShow(hideTime,txt){
	//获取鼠标当前位置，此方法若放在post里需要重新在post外获取鼠标坐标转换成top和left的参数
	var e = e || window.event;
	var mouseX = e.clientX; 
	var mouseY = e.clientY;
	// console.log(mouseX,mouseY);
	$('.tipBox').remove();
	// 定义盒子
	var boxDom = "<div class='tipBox' style='display:none;'>"+txt+"</div>";
	// 页面生成盒子
	$('body').append(boxDom);
	//为盒子添加CSS
	$('.tipBox').css({
		// 此处可以写更多的CSS属性，Json格式
		"z-index": "9999", // 让盒子保持在窗口最上层
		padding: "10px 12px 10px 40px", // 消息框的左右内边距
		height: height, // 消息框高度
		width: width, // 消息框宽度
		position: "fixed",
		top: '47%', // 相对于页面可视范围内顶部距离，默认0
		bottom: bottom, // 相对于页面可视范围内底部距离，默认0
		left: '47%', // 相对于页面可视范围内左边距离，默认0
		right: right, // 相对于页面可视范围内右边距离，默认0
		backgroundColor: "rgba(255,255,255,1)", // 盒子背景颜色
		backgroundImage: "url(../../public/img/gou.png)", // 盒子背景图片
		backgroundPosition: "12px center", // 盒子背景图片位置
		backgroundRepeat: "no-repeat", // 盒子背景图片填充方式
		"background-size": "24px", // 盒子背景图片尺寸
		border: "1px #fff solid", // 盒子边框
		"border-radius": "4px", // 盒子CSS3圆角
		"box-shadow": "0px 0px 20px rgba(0,0,0,0.4)", // 盒子CSS3阴影
		lineHeight: "1em", // 盒子内文本行高
		textAlign: "center", // 盒子内文本居中
		'margin-left': margin, //当要让盒子水平垂直都居中时
	});
	$('.tipBox').fadeIn(300);  // 盒子淡入速度
	// 盒子淡出速度
	$('.tipBox').delay(hideTime).fadeOut(300,function(){
		$(this).remove(); //移除盒子
	});
};

function tip(hideTime,txt){
    $('#tipBox').remove();
    // 定义盒子
    var boxDom = "<div id='tipBox' style='display:none;'>"+txt+"</div>";
    // 页面生成盒子
    $('body').append(boxDom);
    var aas = - ($("#tipBox").outerWidth()+42) / 2;
    //为盒子添加CSS
    $('#tipBox').css({
        // 此处可以写更多的CSS属性，Json格式
        "z-index": "99999", // 让盒子保持在窗口最上层
        'padding': "10px 12px 10px 40px", // 消息框的左右内边距
        'position': "fixed",
        'top': '45%', // 相对于页面可视范围内顶部距离，默认0
        'left': '50%', // 相对于页面可视范围内左边距离，默认0
        'margin-left': aas, // 水平居中
        'background-color': "rgba(255,255,255,.8)", // 盒子背景颜色
        'background-image': "url(../public/img/gou.png)", // 盒子背景图片
        'background-position': "12px center", // 盒子背景图片位置
        'background-repeat': "no-repeat", // 盒子背景图片填充方式
        "background-size": "24px", // 盒子背景图片尺寸
        'border': "1px #fff solid", // 盒子边框
        "border-radius": "4px", // 盒子CSS3圆角
        "box-shadow": "0px 0px 16px rgba(0,0,0,0.3)", // 盒子CSS3阴影
        'line-height': "1em", // 盒子内文本行高
        'text-align': "center", // 盒子内文本居中
    });
    $('#tipBox').fadeIn(200);  // 盒子淡入速度
    // 盒子淡出速度
    $('#tipBox').delay(hideTime).fadeOut(200,function(){
        $(this).remove(); //移除盒子
    });
};