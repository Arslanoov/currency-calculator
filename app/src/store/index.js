import { createStore } from 'vuex';

import { getExchangeRate } from '@/api';

import { CURRENCY_BTC, CURRENCY_USD } from '@/const/currency';
import { TYPE_FIRST } from '@/const/exchangeType';
import { COMMISSION } from '@/const/comission';

export const store = createStore({
  state () {
    return {
      currencyFrom: CURRENCY_BTC,
      currencyTo: CURRENCY_USD,
      valueFrom: 3,
      valueTo: 0,
    }
  },
  mutations: {
    setCurrencyFrom(state, payload) {
      state.currencyFrom = payload;
    },
    setCurrencyTo(state, payload) {
      state.currencyTo = payload;
    },
    setValueFrom(state, payload) {
      state.valueFrom = payload;
    },
    setValueTo(state, payload) {
      state.valueTo = payload;
    },
  },
  actions: {
    async convert({ commit, getters }, fromType) {
      try {
        const { data } = await getExchangeRate(
          fromType === TYPE_FIRST ? getters.currencyFrom : getters.currencyTo,
          fromType === TYPE_FIRST ? getters.currencyTo : getters.currencyFrom
        );

        if (!data.success) {
          throw new Error('Exchange error');
        }

        const sumFrom = fromType === TYPE_FIRST ? getters.valueFrom : getters.valueTo;

        const convertedSum = sumFrom * data.data.conversion_rate * ((100 - COMMISSION) / 100);

        commit(fromType === TYPE_FIRST ? 'setCurrencyFrom' : 'setCurrencyTo', convertedSum);
      } catch (e) {
        console.log('e', e);
      }
    }
  },
  getters: {
    currencyFrom: (state) => state.currencyFrom,
    currencyTo: (state) => state.currencyTo,
    valueFrom: (state) => state.valueFrom,
    valueTo: (state) => state.valueTo,
  }
});
