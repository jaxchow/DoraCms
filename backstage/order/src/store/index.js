import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    order
  },
  getters
})

export default store