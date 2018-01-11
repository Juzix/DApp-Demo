import Vue from 'vue'
import router from './router/router'
import store from './store/'
import './config/rem'
import FastClick from 'fastclick'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
});
