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
  },
  mutations: {
    sortGoodsList(state, type) {
      if (type === 'all') {
        state.goodsList.sort((prev, next) => prev.id - next.id);
      } else if (type === 'sale') {
        state.goodsList.sort((prev, next) => next.sale - prev.sale);
      } else if (type === 'price-up') {
        state.goodsList.sort((prev, next) => {
          const a = prev.priceOff || prev.price;
          const b = next.priceOff || next.price;
          return a - b;
        });
      } else if (type === 'price-down') {
        state.goodsList.sort((prev, next) => {
          const a = prev.priceOff || prev.price;
          const b = next.priceOff || next.price;
          return b - a;
        });
      }
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
  },
  actions: {
    getSideList({ commit, dispatch }, type) {
      return api.getSideList(type).then((data) => {
        commit('setSideList', data.data);
        commit('setGoodsType', data.data[0]);
        dispatch('getGoodsList', { type: data.data[0], page: 1 });
      });
    },
    getGoodsList({ commit, state }, t) {
      const type = t.type || state.goodsType;
      const { page } = t;
      return api.getGoodsList(type, page, state.size).then((data) => {
        commit('setGoodsList', data.data);
        commit('setGoodsType', type);
      });
    },
  },
  modules: {
  },
});
