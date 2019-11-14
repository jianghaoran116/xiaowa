/**
 * @file entry file
 * @author yuanxin
 */

import React, {Component, useState, useEffect} from 'react';
import {itemFy} from './decorators';
import echarts from 'echarts';

export default () => {

  	const [price, setPrice] = useState(0);
	useEffect(() => {
		console.log('我被调用了：：!', price);
		
		return () => {
			
			console.log('componentWillUnmount!');
		};
	});

	return (<div onClick={() => setPrice(50)}>
			echarts{price}
		</div>);
};