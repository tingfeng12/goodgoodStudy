// 1.手写算法：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
let getsum = function (root,sum) {
    if(root == null){
       return 0
   }
   sum = sum * 10 + root.val
   if(root.left == null && root.right == null){
       return sum
   }else{
       return getsum(root.left,sum)+getsum(root.right,sum)
   }

}
var sumNumbers = function(root) {
   return getsum(root,0)
};