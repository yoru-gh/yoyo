var ws = null;
var scan = null, domready = false;
var scanpic = document.getElementById("scanpic");
// H5 plus事件处理
function plusReady(){
	if(ws||!window.plus||!domready){
		return;
	}
	// 获取窗口对象
	ws=plus.webview.currentWebview();
	// 开始扫描
	ws.addEventListener('show',function(){
		scan = new plus.barcode.Barcode('bcid');
	    scan.onmarked = onmarked;
	    plus.nativeUI.closeWaiting();
	    scan.start({ conserve: true, filename: "_doc/barcode/" });
	});
	// 显示页面并关闭等待框
    ws.show("pop-in");
    plus.nativeUI.showWaiting();
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready", plusReady, false);
}
// 监听DOMContentLoaded事件
document.addEventListener("DOMContentLoaded", function(){
	domready = true;
	plusReady();
}, false);
// 二维码扫描成功
function onmarked(type,result,file){
    switch(type){
    	case plus.barcode.QR:
    	type = "QR";
    	break;
    	case plus.barcode.EAN13:
    	type = "EAN13";
    	break;
    	case plus.barcode.EAN8:
    	type = "EAN8";
    	break;
    	default:
    	type = "其它"+type;
    	break;
    }
    result = result.replace(/\n/g, ''); // 输出扫描结果
    plus.nativeUI.alert(result);
};
// 从相册中选择二维码图片 
function scanPicture() {
    plus.gallery.pick(function(path){
	    plus.barcode.scan(path, onmarked, function(error){
			plus.nativeUI.alert( "无法识别此图片" );
		});
    },function(err){
        plus.nativeUI.alert("Failed: "+err.message);
    });
};
// 相册获取二维码点击事件
scanpic.addEventListener("tap", function(){
	scanPicture()
});
