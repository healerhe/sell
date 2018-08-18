<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper" style="background:#f3f5f7">
        <ul>
          <li v-for="(item, index) in goods" v-bind:key="item.index" class="menu-item"
            :class="{'current':currentIndex === index}" @click = "selectMenu(index,$event)">
              <span class="text">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
              </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="foodList foodListHook" v-bind:key="item.index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item" v-bind:key="food.index" >
                <div class="icon">
                  <img width="57" :src="food.icon"/>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}</span><span class="count">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="new">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartAdd-wrapper">
                    <cartAdd :food="food" @increment="incrementTotal"></cartAdd>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart :select-products="selectProducts" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopCart"></shopCart>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "goods.styl"
</style>

<script type="text/ecmascript-6">
  import BetterScroll from 'better-scroll';
  import shopCart from 'components/shopCart/shopCart';
  import cartAdd from 'components/cartAdd/cartAdd';
  const SUCCESS = 0;
  export default{
    data () {
      return {
         goods: [],
        classMap: [],
        listHeight: [],
        /* 用于跟踪屏幕高度变化的当前值 */
        scrollY: 0
      };
    },
    computed: {
      /* 用于计算当前索引值，以为就是scrollY的高度对应的右边食物的第几组的索引 */
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let heightUp = this.listHeight[i]; // 当前menu子块的高度
          let heightDown = this.listHeight[i + 1]; // 下一个menu子块的高度
          // 滚动到底部的时候,height2为undefined,需要考虑这种情况
          // 需要确定是在两个menu子块的高度区间
          if (!heightDown || (this.scrollY >= heightUp && this.scrollY < heightDown)) {
              return i;
          }
        }
        return 0;
      },
      selectProducts() { // 自动将所有的goods.food添加一个count属性,方便做数量运算
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }

    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === SUCCESS) {
            this.goods = response.data;
          /* Vue中数据更新是异步的，
           在数据还没有加载完之前，
           BScroll是无法获取目标内容容器的高度的，
           就会出现无法滚动的现象。
            添加这个之后才能正确计算menuWrappe的高度 */
            this.$nextTick(() => {
              if (!this.scroll) {
                this.initBetterScroll();
              } else {
                this.scroll.refresh();
              }

              this.calculateHeight();
            });
        };
      });
    },
    methods: {
      incrementTotal(target) {
        /* 当点击“加号”按钮时，cartControl组件通过emit触发父组件goods中的increment方法，并将event.target对象传入，
        increment方法将target传入shopCart子组件中的drop方法，
        所以drop方法能获得用户点击按钮的元素，即能获取点击按钮的位置 */
        /* 体验优化，异步执行下落动画 */
        this.$nextTick(() => {
          this.$refs.shopCart.drop(target);
        });
      },
      initBetterScroll() {
        this.menuScroll = new BetterScroll(this.$refs.menuWrapper, {
          click: true
        });
        console.log(this.menuScroll);
        this.foodsScroll = new BetterScroll(this.$refs.foodsWrapper, {
          click: true,
          /* 希望foodsScroll在滚动时能实时告诉我们位置，探帧 */
          probeType: 3
        });
        /* 监听scroll滚动时的高度将其赋值给scrollY */
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          // 滚动坐标会出现负的,并且是小数,所以需要处理一下，实时取得scrollY
        });
      },
      calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('foodListHook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let itemHeight = foodList[i];
          // 得到每个食物区间的高度
          height += itemHeight.clientHeight;// 主要是为了获取每一个foods内部块的高度
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) { // 去掉自带的click事件点击，即pc端直接返回
          return;
        }
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foodListHook');
        let el = foodsList[index];
        // 类似jump to的功能,通过这个方法,跳转到指定的dom
        this.foodsScroll.scrollToElement(el, 300);
      }
    },
    components: {
      shopCart,
      cartAdd
    }
  };
</script>
