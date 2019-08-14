/* eslint-disable class-methods-use-this */
/**
 * @file 文件入口
 */
import * as utils from './utils';
// import components from './items/index';

class Manager {
  constructor($root) {
    this.$root = $root;
  }

  init() {
    this.appendData();
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
        console.log(res);
        // const items = res.data;
        // items.forEach((item) => {
        //   const componentName = item.type
        //     .replace(/^\w/g, w => w.toUpperCase());
        //   const Component = components[componentName];
        //   const currentComponent = new Component(item);
        //   const element = currentComponent.constructElement();
        //   this.$root.append(element);
        // });
        // localStorage.setItem('');
      });
  }

  static getInstance($root) {
    return new Manager($root);
  }
}

const manager = Manager.getInstance(document.getElementById('root'));
manager.init();
