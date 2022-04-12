// 1.算法题：https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
 const sortedListToBST = (head) => {
    if (head == null) return null;
    let slow = head;
    let fast = head;
    let preSlow; // 保存slow的前一个节点
  
    while (fast && fast.next) {
      preSlow = slow;        // 保存当前slow
      slow = slow.next;      // slow走一步
      fast = fast.next.next; // fast走两步
    }
    const root = new TreeNode(slow.val);     // 根据slow指向的节点值，构建节点
  
    if (preSlow != null) {   // 如果preSlow有值，即slow左边有节点，需要构建左子树
      preSlow.next = null;   // 切断preSlow和中点slow
      root.left = sortedListToBST(head);     // 递归构建左子树
    }
    root.right = sortedListToBST(slow.next); // 递归构建右子树
    return root;
  };