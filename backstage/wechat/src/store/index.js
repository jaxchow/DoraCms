import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import wechat from './modules/wechat'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    wechat
  },
  getters
})

export default store