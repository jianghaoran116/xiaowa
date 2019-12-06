/**
 * 多次 空闲 渲染过后
 * 流程
 * 1: 每个任务有个优先级 设置优先级
 * 2: 在调度之前 如果过期 直接调用 不需要调度 如果没有过期 通过requestAnimationFrame启动一个定时器
 * 3: 在回调方法中执行计算 frame时间及下个frame时间 执行port.message (meassageChannel)
 */

let isAnimationFrameScheduled;  
let rAFID; // requestAnimationFrame
let rAFTimeoutID; // requestAnimationFrame不起作用时用timeout
let isMessageEventScheduled;
let timeoutTime;
let scheduledHostCallback;

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
function requestIdleCallbackPolyfll(callback, option) {
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
  requestHostCallback(callback, expirationTime)
}

/**
 * 开始安排任务， absoluteTimeout是传入的过期时间
 * 2: 在调度之前 如果过期 直接调用 不需要调度 如果没有过期 通过requestAnimationFrame启动一个定时器
 * @param {*} callback 
 * @param {*} absoluteTimeout 
 */
function requestHostCallback(callback, expirationTime) {
  let absoluteTimeout = performance.now() - expirationTime - 16.6;
  scheduledHostCallback = callback;
  timeoutTime = absoluteTimeout;
  if (absoluteTimeout < 0) {
    port.postMessage(undefined);
  } else if (!isAnimationFrameScheduled){
    isAnimationFrameScheduled = true;
    requestAnimationFrameWithTimeout(callback);
  }
}

/**
 * 使用requestAnimationFrame
 * 不起作用的情况下，使用setTimeout
 * 老师说的浏览器到后台的时候
 */
function requestAnimationFrameWithTimeout(callback) {
  rAFID = requestAnimationFrame(function(timestamp) {
    // cancel the setTimeout
    clearTimeout(rAFTimeoutID);
    callback(timestamp);
  });
  rAFTimeoutID = setTimeout(function() {
    // cancel the requestAnimationFrame
    cancelAnimationFrame(rAFID);
    callback(performance.now());
  }, 100);
}

/**
 * 要执行的任务
 */
function animationTick() {
  console.log(123)
  if (scheduledHostCallback !== null) {
    requestAnimationFrameWithTimeout(animationTick);
  } else {
    isAnimationFrameScheduled = false;
    return;
  }
  if (!isMessageEventScheduled) {
    isMessageEventScheduled = true;
    port.postMessage(undefined);
  }
}

/**
 * 使用postMessage 技巧来将空闲工作推迟到重绘之后
 */
var channel = new MessageChannel();
var port = channel.port2;

channel.port1.onmessage = function (event) {
  isMessageEventScheduled = false;
  var prevScheduledCallback = scheduledHostCallback;
  var prevTimeoutTime = timeoutTime;
  if (!isAnimationFrameScheduled) {
    isAnimationFrameScheduled = true;
    requestAnimationFrameWithTimeout(animationTick);
  }
  scheduledHostCallback = prevScheduledCallback;
  timeoutTime = prevTimeoutTime;
  return;
};

requestIdleCallbackPolyfll(animationTick, 'ImmediatePriority');