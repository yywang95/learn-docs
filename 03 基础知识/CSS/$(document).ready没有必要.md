如果你的script已经放在了页面底部，那么方法执行的时候DOM已经加载完成，没有必要放到$(document).ready，直接下面这种方法就可以

```js
(function () {
    // ...
})();
```