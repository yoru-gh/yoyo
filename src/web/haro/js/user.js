'use strict';
var insertButton = document.getElementById("insertButton");
var deleteButton = document.getElementById("deleteButton");
var findButton = document.getElementById("findButton");
var updateButton = document.getElementById("updateButton");

insertButton.touch(function(event){
	ajax({
		url: "http://192.168.0.37:8860/insert", //请求地址
		type: "PUT", //请求方式
		success: function (response, xml) {
			tip.toast(response)
			console.log(response)
		},
		fail: function (status) {
			console.warn(status)
		}
	});
})

deleteButton.touch(function(event){
	ajax({
		url: "http://192.168.0.37:8860/delete", //请求地址
		type: "DELETE", //请求方式
		success: function (response, xml) {
			tip.toast(response)
			console.log(response)
		},
		fail: function (status) {
			console.warn(status)
		}
	});
})

findButton.touch(function(event){
	ajax({
		url: "http://192.168.0.37:8860/find", //请求地址
		type: "GET", //请求方式
		success: function (response, xml) {
			tip.toast("FIND OK")
			console.log(JSON.parse(response))
		},
		fail: function (status) {
			console.warn(status)
		}
	});
})

updateButton.touch(function(event){
	ajax({
		url: "http://192.168.0.37:8860/update", //请求地址
		type: "POST", //请求方式
		success: function (response, xml) {
			tip.toast(response)
			console.log(response)
		},
		fail: function (status) {
			console.warn(status)
		}
	});
})
