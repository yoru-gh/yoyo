'use strict';
var ajaxURL = URLstr+"user/reg";

var Base = new Base64();

var UN = document.getElementById("username");
var PW = document.getElementById("password");
var RPW = document.getElementById("repassword");
var EM = document.getElementById("email");
var SEX = document.getElementById("sex");
var regButton = document.getElementById("regButton");

regButton.touch(function(event){
	var UNV = UN.value;
	var PWV = PW.value;
	var RPWV = RPW.value;
	var EMV = EM.value;
	var SEXV = "";

	var REG = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");

	SEX.checked == true ? SEXV = "male" : SEXV = "female";
	if (PWV != RPWV) {
		tip.toast("两次输入的密码不一致")
	} else {
		if (!REG.test(EMV) || EMV == "") {
			tip.toast("邮箱格式不正确")
		} else {
			if (UNV == "" || PWV == "" || SEXV == "") {
				tip.toast("请填写完整")
			} else {
				ajax({
					url: ajaxURL, //请求地址
					type: "POST", //请求方式
					data: {
						a: Base.encode(UNV), // name
						b: Base.encode(PWV), // pw
						c: SEXV, // sex
						d: EMV, // email
					},
					success: function (response, xml) {
						tip.toast("注册成功")
						setTimeout(() => {
							// 跳转到用户中心
							cookies.set("CER", response);
							window.location.href = URLstr+"user?"+response;
						}, 2000)
					},
					fail: function (status) {
						console.warn(status)
					}
				})
			}
		}
	}
})