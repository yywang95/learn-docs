// 8045内时间，前者是后者2倍多
// 但是加到8046的时候，后者是前者的2倍多，接近3倍，神奇
console.time();
const result = [];

for (let i = 0; i < 8046; i ++) {
    result.push(Math.round(i * .5));
}
console.timeEnd();

console.time();
const result2 = [];

for (let i = 0; i < 8046; i ++) {
    result2.push(~~(i * .5 + .5));
}
console.timeEnd();