'use strict';
var invain = document.getElementById("invain");
var groupList = document.getElementsByClassName("group");
var checkboxArr = new Array(); // this.length == groupList.length
var productArr = new Array(); // this.length == groupList.length
function refreshList(){
	checkboxArr = new Array();
	productArr = new Array();
	for (var i = 0; i < groupList.length; i++) {
		// checkbox 数组
		checkboxArr[i] = groupList[i].getElementsByClassName("check");
		// 捆绑 checkbox 跟商品数量价格
		productArr[i] = {
			checkbox: checkboxArr[i],
			count: groupList[i].getElementsByClassName("count"), // 商品数量价格数组
			quantity: 0, // 当前组选中商品数量合计
			sum: 0, // 当前组选中商品总价
		}

		productArr[i].checkbox[0].setAttribute("index", i) // 所属组的索引
		productArr[i].checkbox[0].setAttribute("count", 0) // 所属组下除自身外选中项

		for (var x = 1; x < productArr[i].checkbox.length; x++) {
			productArr[i].checkbox[x].setAttribute("index", i) // 所属组的索引
			productArr[i].checkbox[x].setAttribute("sequence", x) // 当前组下自身的索引
		}
	}
	if (productArr.length == 0) {
		checkboxAll.checked = false;
		invain.classList.add('active')
	}
}
refreshList()

// 数量修改绑定
var countList = document.getElementsByClassName("count");
var countChangeInput = document.getElementById("countChangeInput");
for (var i = 0; i < countList.length; i++) {
	countList[i].touch(function(event){
		var target = event.target;
		// var nowVal = parseInt(this.children[1].value) || 1;
		var nowVal = parseInt(this.children[1].getAttribute("value")) || 1;
		if (target == this.children[0]) {
			if (nowVal > 1) {
				// this.children[1].value = nowVal - 1;
				this.children[1].setAttribute("value",nowVal-1);
				this.children[1].innerText = nowVal-1;
			}
		} else if (target == this.children[1]) {
			// 唤起模拟键盘等操作
			var spanVal = parseInt(this.children[1].getAttribute("value"));
			countChangeInput.value = spanVal;
			keyArr = [spanVal];
			this.children[1].classList.add("mark");
			countChange.classList.add("active")
		} else if (target == this.children[2]) {
			// this.children[1].value = nowVal + 1;
			this.children[1].setAttribute("value",nowVal+1);
				this.children[1].innerText = nowVal+1;
		}

		// 记录数量及总价
		var price = parseInt(this.getAttribute("price"));
		this.setAttribute("quantity",this.children[1].getAttribute("value"));
		this.setAttribute("sum",parseInt(this.children[1].getAttribute("value"))*price);

		calcCheckedProduct()
	})
}

