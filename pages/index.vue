<template>
  <div class="container">
    <h1>都道府県別の総人口推移を表示します。</h1>
    <PrefectureSelector />
  </div>
</template>

<script setup lang="ts">
import PrefectureSelector from '~/components/PrefectureSelector.vue'
</script>

<style>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}
</style>
