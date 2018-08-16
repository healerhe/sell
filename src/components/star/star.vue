<template>
    <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses"  class="star-item" v-bind:key="itemClass.index" :class="itemClass">
      </span>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  @import "../../common/stylus/mixin.styl"
    .star
      font-size 0
      .star-item
        display inline-block
        background-repeat no-repeat
      &.star-48
        .star-item
          width 20px
          height 20px
          margin-right 22px
          background-size 20px 20px
          &.last-child
            margin-right 0
          &.on
            bg-image('star48_on')
          &.half
            bg-image('star48_half')
          &.off
              bg-image('star48_off')
      &.star-36
        .star-item
          width 15px
          height 15px
          margin-right 6px
          background-size 15px 15px
          &:last-child
            margin-right 0
          &.on
              bg-image('star36_on')
          &.half
              bg-image('star36_half')
          &.off
              bg-image('star36_off')
      &.star-24
        .star-item
          width 10px
          height 10px
          margin-right 3px
          background-size 10px 10px
          &:last-child
            margin-right 0
          &.on
            bg-image('star24_on')
          &.half
            bg-image('star24_half')
          &.off
            bg-image('star24_off')

</style>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
  export default {
    data () {
      return {msg: '这个是Home模板页'};
    },
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        // 代表score是一个向下取5倍数的值
        let score = Math.floor(this.score * 2) / 2;
        /* 是否有小数 */
        let hasDecimal = score % 1 !== 0;
        /* 向下取整 */
        let integer = Math.floor(score);
        /* push score的整数部分的星 */
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        /* 如果score有小数则push半星 */
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        /* 总共有五颗星，如果前面的score没有五星，则用暗的星补全 */
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
};
</script>
