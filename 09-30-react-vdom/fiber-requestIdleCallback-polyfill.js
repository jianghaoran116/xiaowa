/**
 * react是使用的requestAnimationFrame来模拟实现的requestidlecallback
 * requestIdleCallback polyfill版本
 * requestAnimationFrame 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
 * 参考React scheduler
 * 任务通过双向链表链接起来 
 * 然后通过requestAnimationFrame或者setTimeout来获取浏览器在每帧的空闲时间来循环处理所有的任务，直到链表为空为止
 */

// 假装设置下优先级
const IMMEDIATE_PRIORITY_TIMEOUT = 1;
const USER_BLOCKING_PRIORITY = 2;
const IDLE_PRIORITY = 3;
const LOW_PRIORITY_TIMEOUT = 4;
const NORMAL_PRIORITY_TIMEOUT = 5;

/**
 * 现模拟设置一个任务
 * 根据传入的option计算出过期时间
 * @param {*} string 
 */
function requestIdleCallback(callback, option) {
  // performance.now() 使用当前时间
  var startTime = performance.now();
  // 过期时间
  var expirationTime;
  //就是根据不同的优先级，赋予不同的过期时间
  switch (option) {
    case 'ImmediatePriority':
      expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
      break;
    case 'UserBlockingPriority':
      expirationTime = startTime + USER_BLOCKING_PRIORITY;
      break;
    case 'IdlePriority':
      expirationTime = startTime + IDLE_PRIORITY;
      break;
    case 'LowPriority':
      expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
      break;
    default:
      expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
  }

  
  // 安排一下
  ensureHostCallbackIsScheduled(callback, expirationTime)
}

/**
 * 在这个过程中我们首先需要去判断当前时间是否小于下一帧时间
 * 如果小于的话就代表我们尚有空余时间去执行任务
 * 如果大于的话就代表当前帧已经没有空闲时间了
 * 这时候我们需要去判断是否有任务过期
 * 过期的话不管三七二十一还是得去执行这个任务
 * 如果没有过期的话
 * 那就只能把这个任务丢到下一帧看能不能执行了
 */
function ensureHostCallbackIsScheduled(callback, expirationTime) {
  console.log(expirationTime)
  console.log(performance.now()) // 默认设置30
}

/**
 * 开始安排任务， absoluteTimeout是传入的过期时间
 * @param {*} callback 
 * @param {*} absoluteTimeout 
 */
function requestHostCallback(callback, absoluteTimeout) {
  port.postMessage(undefined);
}

/**
 * 使用requestAnimationFrame
 * 不起作用的情况下，使用setTimeout
 * 老师说的浏览器到后台的时候
 */
function requestAnimationFrameWithTimeout(callback) {
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(callback);
  } else {
    setTimeout(callback, 100);
  };
}

/**
 * 
 */
function animationTick() {

}

/**
 * 我们使用postMessage 技巧来将空闲工作推迟到重绘之后
 */
var channel = new MessageChannel();
var port = channel.port2;

channel.port1.onmessage = function (event) {
  // requestAnimationFrameWithTimeout(test)
};

function test() {
  console.log(123123)
}

requestIdleCallback(test, 'ImmediatePriority');