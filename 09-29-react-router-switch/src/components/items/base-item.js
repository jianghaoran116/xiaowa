
import React, {Component} from 'react';

export default class BaseItem extends Component {

	render() {
		return (<div className="item">
				{this._render()}
			</div>);
	}
}