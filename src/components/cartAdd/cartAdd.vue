<template>
    <div class="cartAdd">
      <transition name="move">
      <div class="decrease" v-show="food.count>0"  @click="decrease">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
      </transition>
      <div class="count" v-show="food.count>0">{{food.count}}</div>
      <div class="add" @click="add">
        <span class="icon-add_circle"></span>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "cartAdd.styl";
</style>

<script>
  import Vue from 'vue';
  export default{
    data () {
      return {
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      add() {
        if (!event._constructed) { // 去掉自带的click事件点击，即pc端直接返回
          return;
        }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          }
        this.$emit('increment', event.target);
      },
      decrease() {
        if (!event._constructed) { // 去掉自带的click事件点击，即pc端直接返回
          return;
        }
        this.food.count--;
      }
    }
  };
</script>
