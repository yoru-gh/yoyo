'use strict';
let arr = [3,5,6,8,9];
let result = arr.reduceRight(function(total,num){
	return total - num
});
console.log(result);