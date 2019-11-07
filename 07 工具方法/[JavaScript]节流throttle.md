## 节流(throttle)

> 定义：固定的n秒时间段内只执行一次函数，节流会稀释函数的执行频率

防抖分为`时间戳版`和`定时器版`

#### 时间戳版

计算本次执行和上次执行的时间差，如果大于执行时间则执行，对于连续触发的事件，时间戳函数触发是在时间段内开始的时候

```javascript
function throttle(func, wait) {
    let previous = 0;

    return function () {
        const now = Date.now();
        const context = this;
        const args = arguments;

        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

#### 定时器版

停止触发后事件还会被触发一次，对于连续触发的事件，定时器版是在时间段内结束的时候

```javascript
function throttle(func, wait) {
    let timeout;

    return function () {
        const context = this;
        const args = arguments;

        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    };
}
```

#### 代码

```javascript
/**
 * 节流函数
 * @param {Function} callback 需要节流的方法
 * @param {Number} delay 多少时间间隔执行一次
 * @param {Boolean} noTrailing 停止后是否取消执行
 * @return {Function} 封装后的方法
 * @example throttle(() => {}, 1000)
 */
function throttle(callback, delay, noTrailing) {
    let timeoutID; // 最后一次计时器
    let cancelled = false; // 是否取消定时事件
    let lastExec = 0; // 上次执行方法时间

    const clearExistingTimeout = () => {
        if (timeoutID) clearTimeout(timeoutID); // 清除计时
    };

    const cancel = () => {
        cancelled = true; // 取消事件
    };

    const wrapper = (...params) => {
        if (cancelled) return; // 如果取消定时时间，则返回

        const self = this;
        const args = params;
        const elapsed = Date.now() - lastExec; // 当前执行方法时间 - 上次执行方法时间

        const exec = () => {
            lastExec = Date.now(); // 更新执行时间
            callback.apply(self, args); // 执行回调
        };

        clearExistingTimeout(); // 清除上一次计时

        if (elapsed > delay) {
            exec(); // 到另一个时间间隔时执行方法
        } else if (noTrailing !== true) {
            timeoutID = setTimeout(exec, delay - elapsed); // 停止后执行最后一次
        }
    };

    wrapper.cancel = cancel;

    return wrapper;
}
```