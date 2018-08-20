<template>
  <div class="order-wrapper">
    <div class="dialog" v-show="commentState||payState">
      <commentDialog :commentState="commentState" :orderId="orderId" v-show="commentState" @increment="incrementCstate"></commentDialog>
    </div>
    <div class="orders" ref="orders">
      <div class="orders-content">
        <orderheader :selectType="selectType" @increment="incrementType" :orders="orders"></orderheader>
        <split></split>
        <div class="orders-wrapper">
          <ul>
            <li v-show="!ordersList" class="order-item">
              您还没有相关的订单，可以去下单！！！
            </li>
            <li v-for="order in ordersList" v-bind:key="order.index" class="order-item">
              <router-link :to="{name: 'orderDetail',params: {orderId:order.orderId}}" class="order-link">
                <div class="avatar">
                <img src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png" width="28" height="28"/>
              </div>
                <div class="content">
                <h1 class="name">{{order.sellername}}</h1>
                <p class="text">下单时间：{{order.createTime}}</p>
                <p class="text">总价：￥{{order.orderAmount}}</p>
                <div class="refund" v-show="order.payStatus">
                  {{payMap[order.payStatus]}}
                </div>
                <div class="orderState" :class="classMap[order.orderStatus]">
                  {{classMap[order.orderStatus]}}
                </div>
                <div class="stateContent" @click.stop="stateModal(order.orderStatus, order.orderId)">
                  {{operationMap[order.orderStatus]}}
                </div>
              </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet">
  /* @import "../../common/stylus/icons.styl" */
.order-wrapper
  position absolute
  top 0px
  bottom 0px
  left 0
  right 0
  .dialog
    position relative
    height 100%
  .orders
    height 100%
    overflow hidden
    .orders-wrapper
      background #fff
      padding 0 18px
      .order-item
        .order-link
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
            .refund
              display inline-block
              font-size 10px
              color rgb(255,153,0)
              line-height 10px
              font-weight 200
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
  import BetterScroll from 'better-scroll';
  import commentDialog from 'components/dialog/commentDialog';
  const SUCCESS = 1;
  /* 设置订单状态 */
   const PAYMENT = 0; // 0:待付款
  const TOEVALUATED = 3; // 2：待评价
  /* const TOUSE = 1; // 1：待使用（已付款）
  const COMPLETED = 3; // 3：已完成
  const REFUND = 4; // 4：退款、售后 */
  const ALL = 5; // 5:全部订单
  export default{
    data () {
      return {
        orders: {
          type: Object
        },
        selectType: {
          type: Number,
          default: ALL
        },
        payState: { // 是否打开支付窗口
          type: Boolean,
          default: false
        },
        commentState: { // 是否打开评论窗口
          type: Boolean,
          default: false
        },
        orderId: {
          type: String
        }
      };
    },
    components: {
      orderheader,
      split,
      commentDialog
    },
    created() {
//      0:待付款，3：待评价，1：已完成，4：待使用 , 2：已取消
      this.selectType = ALL;
      this.commentState = false;
      this.payState = false;
      this.classMap = ['待付款', '已完成', '已取消', '待评价'];
      this.operationMap = ['去支付', '再来一单', '订单已取消', '去评价'];
      // 3:退款中， 2：已退款
      this.payMap = ['', '', '已退款', '退款中'];
      this.$http.post('http://bread.s1.natapp.cc/sell/order/orderlist', {'openid': 1}, {
        'emulateJSON': false}).then((response) => {
        response = response.body;
        if (response.mcode === SUCCESS) {
          this.orders = response.orderList;
          console.log(this.orders);
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BetterScroll(this.$refs.orders, {
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
    },
    methods: {
      incrementType(selectType) {
        this.selectType = selectType;
      },
      incrementCstate(commentState) {
        this.commentState = commentState;
      },
      orderTypeList(statetype) {
        if (statetype === ALL) {
          return this.orders;
        }
        let listArray = [];
        for (let i = 0; i < this.orders.length; i++) {
          console.log('orders:' + this.orders[i]);
          if (this.orders[i].orderStatus === statetype) {
            listArray.push(this.orders[i]);
          }
        }
        console.log(listArray);
        // 返回处理后的值
        return listArray;
      },
      stateModal(orderStatus, orderId) {
        this.orderId = orderId;
        if (orderStatus === PAYMENT) {
          this.payState = true;
        } else if (orderStatus === TOEVALUATED) {
          this.commentState = true;
        }
        console.log(this.commentState);
      }
    },
    props: {
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
