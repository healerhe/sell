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
  import Vue from 'vue';
  const SUCCESS = 1;
  export default{
    data () {
      return {
        stateTmp: {
        },
        comment: {
          default: '123'
        },
        userInfo: {}
      };
    },
    props: {
      orderId: {
      },
      commentState: { // 是否打开评论窗口
        type: Boolean,
        default: false
      },
      openid: {},
      headImg: {},
      nickName: {}
    },
    created() {
      this.comment = '';
      this.stateTmp = this.commentState;
      console.log('orderId:' + this.orderId);
      console.log('commentState:' + this.commentState);
      this.$http.post('http://bread.s1.natapp.cc/sell/order/baseuserinfo', {'openid': this.openid}, {
        'emulateJSON': false}).then((response) => {
        response = response.body;
        console.log(response);
        if (response.mcode === SUCCESS) {
          Vue.set(this.userInfo, 'nickName', this.nickName);
          Vue.set(this.userInfo, 'phone', response.phone);
          Vue.set(this.userInfo, 'address', response.address);
          Vue.set(this.userInfo, 'headImg', this.headImg);
        }
      }, (response) => {
        console.log('失败');
        // 请求失败回调
      });
    },
    methods: {
      confirm() {
        console.log(this.headImg);
        this.$http.post('http://bread.s1.natapp.cc/sell/remark/add', {'userInfo': this.userInfo, 'orderId': this.orderId, 'comment': this.comment}, {
          'emulateJSON': false}).then((response) => {
          response = response.body;
          console.log(response);
          this.stateTmp = false;
          this.$emit('increment', this.stateTmp);
          if (response.mcode === SUCCESS) {
            this.$toast({
              title: '消息提示',
              content: '评论成功',
              type: 'success',
              onShow: () => {
                console.log('on toast show');
              },
              onHide: () => {
                console.log('hide toast show');
                setInterval(this.$router.go(0), 3000);
                /* this.$router.push({path: '/order', query: {openid: this.openid, deskNo: this.deskNo, headImg: this.headImg, nickName: this.nickName}});
              */ }
            });
          } else {
            this.$toast({
              title: '消息提示',
              content: '评论失败',
              type: 'warning',
              onShow: () => {
                console.log('on toast show');
              },
              onHide: () => {
                console.log('hide toast show');
                setInterval(this.$router.go(0), 3000);
              /*  this.$router.push({path: '/order',
                  query: {openid: this.openid, deskNo: this.deskNo, headImg: this.headImg, nickName: this.nickName}});
              */ }
            });
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
    },
    watch: {
       '$route' (to, from) {
          this.$router.go(0);
       }
    }
  };
</script>
