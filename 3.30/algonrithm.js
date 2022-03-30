// 2.算法题：https://leetcode-cn.com/problems/design-a-stack-with-increment-operation/
/**
 * @param {number} maxSize
 */
let arr = []
let index = -1;
let max = 0
var CustomStack = function(maxSize) {
    max = maxSize
};
CustomStack.prototype.push = function(x) {
    if(index<max -1){
        arr[++index]=x
    }
    return arr
};
CustomStack.prototype.pop = function() {
    if(index>=0){
        index--
        return arr[index+1]
    }else{
        return -1
    }
};
CustomStack.prototype.increment = function(k, val) {
    let lim = Math.min(k, index + 1)
	for(let i = 0; i < lim; ++i) {
		arr[i] += val;
	}
    return arr
};

// 版本2
// var CustomStack = function(maxSize) {
//     this.arr =[]
//     this.maxlength=maxSize
// };

// /** 
//  * @param {number} x
//  * @return {void}
//  */
// CustomStack.prototype.push = function(x) {
//     if(this.maxlength>this.arr.length) this.arr.push(x)
// };

// /**
//  * @return {number}
//  */
// CustomStack.prototype.pop = function() {
//     return this.arr.pop() || -1
// };

// /** 
//  * @param {number} k 
//  * @param {number} val
//  * @return {void}
//  */
// CustomStack.prototype.increment = function(k, val) {
//     for(let i=0;i<k&&i<this.arr.length;i++){
//         this.arr[i]+=val
//     }
//     return this.arr
// };