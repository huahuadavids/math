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
 * @title 字符串 hash化
 * @param string str 
 * @returns Map
 */
function toMap(str) {
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
}


/**
 * @title 二叉树层次遍历
 * @param {*} tree 
 * @returns array
 */
function BinaryTree2Array(tree) {
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

/**
 * @title 数组转链表
 * @param Array arr 
 */
function arrayTolinkedList(arr) {
  let temp = new ListNode('t');
  let p = temp;
  while (arr.length) {
    let node = new ListNode(arr.shift());
    p.next = node;
    p = node;
  }
  return temp.next;
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