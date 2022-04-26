// 1.算法题：https://leetcode-cn.com/problems/linked-list-cycle-ii/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var detectCycle = function(head) {
    const visited = new Set();
    while (head !== null) {
        if (visited.has(head)) {
            return head;
        }
        visited.add(head);
        head = head.next;
    }
    return null;
};