// 1.算法题：https://leetcode-cn.com/problems/find-bottom-left-tree-value/submissions/
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
 var findBottomLeftValue = function(root) {
    const arr = []
    function loop(root,deep){
        if(root == null) return
        if(!arr[deep]) {
            arr[deep] = []
        }
        arr[deep].push(root.val)
        if(root.left) loop(root.left,deep+1)
        if(root.right) loop(root.right,deep+1)    
    }
    loop(root,0)
    return arr[arr.length-1][0]
};