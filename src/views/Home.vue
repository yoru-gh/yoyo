<template>
	<div class="main-box">
		<!-- <img alt="Vue logo" src="../assets/logo.png"> -->
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<icon-sprite class="logo" icon-name="logo"/>
	</div>
</template>

<style lang="less">
.main-box {
	.logo {
		display: block;
		width: 20vw;
		height: 20vw;
	}
}
</style>

<script>
import IconSprite from '@/components/SvgSprite.vue'

export default {
	name: 'home',
	components: {
		IconSprite
	}
}
</script>
