window.addEventListener("load",function(){
	var time = 60,
		register = document.getElementById("register");
		
    function settime(obj) {
        if (time == 0) {
            obj.innerHTML = "重新获取验证码";
            obj.setAttribute("value",true); 
            time = 60;
        } else { 
            obj.innerHTML = "重新发送 " + time; 
            time--;
            var timer = setTimeout(function() {
                settime(obj);
            },1000);
        };       
    };
    document.getElementById("validate").onclick = function(){
        if (this.getAttribute("value") == "true") {
            this.setAttribute("value",false);
            settime(this);
        }   
    };
    
    register.addEventListener("tap", function(){
		mui.toast('还没页面');
	});
})
