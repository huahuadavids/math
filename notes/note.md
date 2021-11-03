# My notes


## basic
- 如果 `let a = new Date()` 是一个 `Invalid Date`，`typeof a 是 object`, `a.getTime是NaN`

## mac下用c语言创建脚本
```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
int main(){
    printf("Start Task...\n");
    chdir("/Users/davidzhang/Desktop/panels/000001drsg-helmet");
    system("npm start");
    return 0;
}

```