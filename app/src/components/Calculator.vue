<template>
  <form class="calculator-form">
    <div class="calculator-form__group">
      <label class="calculator-form__label" for="from">Amount I have</label>
      <input class="calculator-form__input" @input="onFirstChange" :value="valueFirst" name="from" type="text">
    </div>

    <div class="calculator-form__group">
      <label class="calculator-form__label" for="to">I need</label>
      <input class="calculator-form__input" @input="onSecondChange" :value="valueSecond" name="to" type="text">
    </div>

    <div v-if="rate" class="calculator-form__rate">Rate: {{ rate }}</div>
  </form>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { TYPE_FIRST, TYPE_SECOND } from '@/const/exchangeType';

const store = useStore();

const valueFirst = computed(() => store.getters.valueFirst);
const valueSecond = computed(() => store.getters.valueSecond);
const rate = computed(() => store.getters.rate);

const onFirstChange = (e) => store.dispatch('convert', {
  type: TYPE_FIRST,
  value: e.target.value
});
const onSecondChange = (e) => store.dispatch('convert', {
  type: TYPE_SECOND,
  value: e.target.value
});
</script>

<style lang="scss" scoped>

</style>