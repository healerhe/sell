<template>
    <div class="orderDetail" ref="orderDetail">
        <div class="orderDetail-content">
          <div class="title">
            <span class="icon-返回"></span>
            <h1 class="text">{{classMap[orderItem.orderState]}}</h1>
          </div>
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
                  <div class="paystate">
                    已退款
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
              <span class="text">合计</span><span class="total-price">￥{{totalPrice}}</span>
            </div>
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
                  <span  class="text-right">3号桌</span>
                </li>
              </ul>
            </div>
          <div class="delivery-information">
              <h1 class="title">订单信息</h1>
              <ul class="deliveryul">
                <li class="delivery-table">
                  <span  class="text-left">订单号码</span>
                  <span  class="text-right">123456789</span>
                </li>
                <li class="delivery-table">
                  <span  class="text-left">下单时间</span>
                  <span  class="text-right">12234556</span>
                </li>
                <li class="delivery-table">
                  <span  class="text-left">支付方式</span>
                  <span  class="text-right">在线支付</span>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "orderDetail.styl";
</style>

<script>
  import BetterScroll from 'better-scroll';
  import split from 'components/split/split.vue';
  const SUCCESS = 0;
  export default{
    data () {
      return {
        orderItem: {
          type: Object
        },
        orderId: {}
      };
    },
    components: {
      split
    },
    created() {
//      0:待付款，3：待评价，1：已完成，4：待使用 , 2：已取消
      this.classMap = ['待付款', '已完成', '已取消', '待评价'];
      this.operationMap = ['去支付', '再来一单', '订单已取消', '去评价'];
      // 3:退款中， 2：已退款
      this.payMap = ['', '', '已退款', '退款中'];
      this.orderId = this.$route.params.orderId;
      console.log(this.orderId);
   /*   this.$http.post('http://bread.s1.natapp.cc/sell/order/orderlist', {'orderId': this.orderId}, {
        'emulateJSON': false}).then((response) => {
        response = response.body;
        if (response.errno === SUCCESS) {
          this.orderItem = response.data[0];
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BetterScroll(this.$refs.orderDetail, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
            console.log(this.scroll);
          });
        }
      }); */
      this.$http.post('http://bread.s1.natapp.cc/sell/order/admin/ordersave', {'buyer_name': '冯利',
        'buyer_phone': '18428325555',
        'buyer_address': '20号桌',
        'buyer_openid': '1',
        'order_amount': '48.55',
        'foods': [{
          'product_id': '1',
          'name': '干锅里脊',
          'price': '50',
          'quantity': '1',
          'icon': 'http://xxx.com'
        },
          {
            'product_id': '2',
            'name': '干锅牛蛙',
            'price': '100',
            'quantity': '2',
            'icon': 'http://xxx.com'
          }]
      }, {
        'emulateJSON': false}).then((response) => {
        response = response.body;
        if (response.errno === SUCCESS) {
          this.orderItem = response.data[0];
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BetterScroll(this.$refs.orderDetail, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
            console.log(this.scroll);
          });
        }
      }, function () {
        console.log(1111);
      });
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
