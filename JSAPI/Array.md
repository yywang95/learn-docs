# Array对象

## 一、属性

### *. Array.length

1. 属性特征
```json
{
  writable: true,
  enumerable: false,
  configurable: false
}
```
2. tips
- length的值是一个无符号32位整数，所以数组的长度`不能超过2^32-1`，且`不能为负数`
- length属性不一定表示数组中定义值的个数，因为可以为随意指定的数组下标设置值，length会一直大于设置的最大下标
3. 相关文档
- [Array.length](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)

### *. Array.prototype

1. 属性特征
```json
{
  writable: false,
  enumerable: false,
  configurable: false
}
```
2. 相关文档
- [Array.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype)

### *. Array.prototype[@@unscopables]

1. 属性特征
```json
{
  writable: true,
  enumerable: false,
  configurable: true
}
```
2. tips
symbol属性所要解决的问题，防止某些数组方法被添加到with语句的作用域内
```javascript
Object.keys(Array.prototype[Symbol.unscopables]);

// copyWithin, entries, fill, find, findIndex, flat, flatMap, includes, keys, values
```
3. 相关文档：
- [Symbol.unscopables](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables)
- [Array.prototype[@@unscopables]](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@unscopables)

## 二、会改变自身的方法

### *. copyWithin()

### *. fill()

### *. pop()

### *. push()

### *. reverse()

### *. shift()

### *. sort()

### *. splice()

### *. unshift()

## 三、不会改变自身的方法

### *. concat()

### *. includes()

### *. join()

### *. slice()

### *. toSource()

### *. toString()

### *. toLocaleString()

### *. indexOf()

### *. lastIndexOf()

## 四、遍历方法

### 1. forEach()

### 2. entries()

### 3. every()

### 4. some()

### 5. filter()

#### find()

#### findIndex()

#### keys()

#### reduce()

#### reduceRight()

#### values()

#### [@@iterator]()

## 五、其他方法

### *. from()

1. 定义
从一个`类数组`或`可迭代对象`中创建一个新的，浅拷贝的数组实例，from方法不在Array.prototype身上，而是在Array身上

```javascript
/**
 * @param {Any} arrayLike 想要转为数组的类数组或可迭代对象
 * @param {Function} mapFn 新数组中每个元素会执行该回调函数，相当于执行了一次arr.map
 * @param {Object} thisArg mapFn回调函数中的this
 * @return {Array} 一个新数组
 */
Array.from(arrayLike, mapFn?, thisArg?)
```
2. 相关文档
- [Array.from](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### *. isArray()

1. 定义
判断方法是否为Array，isArray方法不在Array.prototype身上，而是在Array身上

```javascript
/**
 * @param {Any} obj 需要判断的值
 * @return {Boolean} 是否为数组
 */
Array.isArray(obj)
```
2. tips
```javascript
// Array.prototype 也是一个数组
Array.isArray(Array.prototype)

// 当检测Array实例时, Array.isArray优于instanceof，因为Array.isArray能检测iframes
const iframe = document.createElement('iframe');

document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;

const arr = new xArray(1,2,3); // [1,2,3]

Array.isArray(arr);  // true
arr instanceof Array; // false
```
3. 相关文档
- [Array.isArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

### *. of()

1. 定义
创建一个可变数量参数的新数组

```javascript
/**
 * @param {Any} element0 ...数组中的项
 * @return {Array} 由指定项组成的数组
 */
Array.of(element0, element1?, ...)
```
2. 相关文档
- [Array.of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)