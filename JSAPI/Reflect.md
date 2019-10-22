# Reflect对象



## 一、描述

- 与大多数全局对象不同，Reflect不是一个构造函数
- `不能将其与一个new运算符一起使用`，或者将Reflect对象作为一个函数来调用
- Reflect的所有`属性和方法都是静态的`。

## 二、方法

### *. apply()

1.定义
> 类似apply方法，调用函数是指定this和传入参数

```javascript
/**
 * @param {Function} target 目标函数，必传
 * @param {Any} thisArg 调用target时的this，必传
 * @param {ArrayLike} args 类数组，调用目标函数传入的参数，必传
 * @return {Any} target返回值
 */
Reflect.apply(target, thisArg, args);
```

2.相关文档
- [Reflect.apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)

==============================

### *. construct()

1.定义
> 创建实例，相当于new操作符

```javascript
/**
 * @param {Function} target 目标构造函数
 * @param {Array} args 目标构造函数调用时传的参数
 * @param {Function} newTarget 新创建对象的原型对象，默认为target，否则取newTarget，参考new.target操作符
 * @return {Object} (newTarget || target)的构造实例
 */
Reflect.construct(target, args, newTarget?)
```

2.tips

- Reflect.construct vs Object.create，结果相同但在

3.相关文档
- [Reflect.apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct)

==============================

### *. defineProperty()

==============================

### *. get()

==============================

### *. getOwnPropertyDescriptor()

==============================

### *. getPrototypeOf()

==============================

### *. has()

==============================

### *. isExtensible()

==============================

### *. ownKeys()

==============================

### *. preventExtensions()

==============================

### *. set()

==============================

### *. setPrototypeOf()

==============================

