import { createStore } from 'vuex';

import { getExchangeRate } from '~/api';

import { CURRENCY_BTC, CURRENCY_USD } from '~/const/currency';
import { TYPE_FIRST } from '~/const/exchangeType';
import { COMMISSION } from '~/const/comission';

export const store = createStore({
  state () {
    return {
      currencyFirst: CURRENCY_BTC,
      currencySecond: CURRENCY_USD,
      valueFirst: 0,
      valueSecond: 0,
      lastType: TYPE_FIRST,
      rate: null,
      cached: {},
    }
  },
  mutations: {
    setValue(state, payload) {
      const value = Math.max(0, payload);
      state.lastType === TYPE_FIRST ? state.valueFirst = value : state.valueSecond = value;
    },
    setConvertedValue(state, payload) {
      const value = Math.max(0, payload);
      state.lastType === TYPE_FIRST ? state.valueSecond = value : state.valueFirst = value;
    },
    setCurrency(state, payload) {
      payload.type === TYPE_FIRST ? state.currencyFirst = payload.name : state.currencySecond = payload.name;
    },
    setLastType(state, payload) {
      state.lastType = payload;
    },
    setRate(state, payload) {
      state.rate = payload;
    },
    addCachedRate(state, payload) {
      state.cached[payload.key] = payload.value;
    },
  },
  actions: {
    async convert({ commit, getters }, { type, value }) {
      commit('setLastType', type);
      commit('setValue', value);

      const currentExchange = `${getters.currencyFrom}-${getters.currencyTo}`;
      let rate;
      if (getters.cached[currentExchange]) {
        rate = getters.cached[currentExchange];
      } else {
        const { data } = await getExchangeRate(getters.currencyFrom, getters.currencyTo);
        rate = data.data.conversion_rate;
        commit('addCachedRate', {
          key: currentExchange,
          value: rate,
        })
      }

      const convertedValue = getters.valueFrom * rate * COMMISSION;

      commit('setConvertedValue', convertedValue);
      commit('setRate', rate);
    }
  },
  getters: {
    currencyFirst: (state) => state.currencyFirst,
    currencySecond: (state) => state.currencySecond,
    valueFirst: (state) => state.valueFirst,
    valueSecond: (state) => state.valueSecond,
    rate: (state) => state.rate,
    cached: (state) => state.cached,
    currencyFrom: (state) => state.lastType === TYPE_FIRST ? state.currencyFirst : state.currencySecond,
    currencyTo: (state) => state.lastType === TYPE_FIRST ? state.currencySecond : state.currencyFirst,
    valueFrom: (state) => state.lastType === TYPE_FIRST ? state.valueFirst : state.valueSecond,
    valueTo: (state) => state.lastType === TYPE_FIRST ? state.valueSecond : state.valueFirst,
  }
});
