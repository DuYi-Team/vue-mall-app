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
    size: 7,
    sortType: 'all',
    over: false,
  },
  mutations: {
    changeOver(state, bool) {
      state.over = bool;
    },
    sortGoodsList(state, type) {
      state.sortType = type;
    },
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
    resetList(state) {
      state.goodsList = [];
    },
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if (state.counterMap[id] === 1 && value === -1) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
      // if (state.counterMap[id]) {
      //   Vue.set(state.counterMap, id, state.counterMap[id] + value);
      // } else {
      //   Vue.set(state.counterMap, id, 1);
      // }
      // localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    getSideList({ commit, dispatch }, type) {
      return api.getSideList(type).then((data) => {
        commit('setSideList', data.data.map);
        commit('setGoodsType', data.data.map[0].value);
        dispatch('getGoodsList', { type: data.data.map[0].value, page: 1 });
      });
    },
    getGoodsList({ commit, state }, t) {
      const type = t.type || state.goodsType;
      const { page } = t;
      return api.getGoodsList(type, page, state.size, state.sortType).then((data) => {
        commit('setGoodsList', data.data);
        commit('setGoodsType', type);
      });
    },
  },
  modules: {
  },
});
