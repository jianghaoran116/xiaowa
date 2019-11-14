/**
 * @file reacr-router-dom
 * @author yuanxin's student
 */
import React, {Component} from 'react';
/**
 * 透传state
 */
const createContext = () => {
	let context = React.createContext(null);
	return context;
};

let RouterContext = createContext();

/**
 * 创建一个location
 * @param {str} path -  路径
 * @param {obj} state - 需要透传的对象
 */
const createLocation = (path, state) => {
	let pathInfo = /^([^\?]*?)(\?[^#]*?)?(\#.*?)?$/.exec(path);
	return {
		pathname: pathInfo[1],
		search: pathInfo[2],
		hash: pathInfo[3],
		state
	}
};

/**
 * 善用一下loaction
 * @param {object} state 
 */
const getDOMLocation = state => {
	let window$location = window.location;
	let pathname = window$location.pathname;
	let search = window$location.search;
	let hash = window$location.hash;
	return createLocation(`${pathname}${search}${hash}`, state);
}

/**
 * 简单的派发监听队列
 */
let eventEmitter = {
	listener: [],
	notify(...args) { // 执行
		this.listener.forEach(listenr => listenr(...args));
	},
	listen(func) { // 添加到队列
		this.listener.push(func);
	}
};

const matcher = (pathname, location) => {
	return (new RegExp(pathname)).exec(location.pathname);
};

const createBrowserHistory = () => {
	const listen = (func) => {
		// 往监听器里面加一项
		eventEmitter.listen(func);
	}

	const DOMListen = (func) => {
		window.addEventListener('popstate', func);
	};

	DOMListen(event => {
		// 有location变化
		let action = 'POP';
		let location = getDOMLocation(event.state);
		setState({
			action,
			location
		});
	});

	/**
	 * push方法
	 * 底层方法是window.history.pushState
	 * @param {string} path - 开发者传进来的path 
	 * @param {object} state - 开发者传进来的state
	 */
	const push = (path, state) => {
		let action = 'PUSH';
		let location = createLocation(path, state);
		window.history.pushState({
			state
		}, null, path);

		setState({
			action,
			location
		});
	};

	const matchPath = (path) => {
		let action = 'MATCH';

		setState({
			action,
			matchPath: path
		});
	}

	/**
	 * 设置状态 变化
	 * @param {object} nextState 
	 */
	const setState = (nextState) => {
		Object.assign(history, nextState); // 改下history 浅赋值
		eventEmitter.notify(history); // 触发外部的监听器 告诉外部我变化了
	};

	return {
		push,
		listen,
		matchPath
	};
};

export class BrowserRouter extends Component {
	constructor(...args) {
		super(...args)
		// 继承createBrowserHistory
		this.history = createBrowserHistory();
	}

	render() {
		return(
			<Router history={this.history}>
				{this.props.children}
			</Router>
		)
	}
}

export class Router extends Component {
	constructor(props) {
		super(props)
		// 学习router的架构 传props也能直接用
		this.state = {
			action: '',
			location: getDOMLocation(),
			matchPath: ''
		};
		props.history.listen(({action, location, matchPath}) => {
			this.setState({
				action,
				location,
				matchPath
			});
		})
	}

	render() {
		const contextValue = {
			history: this.props.history,
			location: this.state.location,
			matchPath: this.state.matchPath,
		}
		return(
			<RouterContext.Provider value={contextValue}>
				{this.props.children}
			</RouterContext.Provider>
		)
	}
}

export class Switch extends Component {
	static contextType = RouterContext;
	constructor(props) {
		super(props)
	}

	render() {
		// 循环匹配
		let childrenComponent = this.props.children
		for (let i = 0; i < childrenComponent.length; i++) {
			if (childrenComponent[i].props.path && matcher(childrenComponent[i].props.path, this.context.location)) {
				this.context.matchPath = childrenComponent[i].props.path; // 设置一下匹配到的path
				return(
					<React.Fragment>
						{childrenComponent[i]}
					</React.Fragment>
				)
			}
		}
		// 都没匹配上 就判断最后一个子节点的path是否为undefied 做404
		if (childrenComponent[childrenComponent.length -1].props.path == undefined) {
			return (
				<React.Fragment>
					{childrenComponent[childrenComponent.length -1]}
				</React.Fragment>
			)
		} else {
			return null
		}
	}
}

export class Route extends Component {
	constructor(props) {
		super(props)
	}
	static contextType = RouterContext;

	render() {
		const DynamicComponent = this.props.component;
		let match = matcher(this.props.path, this.context.location);
		return(
			<React.Fragment>
				{
					match
					?	<DynamicComponent
							{...this.context}
						/>
					: null
				}
			</React.Fragment>
		)
	}
}

export class Link extends Component {
	constructor(props) {
		super(props)
	}
	static contextType = RouterContext;

	navigateTo() {
		this.context.history.push(this.props.to);
	}

	render() {
		return(
			<a onClick={this.navigateTo.bind(this)}>
				{this.props.children}
			</a>
		)
	}
}