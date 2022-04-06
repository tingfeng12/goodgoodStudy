// 1.算法题：https://leetcode-cn.com/problems/max-chunks-to-make-sorted-ii/
/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function(arr) {
    const stort =[...arr].sort((a,b) => a-b)

    let count = 0;
    let sum1=0;
    let sum2=0;
    for(let i=0;i<arr.length;i++){
        sum1+=arr[i]
        sum2+= stort[i]
        if(sum1 === sum2){
            count++
        }
    }
    return count
};