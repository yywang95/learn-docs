## 防抖(debounce)

> 定义：触发事件后在n秒内函数只能执行一次，如果在n秒内又触发了事件，则会重新计算函数执行时间

防抖分为`非立即执行`和`立即执行`

#### 非立即执行

在最后一次调用事件`n秒后执行`函数

```javascript
function debounce(func, wait) {
    let timeout;

    return function () {
        const context = this;
        const args = arguments;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(context, args);
        });
    };
}
```

#### 立即执行

执行一次函数后，在`其后`最后一次调用事件`n秒内`触发的函数都`不执行`

```javascript
function debounce(func, wait) {
    let timeout;

    return function () {
        const context = this;
        const args = arguments;

        if (timeout) clearTimeout(timeout);
        
        const callNow = !timeout;

        timeout = setTimeout(() => {
            timeout = null;
        }, wait);

        if (callNow) func.apply(context, args);
    };
}
```

#### 代码

```javascript
/**
 * @desc 函数防抖
 * @param {Function} func 被执行函数
 * @param {Number} wait 延迟执行毫秒数
 * @param {Boolean} immediate 是否立即执行
 */
function debounce(func, wait, immediate) {
    let timeout;

    return funciton () {
        const context = this;
        const args = arguments;

        if (timeout) clearTimeout(timeout);

        if (immediate) {
            const callNow = !timeout;

            timeout = setTimeout(() => {
                timeout = null;
            }, wait);

            if (callNow) func.apply(context, args);
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
    };
}
```