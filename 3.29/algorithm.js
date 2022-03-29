// 1.手写算法
// https://leetcode-cn.com/problems/shortest-distance-to-a-character
// ⼊选理由
// ①仍然是⼀道简单题，不过⽐昨天的题⽬难度增加⼀点
// ②虽然这是⼀个字符串的题⽬，但其实字符串和数组没有本质差别。
// 版本1
// 先获取每一项i的位置 然后计算距离 边界使用无穷进行代替
/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function(s, c) {
    s = s.split('')
    let arr = []
    let iarr = [-Infinity]
    for(let i=0;i<s.length;i++){
        if(s[i]===c){
            iarr.push(i)
        }
    }
    iarr.push(Infinity);
    for(let i =0;i< s.length;i++){
        if(s[i] === c){
            iarr.shift()
            arr.push(0)
        }else{
            arr.push(Math.min(i-iarr[0],iarr[1]-i))
        }
        
    }
    return arr
};