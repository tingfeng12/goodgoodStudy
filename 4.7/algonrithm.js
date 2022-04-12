// 算法题：https://leetcode-cn.com/problems/rotate-list/
// 思路 将链表形成闭环 然后切割 （中间判断偏移量是否是链表长度的倍数 是的话直接返回原链表即可）
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if(k===0 || !head || !head.next){
        return head
    }
    let n=1;
    let cur = head
    while(cur.next){
        cur=cur.next;
        n++;
    }
    let add = n- k%n;
    if(add === n){
        return head
    }
    cur.next=head;
    while(add){
        cur=cur.next
        add--
    }
    const res = cur.next
    cur.next = null
    return res
};