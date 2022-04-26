import { createStore } from 'vuex';

import { getExchangeRate } from '@/api';

import { CURRENCY_BTC, CURRENCY_USD } from '@/const/currency';
import { TYPE_FIRST } from '@/const/exchangeType';
import { COMMISSION } from '@/const/comission';

export const store = createStore({
  state () {
    return {
      currencyFirst: CURRENCY_BTC,
      currencySecond: CURRENCY_USD,
      valueFirst: 3,
      valueSecond: 0,
      lastType: TYPE_FIRST,
      rate: null,
    }
  },
  mutations: {
    setValue(state, payload) {
      if (state.lastType === TYPE_FIRST) {
        state.valueFirst = payload;
      } else {
        state.valueSecond = payload;
      }
    },
    setConvertedValue(state, payload) {
      if (state.lastType === TYPE_FIRST) {
        state.valueSecond = payload;
      } else {
        state.valueFirst = payload;
      }
    },
    setLastType(state, payload) {
      state.lastType = payload;
    },
    setRate(state, payload) {
      state.rate = payload;
    },
  },
  actions: {
    async convert({ commit, getters }, { type, value }) {
      try {
        commit('setLastType', type);
        commit('setValue', value);

        const {
          data: {
            data: { conversion_rate: rate },
            success
          }
        } = await getExchangeRate(getters.currencyFrom, getters.currencyTo);

        if (!success) {
          throw new Error('Exchange error');
        }

        commit('setRate', rate);
        commit('setConvertedValue', getters.valueFrom * rate * COMMISSION);
      } catch (e) {
        console.log('e', e);
      }
    }
  },
  getters: {
    currencyFirst: (state) => state.currencyFirst,
    currencySecond: (state) => state.currencySecond,
    valueFirst: (state) => state.valueFirst,
    valueSecond: (state) => state.valueSecond,
    rate: (state) => state.rate,
    currencyFrom: (state) => state.lastType === TYPE_FIRST ? state.currencyFirst : state.currencySecond,
    currencyTo: (state) => state.lastType === TYPE_FIRST ? state.currencySecond : state.currencyFirst,
    valueFrom: (state) => state.lastType === TYPE_FIRST ? state.valueFirst : state.valueSecond,
    valueTo: (state) => state.lastType === TYPE_FIRST ? state.valueSecond : state.valueFirst,
  }
});
