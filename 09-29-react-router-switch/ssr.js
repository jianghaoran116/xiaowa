import React from 'react';
global.appData = require(`./mock/list.json`).data;
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const hook = require('css-modules-require-hook/preset');
const App = require('./src/app').default;
const context = {};


const htmlStr = renderToString(
	<StaticRouter location="/home" context={context}>
		<App />
	</StaticRouter>
);

console.log('htmlStr:::', htmlStr);
