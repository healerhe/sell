<template>
    <div class="pay" ref="pay">
      <div class="pay-content">
        <div class="title">
          <span class="icon-返回"></span>
          <h1 class="text">提交订单</h1>
        </div>
        <ul class="address-wrapper">
          <li class="address">
            <span class="title">收货地址：</span>
            <div class="choose">
              <span class="text">3号桌</span>
              <span class="icon-keyboard_arrow_right"></span>
            </div>
            <div style="clear: both"></div>
          </li>
          <li class="address">
            <span class="title">送达时间</span>
            <div class="choose">
              <span class="text">尽快送达</span>
              <span class="icon-keyboard_arrow_right"></span>
            </div>
            <div style="clear: both"></div>
          </li>
          <li class="address">
            <span class="title">支付方式</span>
            <div class="choose" @click="payMethodShow">
              <span class="text">{{payMap[payMethod]}}</span>
              <span class="icon-keyboard_arrow_right"></span>
            </div>
            <div style="clear: both"></div>
          </li>
        </ul>
        <div class="order-item-detail">
          <router-link to="/seller">
            <h2 class="seller-name">{{orderItem.sellername}}</h2>
            <span class="icon-keyboard_arrow_right"></span>
          </router-link>
          <ul class="orderUL">
            <li v-for="item in orderItem.orderList" class="order-item" v-bind:key="item.index" >
              <div class="icon">
                <img width="57" :src="item.icon" height="57"/>
              </div>
              <div class="content">
                <h2 class="name">{{item.foodname}}</h2>
                <div class="extra">
                  <span>X{{item.count}}</span>
                </div>
                <div class="price">
                  <span class="new">￥{{item.price}}</span>
                  <span v-show="item.oldPrice" class="old">￥{{item.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="delivery-wrapper">
            <div class="delivery-price">
              <span class="price">包装费</span>
              <span class="text">￥11</span>
            </div>
            <div class="delivery-price">
              <span class="price">配送费</span>
              <span class="text">￥11</span>
            </div>
          </div>
          <div class="total-wrapper">
            <span class="text">已优惠</span><span class="special-price">￥3.35</span>
            <span class="text">合计</span><span class="total-price">￥50</span>
          </div>
          <div style="clear: both"></div>
        </div>
        <div class="order-remark-wrapper">
          <ul class="remark-ul">
            <li class="remark-item">
              <span class="title">订单备注</span>
              <div class="text">
                <span class="t">口味，偏好</span>
                <span class="icon-keyboard_arrow_right"></span>
              </div>
              <div style="clear: both"></div>
            </li>
            <li class="remark-item">
              <span class="title">餐具分数</span>
              <div class="text">
                <span class="icon-环保行业">马上助力环保</span>
                <span class="t">{{tableware_number}}</span>
                <span class="icon-keyboard_arrow_right"></span>
              </div>
              <div style="clear: both"></div>
            </li>
            <li class="remark-item">
              <span class="title">号码保护</span>
              <div class="text">
                <span class="icon-check_circle"></span>
              </div>
              <div style="clear: both"></div>
            </li>
          </ul>
        </div>
        <div class="submit-wrapper">
          <div class="submit-left">
            <div class="total-price">￥{{totalPrice}}</div>
            <div class="line1px"></div>
            <div class="specal-price">已优惠￥33.0</div>
          </div>
          <div class="submit-right">
            <div class="confirm-pay">
              确认支付
            </div>
          </div>
        </div>
        <transition name="fold">
          <div class="back" v-show="payMethodState">
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
                <span class="icon-check_circle" @click="selectPayMethod(0,$event)" :class="{'active':this.payMethod === 0}"></span>
                <div style="clear: both"></div>
              </li>
              <li class="payMethod-item">
                <div class="choose-title">
                  <span class="icon-花呗"></span>
                  <span class="text">花呗支付</span>
                </div>
                <span class="icon-check_circle" @click="selectPayMethod(2,$event)" :class="{'active':payMethod === 2}"></span>
                <div style="clear: both"></div>
              </li>
              <li class="payMethod-item">
                <div class="choose-title">
                  <span class="icon-银行卡"></span>
                  <span class="text">银行卡支付</span>
                </div>
                <span class="icon-check_circle" @click="selectPayMethod(3,$event)" :class="{'active':payMethod === 3}"></span>
                <div style="clear: both"></div>
              </li>
              <li class="payMethod-item">
                <div class="choose-title">
                  <span class="icon-微信"></span>
                  <span class="text">微信支付</span>
                </div>
                <span class="icon-check_circle" @click="selectPayMethod(1,$event)" :class="{'active':payMethod === 1}"></span>
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
                <span class="icon-check_circle" @click="selectPayMethod(4,$event)" :class="{'active':payMethod === 4}"></span>
                <div style="clear: both"> </div>
              </li>
            </ul>
          </div>
          </div>
        </transition>
        <transition name="fold">
          <div class=""></div>
        </transition>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "pay.styl"
  @import "../../common/stylus/icons.styl"
</style>

<script>
  import BetterScroll from 'better-scroll';
  const SUCCESS = 0;
  export default{
    data () {
      return {
        payMethod: {
          type: Number,
          default: 0
        },
        payMethodState: {
          type: Boolean,
          default: false
        },
        orderItem: {
          type: Object
        },
        tableware_number: {
          type: String,
          default: '未选择'
        }
      };
    },
    methods: {
      selectPayMethod(payMethod, event) {
        if (!event._constructed) { // 去掉自带的click事件点击，即pc端直接返回
          return;
        }
        this.payMethod = payMethod;
        this.payMethodState = false;
      },
      payMethodShow() {
        this.payMethodState = !this.payMethodState;
      }
    },
    created() {
      /* 初始化 */
      this.payMethod = 0;
      this.payMethodState = false;
      this.tableware_number = '未选择';
      /* 0:支付宝支付 1：微信支付 2：花呗支付 3：银行卡支付 4,：qq钱包支付 */
      this.payMap = ['支付宝', '微信', '花呗', '银行卡支付', 'qq钱包'];
      this.$http.get('/api/orders').then((response) => {
        response = response.body;
        if (response.errno === SUCCESS) {
          this.orderItem = response.data[0];
          this.$nextTick(() => {
            if (!this.scroll) {
             this.scroll = new BetterScroll(this.$refs.pay, {
             click: true
             });
             } else {
                this.scroll.refresh();
             }
             console.log(this.scroll);
          });
        }
      });
    },
    components: {
    },
    computed: {
      totalPrice() {
        var totalP = 0;
        for (let i = 0; i < this.orderItem.length; i++) {
          totalP += this.orderItem[i].price * this.orderItem[1].count;
        }
        return totalP;
      }
    }
  };
</script>
