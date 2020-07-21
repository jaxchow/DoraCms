import * as types from '../types.js';
import {
  shopList,
} from '@/api/shop';
import _ from 'lodash';




const state = {
  formState: {
    show: false,
    edit: false,
    formData: {
      // STOREPROPSSTR
    }
  },
  list: {
    pageInfo: {},
    docs: []
  }
}

const mutations = {
  [types.SHOP_FORMSTATE](state, formState) {
    state.formState.show = formState.show;
    state.formState.edit = formState.edit;
    state.formState.type = formState.type;
    state.formState.formData = Object.assign({
      // STOREPROPSSTR
    }, formState.formData);
  },
  [types.SHOP_LIST](state, list) {
    state.list = list
  },
}

const actions = {

  showShopForm: ({
    commit
  }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.SHOP_FORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },

  hideShopForm: ({
    commit
  }) => {
    commit(types.SHOP_FORMSTATE, {
      show: false
    })
  },

  getShopList({
    commit
  }, params = {}) {
    shopList(params).then((result) => {
      commit(types.SHOP_LIST, result.data)
    })
  },


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}