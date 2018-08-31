<template>
  <div class="order-wrapper">
    <div class="dialog" v-show="commentState">
      <commentDialog :commentState="commentState" :orderId="orderId" v-show="commentState" @increment="incrementCstate" :openid="openid" :headImg="headImg" :nickName="nickName"></commentDialog>
    </div>
    <div class="orders" ref="orders">
      <div class="orders-content">
        <orderheader :selectType="selectType" @increment="incrementType" :orders="orders" :openid="openid" :deskNo="deskNo"></orderheader>
        <split></split>
        <div class="orders-ul">
          <ul>
            <li v-show="ordersList.length === 0" class="order-item-null">
              您还没有相关的订单，可以去下单！！！
            </li>
            <li v-for="order in ordersList" v-bind:key="order.index" class="order-item">
              <router-link :to="{path: '/orderDetail', query: {orderId: order.orderId, openid: openid, deskNo: deskNo}}" class="order-link">
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
                <div class="stateContent" @click.stop.prevent="stateModal(order.orderStatus, order.orderId)">
                  <!--<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9388cec512d7f8b7&redirect_uri=http://bread.s1.natapp.cc/sell/autho/userinfo&response_type=code&scope=snsapi_userinfo&state=STATE#http://bread.s1.natapp.cc/sell/autho/userinfo" v-show="false">
                    --><span class="operation">{{operationMap[order.orderStatus]}}
                    </span>
                 <!-- </a>-->
                  <span class="operation" v-show="order.orderStatus === 0" @click.stop.prevent="statecancle(order.orderStatus, order.orderId)">
                    {{operationMap1[0]}}
                  </span>
                  <span class="operation" v-show="order.orderStatus === 3 && payMap[order.payStatus] === ''" @click.stop.prevent="refund(order.orderId)">{{operationMap1[1]}}</span>
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
    .orders-ul
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
              .operation
                font-size 10px
                color rgb(255,153,0)
                line-height 12px
                font-weight 200
                margin-left 4px
                padding 6px 4px
                border 1px solid rgb(255,153,0)
                border-radius 2px
      .order-item-null
        height 100px
</style>

<script>
  import split from 'components/split/split.vue';
  import orderheader from 'components/order/header/header.vue';
  import BetterScroll from 'better-scroll';
  import commentDialog from 'components/dialog/commentDialog';
  const SUCCESS = 1;
  /* 设置订单状态 */
   const PAYMENT = 0; // 0:待付款
  const TOEVALUATED = 3; // 3：待评价
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
        },
        headImg: {
          type: String
        },
        openid: {},
        deskNo: {}
      };
    },
    components: {
      orderheader,
      split,
      commentDialog
    },
    created() {
      this.websocketCreate();
//      0:待付款，3：待评价，1：已完成，4：待使用 , 2：已取消
      this.selectType = ALL;
      this.payState = false;
      this.commentState = false;
      this.classMap = ['待付款', '已完成', '已取消', '待评价'];
      this.operationMap = ['去支付', '再来一单', '订单已取消', '去评价'];
      this.operationMap1 = ['取消订单', '退款'];
      // 3:退款中， 2：已退款
      this.payMap = ['', '', '已退款', '退款中'];
      this.openid = this.$route.query.openid;
      this.deskNo = this.$route.query.deskNo;
      this.headImg = this.$route.query.headImg;
      this.nickName = this.$route.query.nickName;
      console.log(this.openid);
      console.log(this.deskNo);
      console.log(this.headImg);
      console.log(this.nickName);
      this.$http.post('http://bread.s1.natapp.cc/sell/order/orderlist', {'openid': this.openid}, {
        'emulateJSON': false}).then((response) => {
        response = response.body;
        if (response.mcode === SUCCESS) {
          this.orders = response.orderList;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BetterScroll(this.$refs.orders, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
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
          this.$router.push({path: '/pay', query: {orderId: this.orderId, openid: this.openid, deskNo: this.deskNo}});
        } else if (orderStatus === TOEVALUATED) {
          this.commentState = true;
        }
        console.log(this.commentState);
      },
      statecancle(orderStatus, orderId) {
        this.$http.post('http://bread.s1.natapp.cc/sell/order/cancel', {'orderId': orderId, 'openid': this.openid}, {
          'emulateJSON': false}).then((response) => {
            response = response.body;
            if (response.mcode === SUCCESS) {
              this.$toast({
                title: '消息提示',
                content: '取消订单成功',
                type: 'success',
                onShow: () => {
                  console.log('on toast show');
                },
                onHide: () => {
                  setInterval(this.$router.go(0), 3000);
                }
              });
            }
          }, (response) => {
            this.$toast({
              title: '消息提示',
              content: '取消订单失败',
              type: 'warning',
              onShow: () => {
                console.log('on toast show');
              },
              onHide: () => {
                setInterval(this.$router.go(0), 3000);
              }
            });
        });
      },
      // 将消息赋值给headImg
      setMessageInnerHTML(headImg) {
        this.headImg = headImg;
      },
      websocketCreate() {
        // websoket建立连接
        var websocket = null;
        console.log('欢迎来到wclist!');
        if ('WebSocket' in window) {
          websocket = new WebSocket('ws://bread.s1.natapp.cc/sell/userinfoSocket');
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
            _this.setMessageInnerHTML(obj1.headImg);
            console.log(_this.headImg);
          }
        };
        websocket.onerror = function (event) {
          console.log('websocked通信发生错误');
        };

        window.onbeforeunload = function (event) {
          websocket.close();
        };
      },
      refund(orderid) { // 退款
        this.$http.post('http://bread.s1.natapp.cc/sell/order/payback', {'orderId': orderid}, {
          'emulateJSON': false}).then((response) => {
          response = response.body;
          if (response.mcode === SUCCESS) {
            this.$toast({
              title: '消息提示',
              content: '退款成功',
              type: 'success',
              onShow: () => {
                console.log('on toast show');
              },
              onHide: () => {
                console.log('on toast hide');
                setInterval(this.$router.go(0), 3000);
              }
            });
          }
        }, (response) => {
          this.$toast({
            title: '消息提示',
            content: '退款失败',
            type: 'warning',
            onShow: () => {
              console.log('on toast show');
            },
            onHide: () => {
              console.log('on toast hide');
              setInterval(this.$router.go(0), 3000);
            }
          });
          // 请求失败回调
        });
      },
      atmp() {
        console.log(111);
        this.commentState = true;
        this.orderId = 10;
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
      },
      imgSrc() {
        return this.headImg;
      }
    },
    watch: {
//      '$route' (to, from) {
//        this.$router.go(0);
//      }
    }
  };
</script>
