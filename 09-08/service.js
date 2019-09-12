/**
 * @file 逻辑层
 * 小程序会把所有的js编译到一起，所以每个js能访问到全局的app.js(同一个线程)，称之为service
 * 每个view层(栈)是另一个线程
 * 每个view层视为servi的傀儡 
 * 通过postMessage的方式来做到视图和service的通信，交换数据
 */

/**
 * 先来个闭包
 */
(function (global) {
  let wx = {};
  /**
   * 保存着pageClass类 key值为uri
   */
	let classMap = {};

  /**
   * 在逻辑页面会调用类的init方法初始化
   */
	class Logic {
    /**
     * 拿到首页appJson里的首页地址
     */
		init() {
			this.uniqIndex = 0;
			const firstPageUri = window.appJson.pages[0];
			this.navigateTo(firstPageUri);
		}

    /**
     * 生成唯一标识
     */
		_generateUniqId() {
			return 'id' + (this.uniqIndex++);
		}

    /**
     * 把pageClass从classMap里拿到 然后new一个page 传入ID和uri
     * 每次navigateTo时都是调用一次bridge的createView方法创建一个iframe
     * @param {string} uri 
     */
		navigateTo(uri) {
      const PageClass = classMap[uri];
      /**
       * page由自己创建
       */
			const page = new PageClass(this._generateUniqId(), uri);
		}

	}

  /**
   * Page类的基类
   * 初始化一下数据 自己render一下
   */
	class PageBase {
    /**
     * 构造函数
     * @param {num} id - 视图的ID 
     * @param {*} uri - 视图的URI
     */
		constructor(id, uri) {
			this.uri = uri;
			this.id = id;
			this._initData();
			this._render() // 初始化后render一下 模拟小程序背后做的事情 返回的是个promise 返回后向视图层发消息 异步事件
				.then(() => {
					global.__bridge.postMessage(this.id, {
						type: 'initSet',
						data: this.data
					});
				});
		}

    /**
     * 初始化data 解除多次调用后的相互引用
     */
		_initData() {
			this.data = JSON.parse(JSON.stringify(this.data || {})); // 深拷贝
		}

    /**
     * render方法 创建一个视图
     */
		_render() {
			return global.__bridge.createView(this.id)
				.then(frame => {
					this.$el = frame;
				});
		}

    /**
     * setDate方法 向视图层发消息
     */
		setData() {
			global.__bridge.postMessage(this.id, {
				type: 'setData',
				data: this.data
			});
		}
  }
  
  /**
   * 继承方法
   * @param {object} options - 这里理解Page为类，用这个options当原型
   * @return {class} Page - 返回Page类 继承自 PageBase
   */
	const createPageClass = options => {
		class Page extends PageBase {
			constructor(...args) {
				super(...args);
			}
		}
		Object.assign(Page.prototype, options);
		return Page;
	};

  /**
   * Page函数 记一下 留着调用时用
   * @param {string} uri - page的路径
   * @param {object} options 
   */
	const Page = (uri, options) => {
		classMap[uri] = createPageClass(options);
	};

  /**
   * 把Logic和Page挂到全局对象上
   */
	global.logic = new Logic();
	global.Page = Page;
})(window);
