// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getToplist,
  getToplistDetail,
  getPlayListDetail,
  getSongUrl
} from './apis'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    rankType: 0,
    toplists: [],
    rankListDetail: {
      coverImgUrl: require('../../static/images/rank/bg.jpg'),
      tracks: [],
      name: '',
      playlistId: 0
    },
    playing: false, // 播放中
    playingData: {
      al: {
        picUrl: ''
      }
    },
    globalAudio: {},
    playIndex: 0 // 播放序号
  },
  getters: {
    bgImg (state) {
      return state.rankListDetail.coverImgUrl
    },
    listSong (state) {
      return state.rankListDetail.tracks
    },
    trackIds (state) {
      return state.rankListDetail.trackIds
    }
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
    setRankDetail: (state, data) => {
      state.rankListDetail = data
    },
    setToplists: (state, data) => {
      state.toplists = data.slice(0, 4)
    },
    setRankType: (state, type) => {
      state.rankType = type || 0
    },
    setPlaylistId: (state, id) => {
      state.playlistId = id || 0
    },
    setPlaying: (state, status) => {
      state.playing = status
    },
    setPlayingData: (state, id) => {
      const currentData = state.rankListDetail.tracks.find(item => item.id === id)
      state.playingData = currentData
    }
  },
  actions: {
    async getToplist (context) {
      const res = await getToplist()
      context.commit('setToplists', res.list)
    },
    async getToplistDetail (context) {
      const res = await getToplistDetail(this.state.rankType)
      context.commit('setRankDetail', res.playlist)
    },
    async getPlaylistDetail (context) {
      const res = await getPlayListDetail(this.state.playlistId)
      context.commit('setRankDetail', res.playlist)
    },
    async getSongUrl (context) {
      const res = await getSongUrl(this.state.songId)
      context.commit('setSongUrlData', res.data)
      context.commit('setSongId', res.data.id)
    }
  }
})

export default store
