<template>
 <div>
   <div class="title">
      <h3>推荐歌单</h3>
      <div class="more">查看更多</div>
   </div>
   
    <div class="songlist">
    <div v-for="(item, index) in songlists" :key="index" class="song_item" v-on:click='jumpDetail(item.id)'>
        <image :src="item.picUrl" class="song_image" mode="aspectFill"/>
        <div class="desc">{{item.name}}</div>
    </div>
  </div>
 </div>
</template>

<script>
import { getPersonalized } from '../../store/apis'
export default {
  data () {
    return {
      songlists: []
    }
  },

  methods: {
    async getsonglists () {
      const res = await getPersonalized()
      this.songlists = res.result
    },
    jumpDetail (id) {
      this.$store.commit('setPlaylistId', id)
      mpvue.navigateTo({url: '/pages/rankdetail/main?type=1'})
    }
  },
  created () {
    this.getsonglists()
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50rpx 10rpx 0;
  }
  h3{
    color: #999
  }
  .songlist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 30rpx
  }
  .song_item{
    margin-bottom: 20rpx
  }
  .song_image{
    width: 220rpx;
    height: 220rpx;
    border-radius: 15rpx
  }
  .desc{
    width: 220rpx;
    font-size: 12px;
    height: 77rpx;
    overflow: hidden;
    color: #333
  }
  .more{
    width: 140rpx;
    height: 45rpx;
    text-align: center;
    line-height: 45rpx;
    border-radius: 40px;
    border: 1px solid #d8d8d8;
    color: #666;
    font-size: 12px
  }
</style>
