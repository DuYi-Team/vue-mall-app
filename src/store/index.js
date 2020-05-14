import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
  },
  mutations: {
    setSideList(state, list) {
      state.sideList = list;
    },
  },
  actions: {
    getSideList({ commit }, type) {
      api.getSideList(type).then((data) => {
        commit('setSideList', data.data);
      });
    },
  },
  modules: {
  },
});
