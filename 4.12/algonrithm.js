// 1.算法题：https://leetcode-cn.com/problems/intersection-of-two-linked-lists/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
    const list = new Set()
    let temp = headA
    while(temp !== null){
        list.add(temp)
        temp = temp.next
    }
    temp = headB
    while(temp !== null){
        if(list.has(temp)){
            return temp
        }
        temp = temp.next
    }
    return null
};
