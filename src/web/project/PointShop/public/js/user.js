$(document).ready(function(){
	// 点击编辑用户名
	$("#editid").on('click', function(event) {
		event.preventDefault();
		if ($(this).attr("value")=="true") {
			$(this).attr("value",false);
			$(this).text("确定");
			$("#editBox").val($("#userId").text());
			$("#editBox").show();
			$("#editBox").focus();
		}else{
			$(this).attr("value",true);
			$(this).text("编辑");
			$("#userId").text($("#editBox").val());
			$("#editBox").hide();
			$("#editBox").blur();
		}
	});
});