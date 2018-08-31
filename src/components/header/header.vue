<template>
    <div class="header">
        <div class="content-wrapper">
          <div class="avatar">
            <img width="64" height="64" :src="seller.avatar"/>
          </div>
          <div class="content">
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
              {{seller.description}}/{{seller.deliveryTime}}分钟送达
            </div>
            <div class="order" @click.stop="seeOrders">查看订单</div>
            <div v-if="seller.supports" class="supports">
              <span class="icon" :class="classMap[seller.supports[0].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>
            </div>
          </div>
          <div v-if="seller.supports" class="support_count" @click="showDetail">
            <span class="count">{{seller.supports.length }}个</span>
            <span class="icon"> > </span>
          </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
          <span class="bulletin-title"></span>
          <span class="bulletin-content">{{seller.bulletin}}</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background-image">
          <img :src="seller.avatar" width="100%" height="100%"/>
        </div>
        <transition name="fade">
          <div v-show="detailShow" class="detail">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="detail-title">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="seller-information">
                <div class="discount-information-title">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supports">
                  <li class="supports-item" v-for="item in seller.supports" v-bind:key="item.index">
                    <span class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{item.description}}</span>
                  </li>
                </ul>
                <div class="discount-information-title">
                  <div class="line"></div>
                  <div class="text">商家公告</div>
                  <div class="line"></div>
                </div>
                <div class="bulletin">
                  <p class="text">{{seller.bulletin}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="closeDetail">
            <span class="icon-close"></span>
          </div>
        </div>
        </transition>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  /* @import "../../common/stylus/icons.styl" */
  @import "../../common/stylus/mixin.styl"
  .header
    color: #fff
    background: rgba(7,17,27,0.5)
    margin-top 0px
    position relative
    overflow hidden
    .content-wrapper
      position relative
      padding:24px 24px 18px 12px
      font-size:0
      .avatar
        display: inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin:2px 0 8px 0
          .brand
            display: inline-block
            vertical-align top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .order
          position absolute
          right 10px
          top 10px
          font-size 14px
          line-height 14px
          display inline-block
          padding 8px
          border 1px solid rgba(7,17,27,0.1);
        .supports
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            background-size 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1');
            &.discount
               bg-image('discount_1');
            &.guarantee
              bg-image('guarantee_1');
            &.invoice
                bg-image('invoice_1');
            &.special
                bg-image('special_1');

          .text
            display inline-block
            line-height 12px
            font-size 10px
      .support_count
          position absolute
          right 12px
          bottom 14px
          padding 0 8px
          height 24px
          width 30px
          line-height 24px
          border-radius 14px
          background rgba(0,0,0,0.2)
          text-align center
          .count
            vertical-align top
            font-size 10px
          .icon
            vertical-align top
            font-size 10px
            line-height 24px
    .bulletin-wrapper
      position relative
      background-color rgba(7,17,27,0.2)
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .bulletin-title
        display inline-block
        vertical-align top
        margin 7px
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px
        background-repeat no-repeat
      .bulletin-content
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        margin-left 4px
        line-height 24px
        right 12px
        top 5px
      .icon-keyboard_arrow_right:before
        content: "\3e"

    .background-image
      position absolute
      top:0
      left 0px
      width 100%
      height 100%
      z-index -1
      filter blur(4px)
  .detail
    position fixed
    z-index 99
    width 100%
    height 100%
    top 0
    left 0
    overflow auto
    -webkit-backdrop-filter blur(10px)
    backdrop-filter blur(10px)
    background rgba(7,17,27,0.8)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s ease
    &.fade-enter, &.fade-leave-active
      opacity: 0
    .detail-wrapper
      width 100%
      min-height 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .detail-title
          margin-top: 74px
          line-height 16px
          text-align center
          font-size 16px
          font-weight 700
        .star-wrapper
          margin-top 18px
          padding 2px 0
          text-align center
        .discount-information-title
          display flex
          width 80%
          margin 28px auto 24px auto
          .line
            flex 1
            position relative
            top 6px
            border-bottom 1px solid rgba(255,255,255,0.2)
          .text
            padding 0 12px
            font-weight 700
            font-size 14px

        .supports
          width 80%
          margin 0 auto
          .supports-item
            padding  0 12px
            margin-bottom 12px
            font-size 12px
            line-height 12px
            color rgb(255,255,255)
            &.last-child
              margin-bottom 0
            .icon
              display inline-block
              width 16px
              height 16px
              vertical-align top
              margin-right 6px
              background-size 16px 16px
              &.decrease
                bg-image('decrease_2');
              &.discount
                bg-image('discount_2');
              &.guarantee
                bg-image('guarantee_2');
              &.invoice
                bg-image('invoice_2');
              &.special
                bg-image('special_2');
              .text
                line-height 16px
                font-size 12px

        .bulletin
          width 80%
          margin 0 auto
          .text
            padding 0 12px
            line-height 24px
            font-size 12px
    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 64px auto
      clear both
      .icon-close{
        font-size 32px
      }
      .icon-close:before {
        content: "\1f5d9";
      }

</style>
<script>
  import star from 'components/star/star.vue';
export default{
  data () {
    return {
      detailShow: false
    };
  },
  props: {
      immediate: true,
      seller: {
        type: Object
      },
      openid: {},
      deskNo: {}
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
    },
    seeOrders() {
      /* var headImg = 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg';
      var nickName = 'cc';
      this.$router.push({path: '/order', query: {openid: this.openid, deskNo: this.deskNo, headImg: headImg, nickName: nickName}});
      */
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9388cec512d7f8b7&redirect_uri=http://bread.s1.natapp.cc/sell/autho/userinfo&response_type=code&scope=snsapi_userinfo&state=STATE#http://bread.s1.natapp.cc/sell/autho/userinfo';
    }
  },
  created() {
    console.log(this.openid);
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  }
};
</script>
