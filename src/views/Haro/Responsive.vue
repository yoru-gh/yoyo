<template>
    <div class="responsive-box">
        <header>
			<icon-sprite icon-name="more"/>
		</header>
		<div class="content">
			<p>基于物理分辨率 1080*1920 428ppi 设计宽高 360*640 DPR:3.0 的设备设计, 此行字号为 12px</p>
			<span>此行字号为 10px</span>
			<h2>当前设备为：{{ driverMsg }}</h2>
			<div class="console" id="console" v-html="consoleMsg"></div>
		</div>
		<div class="view">14vw</div>
		<div class="pixel">50px</div>
		<!-- <div class="fab" id="fab"><svg><use xlink:href="../icon/sprite.svg#icon-pen"></use></svg></div> -->
		<div class="fab">5rem</div>
    </div>
</template>

<style lang="less" scoped>
.responsive-box {
	display: flex;
	flex-direction: column;
	width: 100vw;
    padding-top: 14vw;
    
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100%;
        height: 14vw;
        box-shadow: 2px 2px 10px rgba(0,0,0,.1);
        background-color: #fff;

        span {
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: center;
            float: left;
            width: 14vw;
            height: 14vw;

            /deep/svg {
                vertical-align: top;
                width: 6vw;
                height: 6vw;
            }
        }
    }

    .content {
        flex: 1;
        box-sizing: border-box;
        width: 100%;

        p {
            font-size: 12px;
            padding: 14px;
        }

        span {
            display: block;
            font-size: 20px;
            text-indent: 28px;
            transform: scale(0.5);
            transform-origin: left center;
        }

        h2 {
            text-indent: 14px;
            margin-top: 10px;
            margin-bottom: 5px;
        }

        .console {
            box-sizing: border-box;
            width: 100vw;
            height: 1rem;
            font-size: 1rem;
            padding: 0 14px;
        }
    }

    .fab {
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        position: fixed;
        right: 4vw;
        bottom: 4vw;
        width: 5rem;
        height: 5rem;
        text-align: center;
        line-height: 5rem;
        color: #fff;
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 50%;
        box-shadow: 2px 2px 10px rgba(0,0,0,.1);
        background-color: #000;
        opacity: .9;

        /deep/svg {
            vertical-align: top;
            width: 2.2rem;
            height: 2.2rem;
            fill: #fff;
        }
    }

    .view {
        position: fixed;
        right: 4vw;
        bottom: calc(12vw + 5rem + 50px);
        width: 14vw;
        height: 14vw;
        text-align: center;
        line-height: 14vw;
        color: #fff;
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 50%;
        box-shadow: 2px 2px 10px rgba(0,0,0,.1);
        background-color: #000;
        opacity: .9;

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: -1px;
            width: 1px;
            height: calc(50px + 22vw + 5rem);
            background-color: #aaa;
        }
    }

    .pixel {
        position: fixed;
        right: 4vw;
        bottom: calc(8vw + 5rem);
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        border-radius: 50%;
        box-shadow: 2px 2px 10px rgba(0,0,0,.1);
        background-color: #000;
        opacity: .9;

        &::before {
            content: "";
            position: absolute;
            top: -18vw;
            right: -1px;
            width: 1px;
            height: calc(50px + 22vw + 5rem);
            background-color: #333;
        }

        &::after {
            content: "";
            position: absolute;
            top: -18vw;
            left: -1px;
            width: 1px;
            height: calc(50px + 22vw + 5rem);
            background-color: #333;
        }
    }
}
</style>

<script>
import IconSprite from '@/components/SvgSprite.vue'
export default {
    name: 'Responsive',
    data () {
        return {
            UA: navigator.userAgent,
            driverMsg: '',
            machineMsg: '',
            consoleMsg: ''
        }
    },
    mounted () {
        if (this.UA.indexOf("Android") > -1) {
            this.machineMsg = this.UA.split("Mozilla/5.0 (")[1].split("Build")[0].split(";");
            this.machineMsg = this.machineMsg[this.machineMsg.length-1];
        } else if (this.UA.indexOf("Mac OS X") > -1 || this.UA.indexOf("iPad") > -1) {
            if (this.UA.indexOf("Device/Apple") > -1) {
                this.machineMsg = this.UA.split("Device/Apple(")[1].split(")")[0];
            } else {
                this.machineMsg = this.UA.split("Mozilla/5.0 (")[1].split(";")[0];
            }
        } else {
            this.machineMsg = "请使用移动设备打开"
        }
        this.driverMsg = this.machineMsg

        let DOM = document.getElementById('console');
        let val = DOM.offsetHeight;
        let txt = "1vw ≈ " + (DOM.clientWidth *.01).toFixed(2) + "px"
                +"<br>1rem ≈ " + val + "px"
                +"<br>DPR: " + window.devicePixelRatio
                +"<br>WH: " + screen.availWidth+"*"+screen.availHeight
                +"<br>UA: " + navigator.userAgent
                // +"<br>AV: " + navigator.appVersion
                +"<br>UP: " + navigator.platform;
        this.consoleMsg = txt
    },
    components: {
		IconSprite
	}
}
</script>