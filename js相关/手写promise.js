// 异步编程的概念
// 1、回调，以及回调地狱
// 2、Generator，控制函数的执行
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
// 



// promise的三个状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  // 代码可能会异步，确保获取正确的this值
  const that = this;
  // 初始promise的值
  that.state = PENDING;
  that.value = null;
  // 保存then方法中的回调
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  // 定义resolve方法
  function resolve(value) {
    // 判断是不是pending状态，只有pending状态才可以改变状态
    if (that.state === PENDING) {
      // 改变状态
      that.state = RESOLVED;
      // 传值
      that.value = value;
      // 遍历回调数组执行
      that.resolvedCallbacks.map(cb => cb(that.value));
    }
  }
  // 定义reject方法
  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }
  // 执行promise传入的函数
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数，当参数不是函数类型时，需要创建一个函数赋值给对应的参数
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
  onRejected = typeof onRejected === "function" ? onRejected: r => {throw r;};

  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value);
  }
  if (that.state === REJECTED) {
    onRejected(that.value);
  }
};
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 0);
}).then(value => {
  console.log(value);
});
