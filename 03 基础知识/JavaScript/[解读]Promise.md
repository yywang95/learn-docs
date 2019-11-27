## Promise

#### Promise/A+规范

- promise的当前状态必须为以下一种：pending(等待态)、fulfilled(执行态)、rejected(拒绝态)
- promise的状态只能从pending -> fulfilled，或者从pending -> rejected
- promise必须提供一个then方法，then方法接收两个参数promise.then(onFulfilled, onRejected)，两个参数都是函数且可选

