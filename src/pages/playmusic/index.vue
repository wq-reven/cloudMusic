<template>
  <div class="box">
    <div class="lyricBox"></div>
    <div class="coverBox">
      <div class="cover">
        <div class="imgBox">
          <image :src="coverImg" mode="aspectFill" />
        </div>
      </div>
    </div>
    <div class="operate">
      <div class="container">
        <div></div>
        <div></div>
        <div class="playOperate">
          <image :src="playIcon.playway" />
          <image :src="playIcon.prev" />
          <image :src="playIcon.play" class="playIconBig" v-on="handleStatus()" />
          <image :src="playIcon.next" />
          <image :src="playIcon.list" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSongURL } from "../../store/apis";
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
      URL: "", //播放地址
      bgImg: this.playingData.al.picUrl, //封面
      audio: {}, //音频对象
      total: "", //音频总时长
      currentTime: "", //音频当前播放时常
      ratio: "", //播放进度百分比
      isPause: false //是否暂停
    };
  },
  computed: {
    //[歌曲信息/全局音频对象/全局播放状态]
    ...mapState(["playingData", "globalAudio", "playing"]),
    //背景图
    background() {
      return `background-image: url(${this.bgImg})`;
    },
    //格式化歌曲名称
    formatName() {
      /**
       * [搜索结果]的歌曲数据为：artists
       * [歌手/专辑/歌单]的歌曲数据为：ar
       */
      let artists = this.playingData.artists || this.playingData.ar;
      let result = "";
      artists.forEach((item, index, arr) => {
        if (index === arr.length - 1) {
          result += item.name;
          return;
        }
        result += `${item.name}/`;
      });
      return `${this.playingData.name} - ${result}`;
    }
  },
  methods: {
    ...mapMutations(["PLAYING", "PLAY_AVATAR"]),
    //获取歌曲的播放地址
    async getSongURL(id) {
      const res = await getSongUrl(id);
      if (!res || res.code !== ERR_OK) return;
      this.URL = res.data[0].url;
    },
    //获取歌曲封面
    getSongCover(id) {
      API.album({ id }).then(res => {
        if (!res || res.code !== ERR_OK) return;
        this.bgImg = res.album.picUrl;
      });
    },
    //创建音频对象
    createAudio() {
      this.globalAudio.destroy && this.globalAudio.destroy(); //销毁上个audio实例
      this.globalAudio.src = this.URL; //URL
      this.globalAudio.title = this.formatName; //后台标题
      this.globalAudio.coverImgUrl = this.bgImg; //后台背景图
      this.playTime(); //获取播放时间
    },
    //获取播放时间
    playTime() {
      setTimeout(() => {
        //监听进度更新
        this.globalAudio.onTimeUpdate(() => {
          this.currentTime = this.formatTime(
            this.globalAudio.currentTime,
            null
          ); //格式化当前播放时常
          this.ratio =
            this.globalAudio.currentTime / this.globalAudio.duration * 100; //进度百分比
        });
      }, 500);
    },
    //格式化播放时间
    formatTime(currtime, totaltime) {
      let time = currtime || totaltime;
      //分钟
      let min = parseInt(time / 60);
      //秒钟（当前时常需要上取整，总时长不需要上取整）
      let sec = totaltime ? parseInt(time % 60) : Math.ceil(time % 60);
      min = min < 10 ? `0${min}` : min;
      sec = sec < 10 ? `0${sec}` : sec;
      return `${min}:${sec}`;
    },
    //点击播放/暂停
    play() {
      this.isPause ? this.globalAudio.play() : this.globalAudio.pause();
    }
  },
  async mounted() {
    //从tabbar头像点进来的，不重新创建audio
    // if (this.$root.$mp.query.from) return;
    // //监听播放
    // this.globalAudio.onPlay(() => {
    //   this.isPause = false; //播放中
    //   this.PLAYING(true); //全局播放中[用于通知其他组件]
    //   this.PLAY_AVATAR(this.bgImg); //头像
    //   this.total = this.formatTime(null, this.globalAudio.duration); //格式化总时长
    // });
    // //监听暂停
    // this.globalAudio.onPause(() => {
    //   this.isPause = true;
    // });
    // //监听结束
    // this.globalAudio.onEnded(() => {
    //   this.isPause = true;
    //   this.PLAYING(false);
    //   //播放完毕后可能[currentTime]和[ratio]还会有一丝丝毫秒偏差，手动设置其到终点
    //   this.currentTime = this.total;
    //   this.ratio = 100;
    //   //播放下一首
    //   this.createAudio();
    // });
    // /**
    //  * 数据获取
    //  * [搜索结果]的专辑id为：album.id
    //  * [歌手/专辑/歌单]的专辑id为：al.id
    //  */
    // // const album = this.playingData.album || this.playingData.al;
    // // this.getSongCover(album.id); //获取封面
    // await this.getSongURL(this.playingData.id); //获取播放地址
    // this.createAudio(); //创建audio实例
  }
};
</script>
<style scoped lang="less">
.box {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom, #1d211d, #42443c, #1d211d);
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
.operate {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  // background-color: #000;
  .container {
    padding: 40rpx 30rpx 50rpx;
  }
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
</style>
