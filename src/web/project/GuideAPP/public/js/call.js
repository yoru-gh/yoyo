mui.init({
	swipeBack: false,
	subpages:[{
		id: "callWarpper.html",
		url: "callWarpper.html",
		styles: {
			top: '77px',
			bottom: '0px',
			hardwareAccelerated: true
		}
	}]
});
$(function(){
	
	var searchbtn = document.getElementById("searchbtn");
	
	// 搜索那妞点击事件
	searchbtn.addEventListener("tap", function(){
		mui.toast("别点")
	});
	
	// 分类点击事件
	mui("#classify").on("tap", "li", function(){
		$(this).addClass('taped').siblings('li').removeClass('taped');
		mui.toast("没刷新")
	});
	
})
