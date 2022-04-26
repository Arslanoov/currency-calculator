<template>
  <main>
    <div class="container">
      <Calculator />
    </div>
  </main>
</template>

<script setup>
import Calculator from './components/Calculator.vue';
</script>

<style>
@import 'assets/styles/base.scss';

.container {
  padding: 2rem;

  font-size: 1.6rem;
}
</style>
