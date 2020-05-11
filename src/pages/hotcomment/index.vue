

<template>
  <div class="appContent">
    <div class="appContainer">
      <div class="hot">
        <div v-for="(item, index) in hotComments" :key="index">
          <comment :data="item" :border="index + 1 !== hotComments.length"></comment>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHotComment } from "../../store/apis";
import { formaterTime } from "../../utils/index";
import comment from "../comment/comment";

export default {
  data() {
    return {
      hotComments: [],
      offset: 1, //页面
      musicId: ""
    };
  },
  components: {
    comment
  },
  methods: {
    getComment: async function(id, mounted) {
      const result = await getHotComment(id, 0, 20, this.offset);
      if (mounted) {
        this.hotComments = result.hotComments;
      } else {
        this.hotComments.push(...result.hotComments);
      }
      wx.setNavigationBarTitle({
        title: "精彩评论(" + result.total + ")"
      });
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#E82103",
        animation: {
          duration: 400,
          timingFunc: "easeIn"
        }
      });
    }
  },
  mounted() {
    console.log('hotmounted')
    const id = this.$root.$mp.query.id;
    this.musicId = id;
    this.offset = 1;
    this.getComment(id, true);
  },
  onReachBottom() {
    this.offset = this.offset + 1;
    this.getComment(this.musicId, false);
  }
};
</script>
<style scoped lang='less'>
.appContent {
  width: 100%;
  height: 100%;
}
.hot {
  border-bottom: 1px solid #f1f1f1;
  &::after {
    content: "";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    transform: scale(0.5, 0.5);
    transform-origin: top left;
  }
}
.hot,
.new {
  padding: 30rpx 0 30rpx 0;
  margin-left: 30rpx;
}
.btnArea {
  padding: 10rpx 200rpx;
  font-size: 13px;
}
.moreHot {
  width: 150rpx;
  height: 38rpx;
  font-size: 14px;
}
.content {
  font-size: 14px;
}
.title {
  font-size: 16px;
  font-weight: bold;
}
</style>