<template>
    <div class="wave-box">
        <span class="text">WAVE</span>
		<div class="content">
			<div class="loop">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<span class="copyright"></span>
    </div>
</template>

<style lang="less" scoped>
.wave-box {
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	background: var(--theme-gradient);
    overflow: hidden;
    
    .text {
        position: fixed;
        top: 10vw;
        left: 0;
        z-index: 9;
        width: 100%;
        font-size: 18vw;
        font-weight: bold;
        color: var(--theme-color);
        text-align: center;
        opacity: 0;
        animation: late 1s linear 1s forwards;
    }

    .content {
        flex: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .loop {
        position: relative;
        width: 100vw;
        height: 100vw;

        span {
            position: absolute;
            top: -290vw;
            left: 50%;
            width: 400vw;
            height: 400vw;
            border-radius: 44%;
            background-color: #fff;
            opacity: .7;
            transform: translate3d(-50%,0,0);
            animation: loop 11s linear infinite;

            &:nth-of-type(2) {
                animation-duration: 13s;
                transform-origin: 49% 50%;
            }

            &:nth-of-type(3) {
                animation-duration: 15s;
                transform-origin: 50% 49%;
            }
        }
    }

    .copyright::before {
        color: #fff;
    }
    .copyright::after {
        display: none;
    }
}

@keyframes late {
	from {
		transform: translateY(0px) translateZ(0);
		opacity: 0;
	}
	to {
		transform: translateY(40px) translateZ(0);
		opacity: .9;
	}
}
@keyframes loop {
	from { transform: translate3d(-50%,0,0) rotate(0deg); }
	to { transform: translate3d(-50%,0,0) rotate(359deg); }
}
</style>

<script>
export default {
    name: 'Wave'
}
</script>