$(function(){
	var save = document.getElementById("save");
		
	save.addEventListener("tap", function(){
		mui.toast("保存成功")
	});

	//更换头像
	mui("body").on("tap", "#selimg", function(e) {
		if(mui.os.plus){
			var a = [{
				title: "拍照"
			}, {
				title: "从手机相册选择"
			}];
			plus.nativeUI.actionSheet({
				title: "修改头像",
				cancel: "取消",
				buttons: a
			}, function(b) {
				switch (b.index) {
					case 0:
						break;
					case 1:
						getImage();
						break;
					case 2:
						galleryImg();
						break;
					default:
						break
				}
			})	
		}		
	});
	// 拍照获取图片
	function getImage() {
		var c = plus.camera.getCamera();
		c.captureImage(function(e) {
			plus.io.resolveLocalFileSystemURL(e, function(entry) {
				var s = entry.toLocalURL() + "?version=" + new Date().getTime();
				console.log(s);
				document.getElementById("usertou").src = s;
			}, function(e) {
				console.log("读取拍照文件错误：" + e.message);
			});
		}, function(s) {
			console.log("error" + s);
		}, {
			filename: "_doc/tou.jpg"
		})
	}
	// 相册获取图片
	function galleryImg() {
		plus.gallery.pick(function(a) {
			plus.io.resolveLocalFileSystemURL(a, function(entry) {
				plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
					root.getFile("tou.jpg", {}, function(file) {
						//文件已存在
						file.remove(function() {
							console.log("file remove success");
							entry.copyTo(root, 'tou.jpg', function(e) {
									var e = e.fullPath + "?version=" + new Date().getTime();
									document.getElementById("usertou").src = e;
								},
								function(e) {
									console.log('copy image fail:' + e.message);
								});
						}, function() {
							console.log("delete image fail:" + e.message);
						});
					}, function() {
						//文件不存在
						entry.copyTo(root, 'tou.jpg', function(e) {
								var path = e.fullPath + "?version=" + new Date().getTime();
								document.getElementById("usertou").src = path;
							},
							function(e) {
								console.log('copy image fail:' + e.message);
							});
					});
				}, function(e) {
					console.log("get _www folder fail");
				})
			}, function(e) {
				console.log("读取拍照文件错误：" + e.message);
			});
		}, function(a) {}, {
			filter: "img"
		})
	};

});
