import {createStore} from 'redux';

// reducer
const listProcessor = (state, action) => {
	console.log('state-action:', state, action);
	if (/INIT/.exec(action.type)) {
		return [{
			name: 'yuanxin'
		}];
	}
	else if (action.type === 'PUSH_LIST') {
		return [
			action.data
		];
	}
	return state;
};

// store
const store = createStore(listProcessor);

console.log('store-----11:::', store.getState());

store.subscribe(function () {
	console.log('in-subscribe:::', store.getState());
});


// action
// store.dispatch({
// 	type: 'PUSH_LIST',
// 	data: {
// 		title: '标题'
// 	}
// });

// console.log('store:::', store.getState());



// ----------------------------------------------


// var store = {
//		name: 'yuanxin'
// };


// function changeList(store, action) {
// 	store.state = [
// 		action.data
// 	];
// }


// console.log('store-----11:::', store.state);


// changeList({
// 	data: {
// 		title: '标题'
// 	}
// });


// console.log('store:::', store.state;
