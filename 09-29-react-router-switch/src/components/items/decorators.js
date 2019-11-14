/**
 * @file entry file
 * @author yuanxin
 */

import React, {Component} from 'react';

export const itemFy = hasClick => ItemComponent => {
	return class extends Component {
		render() {
			return (<div className={`item ${ItemComponent.classes}`}
				onClick={hasClick ? this.props.onClick : () => {}}>
				<ItemComponent {...this.props}/>
			</div>);
		}
	};
};