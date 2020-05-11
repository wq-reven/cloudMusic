<template>
  <div>
    <banner></banner>
    <div class='content'>
      <div class='tabs'>
        <div class="tab_item" v-for='(item, index) in tabs' :key='index' v-on:click='jump(index)'>
          <div class="tab_img">
             <image :src='item.url' class="`tab_image${index}`" mode='aspectFill'/>
          </div>
          <div class="tab_text">
            {{item.name}}
          </div>
        </div>
      </div>
      <songlist />
    </div>
  </div>
</template>

<script>
import banner from './banner'
import songlist from './songlist'
export default {
  data () {
    return {
      tabs: [{
        name: '每日推荐',
        url: require('../../../static/images/icon/tuijian.png')
      },
      {
        name: '歌单',
        url: require('../../../static/images/icon/gedan.png')
      },
      {
        name: '排行榜',
        url: require('../../../static/images/icon/paihang.png')
      },
      {
        name: '电台',
        url: require('../../../static/images/icon/diantai.png')
      }]
    }
  },

  components: {
    banner,
    songlist
  },

  methods: {
    jump (type) {
      if (type === 2) {
        wx.navigateTo({url: '/pages/ranklist/main'})
      }
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.content{
  padding: 20rpx
}
.tabs{
  display: flex;
  justify-content: space-around
}
.tab_img{
  margin-bottom: 10rpx;
  width: 90rpx;
  height: 90rpx;
  background-color: #E82103;
  border-radius: 100%
}
.tab_item{
  text-align: center
}
.tab_item:nth-child(2) .tab_img{
  width: 50rpx;
  height: 50rpx;
  padding: 20rpx
}
.tab_item:nth-child(3) .tab_img{
  width: 50rpx;
  height: 50rpx;
  padding: 20rpx
}
.tab_item:nth-child(4) .tab_img{
  width: 50rpx;
  height: 50rpx;
  padding: 20rpx
}
.tab_image{
  width: 100%;
  height: 100%;
}
.tab_text{
  font-size: 13px
}
</style>
