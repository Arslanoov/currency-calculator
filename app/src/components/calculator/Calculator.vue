<template>
  <div>
    Calc 1

    <form @submit.prevent="onSubmit">
      <input type="text">
      <button type="submit">Calc</button>
    </form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

import { TYPE_FIRST } from '@/const/exchangeType';

const store = useStore();

const onSubmit = () => store.dispatch('convert', TYPE_FIRST);
</script>

<style lang="scss" scoped>

</style>