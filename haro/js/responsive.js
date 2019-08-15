'use strict';
var UA = navigator.userAgent;
var Machine = "";
if (UA.indexOf("Android") > -1) {
	Machine = UA.split("Mozilla/5.0 (")[1].split("Build")[0].split(";");
	Machine = Machine[Machine.length-1];
} else if (UA.indexOf("Mac OS X") > -1 || UA.indexOf("iPad") > -1) {
	if (UA.indexOf("Device/Apple") > -1) {
		Machine = UA.split("Device/Apple(")[1].split(")")[0];
	} else {
		Machine = UA.split("Mozilla/5.0 (")[1].split(";")[0];
	}
} else {
	Machine = "请使用移动设备打开"
}

var Driver = document.getElementById("Driver");
Driver.innerText += Machine;

var Vconsole = document.getElementById("Vconsole");
var val = Vconsole.offsetHeight;
// iPhone6/7/8 PPI=326, DPR=2 2.75vw≈10px
// iPhone6/7/8 Plus PPI=401, DPR=3 2.75vw≈11px
// MI6 PPI=428, DPR=3 2.75vw≈10px
var txt = "1vw = "+Vconsole.clientWidth*.1
		+"<br>1rem = "+val+"px"
		+"<br>DPR: "+window.devicePixelRatio
		+"<br>WH: "+screen.availWidth+"*"+screen.availHeight
		+"<br>UA: "+navigator.userAgent
		// +"<br>AV: "+navigator.appVersion
		+"<br>UP: "+navigator.platform;

Vconsole.innerHTML = txt;