// 全选绑定
// 组
for (var x = 0; x < checkboxArr.length; x++) {
	checkboxArr[x][0].addEventListener("change", function(){
		var index = this.getAttribute("index");
		if (this.checked) {
			for (var y = 0; y < checkboxArr[index].length; y++) {
				checkboxArr[index][y].checked = true;
			}
			this.setAttribute("count", checkboxArr[index].length-1)
		} else {
			for (var y = 0; y < checkboxArr[index].length; y++) {
				checkboxArr[index][y].checked = false;
			}
			this.setAttribute("count", 0)
		}

		checkAllCheckbox()

		calcCheckedProduct()
	})
	// 每组下，从 1 开始原因不重复绑定 title 下的 checkbox
	for (var y = 1; y < checkboxArr[x].length; y++) {
		var isbind = checkboxArr[x][y].getAttribute("bind");
		var index = checkboxArr[x][0].getAttribute("index");
		checkboxArr[x][y].addEventListener("change", function(){
			// console.log(this)
			var index = this.getAttribute("index");
			var sequence = this.getAttribute("sequence");
			var count = parseInt(checkboxArr[index][0].getAttribute("count")) || 0;
			if (this.checked) {
				count++
			} else {
				count--
			}

			if (count == checkboxArr[index].length-1) {
				checkboxArr[index][0].checked = true;
			} else {
				checkboxArr[index][0].checked = false;
			}

			checkboxArr[index][0].setAttribute("count",count)

			checkAllCheckbox()

			calcCheckedProduct()
		})
	}
}
// 结算全选按钮
var checkboxAll = document.getElementById("checkboxAll");
checkboxAll.addEventListener("change", () => {
	if (checkboxArr.length == 0) {
		tip.toast("糟了！什么都没有了！")
	} else {
		if (checkboxAll.checked) {
			for (var x = 0; x < checkboxArr.length; x++) {
				for (var y = 0; y < checkboxArr[x].length; y++) {
					checkboxArr[x][y].checked = true;
				}
				checkboxArr[x][0].setAttribute("count",checkboxArr[x].length-1)
			}
		} else {
			for (var x = 0; x < checkboxArr.length; x++) {
				for (var y = 0; y < checkboxArr[x].length; y++) {
					checkboxArr[x][y].checked = false;
				}
				checkboxArr[x][0].setAttribute("count",0)
			}
		}
		calcCheckedProduct()
	}
})
// 循环查找 checkbox 判断是否全选
function checkAllCheckbox(){
	var checkedCount = 0;
	for (var x = 0; x < checkboxArr.length; x++) {
		if(checkboxArr[x][0].checked){
			checkedCount++
		}
	}
	if (checkedCount == checkboxArr.length) {
		checkboxAll.checked = true;
	} else {
		checkboxAll.checked = false;
	}
}
// 计算选中商品的数量及总价
var orderPrice = document.getElementById("orderPrice");
var orderQuantity = document.getElementById("orderQuantity");
function calcCheckedProduct(){
	if (checkboxArr.length == 0) {
		orderPrice.innerHTML = "合计：￥<i>0</i>.00<b>无优惠券可用</b>";
		orderQuantity.innerText = "(0)";
	} else {
		var orderPriceSum = 0;
		var orderQuantitySum = 0;
		for (var i = 0; i < productArr.length; i++) {
			productArr[i].price = productArr[i].quantity = productArr[i].sum = 0;
			for (var x = 1; x < productArr[i].checkbox.length; x++) {
				var target = productArr[i].checkbox[x];
				if (target.checked) {
					// var inx = [target.getAttribute("index"),target.getAttribute("sequence")];
					var box = productArr[i].count[x-1]; // 选中项的计算数量 box
					// var price = parseInt(box.getAttribute("price"));
					var quantity = parseInt(box.getAttribute("quantity"));
					var sum = parseInt(box.getAttribute("sum"));
					// productArr[i].price += price;
					productArr[i].quantity += quantity;
					productArr[i].sum += sum;
				} else {

				}
			}
			orderQuantitySum += productArr[i].quantity;
			orderPriceSum += productArr[i].sum;
		}
		// 合计
		if (checkboxArr[0][1].checked) {
			// 有优惠券时
			orderPrice.innerHTML = "合计：￥<i>"+orderPriceSum+"</i>.00<b>已优惠￥"+30+"</b>";
		} else {
			orderPrice.innerHTML = "合计：￥<i>"+orderPriceSum+"</i>.00<b>无优惠券可用</b>";
		}
		
		orderQuantity.innerText = "("+orderQuantitySum+")";
	}
}

// 获取选中商品
function getChecked(){
	var checkedCount = 0;
	calcCheckedProduct()
	for (var i = 0; i < productArr.length; i++) {
		checkedCount = checkedCount + productArr[i].quantity;
	}
	return checkedCount
}

// 结算按钮
var getOrder = document.getElementById("getOrder");
getOrder.touch(() => {
	// console.log(productArr)
	tip.toast("该功能尚未开放")
})

// 移入收藏
var setCollection = document.getElementById("setCollection");
setCollection.touch(() => {
	tip.toast("该功能尚未开放")
})

// 移出购物车
var removeProduct = document.getElementById("removeProduct");
removeProduct.touch(() => {
	if (checkboxArr.length == 0) {
		tip.toast("糟了！什么都没有了！")
	} else {
		// 获取选中的 piece
		var pieceArr = new Array();
		var checkedCount = 0;

		calcCheckedProduct()

		for (var i = 0; i < productArr.length; i++) {
			checkedCount = checkedCount + productArr[i].quantity;
			for (var x = 0; x < productArr[i].checkbox.length; x++) {
				if (productArr[i].checkbox[x].checked) {
					var Obj = productArr[i].checkbox[x].parentNode.parentNode;
					if (Obj.classList.value.indexOf('title') > -1) {
						// 当前组全选状态下只记录整个 group
						pieceArr[pieceArr.length] = Obj.parentNode;
						x = productArr[i].checkbox.length - 1;
					} else {
						pieceArr[pieceArr.length] = Obj;
					}
				}
			}
		}

		if (checkedCount == 0) {
			tip.toast("没有选中的宝贝")
		} else {
			tip.dialog({
				type: 'confirm',
				txt: '真的不买这'+checkedCount+'件便宜得不要钱似的的宝贝么',
				sure: () => {
					// 添加移除动画并移除
					for (var i = 0; i < pieceArr.length; i++) {
						pieceArr[i].classList.add("active")
					}
					window.setTimeout(() => {
						for (var i = 0; i < pieceArr.length; i++) {
							pieceArr[i].remove()
						}
						refreshList()
						calcCheckedProduct()
					}, 400)
				}
			})
		}
	}
})

