import * as types from '../types.js';
import {
  wechatList,
} from '@/api/wechat';
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
  [types.WECHAT_FORMSTATE](state, formState) {
    state.formState.show = formState.show;
    state.formState.edit = formState.edit;
    state.formState.type = formState.type;
    state.formState.formData = Object.assign({
      // STOREPROPSSTR
    }, formState.formData);
  },
  [types.WECHAT_LIST](state, list) {
    state.list = list
  },
}

const actions = {

  showWechatForm: ({
    commit
  }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.WECHAT_FORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },

  hideWechatForm: ({
    commit
  }) => {
    commit(types.WECHAT_FORMSTATE, {
      show: false
    })
  },

  getWechatList({
    commit
  }, params = {}) {
    wechatList(params).then((result) => {
      commit(types.WECHAT_LIST, result.data)
    })
  },


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}