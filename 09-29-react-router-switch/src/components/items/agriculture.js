/**
 * @file entry file
 * @author yuanxin
 */

import React, {Component} from 'react';
import {itemFy} from './decorators';
import Echarts from './echarts';
import store from '../../store';

@itemFy()
export default class Agriculture extends Component {

	static classes = 'agriculture';

	render() {
		return (<div className="content">
				农业
				<button onClick={this.supplement}>增加猪价项</button>
				<Echarts />
			</div>);
	}

	supplement() {
		store.dispatch({
			type: 'PUSH_LIST',
			data: [{
				data: {
					articleUrl: "http://m.ce.cn/ttt/201907/10/t20190710_32584185.shtml",
					id: "i6727634212259643910"
				},
				type: "agriculture"
			}]
		});
	}
}