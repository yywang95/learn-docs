/**
 * @doc 前面不足补0的方式
 */

const arr = ['9.20.3', '10.1.0','9.20.3','11.2.2'];
const len = 4; // 最后保留几位数
const fillLeft = (str) => str.replace(/\d{1,}/g, (s) => `${new Array(len).fill(0).join('')}${s}`.slice(-len));

arr.sort((prev,next) =>fillLeft(prev) > fillLeft(next) ? 1 : -1);