<template>
  <div v-if="detailData">
    <div class="header">
      <div class="headerBg" :style="{backgroundImage: 'url(' + bgImg + ')'}"></div>
      <div class="headerContent">
        <image :src="bgImg" class="headerImg" />
        <div class="headerDesc">
          <div class="headerTitle">{{detailData.name}}</div>
          <p>最近更新: 4月27日</p>
        </div>
      </div>
    </div>
    <div class="listBox">
      <div class="listTitle"></div>
      <div class="list">
        <div
          v-for="(item,index) in listSong"
          :key="index"
          class="listItem"
          v-on:click='getSongUrl(item.id)'
        >
          <div class="order">{{index + 1}}</div>
          <div class="song">
            <div class="songName">
              {{item.name}}
              <span v-for="(songer,index1) in item.alia" :key="index1">({{songer}})</span>
            </div>
            <div class="songer">
              <image :src="SQ" class="SQ" />
              <image :src="DJ" class="DJ" />
              <span class="songerSpan">
                <span v-for="(songer,index2) in item.ar" :key="index2">{{songer.name}}</span>
                - {{item.al.name}}
              </span>
            </div>
          </div>
          <div class="operate">
            <image :src="playIcon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import {getToplistDetail,getPlayListDetail} from '../../store/apis'

export default {
  mounted() {
    const queryData = this.$root.$mp.query;
    const { songListId,  rankType} = queryData;
    if (songListId) {
      this.getPlaylistDetail(songListId)
    }
    if (rankType) {
      this.getToplistDetail(rankType)
    }
  },
  onUnload(){
   this.detailData = ''
  },
  data() {
    return {
      playIcon: require("../../../static/images/icon/listplay.png"),
      SQ: require("../../../static/images/icon/SQ.png"),
      DJ: require("../../../static/images/icon/dujia.png"),
      detailData:{}
    };
  },
  methods: {
    getSongUrl (id) {
      mpvue.navigateTo({url: '/pages/playmusic/main?id='+id})
    },
    // 获取排行榜详情数据
    async getToplistDetail(rankType){
       const res = await getToplistDetail(rankType)
       this.detailData = res.playlist
    },
    // 获取歌单详情
    async getPlaylistDetail (playlistId) {
      const res = await getPlayListDetail(playlistId)
      this.detailData = res.playlist
    },
  },
  computed: {
    bgImg (state) {
      return this.detailData.coverImgUrl
    },
    listSong (state) {
      return this.detailData.tracks
    },
  }
};
</script>

<style scoped>
.content {
  margin-top: 20rpx;
  padding: 20rpx;
}
.header {
  position: relative;
  padding: 50rpx;
  height: 280rpx;
  overflow: hidden;
}
.headerContent {
  position: relative;
  display: flex;
  z-index: 2;
  height: 260rpx;
}
.headerDesc {
  flex: 1;
  padding: 40rpx;
  color: #fff;
}
.headerDesc > p {
  font-size: 14px;
  margin-top: 60rpx;
}
.headerTitle {
  font-size: 17px;
}
.headerBg {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(20px);
  transform: scale(1.5);
}
.headerImg {
  width: 260rpx;
  height: auto;
  border-radius: 10rpx;
}
.list {
  padding: 30rpx;
}
.listItem {
  padding: 23rpx 0;
  display: flex;
  align-items: center;
  /* justify-content: space-between */
}
.order {
  width: 70rpx;
  font-size: 17px;
  color: #999;
  text-align: center;
}
.song {
  width: 520rpx;
  padding: 0 15rpx;
}
.songName {
  font-size: 16px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.songName > span {
  color: #999;
}
.songer {
  display: flex;
  align-items: center;
  padding-top: 8rpx;
  font-size: 12px;
  color: #888;
}
.songerSpan {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.operate {
  flex: 1;
}
.operate > image {
  width: 22px;
  height: 22px;
}
.SQ {
  width: 19px;
  height: 17px;
  display: inline-block;
  margin-right: 5rpx;
}
.DJ {
  width: 20px;
  height: 19px;
  display: inline-block;
  margin-right: 5rpx;
}
</style>
