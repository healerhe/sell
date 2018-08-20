<template>
    <div class="order-header">
      <div class="title">我的订单</div>
      <div class="navbar">
        <div class="navbar_item" @click="select(5,$event)">
          <span class="icon-全部订单 icons" :class="{'active':selectType===5}"></span><br>
          <span class="text">全部订单{{all.length}}</span>
        </div>
        <div class="navbar_item" @click="select(0,$event)">
          <span class="icon-待付款 icons" :class="{'active':selectType===0}"></span><br>
          <span class="text">待付款{{payment.length}}</span>
        </div>
        <div class="navbar_item" @click="select(1,$event)">
          <span class="icon-待使用抵扣券 icons" :class="{'active':selectType===1}"></span><br>
          <span class="text">待使用{{toUse.length}}</span>
        </div>
        <div class="navbar_item" @click="select(2,$event)">
          <span class="icon-待评价 icons" :class="{'active':selectType===2}"></span><br>
          <span class="text">待评价{{toEvaluated.length}}</span>
        </div>
        <div class="navbar_item" @click="select(3,$event)">
          <span class="icon-退款，售后 icons" :class="{'active':selectType===3}"></span><br>
          <span class="text">退款/售后{{refund.length}}</span>
        </div>
        <div class="navbar_item" @click="select(4,$event)">
          <span class="icon-已完成 icons" :class="{'active':selectType===4}"></span><br>
          <span class="text">已完成{{completed.length}}</span>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "header.styl"
  /* @import "../../../common/stylus/icons.styl" */
</style>

<script>
  import Vue from 'vue';
  /* 设置订单状态 */
  const PAYMENT = 0; // 0:待付款
  const TOUSE = 1; // 1：待使用（已付款）
  const TOEVALUATED = 2; // 2：待评价
  const COMPLETED = 3; // 3：已完成
  const REFUND = 4; // 4：退款、售后
  const ALL = 5; // 5:全部订单
  export default{
    data () {
      return {
        ordersTmp: {
          type: Object
        },
        seTypeTmp: {
          type: Number,
          default: ALL
        }
      };
    },
    props: {
      selectType: {
        type: Number,
        default: ALL
      },
      orders: {
      }
    },
    created() {
      this.seTypeTmp = this.selectType;
      this.ordersTmp = this.orders;
    },
    methods: {
      select(selectType, event) {
        if (!event._constructed) { // 去掉自带的click事件点击，即pc端直接返回
          return;
        }
        this.$emit('increment', selectType);
      },
      orderTypeList(statetype) {
        if (statetype === ALL) {
          return this.orders;
        }
        let listArray = [];
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].orderState === statetype) {
            listArray.push(this.orders[i]);
          }
        }
        // 返回处理后的值
        return listArray;
      }
    },
    computed: {
      payment() {
        return this.orderTypeList(PAYMENT);
      },
      toUse() {
        return this.orderTypeList(TOUSE);
      },
      toEvaluated() {
        return this.orderTypeList(TOEVALUATED);
      },
      completed() {
        return this.orderTypeList(COMPLETED);
      },
      refund() {
        return this.orderTypeList(REFUND);
      },
      all() {
        return this.orderTypeList(ALL);
      }
    },
    components: {
      Vue
    }
  };
</script>
