<template>
    <div class="orderDetail" ref="orderDetail">
        <div class="orderDetail-content">
          <div class="title">
            <span class="icon-arrow_lift" @click="goback"></span>
            <h1 class="text" id="setTime">
              <span class="state" v-show="orderStatus !== 0">{{classMap[orderStatus]}}</span>
              <span class="state" v-show="timeState" @click="toPay" >{{operationMap[orderStatus]}}</span>
              <span v-show="timeState">等待支付/还剩：</span>
              <span v-show="timeState">{{minute}}:{{second}}</span>
            </h1>
          </div>
          <div class="order-item-detail">
            <router-link to="/seller">
              <span class="icon-arrow_lift"></span>
              <h2 class="seller-name">healer</h2>
            </router-link>
            <ul class="orderUL">
              <li v-for="item in orderDetailList" class="order-item" v-bind:key="item.index" >
                <div class="icon">
                  <img width="57" :src="item.icon" height="57"/>
                </div>
                <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <div class="extra">
                    <span>X{{item.quantity}}</span>
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
                <span class="text">￥0</span>
              </div>
              <div class="delivery-price">
                <span class="price">配送费</span>
                <span class="text">￥0</span>
              </div>
            </div>
            <div class="total-wrapper">
              <span class="text">已优惠</span><span class="special-price">￥0</span>
              <span class="text">合计</span><span class="total-price">￥{{totalPrice}}</span>
            </div>
            <div style="clear: both"></div>
          </div>
          <div class="delivery-information">
              <h1 class="title">配送信息</h1>
              <ul class="deliveryul">
                <li class="delivery-table">
                  <span  class="text-left">配送服务</span>
                  <span  class="text-right">商家配送</span>
                </li>
                <li class="delivery-table">
                  <span  class="text-left">期望时间</span>
                  <span  class="text-right">立即送出</span>
                </li>
                <li class="delivery-table">
                  <span  class="text-left">配送地址</span>
                  <span  class="text-right">{{deskNo}}</span>
                </li>
              </ul>
            </div>
          <div class="delivery-information">
              <h1 class="title">订单信息</h1>
              <ul class="deliveryul">
                <li class="delivery-table">
                  <span  class="text-left">订单号码：</span>
                  <span  class="text-right">{{orderId}}</span>
                </li>
                <li class="delivery-table">
                  <span  class="text-left">下单时间：</span>
                  <span  class="text-right">{{orderDetailList[0].createTime}}</span>
                </li>
                <li class="delivery-table">
                  <span  class="text-left">支付方式：</span>
                  <span  class="text-right">在线支付</span>
                </li>
                <li class="delivery-table">
                  <span  class="text-left">用户信息：</span>
                  <span  class="text-right">{{userInfo.name}}/{{userInfo.phone}}</span>
                </li>
              </ul>
            </div>
          <commentDialog :commentState="commentState" :orderId="orderId" v-show="commentState" @increment="incrementCstate"></commentDialog>
        </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "orderDetail.styl";
</style>

