<template>
    <div class="orders">
      <orderheader :selectType="selectType" @increment="incrementType" :orders="orders"></orderheader>
      <split></split>
      <div class="orders-wrapper">
          <ul v-if="orders">
            <li v-for="order in ordersList" v-bind:key="order.index" class="order-item">
              <div class="avatar">
                <img :src="order.avatar" width="28" height="28"/>
              </div>
              <div class="content">
                <h1 class="name">{{order.sellername}}</h1>
                <p class="text">下单时间：{{order.orderTime}}</p>
                <p class="text">总价：￥{{order.totalPrice}}</p>
                <div class="orderState" :class="classMap[order.orderState]">
                  {{classMap[order.orderState]}}
                </div>
                <div class="stateContent">
                  {{operationMap[order.orderState]}}
                </div>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "../../common/stylus/icons.styl"
  .orders
    position absolute
    top 0
    left 0
    width 100%
    overflow hidden
    .orders-wrapper
      background #fff
      padding 0 18px
      .order-item
        display: flex
        padding 18px 0
        border-bottom 1px solid rgba(7,17,27,0.1)
      .avatar
        flex 0 0 28px
        margin-right 12px
        img
          border-radius 5px
      .content
        flex 1
        position relative
        .name
          font-size 10px
          color rgb(7,17,27)
          line-height 12px
          margin-bottom 4px
        .text
          font-size 12px
          line-height 18px
          color rgba(7,17,27,0.5)
        .orderState
          display inline-block
          position absolute
          right 10px
          top 0px
          font-size 10px
          color rgb(0,160,220)
          line-height 12px
          font-weight 200
        .stateContent
          display inline-block
          position absolute
          right 10px
          bottom  0px
          font-size 10px
          color rgb(255,153,0)
          line-height 12px
          font-weight 200
          padding 6px 4px
          border 1px solid rgb(255,153,0)
          border-radius 2px
</style>

<script>
  import split from 'components/split/split.vue';
  import orderheader from 'components/order/header/header.vue';

  const SUCCESS = 0;
/*  /!* 设置订单状态 *!/
   const PAYMENT = 0; // 0:待付款
  const TOUSE = 1; // 1：待使用（已付款）
  const TOEVALUATED = 2; // 2：待评价
  const COMPLETED = 3; // 3：已完成
  const REFUND = 4; // 4：退款、售后 */
  const ALL = 5; // 5:全部订单
  export default{
    data () {
      return {
        orders: {
          type: Object
        }
      };
    },
    components: {
      orderheader,
      split
    },
    created() {
//      0:待付款，1：待使用（已付款），2：待评价，3：已完成，4：退款、售后
      this.classMap = ['待付款', '待使用', '待评价', '已完成', '退款/售后 '];
      this.operationMap = ['去支付', '去使用', '去评价', '再来一单', '查看详情'];
      this.$http.get('/api/orders').then((response) => {
        response = response.body;
        if (response.errno === SUCCESS) {
          this.orders = response.data;
        }
      });
    },
    methods: {
      incrementType(selectType) {
        this.selectType = selectType;
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
    props: {
      selectType: {
        type: Number,
        default: ALL
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            payment: '待支付',
            toUse: '待使用',
            toEvaluated: '待评价',
            completed: '已完成',
            refund: '退款/售后'
          };
        }
      }
    },
    computed: {
      ordersList() {
        return this.orderTypeList(this.selectType);
      }
    }
  };
</script>
