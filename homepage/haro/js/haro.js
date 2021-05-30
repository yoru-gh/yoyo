'use strict';
// var user = document.getElementById("user");
// user.touch((event) => {
// 	var cer = cookies.get("CER");
// 	if (cer) {
// 		window.location.href = URLstr+"user?"+cer;
// 	} else {
// 		tip.toast("请先登录")
// 	}
// });

var listData = {
	list: [
		{
			url: 'log.html',
			title: 'LOGIN',
			tip: 'MongoDB 登录测试',
			show: false
		},{
			url: 'reg.html',
			title: 'REGISTER',
			tip: 'MongoDB 注册测试',
			show: false
		},{
			url: 'user.html',
			title: 'USER',
			tip: '个人中心，JADE 模板引擎生成测试',
			show: false
		},{
			url: 'responsive.html',
			title: 'RESPONSIVE',
			tip: '基于 vw vh rem 的手机网页模型',
			show: true
		},{
			url: 'slide.html',
			title: 'SLIDE / BANNER',
			tip: '划动型焦点图',
			show: true
		},{
			url: 'preload.html',
			title: 'PRELOAD',
			tip: '列表预加载',
			show: true
		},{
			url: 'refresh.html',
			title: 'DROP TO REFRESH',
			tip: '下拉刷新，目前适用范围比较小',
			show: false
		},{
			url: 'select.html',
			title: 'SELECTOR',
			tip: '列表选择器/不会引起背景层滚动的弹出框',
			show: true
		},{
			url: 'tips.html',
			title: 'TIPS',
			tip: '各种提示组件',
			show: true
		},{
			url: 'switch.html',
			title: 'SWITCH',
			tip: '各种开关，纯CSS',
			show: true
		},{
			url: 'parabola.html',
			title: 'PARABOLA',
			tip: '抛物线运动动画，用于加购物车、收藏',
			show: true
		},{
			url: 'load.html',
			title: 'LODING',
			tip: '等待动画，加载动画',
			show: true
		},{
			url: 'parallax.html',
			title: 'PARALLAX',
			tip: '滚动视差, Android 系统下体验较好',
			show: true
		},{
			url: 'wave.html',
			title: 'WAVE',
			tip: '纯CSS波浪',
			show: true
		},{
			url: 'icon.html',
			title: 'ICON',
			tip: 'SVG sprite 矢量图标，最后更新日期 2018/05/16',
			show: true
		},
	]
};

var Haro = new Vue({
	el: '#toolList',
	name: 'Haro',
	data: listData,
	methods: {}
})