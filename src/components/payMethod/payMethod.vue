<template>
    <div>
        <div class="back" v-show="payMethodState">
          <transition name="fold">
            <div class="payMethod-wrapper">
            <div class="title">
              <h1 class="text">选择支付方式</h1>
              <span class="icon-close" @click="payMethodShow"></span>
              <div style="clear: both"></div>
            </div>
            <ul>
              <li class="payMethod-item">
                <div class="choose-title">
                  <span class="icon-支付宝"></span>
                  <span class="text">支付宝</span>
                </div>
                <span class="icon-check_circle" @click="selectPayMethod1(0,$event)" :class="{'active':this.payMethod === 0}"></span>
                <div style="clear: both"></div>
              </li>
              <li class="payMethod-item">
                <div class="choose-title">
                  <span class="icon-花呗"></span>
                  <span class="text">花呗支付</span>
                </div>
                <span class="icon-check_circle" @click="selectPayMethod1(2,$event)" :class="{'active':payMethod === 2}"></span>
                <div style="clear: both"></div>
              </li>
              <li class="payMethod-item">
                <div class="choose-title">
                  <span class="icon-银行卡"></span>
                  <span class="text">银行卡支付</span>
                </div>
                <span class="icon-check_circle" @click="selectPayMethod1(3,$event)" :class="{'active':payMethod === 3}"></span>
                <div style="clear: both"></div>
              </li>
              <li class="payMethod-item">
                <div class="choose-title">
                  <span class="icon-微信"></span>
                  <span class="text">微信支付</span>
                </div>
                <span class="icon-check_circle" @click="selectPayMethod1(1,$event)" :class="{'active':payMethod === 1}"></span>
                <div style="clear: both"></div>
              </li>
              <li class="payMethod-item">
                <div class="choose-title">
                  <span class="icon-qq钱包">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                  <span class="path6"></span>
                </span>
                  <span class="text">qq钱包</span>
                </div>
                <span class="icon-check_circle" @click="selectPayMethod1(4,$event)" :class="{'active':payMethod === 4}"></span>
                <div style="clear: both"> </div>
              </li>
            </ul>
          </div>
            </transition>
        </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  .back
    position fixed
    bottom 0px
    right 0px
    left 0px
    background rgba(7,17,27,0.5)
    z-index 200
    .payMethod-wrapper
      background #FFF
      padding 0 12px
      .title
        padding 8px 0
        text-align center
        .text
          display inline-block
          font-size 16px
          font-weight 700
          line-height 16px
          color rgb(7,17,27)
        .icon-close
          display inline-block
          float right
          font-size 16px
      .payMethod-item
        border-top 1px solid rgba(7,17,27,0.1)
        padding 12px 0
        .choose-title
          font-size 14px
          line-height 14px
          display inline-block
          vertical-align top
          .icon-支付宝, .icon-花呗, .icon-银行卡, .icon-微信, .icon-qq钱包
            margin 0 4px
            font-size 14px
            line-height 14px
        .icon-check_circle
          display inline-block
          float right
          font-size 14px
          line-height 14px
          &.active
            color rgb(0,160,220)
    .fold-enter-active, .fold-leave-active
      transition: all 0.5s
    .fold-enter, .fold-leave-active
      transform: translate3d(0, 0, 0)
</style>

<script>
  export default{
    data () {
      return {
        state: {
          type: Boolean,
          default: false
        },
        method: {
          type: Number,
          default: 0
        }
      };
    },
    created() {
      this.state = this.payMethodState;
      this.method = this.payMethod;
    },
    props: {
      payMethodState: {
        type: Boolean,
        default: false
      },
      payMethod: {
        type: Number,
        default: 0
      }
    },
    methods: {
      selectPayMethod1(payMethod, event) {
        this.method = payMethod;
        this.state = false;
        this.$emit('increment1', this.method, this.state);
      },
      payMethodShow() {
        this.state = !this.payMethodState;
        this.$emit('increment2', this.state);
      }
    }
  };
</script>
