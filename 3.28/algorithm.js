// https://leetcode-cn.com/problems/add-to-array-form-of-integer/
/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
// 版本1 
// 思路 将k转化成数组 补全数组空位补0 然后从后向前计算  进位保留 
var addToArrayForm = function(num, k) {
    k = (k+'').split('')
    if(num.length>k.length){
        k.unshift(...(new Array(num.length - k.length).fill(0)))
    }else{
        num.unshift(...(new Array(k.length - num.length).fill(0)))
    }
    let jinwei = 0
    let newarr = []
    for(let i=num.length-1;i>=0;i--){
        let add = k[i]*1+num[i]+jinwei
        newarr[i] = add%10
        jinwei = Math.floor(add/10)
        if(i==0 && jinwei>0){
            newarr.unshift(jinwei)
        }
    }
    return newarr
};
// 版本2
var addToArrayForm = function(num, k) {
    let add = 0;
    let newarr =[]
    let jinwei = 0
    for(let i=num.length-1;i>=0;i--){
        add = num[i]+k%10+jinwei
        k = Math.floor(k/10)
        if(add >= 10){
            add -= 10
            jinwei = 1
        }else{
            jinwei = 0
        }
        newarr.unshift(add)
    }
    k+=jinwei
    for(;k>0;k=Math.floor(k/10)){
        newarr.unshift(k%10)
    }
    console.log(newarr)
    return newarr
};


// 版本3
var addToArrayForm = function (num, k) {
    let newarr = []
    let n = num.length - 1;
    for (let i = n; i >= 0; --i) {
        let sum = num[i] + k % 10
        k = Math.floor(k / 10)
        if (sum >= 10) {
            sum -= 10;
            k++
        }
        newarr.unshift(sum)
    }
    for (; k > 0; k = Math.floor(k / 10)) {
        newarr.unshift(k % 10)
    }
    return newarr
};
// 版本4
var addToArrayForm = function (num, k) {
    let res = [];
    let n = num.length;
    for (let i = n - 1; i >= 0; --i) {
        let sum = num[i] + k % 10;
        k = Math.floor(k / 10);
        if (sum >= 10) {
            k++;
            sum -= 10;
        }
        res.push(sum);
    }
    for (; k > 0; k = Math.floor(k / 10)) {
        res.push(k % 10);
    }
    res.reverse();
    return res
};

// unshift操作比push 之后再reverse的执行时间长
// 版本5
var addToArrayForm = function(num, k) {
    for(let i = num.length-1;i>=0;i--){
        num[i]=num[i]+k%10
        if(num[i]>=10){
            num[i]-=10;
            k=Math.floor(k/10)+1
        }else{
            k=Math.floor(k/10)
        }
    }
    for(;k>0;k=Math.floor(k/10)){
        num.unshift(k%10)
    }
    return num
};
// 同一思路 可以将计算的数据使用k进行存储 
// 版本6

var addToArrayForm = function(num, k) {
    for(let i = num.length-1;i>=0||k>0;i--,k=Math.floor(k/10)){
        if(i>=0){
            k=k+num[i]
            num[i]=k%10
        }else{
            num.unshift(k%10)
        }
    }
    return num
};

// 算法题可以不使用额外的空间  见版本5

// ...如何用es5实现
//  ...的实现原理









