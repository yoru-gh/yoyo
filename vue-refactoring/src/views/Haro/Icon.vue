<template>
    <div class="icon-box">
		<ul class="list clear">
			<li v-for="item in list" :key="item.name">
				<icon-sprite :class="{ 'picture': item.hasClass }" :icon-name="item.name"/>
				<p>{{ '#icon-' + item.name }}<br>{{ item.title }}</p>
			</li>
		</ul>
		<span class="copyright"></span>
    </div>
</template>

<style lang="less" scoped>
.icon-box {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: #fff;

	.list {
		flex: 1;
		width: 100%;

		li {
			box-sizing: border-box;
			float: left;
			width: 25vw;
			height: 25vw;

			p {
				width: 100%;
				line-height: 1.2rem;
				text-align: center;
				font-size: 1rem;
				color: #aaa;
			}

			/deep/svg {
				width: 8vw;
				height: 8vw;
				margin: 4vw 7.5vw 1vw;
				fill: var(--theme-color);
			}
		}

		.picture /deep/svg {
			width: 8.5vw;
			height: 8.5vw;
			margin: 4vw 7.25vw .5vw;
			fill: var(--theme-color);
		}
	}
}

.copyright::after {
	display: none;
}
</style>
<script>
import IconSprite from '@/components/SvgSprite.vue'
var list = [
	{
		name: 'classify',
		title: '分类',
		hasClass: false
	},
	{
		name: 'pen',
		title: '笔',
		hasClass: false
	},
	{
		name: 'magnifier',
		title: '放大镜',
		hasClass: false
	},
	{
		name: 'list',
		title: '列表模式',
		hasClass: false
	},
	{
		name: 'more',
		title: '更多',
		hasClass: false
	},
	{
		name: 'shoppingcart',
		title: '购物车',
		hasClass: false
	},
	{
		name: 'picture',
		title: '图片',
		hasClass: true
	},
	{
		name: 'filter',
		title: '漏斗',
		hasClass: false
	},
	{
		name: 'message',
		title: '信息',
		hasClass: false
	},
	{
		name: 'face',
		title: '笑脸',
		hasClass: false
	},
	{
		name: 'user',
		title: '用户',
		hasClass: false
	},
	{
		name: 'home',
		title: '屋子',
		hasClass: false
	},
	{
		name: 'top',
		title: '上',
		hasClass: false
	},
	{
		name: 'left',
		title: '左',
		hasClass: false
	},
	{
		name: 'star',
		title: '星星',
		hasClass: false
	},
	{
		name: 'star-full',
		title: '实星',
		hasClass: false
	},
	{
		name: 'heart',
		title: '心心',
		hasClass: false
	},
	{
		name: 'heart-full',
		title: '实心',
		hasClass: false
	}
]
export default {
	name: "Icon",
	data () {
		return {
			list
		}
	},
	components: {
		IconSprite
	}
}
</script>