mui.init({
	swipeBack: false,
//	statusBarBackground: '#f7f7f7',
	gestureConfig: {
		doubletap: true
	}
});

$(function(){
	var bodyWidth = document.documentElement.clientWidth, // window.innerWidth
		bodyHeight = document.documentElement.clientHeight,
		$videoBox = $("#videoBox"),
		video = $("#myvideo")[0], // $video = $("#myvideo").get(0)
		$video = $("#myvideo"),
		$play = $("#playbtn"),
		$pause = $("#pausebtn");		
		videoW = bodyWidth,
		videoH = 9*bodyWidth/16; // 视频保持16:9
		dspeed = .6, // 底部菜单运动时间
		moreVal = true, // header菜单键动画判断值
		menuVal = true; // footer菜单键动画判断值
	
	// 控制视频宽高比为16:9
	$videoBox.css({width: videoW,height: videoH});
	$video.css({width: videoW,height: videoH});
	$play.css({width: videoW,height: videoH});

	// 播放视频
	$play.click(function(){
		var a = new TimelineMax({}).to($play, .1, { opacity: 0 }, 0);
		var b = new TimelineMax({}).to($pause, .1, { opacity: 1 }, 0);
		video.play();
	});
	// 暂停视频
	$pause.click(function(){
		var a = new TimelineMax({}).to($pause, .1, { opacity: 0 }, 0);
		var b = new TimelineMax({}).to($play, .1, { opacity: .7 }, 0);
		video.pause();
	});
	// 监听播放结束
	video.addEventListener("ended", function(){
		var a = new TimelineMax({}).to($pause, .1, { opacity: 0 }, 0);
		var b = new TimelineMax({}).to($play, .1, { opacity: .7 }, 0);
	});
})
