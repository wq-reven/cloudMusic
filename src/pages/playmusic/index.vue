<template>
  <div class="box">
    <!-- <image v-if="musicData.al" :src="musicData.al.picUrl" class="background_img" ></image> -->
    <div class="content" v-on:click="changeLyricStatus">
      <div class="coverBox" v-if="!showLyric">
        <div :class="{cover: true, }">
          <div class="imgBox" v-if="musicData.al">
            <image :src="musicData.al.picUrl" mode="aspectFill" :animation="myRotate" />
          </div>
        </div>
      </div>
      <div class="lyricBox" v-show="showLyric">
        <lyric :lyricData='lyricData' :currentTime='currentValue'></lyric>
      </div>
    </div>
    <div class="operate">
      <div class="container">
        <div class="operateTop" >
          <div v-if="!showLyric" class="topcontent">
              <image :src="operateTcon.zan" />
              <image :src="operateTcon.download" />
              <div class="comment" v-if="commentNum" v-on:click='jumpComment'>
                <image :src="operateTcon.comment1" />
                <span class="commentNum">{{commentNum}} </span>
              </div>
              <image :src="operateTcon.comment2" v-else />
              <image :src="operateTcon.more" />
          </div>
        </div>
        <div class="sliderBox">
          <span class="time">{{playTime}}</span>
          <slider
            class="slider"
            min="0"
            :max="maxTime"
            :value="currentValue"
            backgroundColor="#999"
            activeColor="#ffffff"
            block-color="#ffffff"
            block-size="10"
            @change="slideMusic"
          ></slider>
          <span class="time">{{duration}}</span>
        </div>
        <div class="playOperate">
          <image :src="playIcon.playway" />
          <image :src="playIcon.prev" />
          <image
            :src="playing ? playIcon.pause : playIcon.play"
            class="playIconBig"
            v-on:click="handleStatus"
          />
          <image :src="playIcon.next" />
          <image :src="playIcon.list" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSongUrl, getSongDetail,getSongLyric,getComment } from "../../store/apis";
