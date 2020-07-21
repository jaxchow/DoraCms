import * as types from '../types.js';
import {
  orderList,
} from '@/api/order';
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
  [types.ORDER_FORMSTATE](state, formState) {
    state.formState.show = formState.show;
    state.formState.edit = formState.edit;
    state.formState.type = formState.type;
    state.formState.formData = Object.assign({
      // STOREPROPSSTR
    }, formState.formData);
  },
  [types.ORDER_LIST](state, list) {
    state.list = list
  },
}

const actions = {

  showOrderForm: ({
    commit
  }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.ORDER_FORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },

  hideOrderForm: ({
    commit
  }) => {
    commit(types.ORDER_FORMSTATE, {
      show: false
    })
  },

  getOrderList({
    commit
  }, params = {}) {
    orderList(params).then((result) => {
      commit(types.ORDER_LIST, result.data)
    })
  },


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}