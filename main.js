// 前缀树专题
// https://leetcode-cn.com/problems/word-break/
// https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/
// https://leetcode-cn.com/problems/map-sum-pairs/
// https://leetcode-cn.com/problems/lexicographical-numbers/
// https://leetcode-cn.com/problems/top-k-frequent-words/
// https://leetcode-cn.com/problems/camelcase-matching/
// https://leetcode-cn.com/problems/complex-number-multiplication/
// https://leetcode-cn.com/problems/insert-interval/

// todo
// LRU缓存机制 + 跳表 + 拓扑排序
// https://leetcode-cn.com/problems/heaters/
// https://leetcode-cn.com/problems/battleships-in-a-board/
// https://leetcode-cn.com/problems/find-the-town-judge/
// https://leetcode-cn.com/problems/poor-pigs/
// https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/
// https://leetcode-cn.com/problems/course-schedule-iii/
// https://leetcode-cn.com/problems/loud-and-rich/
// https://leetcode-cn.com/problems/maximum-number-of-visible-points/
// https://leetcode-cn.com/problems/longest-duplicate-substring/
// https://leetcode-cn.com/problems/maximum-number-of-eaten-apples/

const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
const node5 = new ListNode(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
// node4.next = node5;

const line0 = new ListNode(2);
const line1 = new ListNode(1);
const line2 = new ListNode(2);
const line3 = new ListNode(-3);
const line4 = new ListNode(1);

line0.next = line1;
line1.next = line2;
line2.next = line3;
line3.next = line4;


// https://leetcode-cn.com/problems/count-complete-tree-nodes/
// https://leetcode-cn.com/problems/binary-search-tree-to-greater-sum-tree/
let tree0 = new TreeNode(2);
let tree1 = new TreeNode(1);
let tree2 = new TreeNode(3);
tree0.left = tree1;
tree0.right = tree2;


// https://leetcode-cn.com/tag/monotonic-stack/problemset/
// https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters/
// https://leetcode-cn.com/problems/next-greater-element-ii/
// https://leetcode-cn.com/problems/largest-rectangle-in-histogram/
// https://blog.csdn.net/lucky52529/article/details/89155694


 let arr1 = [100, 3, 67];
    let arr2 = [100, 3, 67, 1, 5];
    let arr20 = [100, 67, 1, 5];
    let arr21 = [100, 2, 3, 2, 1, 67];

    let arr22 = [100, 3, 2, 65, 67];
    let arr33 = [5, 0, 1, 2, 0, 2];

    function fn(arr, left, right) {
      let min = Math.min(arr[left], arr[right])
      let total = 0;
      for (let i = left + 1; i < right; i++) {
        total += (min - arr[i])
      }
      return total;
    }

    var trap = function(height) {
      let len = height.length;
      if (len < 3) {
        return 0;
      }
      let r = 0;
      let left = 0,
        right = 1;
      let has = false;
      while (left < len - 1) {
        if (height[right] < height[left]) {
          // 到最右边了
          if (right === len - 1) {
            // 是否可积水
            let shape = true;
            // 分两种情况，右界是否和左界，都大于中间的数，如果是计算，否则移动左指针
            for (let i = left + 1; i < right; i++) {
              if (height[right] <= height[i]) {
                shape = false;
                break;
              }
            }

            // 完全闭合为 V
            if (shape) {
              r += fn(height, left, right)
              break;
            } else {
              // 如果没闭合，要考虑 todo

              left++;
              right = left + 1;
            }
          } else {
            right++;
          }
        } else {
          // 闭合为 V型, 正常计算
          r += fn(height, left, right)
          left = right;
          right = left + 1;
        }
      }
      return r;
    };