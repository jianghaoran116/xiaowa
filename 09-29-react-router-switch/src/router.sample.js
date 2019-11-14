import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, Switch} from './fake-router';

class Main extends Component {
	
	render() {
		return (
			<React.Fragment>
				<div onClick={this.skip.bind(this)}>
					我是首页
				</div>
				<div><Link to="/detail/i6727875488498319878">跳转</Link></div>
			</React.Fragment>
		)
	}

	skip() {
		this.props.history.push('/c/i6727875488498319878');
	}
}

class Detail extends Component {
	render() {
		return <div>我是详情页</div>;
	}
}

class NoMatch extends Component {
	render() {
		return <div>404</div>;
	}
}

class AppContainer extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/home" component={Main} />
					<Route path="/home" component={Main} />
					<Route path="/detail" component={Detail} />
					<Route component={NoMatch} />
				</Switch>
			</BrowserRouter>);	
	}
}

ReactDOM.render(
	<AppContainer />,
	document.getElementById('app')
);