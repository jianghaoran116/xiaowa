/**
 * @file entry file
 * @author yuanxin
 */

import React, {Component} from 'react';
import {itemFy, clickAble} from '../decorators';
import style from './style.css';

@itemFy(true)
export default class MultiplePic extends Component {

	static classes = 'multiple-pic';

	render() {

		const {title, imageList} = this.props.data;

		const imageComponents = imageList.map(image => (<img src={image} />));

		return (<React.Fragment>
				<h3>{title}</h3>
				{imageComponents}
			</React.Fragment>);
	}
}
