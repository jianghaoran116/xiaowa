/* eslint-disable no-proto */
/* eslint-disable no-shadow */
/* eslint-disable no-func-assign */
/* eslint-disable no-param-reassign */

function customSetPrototypeOf(o, p) {
  customSetPrototypeOf = Object.setPrototypeOf || function customSetPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return customSetPrototypeOf(o, p);
}

export default function inherit(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass.prototype && superClass.prototype, {
    constructor: { // 静态方法
      value: subClass,
      writable: true,
      configurable: true,
    },
  });

  if (superClass) customSetPrototypeOf(subClass, superClass);
}
