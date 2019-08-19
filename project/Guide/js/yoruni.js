// 依赖 yoruni.css 文件
// toast显示
function tipShow(mes){
	var as = null,bs = null;
	var oldobj = document.getElementById("tips");
	if (!(oldobj == null)) oldobj.parentNode.removeChild(oldobj);	
	var obj = document.createElement("div");
	obj.id = "tips";
	obj.innerHTML = mes;
	document.body.appendChild(obj);
	as = setTimeout(function(){
		obj.classList.add("active");
	}, 20);
	bs = setTimeout(function(){
		// 短时间内频繁调用此方法会造成此函数内存泄漏，原因浏览器没有及时回收 setTimeout 造成节点对象为 null 的报错，判断上一次调用函数时是否删除了上一次的节点内存，防止报错
		if (obj.parentNode == null) return;
		obj.parentNode.removeChild(obj)
	}, 3000);
};
// 下拉刷新上拉加载
function slideud(option) {
    var defaults = {
        el: '',
        downRefresh: function(e){},
        upload: function(e){}
    };
    var start,
        end,
        length,
        isLock = false, //是否锁定整个操作
        isCanDo = false, //是否移动滑块
        returnTop = false; //返回头部按钮显示值

    var obj = document.querySelector(option.el);
    var loading = obj.firstElementChild;
    var thisListSelf = obj.getElementsByTagName("ul")[0];
    var offset = loading.clientHeight; //获取提示盒子的高度
    var objParent = obj.parentElement;

    var listli = thisListSelf.firstElementChild.clientHeight; // 获取列表单个子元素高度
    var parentClientHeight = objParent.clientHeight; // 获取列表高度与视区差值
    var uploadPos = thisListSelf.clientHeight - parentClientHeight; // 获取列表高度与视区差值

    var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion), //验证客户端的设备类型
        hasTouch = 'ontouchstart' in window && !isTouchPad;
    /*操作方法*/
    var fn = {
        //移动容器
        translate: function (diff) {
            obj.style.webkitTransform = 'translate3d(0,'+diff+'px,0)';
            obj.style.transform = 'translate3d(0,'+diff+'px,0)';
        },
        //设置效果时间
        setTransition: function (time) {
            obj.style.webkitTransition = 'all '+time+'s';
            obj.style.transition = 'all '+time+'s';
        },
        //收起加载提示返回到初始位置
        back: function () {
            fn.translate(-offset);
            isLock = false; //标识操作完成
        }
    };
    // 一系列的拖拽
    fn.translate(-offset);
    obj.addEventListener("touchstart",start);
    obj.addEventListener("touchmove",move);
    obj.addEventListener("touchend",end);

    //滑动开始
    function start(e) {
        if (objParent.scrollTop <= 0 && !isLock) {
            var even = typeof event == "undefined" ? e : event;
            //标识操作进行中
            isLock = true;
            isCanDo = true;
            length = -offset;
            //保存当前鼠标Y坐标
            start = hasTouch ? even.touches[0].pageY : even.pageY;
            //消除滑块动画时间
            fn.setTransition(0);
            loading.innerHTML='下拉刷新数据';
        }
    }

    //滑动中
    function move(e) {
        if (objParent.scrollTop <= 0 && isCanDo) {
            var even = typeof event == "undefined" ? e : event;
            //保存当前鼠标Y坐标
            end = hasTouch ? even.changedTouches[0].pageY : even.pageY;
            if (start < end) {
                even.preventDefault();
                fn.setTransition(0); //消除滑块动画时间
                length += 3;
                if (length > 40) length = 40;
                fn.translate(length);
            }
        }
    }
    //滑动结束
    function end(e) {
        if (isCanDo) {
            isCanDo = false;
            //判断滑动距离是否大于等于指定值
            if (end - start >= offset) {
                fn.setTransition(.4); //设置滑块回弹时间
                fn.translate(0); //保留提示部分
                //执行回调函数
                loading.innerHTML='正在刷新数据';
                if (typeof option.downRefresh == "function") {
                    option.downRefresh.call(fn, e);
                }
            } else {
                //返回初始状态
                fn.back();
            }
        }
    }

    // 监听滚动
    var returnTopBtn = document.getElementById("returnTopBtn");
    var returnTopPos = uploadPos; // 返回顶部判断值

    objParent.addEventListener("scroll",function(){
        // 当页面即将到达页面底部时进行更多数据的加载
        if(objParent.scrollTop >= (uploadPos-1.5*listli)) {
            if (typeof option.upload == "function") {
        		option.upload();
        		// 更新列表定点加载列表值
    			uploadPos = thisListSelf.clientHeight - parentClientHeight;
            };
        };
		if (!returnTop && objParent.scrollTop >= returnTopPos) {
			returnTopBtn.classList.add("active");
			returnTop = true;
		}else if (returnTop && objParent.scrollTop <= returnTopPos) {
			returnTopBtn.classList.remove("active");
			returnTop = false;
		};
    });

    returnTopBtn.addEventListener("touchend",function(){
    	objParent.scrollTop = 0;
    	returnTopBtn.classList.remove("active");
    	returnTop = false;
    	tipShow("已返回顶部");
    });
};