// 编辑按钮
var edit = document.getElementById("edit");
var buttonBox = document.getElementById("buttonBox");
edit.touch(function(){
	var isActive = this.getAttribute("active");
	if (isActive == "false") {
		this.setAttribute("active",true);
		this.classList.add("active");
		buttonBox.classList.add("active");
	} else {
		this.setAttribute("active",false);
		this.classList.remove("active");
		buttonBox.classList.remove("active");
	}
})

// 修改数量窗
var countChange = document.getElementById("countChange");
var countWrap = document.getElementById("countWrap");
var closeKeyboard = document.getElementById("closeKeyboard");
var keyboardCompleted = document.getElementById("keyboardCompleted");
countChange.addEventListener("touchmove", event => {
	event.preventDefault()
}, {passive: false})
countWrap.touch(event => {
	var target = event.target;
	if (target.id == "countWrap") {
		countChange.classList.remove("active");
		// keyboard.classList.remove("active");
		document.getElementsByClassName("mark")[0].classList.remove("mark");
	}
})
// 取消修改数量
closeKeyboard.touch(event => {
	countChange.classList.remove("active");
	// keyboard.classList.remove("active");
	document.getElementsByClassName("mark")[0].classList.remove("mark");
})
// 修改数量完成
keyboardCompleted.touch(event => {
	keyboardInputComplete()
})

var keyboard = document.getElementById("keyboard");
keyboard.addEventListener("touchmove", event => {
	event.preventDefault()
}, {passive: false})

// 修改数量窗的数量操作
var keyPlus = document.getElementById("keyPlus");
var keyMinus = document.getElementById("keyMinus");
keyPlus.touch(() => {
	var val = parseInt(countChangeInput.value);
	if (val >= 9999) {
		tip.toast("醒醒超出您的购买能力了")
	} else {
		val += 1;
	}
	countChangeInput.value = val;
	keyArr = String(val).split("");
})
keyMinus.touch(() => {
	var val = parseInt(countChangeInput.value);
	if (val == 1) {
		tip.toast("不能再减少了")
	} else {
		val -= 1;
	}
	countChangeInput.value = val;
	keyArr = String(val).split("");
})

// 键盘操作
var keyArr = new Array(); // 储存输入值数组
var keyList = document.getElementById("keyList");
keyList.touch(event => {
	var thisData = event.target.getAttribute("data");
	switch(thisData){
		case "0": getKeyboardValue(0); break;
		case "1": getKeyboardValue(1); break;
		case "2": getKeyboardValue(2); break;
		case "3": getKeyboardValue(3); break;
		case "4": getKeyboardValue(4); break;
		case "5": getKeyboardValue(5); break;
		case "6": getKeyboardValue(6); break;
		case "7": getKeyboardValue(7); break;
		case "8": getKeyboardValue(8); break;
		case "9": getKeyboardValue(9); break;
		case "back": getKeyboardValue(thisData); break;
		case "complete": getKeyboardValue(thisData); break;
	}
})
function getKeyboardValue(val){
	if (val == "back") {
		if (keyArr.length == 1) {
			keyArr[0] = 1;
		} else {
			keyArr.pop();
		}
		countChangeInput.value = parseInt(keyArr.join(""));
	} else if (val == "complete") {
		// 完成按钮
		keyboardInputComplete()
	} else {
		if (keyArr[0] == 1) {
			keyArr[0] = val;
		} else {
			if (keyArr.length == 4) {
				tip.toast("目前不支持1W+")
			} else {
				keyArr.push(val);
			}
		}
		countChangeInput.value = parseInt(keyArr.join(""));
	}
}

// 数字模拟键盘输入完成
function keyboardInputComplete(){
	var lastVal = parseInt(keyArr.join(""));
	var mark = document.getElementsByClassName("mark")[0];
	var markParent = mark.parentNode;
	var price = parseInt(markParent.getAttribute("price"));
	markParent.setAttribute("quantity", lastVal);
	markParent.setAttribute("sum", lastVal*price);
	mark.setAttribute("value", lastVal);
	mark.innerText = lastVal;

	countChange.classList.remove("active");
	// keyboard.classList.remove("active");
	mark.classList.remove("mark");

	calcCheckedProduct()
}