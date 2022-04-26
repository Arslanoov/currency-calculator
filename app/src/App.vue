<template>
  <main>
    <div class="container">
      <CurrencyCalculator />
    </div>
  </main>
</template>

<script setup>
import CurrencyCalculator from "./components/CurrencyCalculator.vue";
</script>

<style>
@import "assets/styles/base.scss";

.container {
  padding: 2rem;

  font-size: 1.6rem;
}
</style>
