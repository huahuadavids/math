class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        Integer candidate = null;
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }

        return candidate;
    }

    public static void main(String args[]) {
        Solution s = new Solution();
        int arr[] = { 1,1,1,2,2,2,3,3 };
        System.out.println(s.majorityElement(arr));
    }

}

