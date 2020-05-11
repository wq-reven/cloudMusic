// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import {getSongUrl} from './apis'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    playing: false, // 播放中
    playingData: {
      al: {
        picUrl: ''
      }
    },
    globalAudio: wx.createInnerAudioContext(),
    currentMusicId: '',
    playIndex: 0 // 播放序号
  },
  getters: {
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },
    setPlaying: (state, status) => {
      state.playing = status
    },
    setMusicId: (state, id) => {
      state.currentMusicId = id
    },
    globalAudio: (state) => {

    },
    setPlayingData: (state, id) => {
      const currentData = state.rankListDetail.tracks.find(item => item.id === id)
      state.playingData = currentData
    }
  },
  actions: {
    async getSongUrl (context) {
      const res = await getSongUrl(this.state.songId)
      context.commit('setSongUrlData', res.data)
      context.commit('setSongId', res.data.id)
    }
  }
})

export default store
