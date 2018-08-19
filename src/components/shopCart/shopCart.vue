<template>
  <div>
    <div class="shopCart">
      <div class="content" @click="toggleShowCartList">
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
          <div class="pay" :class="payClass" @click.stop.prevent="pay">
            {{deliverypay}}
            </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls" v-bind:key="ball.index">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">//后面三个为钩子
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook">
              </div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopCart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="setEmpty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="food in selectProducts" v-bind:key="food.index" class="food">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span class="text">￥{{food.price * food.count}}</span>
              </div>
              <div class="cartAdd-wrapper">
                <cartAdd :food="food"></cartAdd>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-background" v-show="listShow" @click="hideList">
      </div>
    </transition>
</div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "shopCart.styl";
 /* @import "../../common/stylus/icons.styl" */
</style>
<script>
  /* eslint-disable no-undef */
  import Vue from 'vue';
  import cartAdd from 'components/cartAdd/cartAdd';
  import BetterScroll from 'better-scroll';
  export default{
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      };
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
      },
      listShow() {
        if (!this.totalCount) {
          vm.setcshow = true;
          return false;
        }
        let show = !vm.setcshow;
        if (show) { // 如果显示详情页
          this.$nextTick(() => { // 数据变化后，DOM并没有立即生效，而BScroll严重依赖于DOM，所以使用nextTick
            if (!vm.carListScroll) { // 如果实例不存在，新建
              vm.carListScroll = new BetterScroll(this.$refs.listContent, {
                click: true
              });
            } else { // 实例存在，直接调用refresh接口
              vm.carListScroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) { // 找到所以设为true的小球
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();// 返回元素相对于视口偏移的位置
            let x = rect.left - 32; // 点击的按钮与小球（fixed）之间x方向的差值
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = ''; // 设置初始位置前，手动置空，覆盖之前的display：none，使其显示
            el.style.webkitTransform = `translate3d(0,${y}px,0)`; // 外层元素做纵向的动画，y是变量
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];// 内层元素做横向动画,inner-hook（用于js选择的样式名加上-hook，表明只是用                                                                      //于js选择的，没有真实的样式含义）
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {
        /*  eslint-disable */
        let rf = el.offsetHeight;
        this.$nextTick(() => { // 异步执行
          el.style.webkitTransform = 'translate3d(0,0,0)'; // 重置回来
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift(); //  取到做完动画的球，再置为false，即重置，它还可以接着被利用
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleShowCartList() {
        if (!this.totalCount){
          return
        }
        vm.cshow = !vm.cshow;
      },
      setEmpty() {
        console.log(this.selectProducts);
        if (!this.selectProducts) {
          return;
        }
        this.selectProducts.forEach((food) => {
          food.count = 0
        })
      },
      hideList() {
        vm.cshow = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice){
          return;
        } else {
          window.alert( `支付${this.totalPrice}元`);
        }
      }
    },
    components: {
      cartAdd,
      BetterScroll
    }
  };
  var vm = new Vue({
    data() {
      return{
        cshow: true, /* 判断购物车详情是否显示 */
        carListScroll: null
      };
    },
    computed: {
      setcshow: {
        // getter
        get: function () {
          return this.cshow;
        },
        // setter
        set: function (newValue) {
          this.cshow = newValue;
        }
      },
      setScroll: {
        // getter
        get: function () {
          return this.carListScroll;
        },
        // setter
        set: function (newValue) {
          this.carListScroll = newValue;
        }
      }
    }
  });
</script>
