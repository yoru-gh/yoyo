var edit = document.getElementById("edit");	
edit.addEventListener("tap", function(){
	mui.openWindow({
		id: 'mesedit.html',
	    url: 'mesedit.html',
	    styles:{top:'0px',bottom:'0px',bounce:'vertical',hardwareAccelerated: true},
	    extras:{},
	    createNew:false,
	    show:{autoShow:true,aniShow:'slide-in-right',duration:200},
	    waiting:{autoShow: true}
	})
});
