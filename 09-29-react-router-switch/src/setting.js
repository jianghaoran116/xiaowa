/**
 * @file entry file
 * @author yuanxin
 */
import React, {Component} from 'react';
import style from './setting.css';
import TabContext from './tab-context';
import {Provider, connect} from 'react-redux';

class Setting extends Component {

	static contextType = TabContext;

	render() {
		return (<div className="setting">
				{this.context.map(tab => {
					return <li>{tab.name}</li>
				})}
			</div>);
	}
}

export default connect(

	function mapStateToProps(state) {
		console.log('state-in-Setting::::', state);
		return {
			list: state.list
		};
	},

	function mapDispatchToProps(dispatch) {
		return {
			listUpdate: task => {
				dispatch(task);
			}
		};
	}
)(Setting);