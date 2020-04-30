<template>
  <div class="swiper_box">
    <div class="bg">

    </div>
    <div class="swiper_layout">
      <swiper
     class="swiper"
      :indicator-dots="true"
      indicator-color="#d8d8d8"
      indicator-active-color="#E82103"
      :autoplay="true"
      :interval="3000"
      :duration="500"
      :circular="true"
    >
      <block v-for="(item, index) in images" :key="index">
        <swiper-item>
          <image :src="item.pic" class="slide_image" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>
    </div>
  </div>
</template>

<script>
import { getBanner } from '../../store/apis'
export default {
  data () {
    return {
      images: []
    }
  },

  methods: {
    async getBanner () {
      const res = await getBanner()
      this.images = res.banners
    }
  },
  created () {
    this.getBanner()
  }
}
</script>

<style scoped>
.swiper_box{
  position: relative;
  width: 100%;
  height: 300rpx;
}
.bg{
  width: 100%;
  height: 220rpx;
  background-color: #E82103
}
.swiper_layout{
  position: absolute;
  top: 20rpx;
  width: 100%;
  height: 300rpx;
  display: flex;
  justify-content: center
}
.swiper {
  width: 700rpx;
  height: 250rpx !important;
  border-radius: 15rpx;
  overflow: hidden;
}
.slide_image{
 width: 100%;
 height: 100%;
}
</style>
