<template>
    <div class="haro">
        <p class="title">Haro 组件库</p>
		<p class="title-tow">组件库</p>
		<ul id="toolList">
			<template v-for='item in list'>
				<li v-show="item.show" :key="item.title">
                    <router-link :to="{ path: item.url }">{{ item.title }}<i>{{ item.tip }}</i></router-link>
				</li>
			</template>
		</ul>
		<p class="title">示例</p>
        <router-link class="button" to="/">YOMALL 商城</router-link>
        <router-link class="button" to="/">WALL 照片墙</router-link>
		<span class="copyright"></span>
    </div>
</template>

<style lang="less" scoped>
.haro {
	width: 100vw;
	height: 100vh;
	background-color: #fff;
	text-align: center;
	
	.title {
		padding: 1.6rem 1.4rem 0;
		color: var(--theme-color);
		font-size: 3rem;
		text-align: left;
	}

	.title-tow {
		color: #999;
		font-size: 1.4rem;
		text-align: left;
		text-indent: 1.5rem;
	}

	ul {
		box-sizing: border-box;
		width: 100%;
		padding: 1.4rem;

		li {
			width: 100%;
			height: 5rem;

			a {
				position: relative;
				display: block;
				line-height: 5rem;
				color: var(--theme-color);
				text-align: left;

				&::after {
					content: "";
					position: absolute;
					top: 2rem;
					right: 0.5rem;
					width: 1rem;
					height: 1rem;
					border-top: 1px #ddd solid;
					border-right: 1px #ddd solid;
					transform: rotate(45deg);
					-webkit-transform: rotate(45deg);
				}

				i {
					margin-left: 0.5rem;
					font-size: 1rem;
					font-style: normal;
					color: #aaa;
				}
			}

			.red {
				color: var(--theme-color-r);
			}
		}
	}

	.button {
		display: block;
		width: 92vw;
		height: 13vw;
		text-align: center;
		line-height: 13vw;
		color: #fff;
		font-size: 1.6rem;
		margin: 4vw;
		border-radius: 6.5vw;
		background: var(--theme-gradient);
		box-shadow: var(--theme-box-shadow);
	}
}
</style>

<script>
var list = [
	{
		url: '/',
		title: 'LOGIN',
		tip: 'MongoDB 登录测试',
		show: false
	},{
		url: '/',
		title: 'REGISTER',
		tip: 'MongoDB 注册测试',
		show: false
	},{
		url: '/',
		title: 'USER',
		tip: '个人中心，JADE 模板引擎生成测试',
		show: false
	},{
		url: '/responsive',
		title: 'RESPONSIVE',
		tip: '基于 vw vh rem 的手机网页模型',
		show: true
	},{
		url: '/',
		title: 'SLIDE / BANNER',
		tip: '划动型焦点图',
		show: false
	},{
		url: '/',
		title: 'PRELOAD',
		tip: '列表预加载',
		show: false
	},{
		url: '/',
		title: 'DROP TO REFRESH',
		tip: '下拉刷新，目前适用范围比较小',
		show: false
	},{
		url: '/',
		title: 'SELECTOR',
		tip: '列表选择器/不会引起背景层滚动的弹出框',
		show: false
	},{
		url: '/',
		title: 'TIPS',
		tip: '各种提示组件',
		show: false
	},{
		url: '/',
		title: 'SWITCH',
		tip: '各种开关，纯CSS',
		show: false
	},{
		url: '/',
		title: 'PARABOLA',
		tip: '抛物线运动动画，用于加购物车、收藏',
		show: false
	},{
		url: '/',
		title: 'LODING',
		tip: '等待动画，加载动画',
		show: false
	},{
		url: '/',
		title: 'PARALLAX',
		tip: '滚动视差, Android 系统下体验较好',
		show: false
	},{
		url: '/wave',
		title: 'WAVE',
		tip: '纯CSS波浪',
		show: true
	},{
		url: '/icon',
		title: 'ICON',
		tip: 'SVG sprite 矢量图标，最后更新日期 2018/05/16',
		show: true
	},
]
export default {
	name: 'Haro',
	data () {
		return {
			list
		}
	}
}
</script>