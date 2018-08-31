<template>
    <div class="pay">
      <div class="pay-wrapper" ref="payWrapper">
        <div class="pay-content">
          <div class="title">
            <span class="icon-arrow_lift" @click="goback"></span>
            <h1 class="text">提交订单</h1>
        </div>
          <ul class="address-wrapper">
          <li class="address">
            <span class="title">收货地址：</span>
            <div class="choose">
              <span class="text">{{deskNo}}</span>
              <span class="icon-keyboard_arrow_right" @click.stop="writeInfoShow"></span>
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
            <li class="address">
              <span class="title">用户信息：</span>
              <div class="choose" @click.stop="writeInfoShow">
                <span class="text">{{userInfo.name}}/{{userInfo.phone}}</span>
                <span class="icon-keyboard_arrow_right"></span>
              </div>
              <div style="clear: both"></div>
            </li>
        </ul>
          <div class="order-item-detail">
          <router-link to="/seller">
            <h2 class="seller-name">healer</h2>
            <span class="icon-keyboard_arrow_right"></span>
          </router-link>
          <ul class="orderUL">
            <li v-for="item in selectProducts" class="order-item" v-bind:key="item.index" >
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
                <span class="icon-huanbao">马上助力环保</span>
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
            <transition name="fold">
          <div class=""></div>
        </transition>
        </div>
      </div>
      <submitOrder :selectProducts="selectProducts" :totalPrice="totalPrice" :userInfo="userInfo" :orderId="orderId" :openid="openid"></submitOrder>
      <payMethod :payMethod="payMethod" :payMethodState="payMethodState" @increment1="incrementM1"
      @increment2="incrementM2"></payMethod>
      <div class="writeInfo" v-show="userInfoState">
        <div class="title">
          <h1 class="text">请输入个人信息：</h1>
          <span class="icon-close" @click="hideInfo"></span>
        </div>
        <ul>
          <li class="info-item">
            <span class="left-text">姓名：</span>
            <input type="text" class="right-text" placeholder="请输入姓名" :value="userInfo.name" id="username"/>
            <div style="clear: both"></div>
          </li>
          <li class="info-item">
            <span class="left-text">电话：</span>
            <input type="text" class="right-text" placeholder="请输入电话" :value="userInfo.phone" id="userphone"/>
            <div style="clear: both"></div>
          </li>
          <li class="info-item">
            <span class="left-text">桌号：</span>
            <input type="text" class="right-text" placeholder="请输入桌号" :value="userInfo.address" id="useraddress"/>
            <div style="clear: both"></div>
          </li>
        </ul>
        <div class="submitInfo">
          <input type="button" value="提交" @click="hideInfoClick"/>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "pay.styl"
  /* @import "../../common/stylus/icons.styl" */
</style>

