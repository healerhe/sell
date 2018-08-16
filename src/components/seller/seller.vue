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
  const SUCCESS = 0;
  export default{
    data () {
      return {
        seller: {
          type: Object
        }
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === SUCCESS) {
          this.seller = response.data;
          this.$nextTick(() => {
            this.initBetterScroll();
          });
        };
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
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
