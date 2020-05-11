<template>
 <div class="layout">
   <div class="lyricBox">
     <div class="lyricList">
         <scroll-view class="scroll" scroll-y="true" scroll-with-animation="true" :scroll-into-view="'line'+currentIndex" style="height:100%">
          <div id="line-6" class="paddingTop"></div>
          <div id="line-5" class="paddingTop"></div>
          <div id="line-4" class="paddingTop"></div>
          <div id="line-3" class="paddingTop"></div>
          <div id="line-2" class="paddingTop"></div>
          <div id="line-1"></div>
          <div  v-for="(item, index) in lyricData" :key="index" :data-index='index' :id="'line'+index" >
            <span :class="{active:item.sec < currentTime && lyricData[index+1].sec >= currentTime, lyric: true}">{{item.text}}</span>
          </div>
        </scroll-view>
     </div>
   </div>
 </div>
</template>

<script>

export default {
  data () {
    return {
      currentIndex: -6,
    }
  },
  props:['lyricData', 'currentTime'],
  methods:{
    returnActive(item, index){
      return item.sec < currentTime && lyricData[index+1].sec >= currentTime
    }
  },
  watch: {
    currentTime(value){
      this.lyricData.map((item, index)=>{
        if (item.sec === parseInt(value)) {
          this.currentIndex = index - 6
        }
      })
    },
  }
}
</script>

<style scoped lang='less'>

  .layout{
    width: 100%;
    height: 80%;
    overflow: hidden;
    .lyricBox{
      height: 100%;
    }
  }
  .paddingTop{
    height: 100rpx;
  }
  .lyricList{
    padding-top: 30rpx;
    font-size: 32rpx;
    color: #aaaaaa;
    text-align: center;
    height: 100%;
    line-height: 3
  }
  .scroll{
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
  }
  .active{
    color: #fff
  }
  .lyric{
    transition: all .3s
  }
</style>
