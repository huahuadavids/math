package java;
class Solution {
    public String longestWord(String[] words) {
        Trie trie = new Trie();
        int index = 0;
        for (String word : words) {
            trie.insert(word, ++index); // indexed by 1
        }
        trie.words = words;
        return trie.dfs();
    }
}

class Node {
    char c;
    HashMap<Character, Node> children = new HashMap();
    int end;
    public Node(char c) {
        this.c = c;
    }
}

class Trie {
    Node root;
    String[] words;

    public Trie() {
        root = new Node('0');
    }

    public void insert(String word, int index) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            cur.children.putIfAbsent(c, new Node(c));
            cur = cur.children.get(c);
        }
        cur.end = index;
    }

    public String dfs() {
        String ans = "";
        Stack<Node> stack = new Stack();
        stack.push(root);
        while (!stack.empty()) {
            Node node = stack.pop();
            if (node.end > 0 || node == root) {
                if (node != root) {
                    String word = words[node.end - 1];
                    if (word.length() > ans.length() || word.length() == ans.length() && word.compareTo(ans) < 0) {
                        ans = word;
                    }
                }
                for (Node nei : node.children.values()) {
                    stack.push(nei);
                }
            }
        }
        return ans;
    }
}

class Skiplist {
    /**
     * 最大层数
     */
    private static int DEFAULT_MAX_LEVEL = 32;
    /**
     * 随机层数概率，也就是随机出的层数，在 第1层以上(不包括第一层)的概率，层数不超过maxLevel，层数的起始号为1
     */
    private static double DEFAULT_P_FACTOR = 0.25;

    Node head = new Node(null,DEFAULT_MAX_LEVEL); //头节点

    int currentLevel = 1; //表示当前nodes的实际层数，它从1开始


    public Skiplist() { }

    public boolean search(int target) {
        Node searchNode = head;
        for (int i = currentLevel-1; i >=0; i--) {
            searchNode = findClosest(searchNode, i, target);
            if (searchNode.next[i]!=null && searchNode.next[i].value == target){
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param num
     */
    public void add(int num) {
        int level = randomLevel();
        Node updateNode = head;
        Node newNode = new Node(num,level);
        // 计算出当前num 索引的实际层数，从该层开始添加索引
        for (int i = currentLevel-1; i>=0; i--) {
            //找到本层最近离num最近的list
            updateNode = findClosest(updateNode,i,num);
            if (i<level){
                if (updateNode.next[i]==null){
                    updateNode.next[i] = newNode;
                }else{
                    Node temp = updateNode.next[i];
                    updateNode.next[i] = newNode;
                    newNode.next[i] = temp;
                }
            }
        }
        if (level > currentLevel){ //如果随机出来的层数比当前的层数还大，那么超过currentLevel的head 直接指向newNode
            for (int i = currentLevel; i < level; i++) {
                head.next[i] = newNode;
            }
            currentLevel = level;
        }

    }

    public boolean erase(int num) {
        boolean flag = false;
        Node searchNode = head;
        for (int i = currentLevel-1; i >=0; i--) {
            searchNode = findClosest(searchNode, i, num);
            if (searchNode.next[i]!=null && searchNode.next[i].value == num){
                //找到该层中该节点
                searchNode.next[i] = searchNode.next[i].next[i];
                flag = true;
                continue;
            }
        }
        return flag;
    }

    /**
     * 找到level层 value 大于node 的节点
     * @param node
     * @param levelIndex
     * @param value
     * @return
     */
    private Node findClosest(Node node,int levelIndex,int value){
        while ((node.next[levelIndex])!=null && value >node.next[levelIndex].value){
            node = node.next[levelIndex];
        }
        return node;
    }


    /**
     * 随机一个层数
     */
    private static int randomLevel(){
        int level = 1;
        while (Math.random()<DEFAULT_P_FACTOR && level<DEFAULT_MAX_LEVEL){
            level ++ ;
        }
        return level;
    }


    class Node{
        Integer value;
        Node[] next;

        public Node(Integer value,int size) {
            this.value = value;
            this.next = new Node[size];
        }

        @Override
        public String toString() {
            return String.valueOf(value);
        }
    }

}

class Solution {
    public ListNode removeZeroSumSublists(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        Map<Integer, ListNode> map = new HashMap<>();

        // 首次遍历建立 节点处链表和<->节点 哈希表
        // 若同一和出现多次会覆盖，即记录该sum出现的最后一次节点
        int sum = 0;
        for (ListNode d = dummy; d != null; d = d.next) {
            sum += d.val;
            map.put(sum, d);
        }

        // 第二遍遍历 若当前节点处sum在下一处出现了则表明两结点之间所有节点和为0 直接删除区间所有节点
        sum = 0;
        for (ListNode d = dummy; d != null; d = d.next) {
            sum += d.val;
            d.next = map.get(sum).next;
        }

        return dummy.next;
    }
}