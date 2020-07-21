import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import shop from './modules/shop'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    shop
  },
  getters
})

export default store