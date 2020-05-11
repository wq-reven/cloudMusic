<template>
  <div class="appContent">
    <div class="appContainer">
      <div class="hot">
        <div class="title">精彩评论</div>
        <div v-for="(item, index) in hotComments" :key="index">
          <comment :data='item' :border='index + 1 !== hotComments.length'></comment>
        </div>
         <div class="btnArea" v-show="moreHot">
            <i-button size='small' shape="circle" i-class='moreHot' inline='true' v-on:click="goAllHot">全部精彩评论</i-button>
          </div>
      </div>
      <div class="new">
        <div class="title">最新评论<span class="commentNum">{{total}}</span></div>
        <div v-for="(item, index) in comments" :key="index">
          <comment :data='item' :border='true'></comment>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getComment } from "../../store/apis";
import { formaterTime } from "../../utils/index";
import comment from "./comment";

export default {
  data() {
    return {
      comments: [],
      hotComments: [],
      moreHot:false,
      total:'',
      offset: 1, //页面
      musicId:''
    };
  },
  components:{
    comment
  },
  methods: {
    getComment: async function(id, offset = "", mounted) {
      const result = await getComment(id, 20, offset)
      this.total = result.total
      this.moreHot = result.moreHot
      if (!mounted) {
        this.comments.push(...result.comments);
      } else {
        this.comments = result.comments
      }
      if (result.hotComments) {
        this.hotComments = result.hotComments;
      }
      wx.setNavigationBarTitle({
        title: "评论(" + result.total + ")"
      });
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#E82103",
        animation: {
          duration: 400,
          timingFunc: "easeIn"
        }
      });
    },
    goAllHot:function(){
       mpvue.navigateTo({url: '/pages/hotcomment/main?id='+this.musicId+'&type=0'})
    }
  },
  mounted() {
    const id = this.$root.$mp.query.id;
    this.offset = 1;
    this.musicId = id
    this.getComment(id,'', true);
  },
  onReachBottom() {
    this.offset = this.offset + 1
    this.getComment(this.musicId, this.offset, false)
  }
};
</script>
<style scoped lang='less'>
.appContent {
  width: 100%;
  height: 100%;
}
.hot{
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
.hot,.new{
  padding: 30rpx 0 30rpx 0;
  margin-left: 30rpx
}
.btnArea{
  padding: 10rpx 200rpx;
  font-size: 13px
}
.moreHot{
  width: 150rpx;
  height: 38rpx;
  font-size: 14px
}
.content{
  font-size: 14px
}
.title {
  font-size: 16px;
  font-weight: bold
}
.commentNum{
  padding-left: 10rpx;
  font-size: 13px;
  color: #999;
  font-weight: normal
}
</style>