<script>
  import BetterScroll from 'better-scroll';
  import split from 'components/split/split.vue';
  import Vue from 'vue';
  const SUCCESS = 1;
  export default{
    data () {
      return {
        orderDetailList: {
          type: Object
        },
        orderId: {},
        deskNo: {},
        orderStatus: {},
        openid: {},
        userInfo: {},
        minutes: {
          default: 15
        },
        seconds: {
          default: 0
        },
        commentState: { // 是否打开评论窗口
          type: Boolean,
          default: false
        },
        timeState: {}
      };
    },
    components: {
      split
    },
    created() {
//      0:待付款，3：待评价，1：已完成，4：待使用 , 2：已取消
      this.classMap = ['待付款', '已完成', '已取消', '待评价'];
      this.operationMap = ['去支付   ', '再来一单', '订单已取消', '去评价'];
      // 3:退款中， 2：已退款
      this.payMap = ['', '', '已退款', '退款中'];
      this.commentState = false;
      this.timeState = false;
      this.orderId = this.$route.query.orderId;
      this.openid = this.$route.query.openid;
      console.log(this.orderId);
      console.log(this.openid);
      this.$http.post('http://bread.s1.natapp.cc/sell/order/detaillist', {'orderId': this.orderId}, {
        'emulateJSON': false}).then((response) => {
        response = response.body;
        if (response.mcode === SUCCESS) {
          this.orderDetailList = response.detailList;
          this.deskNo = response.address;
          console.log(this.orderDetailList[0].createTime);
          this.orderStatus = response.orderStatus;
          this.payStatus = response.payStatus;
          console.log(response.orderStatus);
          if (response.orderStatus === '0') {
            console.log(1111);
            this.timeout(this.orderDetailList[0].createTime);
          } else {
            console.log(222);
          }
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BetterScroll(this.$refs.orderDetail, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      });
      this.$http.post('http://bread.s1.natapp.cc/sell/order/baseuserinfo', {'openid': this.openid}, {
        'emulateJSON': false}).then((response) => {
        response = response.body;
        if (response.mcode === SUCCESS) {
          Vue.set(this.userInfo, 'name', response.name);
          Vue.set(this.userInfo, 'phone', response.phone);
          Vue.set(this.userInfo, 'address', this.deskNo);
        }
      }, (response) => {
        console.log(222 + ' ' + response);
        // 请求失败回调
      });
    },
    computed: {
      totalPrice() {
        var totalP = 0;
        for (let i = 0; i < this.orderDetailList.length; i++) {
          totalP += this.orderDetailList[i].price * this.orderDetailList[i].quantity;
        }
        let realVal = Number(totalP).toFixed(2);
        // num.toFixed(2)获取的是字符串
        console.log('totalP' + Number(realVal));
        return Number(realVal);
      },
      second: function () {
        return this.num(this.seconds);
      },
      minute: function () {
        return this.num(this.minutes);
      }
    },
    watch: {
      second: {
        handler (newVal) {
          this.num(newVal);
        }
      },
      minute: {
        handler (newVal) {
          this.num(newVal);
        }
      },
      '$route' (to, from) {
        this.$router.go(0);
      }
    },
    methods: {
      num: function (n) {
        return n < 10 ? '0' + n : '' + n;
      },
      add: function () {
        var _this = this;
        var time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59;
            _this.minutes -= 1;
            _this.timeState = true;
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0;
            _this.timeState = false;
            _this.$http.post('http://bread.s1.natapp.cc/sell/order/cancel', {'orderId': this.orderId, 'openid': this.openid}, {
              'emulateJSON': false}).then((response) => {
              response = response.body;
              if (response.mcode === SUCCESS) {
                _this.$toast({
                  title: '消息提示',
                  content: '取消订单成功',
                  type: 'success',
                  onShow: () => {
                    console.log('on toast show');
                  },
                  onHide: () => {
                    console.log('on toast hide');
                  }
                });
              }
            }, (response) => {
               _this.$toast({
                title: '消息提示',
                content: '取消订单失败',
                type: 'warning',
                onShow: () => {
                  console.log('on toast show');
                },
                onHide: () => {
                  console.log('on toast hide');
                }
              });
              // 请求失败回调
            });
            window.clearInterval(time);
          } else {
            _this.seconds -= 1;
          }
        }, 1000);
      },
      timeout(time) { // 计算当前订单支付剩余时间
        var formatTimeS = new Date(time).getTime();
        console.log(formatTimeS);
        var nowTime = new Date().getTime();
       var t = new Date(nowTime - formatTimeS);
       if ((nowTime - formatTimeS) > 900000 || (nowTime - formatTimeS) < 0) {
         this.seconds = 0;
         this.minutes = 0;
         this.timeState = false;
       } else {
         var tminutes = t.getMinutes();
         var tSeconds = t.getSeconds();
         this.seconds = 60 - tSeconds;
         this.minutes = 14 - tminutes;
         this.timeState = true;
       }
      },
      toPay() {
        if (this.orderStatus === '0') {
          this.$router.push({path: '/pay', query: {orderId: this.orderId, openid: this.openid, deskNo: this.deskNo}});
        } else if (this.orderStatus === '1') {
          this.$router.push({path: '/goods', query: {openid: this.openid, deskNo: this.deskNo}});
        } else if (this.orderStatus === '3') {
          this.commentState = true;
        }
      },
      incrementCstate(commentState) {
        this.commentState = commentState;
      },
      goback() {
        this.$router.go(-1);
      }
    },
    mounted () {
      this.add();
    }
  };
</script>
