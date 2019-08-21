/* eslint-disable no-unused-vars */
/**
 * @file 文件入口
 */
import Vue from 'vue';
import Main from './pages/main.vue';

const vm = new Vue({
  el: '#app',
  render: h => h(Main),
});
