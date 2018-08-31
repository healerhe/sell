<template>
    <div>
      <div class="submit-wrapper">
        <div class="submit-content">
          <div class="submit-left">
            <div class="total-price">￥{{totalPrice}}</div>
            <div class="line1px"></div>
            <div class="specal-price">已优惠￥33.0</div>
          </div>
          <div class="submit-right">
            <div class="confirm-pay" @click="submitOrder">
              确认支付
            </div>
          </div>
        </div>
      </div>
      <div id="payForm" v-show="getPayShow"></div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "submitOrder.styl"
</style>

<script>
  const SUCCESS = 1;
  export default{
    data () {
      return {
        payShow: {
          type: Boolean,
          default: false
        },
        openPayCount: {}
      };
    },
    props: {
      totalPrice: {
        type: Number
      },
      selectProducts: {},
      userInfo: {},
      orderId: {},
      openid: {}
    },
    created() {
      this.payShow = false;
      this.openPayCount = 0;
    },
    methods: {
      submitOrder() {
        console.log(this.userInfo);
        console.log(this.selectProducts);
        if (this.userInfo.name === '') {
          alert('请输入名字，名字不能为空');
        } else if (this.userInfo.phone === '') {
          alert('请输入电话，电话不能为空');
        } else if (this.userInfo.address === '') {
          alert('请输入地址，地址不能为空');
        } else {
          this.$http.post('http://bread.s1.natapp.cc/sell/order/ordersave',
            {
              'id': this.orderId,
              'buyer_name': this.userInfo.name,
              'buyer_phone': this.userInfo.phone,
              'buyer_address': this.userInfo.address,
              'buyer_openid': this.openid,
              'order_amount': this.totalPrice,
              'foods': this.selectProducts
            }, {'emulateJSON': false}).then((response) => {
            response = response.body;
            if (response.mcode === SUCCESS) {
              this.myBrower();
            }
          }, function () {
            console.log(1111);
          });
        }
      },
      pay() {
        var payForm = '';
        this.$http.get('http://bread.s1.natapp.cc/sell/pay/genorder', {params: {'orderId': this.orderId, 'totalPrice': this.totalPrice}},
          {'emulateJSON': false}).then((response) => {
          if (response.status === 200) {
            const div = document.createElement('div');
            div.className = 'payDiv';
            payForm = document.getElementById('payForm');
            this.payShow = true;
            div.innerHTML = response.data;
            payForm.appendChild(div); // 数组不能使用appendChild（）这个方法；
            payForm.getElementsByTagName('form')[0].submit();
          } else {
            console.log('111');
          }
        }, (response) => {
          console.log('失败');
        });
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
              }
            });
          }
        };
        websocket.onerror = function (event) {
          console.log('websocked通信发生错误');
        };

        window.onbeforeunload = function (event) {
          websocket.close();
        };
      },
      myBrower() {
        /* var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串 */
        var ua = window.navigator.userAgent;// 获取判断用的对象
       /* var isOpera = userAgent.indexOf('Opera') > -1; */
   /*     if (isOpera) { // 判断是否Opera浏览器
          console.log('Opera');
        } else if (userAgent.indexOf('Firefox') > -1) { // 判断是否Firefox浏览器
          console.log('FF');
        } else if (userAgent.indexOf('Chrome') > -1) { // 判断是否Chrome浏览器
          console.log('Chrome');
        } else if (userAgent.indexOf('Safari') > -1) { // 判断是否Safari浏览器
          console.log('Safari');
        } else if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) { // 判断是否IE浏览器
          console.log('IE');
        } else if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) { // 是否在安卓浏览器打开
          console.log('Android');
        } else if (!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) { // // 是否在ios浏览器打开
          console.log('ios');
        } else {
          alert('请在游览器中打开此网页，完成支付');
        } */
        if (ua.indexOf('MicroMessenger') > -1) {
          // 在微信中打开
          console.log('weixin内置游览器');
         alert('请在游览器中打开此网页，完成支付');
        } else {
          this.pay();
        }
      }
    },
    computed: {
      getPayShow() {
        return this.payShow;
      }
    }
  };
</script>
