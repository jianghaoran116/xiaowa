/* eslint-disable no-unused-vars */
/**
 * @file 入口文件
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './pages/main.vue';
import { reachBottomNotify, functionalTool } from './utils';

Vue.use(VueRouter);
Vue.use(reachBottomNotify);
Vue.use(functionalTool);

// const router = new VueRouter();

const vm = new Vue({
  el: '#app',
  render: h => h(Main),
});
