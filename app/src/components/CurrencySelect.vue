<template>
  <v-select
    @update:modelValue="onCurrencyChange"
    :modelValue="value"
    :options="CURRENCIES_LIST"
    class="select"
    label="label"
  >
    <template #option="option">
      <div class="select__row">
        <div class="select__left">
          <img class="select__image" :src="`/icons/${option.label}.png`" alt="" />
        </div>
        <div class="select__title">{{ option.label.toUpperCase() }}</div>
      </div>
    </template>
  </v-select>
</template>

<script setup>
import { CURRENCIES_LIST } from '~/const/currency';

const emit = defineEmits(['change']);

defineProps({
  value: {
    type: String,
    required: true
  }
});

const onCurrencyChange = (name) => emit('change', name);
</script>

<style lang="scss" scoped>
.select {
  width: 12rem;

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.5rem 0;

    gap: 2rem;
  }

  &__left {
    display: flex;
    justify-content: center;

    width: 3rem;
  }

  &__image {
    height: 2rem;
  }
}
</style>

<style lang="scss">
.vs__search {
  display: none;
}

.vs__dropdown-toggle {
  height: 3.3rem;
}
</style>