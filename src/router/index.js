import Vue from 'vue';
import VueRouter from 'vue-router';

/* 引入组件 */
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';
 import order from 'components/order/Order.vue';
 import orderDetail from 'components/orderDetail/orderDetail.vue';
import pay from 'components/pay/pay.vue';
import commentDialog from 'components/dialog/commentDialog';

Vue.use(VueRouter);

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/goods', component: goods },
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller},
  {path: '/order', name: 'order', component: order},
  {path: '/pay', name: 'pay', component: pay},
  {path: '/orderDetail', name: 'orderDetail', component: orderDetail},
  {path: '/commentDialog', name: 'commentDialog', component: commentDialog},
  // 重定向
  {path: '/', redirect: '/goods'}
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

export default router;
