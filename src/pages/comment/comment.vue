<template>
  <div class="box">
    <div class="avatarBox">
      <image :src="data.user.avatarUrl" />
    </div>
    <div :class="{contentBox: true, showBorder: border}">
      <div class="user">
        <div class="userInfo">
          <div class="nick">
            <div class="nickname">{{data.user.nickname}}</div>
            <div class="liked">{{data.likedCount}} <image :src='like' /></div>
          </div>
        </div>
        <div class="date">{{formaterTime}}</div>
      </div>
      <div class="content">{{data.content}}</div>
    </div>
  </div>
</template>
<script>

import utils from "../../utils/index";
export default {
  data(){
    return{
      like: require('../../../static/images/icon/like.png'),
    } 
  },
  props: ['data','border'],
  computed:{
    formaterTime(){
      return utils.formaterTime(this.data.time)
    }
  },
};
</script> 
<style scoped lang='less'>
.box {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 0 0 0;
}
.avatarBox {
  width: 60rpx;
  height: 60rpx;
  >image{
    width: 100%;
    height: 100%;
    border-radius: 50%
  }
}
.contentBox{
  flex: 1;
  margin-left: 30rpx;
  padding: 0 30rpx 30rpx 0;
}
.showBorder{
  border-bottom: 1px solid #f1f1f1;
  &::after{
    content: '';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    transform: scale(0.5,0.5);
    transform-origin: top left;
  }
}
.user{
  padding-bottom: 20rpx;
  .nick{
    display: flex;
    justify-content: space-between
  }
  .nickname{
    color: #666;
    font-size: 13px
  }
  .liked{
    color: #999;
    font-size: 12px;
    display: flex;
    align-items: center;
    >image{
      display: inline-block;
      margin-left: 5rpx;
      width: 40rpx;
      height: 40rpx;
    }
  }
  .date{
    color: #999;
    font-size: 10px
  }
}
.content{
  font-size: 14px;
  line-height: 1.7;
  color: #111
}
.title {
  font-size: 16px;
}
</style>