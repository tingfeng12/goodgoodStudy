// 1.算法题：https://leetcode-cn.com/problems/implement-queue-using-stacks/
var MyQueue = function() {
    this.arr1 = []
    this.arr2 = []
};
/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    while(!this.arr2.length==0){
        this.arr1.push(this.arr2.pop())
    }
    this.arr1.push(x)
    return this.arr1
};
/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    while(this.arr1.length != 0){
        this.arr2.push(this.arr1.pop())
    }
    return this.arr2.pop()
};
/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.arr1[0]||this.arr2[this.arr2.length-1]
};
/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.arr1.length===0&&this.arr2.length==0
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */