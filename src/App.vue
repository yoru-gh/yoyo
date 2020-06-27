<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="less">
	@import './assets/less/main.less';
</style>

<script>
!(function() {
	let lastTime = 0;
	let vendors = ['webkit', 'moz'];
	for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		// name has changed in Webkit
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	// 兼容处理
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
            console.log(element)
			let currTime = new Date().getTime();
			// 一般显示器刷新率为每秒60次(60Hz) 1000/60≈16.67
			let timeToCall = Math.max(0, 16.67 - (currTime - lastTime));
			let id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		}
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		}
	}
}())
</script>