<script>
  import BetterScroll from 'better-scroll';
  import Vue from 'vue';
  import submitOrder from 'components/submitOrder/submitOrder';
  import payMethod from 'components/payMethod/payMethod';
  const SUCCESS = 1;
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
        },
        selectProducts: {
          default() {
            return [
              {
                price: 10,
                quantity: 2
              }
            ];
          }
        },
        userInfoState: {},
        userInfo: {},
        orderId: {},
        openid: {
          default: 1
        },
        deskNo: {
          default: '3号桌'
        }
      };
    },
    created() {
      /* 初始化 */
      this.payMethod = 0;
      console.log(111);
      /* window.location.reload(); */
      this.websocketCreate();
      this.userInfoState = false;
      this.payMethodState = false;
      this.tableware_number = '未选择';
      /* 0:支付宝支付 1：微信支付 2：花呗支付 3：银行卡支付 4,：qq钱包支付 */
      this.payMap = ['支付宝', '微信', '花呗', '银行卡支付', 'qq钱包'];
      this.orderId = this.$route.query.orderId;
      this.openid = this.$route.query.openid;
      this.deskNo = this.$route.query.deskNo;
      console.log(this.orderId);
      console.log(this.openid);
      console.log(this.deskNo);
       this.$http.post('http://bread.s1.natapp.cc/sell/order/baseuserinfo', {'openid': this.openid}, {
        'emulateJSON': false}).then((response) => {
          response = response.body;
          if (response.mcode === SUCCESS) {
          Vue.set(this.userInfo, 'name', response.name);
          Vue.set(this.userInfo, 'phone', response.phone);
          Vue.set(this.userInfo, 'address', this.deskNo);
          console.log('userinfo:' + this.userInfo);
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BetterScroll(this.$refs.payWrapper, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
            console.log(this.scroll);
          });
        }
        }, (response) => {
          console.log(222 + ' ' + response);
        // 请求失败回调
        });
      console.log('11111 ' + this.orderId);
      this.$http.post('http://bread.s1.natapp.cc/sell/order/detaillist', {'orderId': this.orderId}, {
        'emulateJSON': false}).then((response) => {
        response = response.body;
        if (response.mcode === SUCCESS) {
          this.selectProducts = response.detailList;
          console.log(this.selectProducts);
        }
      });
    },
    components: {
      submitOrder,
      payMethod,
      BetterScroll
    },
    computed: {
       totalPrice() {
        var totalP = 0;
        for (let i = 0; i < this.selectProducts.length; i++) {
          totalP += this.selectProducts[i].price * this.selectProducts[i].quantity;
        }
         let realVal = Number(totalP).toFixed(2);
         // num.toFixed(2)获取的是字符串
         return Number(realVal);
      }
    },
    methods: {
      incrementM1(payMethod, payMethodState) {
        this.payMethod = payMethod;
        this.payMethodState = payMethodState;
        console.log(this.payMethod + '' + this.payMethodState);
      },
      incrementM2(payMethodState) {
        this.payMethodState = payMethodState;
      },
      payMethodShow() {
        this.payMethodState = !this.payMethodState;
      },
      writeInfoShow() {
        this.userInfoState = !this.userInfoState;
      },
      hideInfo() {
        this.userInfoState = false;
      },
      websocketCreate() {
        // websoket建立连接
        var websocket = null;
        console.log('欢迎来到wclist!');
       if ('WebSocket' in window) {
          websocket = new WebSocket('ws://bread.s1.natapp.cc/sell/paywebsocket');
        } else {
          alert('该浏览器不支持!');
        }

        websocket.onopen = function (event) {
          console.log('建立连接');
        };

        websocket.onclose = function (event) {
          console.log('关闭连接');
        };

        var obj1 = '';
        var _this = this;
        websocket.onmessage = (event) => {
          console.log('收到消息:' + event.data);
          obj1 = JSON.parse(event.data);
          if (obj1.openid === _this.openid) {
            if (obj1.mcode === 1) {
              _this.$toast({
                title: '消息提示',
                content: '支付成功',
                type: 'success',
                onShow: () => {
                  console.log('on toast show');
                },
                onHide: () => {
                  console.log('on toast hide');
                  _this.$router.push({
                    path: '/orderDetail',
                    query: {orderId: _this.orderId, openid: _this.openid, deskNo: _this.deskNo}
                  });
                }
              });
            } else {
              _this.$toast({
                title: '消息提示',
                content: '支付失败',
                type: 'warning',
                onShow: () => {
                  console.log('on toast show');
                },
                onHide: () => {
                  console.log('on toast hide');
                  _this.$router.push({
                    path: '/orderDetail',
                    query: {orderId: _this.orderId, openid: _this.openid, deskNo: _this.deskNo}
                  });
                }
              });
            }
          }
        };
        websocket.onerror = function (event) {
         console.log('websocked通信发生错误');
      };

        window.onbeforeunload = function (event) {
         websocket.close();
        };
      },
      hideInfoClick() {
        var name = document.getElementById('username').value;
        var phone = document.getElementById('userphone').value;
        var address = document.getElementById('useraddress').value;
        if (name === '') {
          alert('请输入名字，名字不能为空');
        } else if (phone === '') {
          alert('请输入电话，电话不能为空');
        } else if (address === '') {
          alert('请输入地址，地址不能为空');
        } else {
          this.userInfo.name = name;
          this.userInfo.phone = phone;
          this.userInfo.address = address;
          this.deskNo = address;
          this.userInfoState = false;
        }
      },
      goback() {
        this.$router.go(-1);
      }
    },
    watch: {
      '$route' (to, from) {
        this.$router.go(0);
      }
    }
  };
</script>
