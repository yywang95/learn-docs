# 什么是web worker

我们知道JavaScript的运行是单线程的，当处理一些计算密集型或者高延迟的任务时，就容易造成页面卡顿的现象。

web worker的作用就是`为JavaScript创建多线程环境`，主线程通过创建Worker线程，将一些任务分配给后者进行运行，这样，一些计算密集型或者高延迟的任务就被Worker线程负担了，主线程就会变的很流畅(主要就负责UI交互相关的工作)。

主线程在运行的同时，Worker线程会在后台运行，两者互不干涉，等到Worker线程完成计算后，会将结果发送给主线程。

> 问：为什么JavaScript是单线程的？
> 
> 答：JavaScript的单线程和它的用途有关，JavaScript主要用途是与用户互动以及操作DOM，这就决定了它只能是单线程的，否则就会带来很复杂的同步问题。
> 比如：假设JavaScript有两个线程，一个线程在某个DOM上添加了内容，另一个线程又要删除这个节点，那么这是浏览器应该以哪个线程为准呢？
> 所以为了避免复杂性，从一诞生，JavaScript就是单线程的。

> 问：现在出个多线程是不是会和JavaScript原来的单线程冲突？
> 
> 答：通过web worker创建的子线程是完成受主线程控制的，且子线程不能操作DOM，所以，这个新标准并没有改变JavaScript单线程的本质。

# web worker分类

web worker分为专用worker、共享worker、服务worker

#### 1. 专用worker

专用worker正如它的名字所表明的，只能由创建它的页面访问，专用worker也叫做web worker。

#### 2. 共享worker

共享worker可以让多个环境访问，包括不同的页面，但是目前兼容性不怎么样。

#### 3. 服务worker

服务worker与专用worker和共享worker完全不同。它的主要目的是作为网络请求代理程序，可以拦截，重定向和修改页面发出的请求。

# 基本用法

因为专用worker的兼容性比较好，也比较常用，所以在这里只介绍专用worker的使用方法

