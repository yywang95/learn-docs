## 获取url中的某个参数值

#### 代码

```js
function getUrlParam(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.substr(1).match(reg);

    if (r !== null) return r[2];
    
    return null;
}
```