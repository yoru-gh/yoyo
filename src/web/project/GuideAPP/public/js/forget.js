$(function(){
	var time = 60,
		resetbtn = document.getElementById("reset");
		
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
    
    resetbtn.addEventListener("tap", function(){
		mui.toast('还没页面');
	});
});
