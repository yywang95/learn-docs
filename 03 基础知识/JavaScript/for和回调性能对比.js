/**
 * @doc for的性能大概是回调的性能的6倍
 */

// for------------

console.time();

var arr = new Array(10).fill({num: 1});
var arr2 = [];

for (let i = 0; i < arr.length; i += 1) {
    arr[i].num += 1;
}

console.timeEnd();

// callback类型-------------

console.time();

var arr = new Array(10).fill({num: 1});
var arr2 = [];

arr.map((n) => {
    n.num += 1;
    return n;
});

console.timeEnd();
