/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
/**
 * @file 文件入口
 */
import * as utils from './utils';
import components from './items';

import './styles/index.css';

const THRESHOLD = 50;

class Manager {
  constructor($root) {
    this.$root = $root;
  }

  init() {
    this.appendData();
    this.detectReachBottom(() => this.appendData());
  }

  getData() {
    return utils.reuqest({
      url: 'api/list',
    })
      .then((res) => {
        localStorage.setItem('newsData', JSON.stringify(res));
        return res;
      })
      .catch(() => JSON.parse(localStorage.getItem('newsData') || '{}'));
  }

  appendData() {
    this.getData()
      .then((res) => {
        const items = res.data;
        items.forEach((item) => {
          const componentName = item.type
            .replace(/^\w/g, w => w.toUpperCase()); // 首字母转换大小写
          const Component = components[componentName];
          const currentComponent = new Component(item);
          const element = currentComponent.constructElement();
          this.$root.append(element);
        });
        // localStorage.setItem('');
      });
  }

  detectReachBottom(callback = () => {}) {
    window.onscroll = () => {
      const offsetHeight = document.documentElement.offsetHeight;
      const screenHeight = window.screen.height;
      const scrollY = window.scrollY;
      const gap = offsetHeight - screenHeight - scrollY;
      if (gap < THRESHOLD) {
        callback();
      }
    };
  }

  static getInstance($root) {
    return new Manager($root);
  }
}

const manager = Manager.getInstance(document.getElementById('root'));
manager.init();
