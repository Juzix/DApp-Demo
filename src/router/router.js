/**
 * 定义路由
 * 1: http://localhost:30001/
 * 2: http://localhost:30001/home
 * 3: http://localhost:30001/user
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import {routerMode} from '../config/env'
import App from '../App'

Vue.use(VueRouter);

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');

export default new VueRouter({
  routes: [{
    path: '/bookMgr',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
      //地址为空时跳转home页面
      {
        path: '/',
        redirect: 'home'
      },
      {
        path: 'home',
        component: home
      },
    ]
  }],
  mode: routerMode
});
