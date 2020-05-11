<template>
 <div class="content">
    <div class="title">
      <h3>排行榜</h3>
    </div>
    <div class="songlist" v-if="toplists.length">
      <div v-for='(item,index) in listSimple' :key='index' class="list_item" v-on:click='jumpDetail(item.name)'>
        <div class="imgBox">
           <image :src="item.coverImgUrl" class="song_image" mode="aspectFill"/>
        </div>
        <div class="desc">
          <p v-for='(song,key) in item.tracks' :key = 'key'>
            {{key+1}}. {{song.first}} - {{song.second}}
          </p>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import { getToplist } from '../../store/apis'
export default {
  data () {
    return {
      toplists:[]
    }
  },
  methods: {
    async getToplist () {
      const res = await getToplist()
      this.toplists = res.list
    },
    jumpDetail (type) {
      const typeObj = {
        '云音乐飙升榜':'3',
        '云音乐新歌榜':'0',
        '网易原创歌曲榜':'2',
        '云音乐热歌榜':'1'
      }
      mpvue.navigateTo({url: '/pages/playlist/main?rankType='+ typeObj[type]})
    }
  },
  computed: {
    listSimple(){
      return this.toplists.slice(0,4)
    }
  },
  mounted(){
    this.getToplist()
  }
}
</script>

<style scoped>
.content{
  margin-top: 20rpx;
  padding: 20rpx
}
.title{
  padding: 10rpx 10rpx 30rpx;
  font-weight: bold;
  font-size: 18px
}
.list_item{
  margin-bottom: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center
}
.imgBox{
  width: 230rpx;
  height: 220rpx;
  border-radius: 15rpx;
  overflow: hidden;
}
.song_image{
  width: 100%;
  height: 100%;
}
.desc{
flex: 1;
}
.desc >p{
  width: 430rpx;
  padding: 18rpx;
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
