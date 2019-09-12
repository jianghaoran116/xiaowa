/**
 * @file 小程序核心逻辑层
 */
class Bridge {

	/**
	 * 用iframe替代小程序的webview
	 * @param {*} id 区分同一uri生成的视图 iframe
	 */
	createView(id) {
		/**
		 * 创建完后返回一个promise
		 */
		return new Promise(resolve => {
			let frame = document.createElement('iframe');
			frame.src = './view.html';
			frame.id = id;
			frame.className = 'view';
			frame.onload = () => resolve(frame); // 把iframe传外头
			document.body.appendChild(frame);
		});
	}

	/**
	 * 发消息
	 * @param {String} [id] - 视图的唯一标识
	 * @param {Object} [params] - 需要set的数据
	 */
	postMessage(id, params) {
		const target = document.querySelector('#' + id);
		target.contentWindow.postMessage(params);
	}

	/**
	 * 接受消息
	 * @param {*} callback 
	 */
	onMessage(callback) {
		window.addEventListener('message', function (event) {
			callback && callback(event.data);
		});
	}
}

window.__bridge = new Bridge();