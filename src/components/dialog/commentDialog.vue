<template>
    <div class="comment-dialog">
      <div class="weui_dialog_confirm">
        <div class="weui_dialog">
          <div class="weui_dialog_hd"><strong class="weui_dialog_title">评价</strong></div>
          <textarea class="weui_dialog_bd" placeholder="请输入评价内容：" v-model="comment"></textarea>
          <div class="weui_dialog_ft">
            <div class="weui_btn_dialog default" @click="cancel">取消</div>
            <div class="weui_btn_dialog primary" @click="confirm">确定</div>
            <div style="clear: both;"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet">
  .comment-dialog
    position absolute
    right 0px
    left 0px
    right 0px
    bottom 0px
    background rgba(7,17,27,0.9);
    z-index 200
    height 100%
    text-align center
    .weui_dialog_confirm
      margin: 50% auto
      background #FFF
      .weui_dialog
        padding 18px
        .weui_dialog_hd
          font-size 16px
          line-height 16px
          border-bottom 1px solid rgba(7,17,27,0.1)
          padding 0 0 8px 0
        .weui_dialog_bd
          font-size 14px
          margin 8px 0
          height 40px
          width 90%
          overflow auto
        .weui_dialog_ft
          padding 8px 0 0 0
          .weui_btn_dialog
            width 49.7%
            padding 8px 0
            display inline-block
            border-top 1px solid rgba(7,17,27,0.1)
            &.default
              float left
              border-right 1px solid rgba(7,17,27,0.1)
            &.primary
              float right
</style>

<script>
  const SUCCESS = 1;
  export default{
    data () {
      return {
        stateTmp: {
        },
        comment: {
          default: '123'
        }
      };
    },
    props: {
      orderId: {
      },
      commentState: { // 是否打开评论窗口
        type: Boolean,
        default: false
      }
    },
    created() {
      this.comment = '';
      this.stateTmp = this.commentState;
      console.log('orderId:' + this.orderId);
      console.log('commentState:' + this.commentState);
    },
    methods: {
      confirm() {
        var userinfo = {'nickName': 'cc', 'headImg': 'cc', 'phone': 'cc', 'name': 'cc'};
        this.$http.post('http://bread.s1.natapp.cc/sell/remark/add', {'userInfo': userinfo, 'orderId': this.orderId, 'comment': this.comment}, {
          'emulateJSON': false}).then((response) => {
          response = response.body;
          if (response.mcode === SUCCESS) {
            this.stateTmp = false;
            this.$emit('increment', this.stateTmp);
          } else {
            alert('评论失败');
          }
        }, (response) => {
          console.log(222 + ' ' + response);
          // 请求失败回调
        });
      },
      cancel() {
        this.stateTmp = false;
        this.$emit('increment', this.stateTmp);
      }
    }
  };
</script>
