class Solution {

    public int getSum(int a, int b) {
        int sum = a ^ b;
        int temp = (a & b) << 1;
        if (temp != 0) {
            return getSum(sum, temp);
        }
        return sum;
    }

    public static void main(String args[]) {
        Solution s = new Solution();
        int arr[] = { 1, 2, 3 };
    }

}

