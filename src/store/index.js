import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    goodsList: [],
    goodsTotal: 0,
    goodsType: '',
    counterMap: {},
  },
  mutations: {
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setSideList(state, list) {
      state.sideList = list;
    },
    setGoodsList(state, obj) {
      state.goodsList = [...state.goodsList, ...obj.list];
      state.goodsTotal = obj.total;
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.goodsType = type;
    },
  },
  actions: {
    getSideList({ commit, dispatch }, type) {
      api.getSideList(type).then((data) => {
        commit('setSideList', data.data);
        return dispatch('getGoodsList', data.data[0]);
      });
    },
    getGoodsList({ commit, state }, t) {
      const type = t || state.goodsType;
      return api.getGoodsList(type).then((data) => {
        commit('setGoodsList', data.data);
        commit('setGoodsType', type);
      });
    },
  },
  modules: {
  },
});
