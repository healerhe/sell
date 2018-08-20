// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
/* 负责对前后端进行交互的组件 */
import VueResource from 'vue-resource';
/* 导入外部css,js */
/* import 'jquery-weui/dist/js/jquery-weui.js'; */
// import 'jquery-weui/dist/js/jquery-2.1.4.js';
// import 'jquery-weui/dist/js/fastclick.js';
// import 'jquery-weui/dist/js/zepto.js';
// import 'jquery-weui/dist/css/jquery-weui.css';
// import 'weui/dist/style/demos.css';
/* import 'weui/dist/style/weui.min.css'; */
/* 引入路由的js文件 */
import router from './router/index';
// 注册VueResource
Vue.use(VueResource);

Vue.config.productionTip = false;
/* eslint-disable */
new Vue({
  el: '#app',
  router, // 注入到根实例中
  components: { App },
  render: h=>h(App)
});
