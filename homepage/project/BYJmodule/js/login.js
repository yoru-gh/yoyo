setTimeout(function(){
	tip("直接点击登录即可",5000)
}, 500);

var submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', function(event){
	event.preventDefault();
	window.location.href = "index.html"
})


// var mBase64 = new Base64();
// var mLib = Config["CurrentLib"];

// function getSearchParamObj() {
// 	var iSearch = decodeURIComponent(window.location.search.substring(1));
// 	var iRegx = /([\d\w\_\$]+)=([^=^&]+)/g
// 	var iObj = {};
// 	while (r = (iRegx.exec(iSearch))) {
// 		iObj[r[1]] = r[2];
// 	}
// 	return iObj;
// }
// var iSearchObj = getSearchParamObj();

// $("#cardNumber").val(iSearchObj["a"] || "");
// $("#userName").val(iSearchObj["b"] || "");

// $("#form").submit(function(){
// 	var $cardNumber = $("#cardNumber").val();
// 	var $userName = $("#userName").val();
// 	// $.getJSON("http://if4.zhaobenshu.com:7781/Track/track_ifc_Byj_Login.ashx?a=[Lib={{"+mLib+"}}][PName={{"+$userName+"}}][CardNo={{"+$cardNumber+"}}][LoginType={{}}]",
// 	$.getJSON("http://if4.zhaobenshu.com:7781/Track/track_ifc_Byj_Login.ashx?a=[Lib={{gdut}}][PName={{周建辉}}][CardNo={{3113002540}}][LoginType={{}}]",
// 		function (json) {
// 			if (json["error"] != 0) {
// 				tip(json["errorname"])
// 				return false;
// 			}
// 			var iPatronRd = json["PatronRd"];
// 			setCookie('PatronRd', iPatronRd);
// 			// setCookie('TrackLib', mLib);
// 			// setCookie('PName', $userName);
// 			// setCookie('Cardno', $cardNumber);
// 			setCookie('TrackLib', "gdut");
// 			setCookie('PName', "周建辉");
// 			setCookie('Cardno', "3113002540");
// 			// location.href = "index.html?a=" + $cardNumber + "&b=" + iPatronRd + "&c=" + mLib + "&d=" + mBase64.encode($userName);
// 			location.href = "index.html";
// 		}
// 	)
// 	return false;
// })