# Array对象

## 一、属性

### *. Array.length

1.属性特征
```json
{
  "writable": true,
  "enumerable": false,
  "configurable": false
}
```
2.tips
- length的值是一个无符号32位整数，所以数组的长度`不能超过2^32-1`，且`不能为负数`
- length属性不一定表示数组中定义值的个数，因为可以为随意指定的数组下标设置值，length会一直大于设置的最大下标
3.相关文档
- [Array.length](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)

====================

### *. Array.prototype

1.属性特征
```json
{
  "writable": false,
  "enumerable": false,
  "configurable": false
}
```

2.相关文档
- [Array.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype)

====================

### *. Array.prototype[@@unscopables]

1.属性特征
```json
{
  "writable": true,
  "enumerable": false,
  "configurable": true
}
```

2.tips
symbol属性所要解决的问题，防止某些数组方法被添加到with语句的作用域内
```javascript
Object.keys(Array.prototype[Symbol.unscopables]);

// copyWithin, entries, fill, find, findIndex, flat, flatMap, includes, keys, values
```

3.相关文档：
- [Symbol.unscopables](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables)
- [Array.prototype[@@unscopables]](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@unscopables)

## 二、会改变自身的方法

### *. copyWithin()

1.定义
> 将数组某个位置的值复制到另一个位置上

```javascript
/**
 * @param {Number} target 复制到哪个位置的起始位置，如果为负数则从末尾开始计算，大于length不拷贝
 * @param {Number} start 从第几个位置开始复制。如果是负数，从末尾开始计算
 * @param {Number} end 从第几个位置结束复制。如果是负数，从末尾开始计算，忽略会直接复制到末尾
 * @return {Array} 返回的还是自身，不过自身被改变了
 */
arr.copyWithin(target, start? = 0, end? = 0)
```

2.tips
- copyWithin的this不要求是数组
```javascript
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}
// 原来是[0: undefined, 1: undefined, 2: undefined, 3: 1]
```

