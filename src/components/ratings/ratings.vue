<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
          <div class="seller-score">
            <div class="seller-score-left">
             <h1 class="scroe">5.0</h1>
              <div class="title">综合评分</div>
              <div class="rank">高于周边商家99.0%</div>
            </div>
            <div class="seller-score-right">
              <div class="scroe-wrapper">
                <span class="title">服务态度</span>
                <star :size="36" :score="5"></star>
                <span class="score">5.0</span>
              </div>
              <div class="scroe-wrapper">
                <span class="title">商品评分</span>
                <star :size="36" :score="5" class="star"></star>
                <span class="score">5.0</span>
              </div>
              <div class="delivery-wrapper">
                <span class="delivery-title">送达时间</span>
                <span class="delivery-time">44分钟</span>
              </div>
            </div>
          </div>
          <split></split>
          <div class="ratings-wrapper">
            <ul>
              <li v-for="rating in ratings" v-bind:key="rating.index" class="rating-item">
                <div class="avatar">
                  <img :src="rating.avatar" width="28" height="28"/>
                </div>
                <div class="content">
                  <h1 class="name">{{rating.username}}</h1>
                  <div class="star-wrapper">
                    <star :size="24" :score:="5" class="star"></star>
                    <span class="delivery-time">40分钟</span>
                  </div>
                  <p class="text">{{rating.text}}</p>
                  <div class="recommend" v-show="rating.recommend">
                    <span class="icon-thumb_up"></span>
                    <span v-for="item in rating.recommend" v-bind:key="item.index" class="recommend-item">
                      <span class="text">{{item}}</span>
                    </span>
                  </div>
                  <div class="time">
                    {{rating.rateTime}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "ratings.styl";
</style>

<script>
  import BetterScroll from 'better-scroll';
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  const SUCCESS = 0;
  export default{
    data () {
      return {
        ratings: {
          type: Object
        }
      };
    },
    components: {
      star,
      split,
      BetterScroll
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === SUCCESS) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.initBetterScroll();
          });
        };
      });
    },
    methods: {
      initBetterScroll() {
        this.ratingsScroll = new BetterScroll(this.$refs.ratings, {
          click: true
        });
      }
    }
  };
</script>
