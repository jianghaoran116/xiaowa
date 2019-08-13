# 实现的效果
``` javascript
(new MyPromise((resolve) => {
  console.log(111);
  resolve(222);
  setTimeout(() => {
    resolve('st-111');
  }, 1000);
}))
  .then((res) => {
    console.log(res);
    return new MyPromise((resolve) => {
      resolve(333);
    })
  })
  .then((res) => {
    console.log(res);
  });
```

### 第一步：简单的架子, 运行promise里的函数
``` javascript
(new MyPromise(() => {
  console.log(111);
}))
  .then((res) => {
    console.log(res);
  });
```

``` javascript
function MyPromise(processer) {
  this.state = 'pending';
  const context = this;
  processer(
    (res) => {
      context.resolve(res);
    },
    (err) => {
      context.reject(err);
    },
  );
}
MyPromise.prototype = {
  constructor: MyPromise,
  then() {},
  resolve() {},
  reject() {},
  catch() {},
};
export default MyPromise;

```
打印出111

### 第二步：实现异步里的resolve
``` javascript
(new MyPromise((resolve) => {
  console.log(111);
  setTimeout(() => {
    resolve(222);
  }, 1000);
}))
  .then((res) => {
    console.log(res);
  });
```
希望打印111，过一秒打印222
#### 代码：
``` javascript
function MyPromise(processer) {
  this.state = 'pending';
  const context = this;
  processer(
    (res) => {
      context.resolve(res);
    },
    (err) => {
      context.reject(err);
    },
  );
}
MyPromise.prototype = {
  constructor: MyPromise,
  then(onFulfilled) {
    this.onFulfilled = onFulfilled;
  },
  resolve(res) {
    this.state = 'fulfilled';
    this.currentValue = res;
    this.onFulfilled(this.currentValue);
  },
  reject() {},
  catch() {},
};
export default MyPromise;

```
同步的代码执行报错，改一下
``` javascript
function MyPromise(processer) {
  this.state = 'pending';
  const context = this;
  processer(
    (res) => {
      context.resolve(res);
    },
    (err) => {
      context.reject(err);
    },
  );
}
MyPromise.prototype = {
  constructor: MyPromise,
  taskCallBack() {},
  then(onFulfilled) {
    this.onFulfilled = onFulfilled;
    if (this.onFulfilled) {
      this.onFulfilled(this.currentValue);
    }
  },
  resolve(res) {
    this.state = 'fulfilled';
    this.currentValue = res;
    if (this.onFulfilled) {
      this.onFulfilled(this.currentValue);
    }
  },
  reject() {},
  catch() {},
};
export default MyPromise;

```
做一下链式调用
``` javascript
function MyPromise(processor) {
  this.state = 'pending';
  const context = this;
  if (!processor) {
    return;
  }
  processor(
    (res) => {
      context.resolve(res);
    },
    (err) => {
      context.reject(err);
    },
  );
}
MyPromise.prototype = {
  constructor: MyPromise,
  taskCallBack() {},
  then(onFulfilled) {
    this.next = new MyPromise();
    this.onFulfilled = onFulfilled;
    if (this.onFulfilled) {
      this.onFulfilled(this.currentValue);
    }

    return this.next;
  },
  resolve(res) {
    this.state = 'fulfilled';
    this.currentValue = res;
    if (this.onFulfilled) {
      this.onFulfilled(this.currentValue);
    }
    if (this.next) {
      this.next.resolve(res);
    }
  },
  reject() {},
  catch() {},
};
export default MyPromise;

```
提取一下公共的代码（执行的代码）
``` javascript
function MyPromise(processor) {
  this.state = 'pending';
  const context = this;
  if (!processor) {
    return;
  }
  processor(
    (res) => {
      context.resolve(res);
    },
    (err) => {
      context.reject(err);
    },
  );
}
MyPromise.prototype = {
  constructor: MyPromise,
  taskCallBack(value, processor, next) {
    let result = null;
    result = processor(value);
    if (result instanceof MyPromise) {
      result.next = next;
      result.then((res) => {
        next.resolve(res);
      });
    }
  },

  then(onFulfilled) {
    this.next = new MyPromise();
    this.onFulfilled = onFulfilled;
    if (this.onFulfilled) {
      this.taskCallBack(
        this.currentValue,
        this.onFulfilled.bind(this),
        this.next,
      );
    }
    return this.next;
  },

  resolve(res) {
    this.state = 'fulfilled';
    this.currentValue = res;
    if (this.next && this.onFulfilled) {
      this.taskCallBack(
        this.currentValue,
        this.onFulfilled.bind(this),
        this.next,
      );
    }
  },
  reject() {},
  catch() {},
};
export default MyPromise;

```
设置捕获返回promise对象里的异常，出错走reject
``` javascript
function MyPromise(processor) {
  this.state = 'pending';
  const context = this;
  if (!processor) {
    return;
  }
  processor(
    (res) => {
      context.resolve(res);
    },
    (err) => {
      context.reject(err);
    },
  );
}
MyPromise.prototype = {
  constructor: MyPromise,
  taskCallBack(value, processor, next) {
    let result = null;
    let normal = 1;
    try {
      result = processor(value);
    } catch (err) {
      normal = 0;
      result = err;
    }
    if (result instanceof MyPromise) {
      result.next = next;
      result.then((res) => {
        next.resolve(res);
      });
      return;
    }
    if (normal === 1) {
      next.resolve(result);
    } else {
      next.reject(result);
    }
  },

  then(onFulfilled) {
    this.next = new MyPromise();
    this.onFulfilled = onFulfilled;
    if (this.state === 'fulfilled') {
      this.taskCallBack(
        this.currentValue,
        this.onFulfilled.bind(this),
        this.next,
      );
    }
    return this.next;
  },

  resolve(res) {
    this.state = 'fulfilled';
    this.currentValue = res;
    if (this.next && this.onFulfilled) {
      this.taskCallBack(
        this.currentValue,
        this.onFulfilled.bind(this),
        this.next,
      );
    }
  },
  reject() {},
  catch() {},
};
export default MyPromise;

```
加上reject函数
``` javascript
function MyPromise(processor) {
  this.state = 'pending';
  const context = this;
  if (!processor) {
    return;
  }
  processor(
    (res) => {
      context.resolve(res);
    },
    (err) => {
      context.reject(err);
    },
  );
}
MyPromise.prototype = {
  constructor: MyPromise,
  taskCallBack(value, processor, next) {
    let result = null;
    let normal = 1;
    try {
      result = processor(value);
    } catch (err) {
      normal = 0;
      result = err;
    }
    if (result instanceof MyPromise) {
      result.next = next;
      result.then((res) => {
        next.resolve(res);
      });
      return;
    }
    if (normal === 1) {
      next.resolve(result);
    } else {
      next.reject(result);
    }
  },

  then(onFulfilled) {
    this.next = new MyPromise();
    this.onFulfilled = onFulfilled;
    if (this.state === 'fulfilled') {
      this.taskCallBack(
        this.currentValue,
        this.onFulfilled.bind(this),
        this.next,
      );
    }
    return this.next;
  },
  catch(onReject) {
    this.next = new Promise();
    this.onReject = onReject;
    if (this.state === 'rejected') {
      this.taskCallBack(
        this.currentErr,
        this.onReject.bind(this),
        this.next,
      );
    }
    return this.next;
  },

  resolve(res) {
    this.state = 'fulfilled';
    this.currentValue = res;
    if (this.next && this.onFulfilled) {
      this.taskCallBack(
        this.currentValue,
        this.onFulfilled.bind(this),
        this.next,
      );
    }
  },
  reject(err) {
    this.state = 'rejected';
    this.currentErr = err;
    if (this.next && this.onReject) {
      this.taskCallBack(
        this.currentErr,
        this.onReject.bind(this),
        this.next,
      );
    }
  },
};
export default MyPromise;

```