<template>
  <div id="app">
   <!-- <router-view/>-->
    <v-header :seller="seller"></v-header>
    <div class="tab base-scale">
      <div class="item-tab">
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="item-tab">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="item-tab">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="line"></div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    <!--<v-footer class="footer"></v-footer>-->
  </div>
</template>

<script type="text/ecmascript-6">
/* 引入healer组件 */
import header from 'components/header/header.vue';
/* 引入footer组件 */
import footer from 'components/footer/footer.vue';

const SUCCESS = 0;
export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === SUCCESS) {
        this.seller = response.data;
        }
    });
  },
  name: 'App',
  /* 注册header对象 */
  components: {
    'v-header': header,
    'v-footer': footer
  }
};

</script>

<style>
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#app .tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
#app .tab .item-tab{
  flex: 1;
  text-align: center;
}
#app .tab .item-tab a{
  display: block;
  font-size:14px;
  color: rgb(77,85,93);
}
#app .tab .item-tab a.router-link-active{
  text-decoration: none;
  color: rgb(240,20,20);
}
#app .line{
  width: 100%;
  height: 1px;
  background-color: rgba(7,17,27,0.1);
}
</style>
