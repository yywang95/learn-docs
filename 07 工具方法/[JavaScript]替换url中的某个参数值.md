## 替换url中的某个参数值

#### 代码

```js
function replaceParam(str, key, value) {
    const reg = new RegExp(`(\\?|^|&|\#)${key}=([^&|^#]*)(&|$|#)`);
    
    return str.replace(reg, `$1${key}=${value}$3`);
}
```