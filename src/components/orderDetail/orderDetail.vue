<template>
    <div class="orderDetail">
        <div class="orderDetail-content">
          <span class="icon-返回"></span>
          <h1 class="title">{{classMap[orderItem.orderState]}}</h1>
          <div class="order-item-detail">
            <router-link to="/seller">
              <h2 class="seller-name">{{orderItem.sellername}}</h2>
              <span class="icon-keyboard_arrow_right"></span>
            </router-link>
            <ul class="orderUL">
              <li v-for="item in orderItem.orderList" class="order-item" v-bind:key="item.index" >
                <div class="icon">
                  <img width="57" :src="item.icon"/>111
                </div>
                <div class="content">
                  <h2 class="name">111{{item.foodname}}</h2>
                  <div class="extra">
                    <span>X111{{item.count}}</span>
                  </div>
                  <div class="price">
                    <span class="new">￥111{{item.price}}</span>
                    <span v-show="item.oldPrice" class="old">￥11{{item.oldPrice}}</span>
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
  import split from 'components/split/split.vue';
  const SUCCESS = 0;
  export default{
    data () {
      return {
        orderItem: {
          type: Object
        }
      };
    },
    components: {
      split
    },
    created() {
//      0:待付款，1：待使用（已付款），2：待评价，3：已完成，4：退款、售后
      this.classMap = ['待付款', '待使用', '待评价', '已完成', '退款/售后 '];
      this.operationMap = ['去支付', '去使用', '去评价', '再来一单', '查看详情'];
      this.$http.get('/api/orders').then((response) => {
        response = response.body;
        if (response.errno === SUCCESS) {
          this.orderItem = response.data[0];
        }
      });
    }
  };
</script>
