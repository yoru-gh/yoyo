$(function(){
	mui.init({
		swipeBack: false,
		pullRefresh: {
			container: "#refreshContainer",
			// 下拉刷新部分
			down: {
				height: 50, //可选,默认50.触发下拉刷新拖动距离,
				auto: false, //可选,默认false,true为自动下拉刷新一次
				contentdown : "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				contentover : "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				contentrefresh : "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
				callback : function(){
//					mui.toast("...")
//					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
				} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			},
			// 上拉加载部分
			up: {
				height: 50, //可选.默认50.触发上拉加载拖动距离
				auto: false, //可选,默认false,true为自动上拉加载一次
				contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
				callback : function(){
					// 加载完新数据后，必须执行如下代码，true表示没有更多数据了,若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
//					this.endPullupToRefresh(true);
					mui.toast("...")
	//				$("#list").append('<li class="male"><div class="imgbox"><img src="../public/img/tou.jpg" /></div></li>');
				} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			}
		}
	});
	
	// 查看导游详细
	mui("#list").on("tap", ".imgbox,p", function(){
		mui.openWindow({
			id: 'guide.html',
		    url: 'guide.html',
		    styles: {
				top: '0px',
				bottom: '0px',
				bounce: 'vertical',
				hardwareAccelerated: true
			},
		    extras:{
		      //自定义扩展参数，可以用来处理页面间传值
		    },
		    createNew: false, 
		    show:{ autoShow: true, aniShow: 'zoom-fade-out', duration: 200 },
		    waiting:{ autoShow: true }
		});
	});
	
	// 直接呼叫导游
	mui("#list").on("tap", ".callbtn", function(){
		mui.toast("不能呼叫")
	});
})
