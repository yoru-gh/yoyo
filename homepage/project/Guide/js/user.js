window.addEventListener("load",function(){
	// 上传头像
	var updataBtn = document.getElementById("updataBtn");
	var usertou = document.getElementById("usertou");
	var pic = document.getElementById("pic");
	updataBtn.addEventListener("change", function(){
		var files = this.files;
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var imageType = /^image\//;
			if ( !imageType.test(file.type) ) {
				tipShow("请选择图片文件")
				continue;
			}
			var reader = new FileReader();
			reader.addEventListener("load",function(event){
				pic.src = event.target.result;
			})
			reader.readAsDataURL(file);
		}
	})
})
