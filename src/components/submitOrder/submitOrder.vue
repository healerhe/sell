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
            <div class="confirm-pay">
              确认支付
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "submitOrder.styl"
</style>

<script>
  export default{
    data () {
      return {
      };
    },
    props: {
      totalPrice: {
        type: Number
      },
      orderItem: {
        type: Object
      }
    }
  };
</script>
