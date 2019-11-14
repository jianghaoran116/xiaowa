/**
 * @file entry file
 * @author yuanxin
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import AppContainer from './app';

ReactDOM.render(<BrowserRouter>
		<AppContainer />
	</BrowserRouter>,
	document.getElementById('app')
);