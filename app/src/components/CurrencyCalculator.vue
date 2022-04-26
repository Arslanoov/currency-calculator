<template>
  <form class="calculator-form">
    <div class="calculator-form__group">
      <label class="calculator-form__label" for="from">Amount I have</label>

      <div class="calculator-form__row">
        <CurrencySelect
          @change="(name) => onCurrencyChange(TYPE_FIRST, name, valueFirst)"
          :value="currencyFirst"
        />
        <input
          @input="onChange(TYPE_FIRST, $event.target.value)"
          :value="valueFirst"
          name="from"
          class="calculator-form__input"
          id="from"
          type="number"
          min="0"
        />
      </div>
    </div>

    <div class="calculator-form__group">
      <label class="calculator-form__label" for="to">I need</label>

      <div class="calculator-form__row">
        <CurrencySelect
          @change="(name) => onCurrencyChange(TYPE_SECOND, name, valueSecond)"
          :value="currencySecond"
        />
        <input
          @input="onChange(TYPE_SECOND, $event.target.value, valueSecond)"
          :value="valueSecond"
          id="to"
          class="calculator-form__input"
          type="number"
          min="0"
        />
      </div>
    </div>

    <div class="calculator-form__rate">Rate: {{ rate }}</div>
  </form>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { createToaster } from "@meforma/vue-toaster";

import { TYPE_FIRST, TYPE_SECOND } from "~/const/exchangeType";

import CurrencySelect from "~/components/CurrencySelect.vue";

const store = useStore();
const toast = createToaster();

const valueFirst = computed(() => store.getters.valueFirst);
const valueSecond = computed(() => store.getters.valueSecond);
const currencyFirst = computed(() => store.getters.currencyFirst);
const currencySecond = computed(() => store.getters.currencySecond);
const rate = computed(() => store.getters.rate);

const onCurrencyChange = (type, name, value) => {
  store.commit("setCurrency", {
    type,
    name,
  });
  onChange(type, value);
};

const onChange = (type, value) => {
  store
    .dispatch("convert", {
      type,
      value,
    })
    .catch((e) => {
      if (e?.response?.data) {
        toast.error(e.response.data.message, {
          position: "top-right",
        });
      }
    });
};
</script>

<style lang="scss" scoped>
.calculator-form {
  &__row {
    display: flex;
    align-items: center;

    gap: 2rem;
  }

  &__group {
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }

  &__label {
    font-size: 1.8rem;
    font-weight: 500;
  }

  &__input {
    min-width: 5rem;
    height: 3.3rem;

    text-align: center;

    font-size: 1.6rem;
  }
}
</style>
