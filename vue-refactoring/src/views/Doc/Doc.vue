<template>
    <div class="doc-view">
        <!-- 侧边栏 -->
        <div class="side-box" id="sideBox">
            <div class="menu-icon" data-value="0" id="menuIcon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.22 59.61" value="true">
                    <g><circle cx="66.13" cy="4.09" r="4.09"></circle><path d="M53.9.07H4a4,4,0,1,0,0,8H53.9a4,4,0,0,0,0-8Z"></path></g>
                    <g><circle cx="4.09" cy="29.87" r="4.09"></circle><path d="M66.2,25.85H16.31a4,4,0,0,0,0,8H66.2a4,4,0,1,0,0-8Z"></path></g>
                    <g><path d="M66.2,25.82H4a4,4,0,1,0,0,8H66.2a4,4,0,1,0,0-8Z"></path></g>
                    <g><path d="M66.2,51.57H4a4,4,0,0,0,0,8H66.2a4,4,0,0,0,0-8Z"></path></g>
                </svg>
            </div>
            <div class="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
                    <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(275.098 25 25)">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
            </div>
            <div class="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                    <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                    <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                        C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(42.1171 20 20)">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
            </div>
            <div class="menu-icon">
                <svg viewBox="0 0 50 50" class="loading">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
                </svg>
            </div>
            <ul>
                <li>
                    <icon-sprite icon-name="setting"/>
                </li>
                <li>
                    <icon-sprite icon-name="code"/>
                </li>
                <li>
                    <icon-sprite icon-name="search"/>
                </li>
            </ul>
            <button class="button" id="button" data-value="0">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                    <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                    <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                        C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(42.1171 20 20)">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
            </button>
            <button class="button" id="createList">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
                    <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(275.098 25 25)">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
            </button>
        </div>
        <!-- 隐藏的侧边栏导航栏 -->
        <div class="side-menu" id="sideMenu">
            <div class="hypotenuse"></div>
            <div class="side-menu-content" id="sideMenuContent">
                <div class="side-menu-content-wrap">
                    <ul>
                        <li data-value="0">模拟滚动条类 ImitateScrollBar 说明</li>
                        <li data-value="1">需要用到的 CSS</li>
                        <li data-value="2">需要用到的 HTML</li>
                        <li data-value="3">需要用到的 Javascript</li>
                        <li data-value="4">方法的源代码</li>
                        <li data-value="5">额外的要用到的 Javascript 代码</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="side-menu side-menu-bg" id="sideMenuBg">
            <div class="hypotenuse"></div>
            <div class="side-menu-content"></div>
        </div>
        <!-- 主要内容 -->
        <div class="main-box clearfix" id="mainBox">
            <h2 class="anchor">模拟滚动条类 ImitateScrollBar 说明</h2>
            <p>ImitateScrollBar 类基于 <span class="tip-warn">ES6</span> 新增的 <span class="tip-warn">Class</span> 语法糖编写，建议使用新版 <a class="label label-link" target="_bank" href="https://www.google.cn/intl/zh-CN/chrome/">Chrome</a> 浏览器都打开，低版本或者其他浏览器可能会出现意想不到的问题</p>
            <p class="anchor">需要用到的 CSS 样式，这里使用了预处理器 LESS</p>
            <pre class='less' v-highlight><code class="hljs">
                ::-webkit-scrollbar {
                    display: none;
                }

                body {
                    overflow: hidden;
                }

                .main-box {
                    box-sizing: border-box;
                    height: 100vh;
                    padding: 0 ~'calc((100% - 1200px)/2)' 20px;
                    margin: 0 auto;
                    margin-right: -10px;
                    overflow-x: hidden;
                    overflow-y: auto;
                }

                .scroll-bar {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 999;
                    width: 16px;
                    background-color: @bgcolor;
                    overflow: hidden;
                
                    span {
                        position: absolute;
                        top: 4px;
                        left: 4px;
                        width: 8px;
                        height: 238px;
                        border-radius: 6px;
                        background-color: #0082de;
                
                        &:active {
                            background-color: #de8233;
                        }
                    }
                
                    &.float-left {
                        left: 0;
                        right: auto;
                    }
                
                    &.disable {
                        display: none;
                    }

                    // 自定义的主题
                    &.orange {
                        background-color: transparent;
                
                        span {
                            background-color: #de8233;
                        }
                    }
                }
            </code></pre>
            <p class="anchor">需要用到的 HTML 代码，手动添加的 <span class="tip-warn">#box</span> 和 <span class="tip-warn">.scroll-bar</span> 必须放在同一级，如果有多个需要滚动条的容器需要把 <span class="tip-warn">#box</span> 和 <span class="tip-warn">.scroll-bar</span> 放在一个单独的容器内</p>
            <pre class='html' v-highlight><code class="hljs">
                &lt;body&gt;
                    &lt;!-- 需要滚动条的容器 --&gt;
                    &lt;div class="main-box" id="box"&gt;
                        &lt;!-- 这里可以放任意内容 --&gt;
                    &lt;/div&gt;

                    &lt;!-- 滚动条容器，可以是程序自动生成，建议是手动添加 --&gt;
                    &lt;div class="scroll-bar"&gt;
                        &lt;span data-late="0"&gt;&lt;/span&gt;
                    &lt;/div&gt;
                &lt;/body&gt;
            </code></pre>
            <p class="anchor">需要用到的 Javascript 代码，在页面加载了 ImitateScrollBar.js 文件后，模拟滚动条类的使用方法</p>
            <pre class='js' v-highlight><code class="hljs">
                let box = new ImitateScrollBar({
                    el: '#box', // String 需要滚动条容器的 id
                    createScrollBar: false, // Boolean 是否自动添加滚动条 HTML 代码，会添加到 el 的父节点上，默认值为 false
                    scrollBarSkin: 'orange', // String 设置滚动条颜色，这个完全是自定义的，需要自己手动添加 CSS
                    disableDrag: true, // Boolean 禁用拖拽滚动条，默认值为 false
                    float: 'left', // String 设置滚动条在左/右，默认值为 'right'
                })

                // 当 box 内容发生变化时提供刷新实例的方法
                box.refresh()
                // 销毁实例的方法
                box.destroy()
            </code></pre>
            <p class="anchor">imitateScrollBar.js 中的源代码</p>
            <pre class='js' v-highlight><code class="hljs">
                class ImitateScrollBar {
                    constructor(options) {
                        this.options = options
                        this.scrollBox = document.getElementById(options.el.split('#')[1])
                        this.scrollBoxParent = this.scrollBox.parentNode
                
                        if(options.createScrollBar) {
                            let target = this.scrollBoxParent.getElementsByClassName('scroll-bar')[0]
                            if(target != undefined) {
                                // 已存在滚动条但是滚动条是被禁用状态时
                                target.classList.remove('disable')
                                this.scrollBarContainer = target
                            } else {
                                // 自动生成滚动条时
                                let scrollBarContainer = document.createElement('div')
                                let scrollBar = document.createElement('span')
                                scrollBarContainer.classList.add('scroll-bar')
                                // 添加自定义的样式
                                options.scrollBarSkin ? scrollBarContainer.classList.add(options.scrollBarSkin) : null
                                scrollBarContainer.append(scrollBar)
                                this.scrollBoxParent.append(scrollBarContainer)
                                this.scrollBarContainer = scrollBarContainer
                            }
                        } else {
                            // 手动在页面添加了滚动条容器时
                            this.scrollBarContainer = this.scrollBoxParent.getElementsByClassName('scroll-bar')[0]
                        }
                
                        this.scrollBar = this.scrollBarContainer.children[0]
                        this.windowHeight = document.body.offsetHeight // 页面高度
                        this.scrollBarArea = this.windowHeight - this.scrollBar.offsetHeight - 8 // 模拟滚动条的运动范围
                        this.scrollBoxHieght = 0 // 如果有设置内下边距就需要加上边距的值
                        this.isScrollBarHold = false // 判断是否处于鼠标拖动模拟滚动条状态
                        this.mouseHoldStartPointY = 0 // 用来记录按住鼠标左键拖动滚动条时鼠标的 Y 坐标
                        this.lastMouseUpPointY = 0 // 用来记录松开鼠标左键拖时的 Y 坐标，或者说是模拟滚动条最后的距离滚动条容器顶部的停留位置
                
                        for(let ele of this.scrollBox.children) {
                            this.scrollBoxHieght += ele.offsetHeight
                        }
                
                        // 设置滚动条的停靠位置
                        if(options.float == 'left') {
                            this.scrollBarContainer.classList.add('float-left')
                        }
                
                        this.scrollBoxScroll = eve => {
                            if(!this.isScrollBarHold) {
                                let point = this.getScrollPoint()
                                if(point > this.scrollBarArea) {
                                    point = this.scrollBarArea
                                }
                                this.scrollBar.style.transform = `translateY(${point}px)`
                                this.lastMouseUpPointY = point
                                this.scrollBar.dataset.late = this.lastMouseUpPointY
                            }
                        }
                        this.scrollBarMouseDown = eve => {
                            eve.preventDefault()
                            this.isScrollBarHold = true
                        }
                        this.scrollBarMouseUp = eve => {
                            eve.preventDefault()
                            this.isScrollBarHold = false
                            this.scrollBar.dataset.late = this.lastMouseUpPointY
                        }
                        this.scrollBoxMouseDown = eve => {
                            if(this.isScrollBarHold) {
                                this.mouseHoldStartPointY = eve.y
                            }
                        }
                        this.scrollBoxMouseUp = eve => {
                            this.isScrollBarHold = false
                            this.scrollBar.dataset.late = this.lastMouseUpPointY
                        }
                        this.scrollBoxMouseMove = eve => {
                            if(this.isScrollBarHold) {
                                let currentPoint = Number(this.scrollBar.dataset.late)
                                let point = currentPoint + eve.y - this.mouseHoldStartPointY
                                if(0 > point || point > this.scrollBarArea - 4) {
                                    return
                                }
                                this.scrollBar.style.transform = `translateY(${point}px)`
                                this.lastMouseUpPointY = point
                                
                                let scrollTopValue = Math.round((this.scrollBoxHieght - this.windowHeight) * point / this.scrollBarArea)
                                this.scrollBox.scrollTop = scrollTopValue
                            }
                        }
                        this.scrollBox.addEventListener('scroll', this.scrollBoxScroll)
                        if(!options.disableDrag) {
                            this.scrollBar.addEventListener('mousedown', this.scrollBarMouseDown)
                            this.scrollBar.addEventListener('mouseup',  this.scrollBarMouseUp)
                            this.scrollBoxParent.addEventListener('mousedown',  this.scrollBoxMouseDown)
                            this.scrollBoxParent.addEventListener('mouseup',  this.scrollBoxMouseUp)
                            this.scrollBoxParent.addEventListener('mousemove',  this.scrollBoxMouseMove)
                        }
                
                        // 滚动到指定位置
                        this.scrollTo = (point = 0, time = 300) => {
                            // 一个参数都没有时返回顶部
                            // 目标点距离当前位置超过 10px 时才执行
                            if (Math.abs(this.scrollBox.scrollTop - point) > 10) {
                                const SV = point - this.scrollBox.scrollTop // 位移量
                                const AT = Math.ceil(time/16.67) // time 时间内把总位移分割成 AT 份，
                                let index = 0
                                let apArr = getArithmeticProgression(SV, time)
                                let go = () => {
                                    // 现在设定从某个位置滚动到指定位置的固定位移为 S 单位 px
                                    // 位移 S 所需要的时间固定为 T 单位 ms
                                    // 已知每执行一次 requestAnimationFrame 所用的时间为 16.67ms，用 t 表示
                                    // 也就是现在需要把 S 划分成 T/t 段，S/(T/t) 值的合集，如果是匀减速运动就是一个等差数列
                                    this.scrollBox.scrollTop += apArr[index]
                                    index ++
                                    if (AT > index) {
                                        window.requestAnimationFrame(go);
                                    } else {
                                        window.cancelAnimationFrame(go);
                                    }
                                };
                                go();
                            }
                        }
                
                        // 需要滚动的容器内增加了新的内容后调用，重新生成实例
                        this.refresh = (ops = this.options) => {
                            let refreshObject = new ImitateScrollBar(ops)
                            let point = this.getScrollPoint(refreshObject)
                            if(point > refreshObject.scrollBarArea) {
                                point = refreshObject.scrollBarArea
                            }
                            refreshObject.scrollBar.style.transition = `transform .2s ease`
                            refreshObject.scrollBar.style.transform = `translateY(${point}px)`
                            refreshObject.lastMouseUpPointY = point
                            refreshObject.scrollBar.dataset.late = refreshObject.lastMouseUpPointY
                            setTimeout(() => {
                                refreshObject.scrollBar.style.transition = `unset`
                            }, 200)
                            return refreshObject
                        }
                
                        // 不需要滚动时隐藏滚动条
                        if(this.windowHeight > this.scrollBoxHieght) {
                            this.scrollBarContainer.classList.add('disable')
                            return
                        } else {
                            this.scrollBarContainer.classList.remove('disable')
                        }
                    }
                    destroy() {
                        this.scrollBar.style.opacity = '0'
                        this.scrollBar.style.transform = `translateY(0px)`
                        this.scrollBox.removeEventListener('scroll', this.scrollBoxScroll)
                        if(!options.disableDrag) {
                            this.scrollBar.removeEventListener('mousedown', this.scrollBarMouseDown)
                            this.scrollBar.removeEventListener('mouseup', this.scrollBarMouseUp)
                            this.scrollBoxParent.removeEventListener('mousedown', this.scrollBoxMouseDown)
                            this.scrollBoxParent.removeEventListener('mouseup', this.scrollBoxMouseUp)
                            this.scrollBoxParent.removeEventListener('mousemove', this.scrollBoxMouseMove)
                        }
                    }
                    getScrollPoint(obj = this) {
                        // 按比例计算出滚动条的位置
                        return Math.round(obj.scrollBox.scrollTop * obj.scrollBarArea / (obj.scrollBoxHieght - obj.windowHeight))
                    }
                    // 已知总和，项数，末项，求首项和公差并返回一个等差数列数组，可以看作是一个匀减速运动每一帧的位移合集
                    getArithmeticProgression(s, t, an = 0) {
                        // s 总和，t 运动总时间，an 末项默认值为 0
                        // 16.67 = 1000ms / 60hz，按照一般 60hz 刷新率显示器计算，每一帧的时间约等于 16.67ms
                        const n = Math.ceil(t / 16.67) // 过程中的位移次数，即项数
                        const a1 = 2 * s / n - an // 首项
                        const d = (an - a1) / (n - 1) // 公差
                        
                        let arr = []
                        for(let i = 0; n > i; i++) {
                            arr.push(Math.round(a1 + (d * i)))
                        }
                        return arr
                    }
                }
            </code></pre>
            <p class="anchor">额外的要用到的 Javascript 代码</p>
            <pre class='js' v-highlight><code class="hljs">
                // 扩展 requestAnimationFrame 及 cancelAnimationFrame 方法
                !(function() {
                    let lastTime = 0;
                    let vendors = ['webkit', 'moz'];
                    for(let x = 0; vendors.length > x && !window.requestAnimationFrame; ++x) {
                        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                        // name has changed in Webkit
                        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
                    }
                
                    // 兼容处理
                    if (!window.requestAnimationFrame) {
                        window.requestAnimationFrame = function(callback, element) {
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
            </code></pre>
            <div class="icopyright">©Copyright</div>
        </div>
        <div class="scroll-bar">
            <span data-late="0"></span>
        </div>
        <div class="loading-box" id="loadingBox">
            <svg viewBox="0 0 50 50" class="loading">
                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
            </svg>
        </div>
    </div>
</template>

<style lang="less" scoped>
    @import '../../assets/less/highlight.theme.less'; // 导入 highlight.js 的主题
    @font-face {
        src: url(../../assets/font/SourceCodePro-Regular.ttf);
        font-family: 'SourceCodePro Regular';
    }
    @bgcolor: #424242;

    ::-webkit-scrollbar {
        display: none;
    }

    * {
        font-size: 14px;
        color: #dcdcdc;
    }

    h2 {
        font-size: 24px;
    }

    p {
        font-size: 16px;
    }

    .doc-view {
        width: 100vw;
        height: 100vh;
        background-color: @bgcolor;
        overflow: hidden;
    }

    h2 {
        line-height: 78px;
        padding-top: 24px;
    }

    p {
        line-height: 24px;
        padding: 12px 0;
    }

    .icopyright {
        height: 86px;
        line-height: 86px;
        font-size: 12px;
        color: #888;
        text-align: center;
    }

    .clearfix::after {
        content: '';
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
    }

    .side-box {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        height: 100vh;
        width: 80px;
        padding: 10px;
        background-color: #252525;
        
        ul {
            list-style: none;

            li {
                box-sizing: border-box;
                width: 60px;
                height: 60px;
                padding: 14px;
                border-radius: 8px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 32px;
                transition: all .2s ease;
                overflow: hidden;

                &:hover {
                    background-color: #0082de;
                }

                span {
                    display: block;
                    width: 32px;
                    height: 32px;

                    /deep/svg {
                        width: 32px;
                        height: 32px;
                        fill: #fff;
                    }
                }
            }
        }
    }

    .button {
        width: 50px;
        height: 50px;
        font-size: 16px;
        color: #fff;
        border-radius: 8px;
        margin: 15px 5px 5px;
        outline: none;
        transition: all .2s ease;
        background-color: #0082de;

        &:hover {
            background-color: #de8233;
        }
    }

    .side-menu {
        position: fixed;
        top: 0;
        left: -420px;
        z-index: 998;
        width: 500px;
        height: 100vh;
        overflow: hidden;
        transition: all .3s ease .15s;
        opacity: .2;

        &.active {
            transform: translateX(100%);
            opacity: .95;
        }

        .hypotenuse {
            position: absolute;
            top: 0;
            right: 0;
            z-index: -1;
            width: 80px;
            background-color: #0082de;
            transform-origin: top right;
            // height: ceil(sqrt(pow(80px, 2) + pow(100vh, 2)));
            // transform: rotate(4.7deg);
        }

        .side-menu-content {
            box-sizing: border-box;
            width: 420px;
            height: 100vh;
            padding: 8px 8px 8px 20px;
            background-color: #0082de;
            overflow-x: hidden;
            overflow-y: auto;

            .side-menu-content-wrap {
                width: auto;

                ul {
                    list-style: none;
                    padding: 10px 8px;

                    li {
                        height: 34px;
                        padding-left: 12px;
                        margin: 4px 0 14px 0;
                        color: #fff;
                        line-height: 34px;
                        font-size: 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all .2s ease;

                        &.active {
                            background-color: #de8233;
                        }

                        &.heightli {
                            height: 1000px;
                            background-color: #569cd6;
                        }
                    }
                }
            }
        }
    }
    .side-menu-bg {
        left: -500px;
        width: 580px;
        z-index: 997;
        transition: all .6s ease;

        &.active {
            transition: all .4s ease;
            transform: translateX(100%);
            opacity: 0.8;
        }

        .hypotenuse {
            background-color: #252525;
        }

        .side-menu-content {
            width: 500px;
            background-color: #252525;
        }
    }

    .label {
        display: inline-block;
        line-height: 14px;
        border-radius: 3px;
        padding: 2px 4px;
        text-decoration: none;
    }

    .label-link {
        background-color: #0082de;
    }

    .tip-warn {
        color: #de8233;
    }

    .tip-info {
        color: #569cd6;
    }

    .scroll-bar {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        width: 16px;
        background-color: @bgcolor;
        overflow: hidden;

        span {
            position: absolute;
            top: 4px;
            left: 4px;
            width: 8px;
            height: 238px;
            border-radius: 6px;
            background-color: #0082de;

            &:active {
                background-color: #de8233;
            }
        }

        &.float-left {
            left: 0;
            right: auto;
        }

        &.disable {
            display: none;
        }
        // 自定义的主题
        &.orange {
            background-color: transparent;

            span {
                background-color: #de8233;
            }
        }
    }

    .main-box {
        box-sizing: border-box;
        height: 100vh;
        padding: 0 ~'calc((100% - 1160px)/2)';
        margin: 0 auto;
        margin-right: -20px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    /* 扩展代码块插件 */
    /deep/ .hljs {
        font-family: 'SourceCodePro Regular';
        position: relative;
        border-radius: 7px;
        padding: 8px;

        * {
            font-family: 'SourceCodePro Regular';
            font-size: 14px;
            color: #dcdcdc;
            white-space: pre-wrap;
            word-wrap: break-word;
            list-style: decimal;
        }
        
        ol {
            list-style: decimal;
            margin: 0px 0px 0 40px;
            padding: 0px;

            li {
                position: relative;
                padding: 2px;
                color: #dcdcdc;

                &::before {
                    // 设置伪类样式目的时为了遮挡有序列表自带的数字后面的一点
                    content: "";
                    position: absolute;
                    top: 12px;
                    left: -18px;
                    width: 8px;
                    height: 8px;
                    background-color: #1e1e1e;
                }
            }
        }
    }
    pre {
        position: relative;

        .codetip {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1;
            font-size: 12px;
            color: #666;
        }

        &.html::before {
            content: 'HTML';
            .codetip;
        }

        &.css::before {
            content: 'CSS';
            .codetip;
        }

        &.less::before {
            content: 'LESS';
            .codetip;
        }

        &.js::before {
            content: 'JS';
            .codetip;
        }
    }

    // 菜单
    .menu-icon {
        width: 32px;
        height: 32px;
        padding: 14px;
        transition: all .3s ease;

        svg {
            width: 32px;
            height: 32px;
            fill: #dcdcdc;

            g {
                transform-origin: center;
                transition: all .3s ease;
            }
        }

        &.active {
            transform: rotate(180deg)
        }

        &.active svg g:nth-of-type(1) {
            opacity: 0;
            transform: scaleX(0);
        }

        &.active svg g:nth-of-type(2) {
            transform: scale(1.1) rotate(-45deg);
        }

        &.active svg g:nth-of-type(3) {
            transform: scale(1.1) rotate(45deg);
        }

        &.active svg g:nth-of-type(4) {
            opacity: 0;
            transform:  scaleX(0);
        }
    }

    .loading {
        animation: rotate 2s linear infinite;
        transform-origin: center center;
        
        > circle {
            display: inline-block;
            animation: dash 1500ms ease-in-out infinite;
            stroke-linecap: round; // 端点是圆形
            color: #fff;
        }

        @keyframes rotate {
            100% {
                transform: rotate(360deg);
            }
        }
         
        @keyframes dash {
            0% {
                stroke-dasharray: 1, 200;
            }

            50% {
                stroke-dasharray: 100, 200;
                stroke-dashoffset: -45;
            }

            100% {
                stroke-dasharray: 100, 200;
                stroke-dashoffset: -124;
            }
        }
    }

    .loading-box {
        position: fixed;
        top: -40px;
        right: 20px;
        z-index: 1000;
        width: 40px;
        height: 40px;
        transition: all .2s ease;
        opacity: .3;

        &.active {
            transform: translateY(60px);
            opacity: 1;
        }

        svg {
            width: 40px;
            height: 40px;

            // circle {
            // 	color: #0082de;;
            // }
        }
    }

    button {
        padding: 5px;

        svg {
            width: 40px;
            height: 40px;
            fill: #fff;
        }
    }
</style>

<script>
    import Vue from 'vue'
    import hljs from 'highlight.js' // 引入 highlight.js 代码高亮插件并注册指令
    Vue.directive('highlight',function (el) {
        let blocks = el.querySelectorAll('code');
        blocks.forEach((block) => {
            hljs.highlightBlock(block)
        })
    })
    import IconSprite from '@/components/SvgSprite.vue'
    import ImitateScrollBar from '@/assets/script/ImitateScrollBar' // 模拟滚动条
    import HljsSetLineNumber from '@/assets/script/HljsSetLineNumber' // highlight.js 扩展行号

    export default {
        name: 'Doc',
        data () {
            return {
                hljsSetLineNumber: {}
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.hljsSetLineNumber = new HljsSetLineNumber()
                this.hljsSetLineNumber.init() // 添加行号
                // 初始化模拟滚动条实例
                let iScrollBar = new ImitateScrollBar({
                    el: '#mainBox'
                })

                new ImitateScrollBar({
                    el: '#sideMenuContent',
                    createScrollBar: true, // 自动添加滚动条 HTML 代码，会添加到 el 的父节点上
                    scrollBarSkin: 'orange', // 设置滚动条颜色
                    disableDrag: true, // 禁用拖拽滚动条
                    float: 'left', // 设置滚动条在左/右
                })

                // 设置左侧划出菜单斜边样式，这样添加的样式是全局生效的
                let vh = document.body.offsetHeight
                const HYPOTENUSE = Math.ceil(Math.sqrt(Math.pow(80, 2) + Math.pow(vh, 2))) //斜边长度
                const INCLUDED_ANGLE = Number((Math.atan2(80, vh)*180/Math.PI).toFixed(2)) // 夹角角度
                let hypotenuseStyle = [
                    '.hypotenuse {',
                        `height: ${HYPOTENUSE}px;`,
                        `transform: rotate(${INCLUDED_ANGLE}deg)`,
                    '}'
                ]
                let hypotenuseStyleEl = document.createElement('style')
                hypotenuseStyleEl.setAttribute('id', 'hypotenuseStyle')
                hypotenuseStyleEl.type = 'text/css'
                hypotenuseStyleEl.innerHTML = hypotenuseStyle.join('')
                if(document.getElementById('hypotenuseStyle')) {
                    document.getElementById('hypotenuseStyle').innerHTML = hypotenuseStyle.join('')
                } else {
                    document.getElementsByTagName('head')[0].appendChild(hypotenuseStyleEl)
                }

                // 点击左侧栏内容跳到相应的锚点
                let anchorPointArray = []
                let anchorList = document.querySelectorAll('.anchor')
                anchorList.forEach(element => {
                    anchorPointArray.push(element.offsetTop)
                })

                let sideMenu = document.getElementById('sideMenu')
                let sideMenuBg = document.getElementById('sideMenuBg')

                // 点击对应菜单滚动到对应位置
                sideMenu.addEventListener('click', event => {
                    let target = event.target
                    if(target.nodeName.toLowerCase() === 'li') {
                        let value = Number(target.dataset.value)
                        if(value == undefined) {
                            return
                        }
                        let activeList = sideMenu.getElementsByClassName('active')
                        if(activeList.length > 0) {
                            sideMenu.getElementsByClassName('active')[0].classList.remove('active')
                        }
                        target.classList.add('active')
                        iScrollBar.scrollTo(anchorPointArray[value] - 10)
                    }
                })

                // 菜单动画
                let menuIcon = document.getElementById('menuIcon')
                menuIcon.addEventListener('click', () => {
                    let value = Number(menuIcon.dataset.value)
                    if(value == 0) {
                        menuIcon.dataset.value = 1
                        menuIcon.classList.add('active')
                        sideMenu.classList.add('active')
                        sideMenuBg.classList.add('active')
                    } else {
                        menuIcon.dataset.value = 0
                        menuIcon.classList.remove('active')
                        sideMenu.classList.remove('active')
                        sideMenuBg.classList.remove('active')
                    }
                })

                // 加载提示
                let button = document.getElementById('button')
                let loadingBox = document.getElementById('loadingBox')
                button.addEventListener('click', () => {
                    let value = Number(button.dataset.value)
                    if(value == 0) {
                        button.dataset.value = 1
                        loadingBox.classList.add('active')
                    } else {
                        button.dataset.value = 0
                        loadingBox.classList.remove('active')
                    }
                })
            }
        },
        components: {
            IconSprite
        }
    }
</script>