import { formatSongTime,timeToSec,formatCommentNum } from "../../utils/index";
import lyric from "./lyric";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      playIcon: {
        playway: require("../../../static/images/icon/cm_loop.png"),
        prev: require("../../../static/images/icon/ajh.png"),
        play: require("../../../static/images/icon/ajf.png"),
        pause: require("../../../static/images/icon/ajd.png"),
        next: require("../../../static/images/icon/ajb.png"),
        list: require("../../../static/images/icon/cm_list.png")
      },
      operateTcon:{
        zan:require("../../../static/images/icon/zan.png"),
        download:require("../../../static/images/icon/download.png"),
        comment2:require("../../../static/images/icon/comment2.png"),
        comment1:require("../../../static/images/icon/comment1.png"),
        more:require("../../../static/images/icon/more.png"),
      },
      musicData: {},
      musicNum: 0,
      showLyric: false,
      myRotate: "",
      playUrl: "",
      playTime: "00:00",
      Audio: {},
      imgCountDown: null,
      animate: {},
      duration: "00:00",
      maxTime: 0,
      currentValue: 0,
      lyricData: [],
      commentNum: ''
    };
  },
  components:{
    lyric
  },
  computed: {
    ...mapState(["playing", "currentMusicId"])
  },
  destroyed(){
    console.log('destroy')
  },
  onUnload(){
    console.log('unload')
  },
  onHide(){
    this.animationUnMount()
  },
  onShow(){
    if (this.playing && !this.showLyric) {
      this.createMusicAnimation()
    }
  },
  methods: {
    initdata: async function(id) {
      await this.getSongDetail(id);
      await this.getSongUrl(id);
      await this.getSongLyric(id)
      await this.getComment(id)
      this.createAudio();
    },
    // 创建音频实例
    createAudio: function() {
      this.Audio.destroy && this.Audio.destroy(); //销毁上个audio实例
      this.Audio = wx.createInnerAudioContext(); //创建音频实例
      this.Audio.src = this.playUrl;
      // 音频可以播放
      this.Audio.onCanplay(() => {
        this.Audio.play();
        this.$store.commit("setPlaying", true);
        this.createMusicAnimation()
      });

      const duration = setInterval(() => {
        this.getMusicDuration();
        if (this.duration !== "00:00") {
          clearInterval(duration);
        }
      }, 200);
      // 音频结束播放
      this.Audio.onEnded(() => {
        this.nextMusic();
      });
      //监听音频
      this.Audio.onTimeUpdate(() => {
        const currentTime = this.Audio.currentTime;
        this.playTime = formatSongTime(currentTime);
        this.currentValue = currentTime;
      });
      this.$store.commit("setMusicId", id);
    },
    // 创建旋转动画
    createMusicAnimation() {
      const animate = wx.createAnimation({
        duration: 500
      });
      clearInterval(this.imgCountDown);
      this.imgCountDown = setInterval(() => {
        this.musicNum = this.musicNum + 1;
        animate.rotate(4 * this.musicNum).step();
        this.myRotate = animate.export();
      }, 500);
    },
    animationUnMount() {
      clearInterval(this.imgCountDown);
    },
    //获取歌曲详情
    getSongDetail: async function(id) {
      const result = await getSongDetail([id]);
      this.musicData = result.songs[0];
      wx.setNavigationBarTitle({
        title: this.musicData.name
      });
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#1E221E",
        animation: {
          duration: 400,
          timingFunc: "easeIn"
        }
      });
    },
    // 获取歌曲url
    getSongUrl: async function(id) {
      const result = await getSongUrl(id);
      this.playUrl = result.data[0].url;
    },
    // 获取歌曲歌词
    getSongLyric:async function(id) {
      const result = await getSongLyric(id)
      if (result.code === 200) {
        if (!result.nolyric) {
        const lyric = result.lrc.lyric.split('\n') 
        const lyricData = []
        lyric.map(item => {
          const sec = item.substr(1, item.indexOf(']') - 1) || ''
          const text = item.substr(item.indexOf(']')+ 1)
          const data = {
            sec: timeToSec(sec),
            text: text,
            time: sec.substr(0,5)
          }
          if (data.sec && data.text) {
            lyricData.push(data)
          }
        })
        this.lyricData = lyricData
        }
      }
    },
    getComment: async function(id) {
      const result = await getComment(id, 20);
      this.commentNum = formatCommentNum(parseInt(result.total))
    },
    nextMusic: async function() {
      this.$store.commit("setPlaying", !this.playing);
      this.Audio.pause();
      clearInterval(this.imgCountDown);
    },
    prevMusic: async function() {

    },
    slideMusic: function(e) {
      const value = e.mp.detail.value;
      this.Audio.seek(value);
      this.currentValue = value;
      this.playTime = formatSongTime(value);
      if (this.Audio.paused) {
        this.Audio.play();
      }
    },
    getMusicDuration: function() {
      const duration = this.Audio.duration;
      this.maxTime = parseInt(duration);
      this.duration = formatSongTime(duration);
    },
    handleStatus: function() {
      this.$store.commit("setPlaying", !this.playing);
      if (!this.playing) {
        this.Audio.pause();
        this.animationUnMount();
      } else {
        this.Audio.play();
        this.createMusicAnimation();
      }
    },
    changeLyricStatus:function(){
      this.showLyric = !this.showLyric
    },
    jumpComment:function(){
       mpvue.navigateTo({url: '/pages/comment/main?id='+this.musicData.id})
    }
  },
  async mounted() {
    const id = this.$root.$mp.query.id;
    console.log(id,'id')
    if (id && this.currentMusicId !== id) {
      this.$store.commit("setMusicId", id);
      this.initdata(id);
    } else {
      wx.setNavigationBarTitle({
        title: this.musicData.name
      });
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#1E221E",
        animation: {
          duration: 400,
          timingFunc: "easeIn"
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.box {
  // position: relative;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom, #1d211d, #42443c, #1d211d);
}
.content{
  position: relative;
  z-index: 10;
  height: 100%;
  .lyricBox{
    height: 100%;
    overflow: hidden;
  }
}
.coverBox {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover {
  margin: auto;
  margin-top: 300rpx;
  width: 500rpx;
  height: 500rpx;
  border-radius: 50%;
  overflow: hidden;

  .imgBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;

    > image {
      width: 500rpx;
      height: 500rpx;
    }
  }
}
.turn {
  animation: turn 20s linear infinite;
}
.turnPause {
  animation-play-state: paused;
}
.operate {
  position: absolute;
  z-index: 11;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 340rpx;
  .container {
    padding: 0rpx 30rpx 50rpx;
  }
}
.sliderBox {
  display: flex;
  align-items: center;
  // margin-top: 100rpx;
  width: 100%;
  .time {
    display: inline-block;
    width: 50rpx;
    color: #dddddd;
    font-size: 10px;
  }
  .slider {
    flex: 1;
  }
}
.background_img{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(50px);
  transform: scale(3.3);
}
.playOperate {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > image {
    width: 70rpx;
    height: 70rpx;
  }
  .playIconBig {
    width: 120rpx;
    height: 120rpx;
  }
}
.operateTop{
  width: 100%;
  height: 260rpx;
  .topcontent{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
   image {
    width: 80rpx;
    height: 80rpx;
  }
}
.comment{
  position: relative;
  .commentNum{
    display: inline-block;
    width: 50rpx;
    position: absolute;
    color: #dddddd;
    font-size: 10px;
    top: 8rpx;
    right: -20rpx;
  }
}
@keyframes turn {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