[不同worker的兼容性](https://caniuse.com/#search=web%20worker)


#### 1. 创建worker -> new Worker(URI)

```js
const worker = new Worker('worker.js');
```

调用Worker构造器的时候需要传一个当前worker线程的脚本URI，该文件就是Worker线程所要执行的任务。但是要注意以下几点：

- 由于Worker不能读取本地文件(file://xx)，所以这个脚本地址`必须来自网络`。
- 下载脚本失败的时候(比如404)，Worker就会默默地失败。
- 如果你的Worker代码和主线程代码在同一页，那么可以通过下面的createObjectURL方式来创建worker

```html
<!-- type="app/worker"浏览器不认识，这样内部的代码就不会被识别为js脚本运行了 -->
<script id="worker" type="app/worker">
    // worker要执行的脚本
    addEventListener('message', (event) => {
        console.log(`收到消息：${event.data}`); 
    });
</script>

<script>
/** @desc 通用创建worker方法 */
function createWorker(id) {
    const blob = new Blob([document.querySelector(id).textContent]);
    const url = window.URL.createObjectURL(blob);
    
    return new Worker(url);
}

// 创建worker实例
const worker = createWorker('#worker');
</script>
```

#### 2. 主线程给worker线程发消息 -> worker.postMessage(data: any)

```js
const worker = new Worker('worker.js');

worker.postMessage('发给worker消息');
worker.postMessage({ type: 'test' });
```

- postMessage只接受一个参数，传多个的时候会报错
- postMessage参数可以是任意类型，甚至是二进制类型

#### 3. worker线程接受主线程发的消息 -> addEventListener('message', (event) => {})

```js
// worker中的脚本
// 写法一：this/self即为当前子线程本身，也是子线程的全局对象
this.addEventListener('message', (event) => {
    console.log(`接受到主线程的消息：${event.data}`); 
});

// 写法二：不加this，默认就是当前worker对象
addEventListener('message', (event) => {
    console.log(`接受到主线程的消息：${event.data}`); 
});
```

- 在子线程中`self`和`this`都指当前子线程本身，两个可以替换使用，即`self = this`
- 看了一个文档说用onmessage也可以，但是我测试的时候，在worker子线程中报没有onmessage这个方法

#### 4. worker线程给主线程发消息 -> postMessage(data: any)

```js
// worker中的脚本
// 写法一
this.postMessage('这里是worker进程');

// 写法二
postMessage('这里是worker进程');
```

- worker给主线程发消息一样，也是postMessage方法

#### 5. 主线程接受worker线程发的消息 -> worker.addEventListener('message', (event) => {}) / worker.onmessage((event) => {})

```js
const worker = new Worker('worker.js');

// 写法一
worker.addEventListener('message', (event) => {
    console.log(`收到worker线程发来的消息：${event.data}`);
});

// 写法二
worker.onmessage = (event) => {
    console.log(`收到worker线程发来的消息：${event.data}`);
};
```

- 主线程中即可以用addEventListener的方式也可以用onmessage的方式

#### 6. 销毁worker

主线程销毁worker子线程

```js
worker.terminate();
```

worker子线程自己销毁自己

```js
// 方法一
self.close();

// 方法二
close();
```

- 为了节省系统资源，worker子线程使用完毕一定要`及时销毁!!!`

#### 7. 主线程监听子线程错误 -> worker.addEventListener('error', (e: Error) => {})

```js
const worker = new Worker('worker.js');

worker.addEventListener('error', (e) => {
    console.error(`worker错误：${e}`); 
});
```

- 主线程监听error只有addEventListener的方式，没有onerror
- worker线程也可以通过addEventListener('error')的方式监听自己的全局错误

#### 8. worker线程加载脚本 -> importScripts(URI[, URI2...])

```js
// 写法一：只加载一个
importScripts('a.js');

// 写法二：加载多个
importScripts('a.js', 'b.js');
```

- worker子线程提供了一个全局方法`importScripts`来加载额外的js
- worker子线程加载的额外js`一定要和worker同源`，通过上面createObjectURL的方式创建的worker内部其实是不可以加载js的，因为blob和一个http地址不同源
- worker子线程加载了js后会立即执行，执行的顺序和主线程一样，也分同步队列和异步队列等等

# web worker使用注意点

#### 1. 同源限制

分配给worker线程运行的脚本文件，必须与主线程的脚本文件`同源`。

#### 2. DOM限制

worker线程所在的全局对象与主线程不一样，无法读取主线程所在网页的DOM对象，也无法使用`document`、`window`、`parent`等这些对象，但是worker线程可以使用`navigator`、`location`对象。可以在worker中打印this来查看有哪些全局方法。

#### 3. 通信联系

Worker线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

#### 4. 脚本限制

Worker线程不能执行`alert()`方法和`confirm()`方法，但`可以使用XMLHttpRequest对象发出 AJAX 请`求。

#### 5. 文件限制

Worker线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络，也可以通过我们上面提到的createObjectURL方式来实现。

# worker子线程和setTimeout/setInterval的区别

我们知道当调用setTimeout这类异步任务的时候，方法也会在另一个线程中执行，那么它和这个web worker有什么区别呢？

#### 1. 在主线程中调用定时任务

我们先看一段下面的代码，该代码写在主线程中

```js
setTimeout(() => {
    console.log('setTimeout1 start');
    while(true) {};
    console.log('setTimeout1 end');
}, 1000);

setTimeout(() => {
    console.log('setTimeout 2');
}, 2000);

setTimeout(() => {
    console.log('setTimeout 3');
}, 100);

console.log('start');
```

这段代码的运行结果是

```
start
setTimeout 3
setTimeout1 start
```

在`setTimeout1 start`之后的`while(true)`这里有个无限循环，导致主线程一直在这运行，而导致setTimeout2到了实现却打印不出`setTimeout 2`。(js异步队列相关大家可以自行查资料了解)

#### 2. 在worker进程中调用定时任务

我们现在将上述的代码改写一下

```html
<!-- worker线程代码 -->
<script id="worker" type="app/work">
    // worker线程要执行的代码
    addEventListener('message', function (event) {
        start();
    });

    function start() {
        setTimeout(() => {
            console.log('setTimeout1 start');
            while(true) {};
            console.log('setTimeout1 end');
        }, 1000);
    }
</script>

<script>
function createWorker(id) {
    var blob = new Blob([document.querySelector(id).textContent]);
    var url = window.URL.createObjectURL(blob);

    return new Worker(url);
}

// 初始化一个worker实例
var worker = createWorker('#worker');

worker.postMessage('');

setTimeout(() => {
    console.log('setTimeout 2');
}, 2000);

setTimeout(() => {
    console.log('setTimeout 3');
}, 100);

console.log('start');
</script>

```

这段代码的运行结果是

```
start
setTimeout 3
setTimeout1 start
setTimeout 2
```

`setTimeout 2`打印出来了，也就是说worker线程运行的setTimeout1中的`死循环没有影响主线程`。

#### 所以web worker才是`真正的子线程`，setTimeout什么的只是一个异步任务！！！

# web worker使用场景

#### 1. 非主业务的异步任务

前面对setTimeout和web worker的对比我们可以看到，在web worker中，如果setTimeout挂了并不会影响主线程的运行，所以我们可以将一些定时任务或者非主业务的任务放在子线程中，比如`埋点`、`消息`等等，这样如果埋点接口或者消息接口挂了我们的页面还是能正常运行。

> 比如实时更新用户订单数或消息数

#### 2. 轮询服务器状态

有时浏览器需要轮询服务器的状态以便第一时间得知状态改变，这个轮询就可以放到worker中。

#### 3. 大计算量的异步任务，放到主线程可能会让主线程卡掉的功能

一些计算量大的方法，比如要计算路径什么的，个人觉得也可以方法子线程中，当计算完成再给主线程发送消息，主线程再来更新DOM什么的。

> 比如绘制canvas，在webWorker中绘制完再将图片地址推送给主线程展示
>
> 比如在Worker中进行相对开销较大的DOM Diff，将patch结果发回主线程，由主线程在真实DOM上应用修改

# 参考文献

- [使用web worker: MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
- [web worker使用教程: 阮一峰](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
- [web worker的两类应用场景](https://xiaoiver.github.io/coding/2018/08/25/Worker-%E7%9A%84%E4%B8%A4%E7%B1%BB%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF.html)
