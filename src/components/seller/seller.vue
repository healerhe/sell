<template>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="name-wrapper">
          <h1 class="name">{{seller.name}}</h1>
          <div class="name-content">
            <star :size="36" :score="5" class="star"></star>
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span class="sell">月售600单</span>
          </div>
        </div>
        <div class="line1"></div>
        <div class="delivery-wrapper">
            <div class="deliver-content start-price">
              <div class="text">起送价</div>
              <div class="number">{{seller.minPrice}}<span class="yuan">元</span></div>
            </div>
            <div class="deliver-content delivery-price">
              <div class="text">商家配送</div>
              <div class="number">{{seller.deliveryPrice}}<span class="yuan">元</span></div>
            </div>
            <div class="deliver-content delivery-time">
              <div class="text">平均配送时间</div>
              <div class="number">{{seller.deliveryTime}}<span class="yuan">分钟</span></div>
            </div>
          </div>
        <split></split>
        <div class="bulletinAndDiscount">
          <div class="bulletin">
            <div class="title">公告与活动</div>
            <span class="text">{{seller.bulletin}}</span>
          </div>
          <!--<div class="line1"></div>-->
          <ul v-if="seller.supports" class="supports">
            <li class="supports-item" v-for="item in seller.supports" v-bind:key="item.index">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
              <!--<div class="line2"></div>-->
            </li>
          </ul>
        </div>
        <split></split>
        <div class="seller-realScene" v-show="false">
          <div class="title">商家实景</div>
          <div class="pics" v-for="pic in seller.pics" v-bind:key="pic.index">
            <img :src="pic" width="120" height="90" class="pic"/>
          </div>
        </div>
        <split></split>
        <div class="seller-information">
          <div class="title">商家信息</div>
          <ul class="infoUL">
            <li class="infos" v-for="info in seller.infos" v-bind:key="info.index">
              <span class="text">{{info }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "seller.styl";
</style>

<script>
  import BetterScroll from 'better-scroll';
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  /* 引入js文件 */
  /*  import {urlParse} from '../../static/js/splitCode.js'; */
  export default{
    data () {
      return {
        seller: {
          type: Object
        }
      };
    },
    created() {
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
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$nextTick(() => {
        if (!this.scroll) {
          this.initBetterScroll();
        } else {
          this.scroll.refresh();
        }
      });
    },
    components: {
      star,
      split,
      BetterScroll
    },
    methods: {
      initBetterScroll() {
        this.sellerScroll = new BetterScroll(this.$refs.seller, {
          click: true
        });
      }
    }
  };
</script>
