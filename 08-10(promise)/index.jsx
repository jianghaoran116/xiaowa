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
