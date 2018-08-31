<template>
  <div id='app'>
   <!-- <router-view/>-->
    <v-header :seller='seller' :openid='openid' :deskNo='deskNo'></v-header>
    <div class='tab base-scale'>
      <div class='item-tab'>
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class='item-tab'>
        <router-link to='/ratings'>评论</router-link>
      </div>
      <div class='item-tab'>
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <div class='line'></div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view :seller='seller' :openid='openid' :deskNo='deskNo'></router-view>
    </keep-alive>
    <!--<v-footer class='footer'></v-footer>-->
  </div>
</template>

<script type='text/ecmascript-6'>
/* 引入healer组件 */
import header from 'components/header/header.vue';
/* 引入footer组件 */
import footer from 'components/footer/footer.vue';

import 'common/js/splitCode';
export default {
  data() {
    return {
      seller: {},
      openid: {},
      deskNo: {}
    };
  },
  created() {
    // 从浏览器拿到openid，deskNumber(桌号)
    this.openid = this.$route.query.openid;
    console.log(this.openid);
    console.log(this.$route.query.deskNo);
    // 如果值为-1则相当于为获取不到桌号
    if (this.$route.query.deskNo === '-1') {
      this.deskNo = '';
    } else {
      this.deskNo = this.$route.query.deskNo + '号桌';
    }
    this.seller = {
        'name': '粥品香坊（回龙观）',
        'description': '蜂鸟专送',
        'deliveryTime': 38,
        'score': 4.2,
        'serviceScore': 4.1,
        'foodScore': 4.3,
        'rankRate': 69.2,
        'minPrice': 0,
        'deliveryPrice': 0,
        'ratingCount': 24,
        'sellCount': 90,
        'bulletin': '粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。',
        'supports': [
          {
            'type': 0,
            'description': '在线支付满28减5'
          },
          {
            'type': 1,
            'description': 'VC无限橙果汁全场8折'
          },
          {
            'type': 2,
            'description': '单人精彩套餐'
          },
          {
            'type': 3,
            'description': '该商家支持发票,请下单写好发票抬头'
          },
          {
            'type': 4,
            'description': '已加入“外卖保”计划,食品安全保障'
          }
        ],
        'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
        'pics': [
          'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180',
          'http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180',
          'http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180',
          'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180'
        ],
        'infos': [
          '该商家支持发票,请下单写好发票抬头',
          '品类:其他菜系,包子粥店',
          '北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340',
          '营业时间:10:00-20:30'
        ]
    };
  },
  name: 'App',
  /* 注册header对象 */
  components: {
    'v-header': header,
    'v-footer': footer
  },
  methods: {
  }
};

</script>

<style lang='stylus' rel='stylesheet'>
   @import 'common/stylus/sameStylus.styl';
#app {
  position: relative;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
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
