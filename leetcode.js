/**
 * @title 链表节点
 * @param {*} val 
 * @param {*} next 
 * @returns 
 */
function ListNode(val, next) {
  const node = Object.create(null);
  node.val = val === undefined ? 0 : val;
  node.next = next === undefined ? null : next;
  return node;
}

/**
 * @title 二叉树节点
 * @param  val 
 * @param  left 
 * @param right 
 */
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @title 前缀树
 * @returns 
 */
function TrieNode() {
  const res = Object.create(null);
  const nodes = Object.create(null);
  res.nodes = nodes;
  return res;
}

class Trie {
  constructor(data) {
    this.root = TrieNode();
    data.forEach((str) => {
      this.insert(this.root, str);
    });
  }

  insert(node = this.root, str, index = 0) {
    // 到最后一个字符
    if (index > str.length - 1) {
      return;
    }
    let word = str[index];
    let n = node.nodes[word];
    if (!n) {
      n = TrieNode();
      node.nodes[word] = n;
    }
    this.insert(n, str, index + 1);
  }

  find(str, nodes = this.root.nodes, index = 0) {
    if (str.length === index) {
      return true;
    }
    const word = str[index];
    const n = nodes[word];
    if (!n) {
      return false;
    }
    return this.find(str, n.nodes, index + 1);
  }
}

const TreeUtils = {
  /**
   * @title 二叉树层次遍历
   * @param {*} tree 
   * @returns array
   */
  layerWalk: (tree) => {
    let result = [];
    if (tree) {
      tree.level = 0;
      let t = [tree];
      while (t.length) {
        let n = t.shift();
        let {
          level
        } = n;
        if (!result[level]) {
          result[level] = []
        }
        result[level].push(n.val)
        if (n.left !== null) {
          n.left.level = level + 1;
          t.push(n.left)
        }
        if (n.right !== null) {
          n.right.level = level + 1;
          t.push(n.right)
        }
      }
    }
    return result;
  }
}

const StringUtils = {
  /**
   * @title 字符串 hash化
   * @param string str 
   * @returns Map
   */
  toMap: (str) => {
    let map = {};
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (map[char]) {
        map[char]++;
      } else {
        map[char] = 1;
      }
    }
    return map;
  },

  /**
   * @title 字符串转二进制数组，最后转为整数
   * @param {*} s 
   * @returns 
   */
  toBinary: (s) => {
    s = s.toLocaleLowerCase();
    let nums = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      let c = s.charCodeAt(i);
      if (c >= 97 && c <= 122) {
        let index = c - 97;
        nums[index] = 1;
      }
    }
    let n = nums.join('');
    return parseInt(n, 2);
  }
}

const ObjectUtils = {
  /**
   * @title 判断map1 和 map2是否相等
   * @param {*} map1 
   * @param {*} map2 
   * @returns 
   */
  map12: (map1, map2) => {
    for (let key in map1) {
      if (map2[key] === undefined || map2[key] !== map1[key]) {
        return false;
      }
    }
    return true;
  },
  isSameMap: (map1, map2) => {
    return map12(map1, map2) && map12(map2, map1)
  }
}

const ArrayUtils = {
  /**
   * @title 数组转链表
   * @param Array arr 
   */
  arrayTolinkedList: (arr) => {
    let temp = new ListNode('t');
    let p = temp;
    while (arr.length) {
      let node = new ListNode(arr.shift());
      p.next = node;
      p = node;
    }
    return temp.next;
  },
  /**
   * @title add 两个数组数组 arr1长度大于arr2的长度
   * @param {*} arr1 
   * @param {*} arr2 
   */
  addNumberArray: (arr1, arr2) => {
    let r = [];
    // 超过10
    let p = 0;
    while (arr2.length) {
      let v2 = arr2.pop();
      let v1 = arr1.pop();
      let sum = v1 + v2 + p;
      if (sum < 10) {
        r.unshift(sum)
        p = 0;
      } else {
        r.unshift(sum - 10)
        p = 1;
      }
    }
    while (arr1.length) {
      let v1 = arr1.pop();
      let sum = v1 + p;
      if (sum < 10) {
        r.unshift(sum)
        p = 0;
      } else {
        r.unshift(sum - 10)
        p = 1;
      }
    }
    if (p) {
      r.unshift(1)
    }
    return r;
  }

}

const LinedListUtils = {

  /**
   * @title 链表转数组
   * @param {*} head 
   * @returns 
   */
  linkedList2Array: (head) => {
    let r = [];
    while (head) {
      r.push(head.val)
      head = head.next;
    }
    return r;
  },

  /**
   * @title 反转链表
   * @param {*} head 
   * @returns 
   */
  reverseList: (head) => {
    if (!head) {
      return null
    }
    let newHead = null;
    let tmp;
    while (head) {
      tmp = head.next;
      head.next = newHead;
      newHead = head;
      head = tmp;
    }
    return newHead;
  },

  /**
   * @title 反转链表，返回头尾
   * @param {*} head 
   * @returns 
   */
  reverseListWithTail: (head) => {
    if (!head) {
      return null
    }
    let newHead = null;
    let newTail = null;
    let tmp;
    while (head) {
      tmp = head.next;
      head = new ListNode(head.val);
      head.next = newHead;
      newHead = head;
      if (newTail === null) {
        newTail = head;
      }
      head = tmp;
    }
    return [newHead, newTail];
  }
}