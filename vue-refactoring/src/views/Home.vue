<template>
	<div class="home-box">
		<div :class="['background',  { active: isActive }]">
			<icon-sprite class="mat" icon-name="logo"/>
			<icon-sprite class="logo" icon-name="logo"/>
			<span class="title">YORUNI</span>
			<span class="text">主页 HOMEPAGE <i>ホームページ</i></span>
		</div>
		<div class="content">
			<!-- <router-link to="/doc">D</router-link> -->
			<router-link to="/haro">H</router-link>
			<router-link to="/">Y</router-link>
			<router-link class="pro" to="/">项目</router-link>
		</div>
		<a class="github" href="https://github.com/KazenoYoruni/KazenoYoruni.github.io" target="_blank">
			<icon-sprite icon-name="github-line"/>
		</a>
	</div>
</template>

<style lang="less" scoped>
@keyframes fadein {
	0% {
		opacity: .2;
	}
	100% {
		opacity: 1;
	}
}
@keyframes moveleft {
	0% {
		transform: translateX(-10vw);
		opacity: .2;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}
@keyframes movetop {
	0% {
		transform: translateY(10vw);
		opacity: .2;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}
@keyframes movebottom {
	0% {
		transform: translateY(-10vw);
		opacity: .2;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}
.home-box {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: #fff;

	.background {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		.mat{
			position: absolute;
			top: 50%;
			left: 50%;
			width: 180vw;
			height: 180vw;
			margin-top: -70vw;
			margin-left: -60vw;
			filter: blur(17vw);
			// transition: all .4s ease;
			opacity: .2;

			/deep/svg {
				width: 170vw;
				height: 170vw;
			}
		}

		&.active {
			.mat {
				transition: opacity 5s ease;
				opacity: 1;
				// animation: fadein 5s ease forwards;
			}

			.logo {
				animation: moveleft 6s ease forwards;
			}

			.title {
				animation: movebottom 5s ease forwards;
			}

			.text {
				animation: movetop 4s ease forwards;
			}
		}

		&.motion {
			.mat {
				opacity: 1;
			}

			.logo {
				transform: translateX(0);
				opacity: 1;
			}

			.title {
				transform: translateY(0);
				opacity: 1;
			}

			.text {
				transform: translateY(0);
				opacity: 1;
			}
		}

		.logo {
			position: absolute;
			bottom: 10vw;
			left: 0;
			width: 120vw;
			height: 120vw;
			margin-left: -24vw;
			opacity: .2;
			transform: translateX(-10vw);
			transition: all .4s ease;

			/deep/svg {
				width: 120vw;
				height: 120vw;
			}
		}

		.title {
			position: absolute;
			top: 0;
			right: 18vw;
			width: 20vw;
			height: 100%;
			writing-mode: tb-rl;
			text-align: center;
			line-height: 20vw;
			font-size: 7rem;
			color: rgba(255,255,255,.6);
			font-weight: 800;
			text-indent: -20vw;
			text-shadow: 2px 2px 10px rgba(0,0,0,.05);
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			user-select: none;
			transform: translateY(10vw);
			transition: all .4s ease;
			opacity: .2;
			/* -webkit-backface-visibility: hidden; */
		}

		.text {
			position: absolute;
			top: 0;
			right: 9vw;
			height: 100%;
			writing-mode: tb-rl;
			text-align: center;
			line-height: 10vw;
			font-size: 3rem;
			color: rgba(255,255,255,.6);
			font-weight: bold;
			text-indent: 20vw;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			user-select: none;
			transform: translateY(10vw);
			transition: all .4s ease;
			opacity: .2;

			i {
				color: inherit;
				font-style: normal;
				font-size: 2rem;
				letter-spacing: 0;
			}
		}
	}

	.content {
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		a {
			position: absolute;
			bottom: 4vw;
			width: 12vw;
			height: 12vw;
			text-align: center;
			line-height: 12vw;
			color: #fff;
			font-size: 2rem;
			border-radius: 6vw;
			box-shadow: var(--theme-box-shadow);
			background-image: var(--theme-gradient);
			opacity: .9;

			&:nth-of-type(1) {
				right: 8vw;
			}

			&:nth-of-type(2) {
				right: 24vw;
			}

			&:nth-of-type(3) {
				right: 40vw;
			}

			&.pro {
				left: 8vw;
				width: 16vw;
				font-size: 1.4rem;
			}
		}
	}

	.github {
		position: absolute;
		top: 4vw;
		left: 8vw;
		height: 12vw;
		width: 12vw;
		text-align: center;
		line-height: 12vw;
		border-radius: 6vw;
		opacity: .9;
		box-shadow: var(--theme-box-shadow);
		background-image: var(--theme-gradient);

		span {
			display: inline-block;
			margin-top: 2vw;

			/deep/svg {
				width: 2.4rem;
				height: 2.4rem;
				fill: #fff;
			}
		}
	}
}
</style>
<script>
import IconSprite from '@/components/SvgSprite.vue'

export default {
	name: 'home',
	data () {
		return {
			isActive: false
		}
	},
	mounted () {
		// Vue 实例内部 this 指向问题 setTimeout 需要用箭头函数
		setTimeout(() => {
			this.isActive = true
		}, 100)
	},
	components: {
		IconSprite
	}
}
</script>