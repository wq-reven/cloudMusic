<template>
 <div class="content">
    <div class="title">
      <h3>排行榜</h3>
    </div>
    <div class="songlist">
      <div v-for='(item,index) in toplists' :key='index' class="list_item" v-on:click='jumpDetail(item.name)'>
        <image :src="item.coverImgUrl" class="song_image" mode="aspectFill"/>
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
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    getToplist () {
      
    },
    jumpDetail (type) {
      const typeObj = {
        '云音乐飙升榜':'3',
        '云音乐新歌榜':'0',
        '网易原创歌曲榜':'2',
        '云音乐热歌榜':'1'
      }
      this.$store.commit('setRankType', typeObj[type])
      mpvue.navigateTo({url: '/pages/rankdetail/main?type=2'})
    }
  },
  computed: {
		...mapState([
			'toplists'
		])
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
  align-items: center
}
.song_image{
  width: 230rpx;
  height: 220rpx;
  border-radius: 15rpx
}
.desc{
  flex: 1
}
.desc >p{
  padding: 18rpx;
  font-size: 14px;
  color: #666
}
</style>
