<template>
    <div class="shopCart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highLight':totalCount>0}">
              <span class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></span>
            </div>
            <div class="count">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highLight':totalPrice>0}"> ￥{{totalPrice}}元</div>
          <div class="distribution_fee">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{deliverypay}}
            </div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "shopCart.styl";
</style>
<script>
  export default{
    data () {
      return {msg: '这个是Home模板页'};
    },
    props: {
      selectProducts: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 2
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        var totalP = 0;
        this.selectProducts.forEach((food) => {
          totalP += food.price * food.count;
        });
        return totalP;
      },
      totalCount() {
        var totalC = 0;
        this.selectProducts.forEach((food) => {
          totalC += food.count;
        });
        return totalC;
      },
      deliverypay() {
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '元起送';
        } else if (this.totalPrice < this.minPrice) {
          let tmp = this.minPrice - this.totalPrice;
          return '还差￥' + tmp + '元起送';
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    }
  };
</script>