3.相关文档
- [Array.prototype.copyWithin](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

====================

### *. fill()

1.定义
> 用一个固定值填充一个数组从起始索引到终止索引，`左闭右开`

```javascript
/**
 * @param {Any} value 需要填充的值
 * @param {Number} start 起始索引，如果是负数，从末尾开始计算
 * @param {Number} end 结束索引，如果是负数，从末尾开始计算
 * @return {Array} 返回的还是自身，不过自身被改变了
 */
arr.fill(value, start? = 0, end? = arr.length)
```

2.tips
- 和copyWithin一样，fill的this也不要求是数组
```javascript
[].fill.call({length: 5, 3: 1}, 0, 0, 2);
// {0: 0, 1: 0, 3: 1, length: 5}
```

====================

### *. pop()

### *. push()

### *. reverse()

### *. shift()

### *. sort()

### *. splice()

### *. unshift()

## 三、不会改变自身的方法

### *. concat()

1.定义
> 用于合并多个数组，返回一个合并后的新数组，浅拷贝

```javascript
/**
 * @param {Array|Any} arr1 ...需要合并的数组，如果arr是数组则会把每一项合并过去，否则作为一项合并
 * @return {Array} 返回合并后的新数组
 */
oldArr.concat(arr1, arr2?, ...)
```

2.相关文档
[Array.prototype.concat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

====================

### *. includes()

1.定义
> 判断一个数组是否包含指定值，引用类型会根据地址来判断

```javascript
/**
 * @param {Any} valueTofind 需要判断的数值
 * @param {Number} fromIndex 开始查找的起始位置，如果为负数则从倒数第n个开始查找
 * @return {Boolean} 是否包含
 */
arr.includes(valueTofind, fromIndex? = 0)
```

2.tips
- 比较字符串和字符时是区分大小写
- 不要求this值是数组对象，所以它可以被用于其他类型的对象 (比如类数组对象)
- includes可以区分出NaN，所以[NaN].includes(NaN)返回true

3.相关文档
- [Array.prototype.includes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

====================

### *. join()

1.定义
> 使用指定分隔符连接数组的每一项，返回连接后的字符串

```javascript
/**
 * @param {String} separator 连接符
 * @return {String} 连接后的字符串
 */
arr.join(separator?)
```

2.tips
- undefined和null会转为空字符
- 其他会调用toString()

3.相关文档
- [Array.prototype.join](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

====================

### *. slice()

### *. toSource()

### *. toString()

### *. toLocaleString()

### *. indexOf()

1.定义
> 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1

```javascript
/**
 * @param {Any} searchElement 查找的值
 * @param {Number} fromIndex 开始查找位置，如果是负数，则从倒数开始查找
 * @return {Number} 查找到的值索引
 */
arr.indexOf(searchElement, fromIndex? = 0)
```

2.tips
- indexOf使用严格相等，因为NaN===NaN返回false，所以[NaN].indexOf(NaN)返回-1

3.相关文档
- [Array.prototype.indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

====================

### *. lastIndexOf()

## 四、遍历方法

### *. forEach()

1.定义
> 对数组的每一项执行提供的函数

```javascript
/**
 * @param {Function} callback(element, index, array) 需要执行的函数
 * @param {Any} thisArg callback中使用的this，没提供callback中的this非严格下为window，严格模式下为undefined
 * @return {undefined}
 */
arr.forEach(callback, thisArg?)
```

2.tips
- 在callback中往arr中push的项不会执行callback
- 在callback中修改arr中还未执行callback的值，后面访问到的为新的值，因为会通过索引来访问
- `已经删除或者未被赋值的项不会被调用`
- forEach循环`不能被提前终止`，除非抛出异常
- forEach()不会在迭代之前创建数组的副本，如果数组在迭代时被修改了，则其他元素会被跳过

3.相关文档
- [Array.prototype.forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

====================

### *. entries()

1.定义
> 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对

```javascript
/**
 * @return {Array} [key, value]
 */
arr.entries()
```

2.tips
- 示例
```javascript
const arr = [1, 2, 3];
const iterator = arr.entries();

iterator.next().value; // [0, 1]
iterator.next().value; // [1, 2]
iterator.next().value; // [2, 3]
iterator.next().value; // undefined
```
- 不管项有没有赋值都会被遍历到

3.相关文档
- [Array.prototype.entries](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

====================

### *. every()

1.定义
> 返回数组内的每个值是否都能通过callback测试

```javascript
/**
 * @param {Function} callback(element, index, array) 指定测试函数
 * @param {Any} thisArg callback中使用的this，没提供callback中的this非严格下为window，严格模式下为undefined
 * @return {Boolean} 是否都通过测试
 */
arr.every(callback, thisArg?)
```

2.tips
- 当有值返回false时，立即返回，后面的项不执行
- 当传入的是空数组无论如何都会返回true
- `已经删除或者未被赋值的项不会被调用`

3.相关文档
- [Array.prototype.every](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

====================

### *. some()

### *. filter()

1.定义
> 返回一个通过测试的项组成的新数组

```javascript
/**
 * @param {Function} callback(element, index, array) 指定测试函数
 * @param {Any} thisArg callback中使用的this，没提供callback中的this非严格下为window，严格模式下为undefined
 * @return {Array} 新数组
 */
arr.filter(callback, thisArg?)
```

2.tips
- filter的项在第一次执行callback时就被确定，但是`已经删除或者未被赋值的项不会被调用`

3.相关文档
- [Array.prototype.filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

====================

### *. find()

1.定义
> 返回数组中满足测试函数的第一个元素，否则返回undefined

```javascript
/**
 * @param {Function} callback(element, index, array) 回调函数
 * @param {Any} thisArg 调用callback中的this，没提供callback中的this非严格下为window，严格模式下为undefined
 * @return {Any} 满足条件的项，没有返回undefined
 */
arr.find(callback, thisArg?)
```

2.tips
- 不管有没有赋值都会被遍历
- 在callback中往arr中push的项不会执行callback
- 在callback中修改arr中还未执行callback的值，后面访问到的为新的值，因为会通过索引来访问
- 在callback中删除arr中还未执行callback的值，被删除的元素仍然会被访问到，例如arr有四项，在callback删除一项，callback仍然会遍历4次，但是会在已删除的新数组中查找

3.相关文档
- [Array.prototype.find](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

====================

### *. findIndex()

1.定义
> 返回数组中满足测试函数的第一个元素索引，否则返回-1

```javascript
/**
 * @param {Function} callback(element, index, array) 回调函数
 * @param {Any} thisArg 调用callback中的this，没提供callback中的this非严格下为window，严格模式下为undefined
 * @return {Number} 满足条件的项索引，没有返回-1
 */
arr.findIndex(callback, thisArg?)
```

2.tips
- 不管有没有赋值都会被遍历
- 在callback中往arr中push的项不会执行callback
- 在callback中修改arr中还未执行callback的值，后面访问到的为新的值，因为会通过索引来访问
- 在callback中删除arr中还未执行callback的值，被删除的元素仍然会被访问到，例如arr有四项，在callback删除一项，callback仍然会遍历4次，但是会在已删除的新数组中查找

3.相关文档
- [Array.prototype.findIndex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

====================

### *. keys()
### *. reduce()
### *. reduceRight()
### *. values()
### *. [@@iterator]()

## 五、其他方法

### *. from()

1.定义
> 从一个`类数组`或`可迭代对象`中创建一个新的，浅拷贝的数组实例，from方法不在Array.prototype身上，而是在Array身上

```javascript
/**
 * @param {Any} arrayLike 想要转为数组的类数组或可迭代对象
 * @param {Function} mapFn 新数组中每个元素会执行该回调函数，相当于执行了一次arr.map
 * @param {Object} thisArg 调用mapFn中的this，没提供mapFn中的this非严格下为window，严格模式下为undefined
 * @return {Array} 一个新数组
 */
Array.from(arrayLike, mapFn?, thisArg?)
```

2.相关文档
- [Array.from](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

====================

### *. isArray()

1.定义
> 判断方法是否为Array，isArray方法不在Array.prototype身上，而是在Array身上

```javascript
/**
 * @param {Any} obj 需要判断的值
 * @return {Boolean} 是否为数组
 */
Array.isArray(obj)
```

2.tips
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

3.相关文档
- [Array.isArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

====================

### *. of()

1.定义
> 创建一个可变数量参数的新数组

```javascript
/**
 * @param {Any} element0 ...数组中的项
 * @return {Array} 由指定项组成的数组
 */
Array.of(element0, element1?, ...)
```

2.相关文档
- [Array.of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

====================

### *. flat

1.定义
> 扁平化数组

```javascript
/**
 * @param {Number} depth 嵌套结构深度，默认为1
 * @return {Array} 处理后的新数组
 */
arr.flat(depth? = 1)
```

2.tips
- 示例
```javascript
var a = [1, 2, [3, 4], [[5], [6], 7]];

a.flat();
// [1, 2, 3, 4, [5], [6], 7]

a.flat(2);
// [1, 2, 3, 4, 5, 6, 7]
```
- 空项将被移除(未被赋值的项，未被赋值不等于undefined)
```javascript
var a = [1, 2, , 4, 5];

a.flat();
// [1, 2, 4, 5]
```

3.相关文档
- [Array.prototype.flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

====================

### *. flatMap

1.定义
> 相当于先执行map然后执行flat，深度为1

```javascript
/**
 * @param {Function} callback(element, index, array) 执行map方法
 * @param {Any} thisArg 调用callback中的this，没提供callback中的this非严格下为window，严格模式下为undefined
 * @return {Array} 处理后的新数组
 */
arr.flatMap(callback, thisArg?)
```

2.相关文档
- [Array.prototype.flatMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
