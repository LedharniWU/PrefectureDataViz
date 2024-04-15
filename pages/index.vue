<template>
  <div class="container">
    <PrefectureSelector @update-selected-prefectures="handleSelectedPrefectures" />
    <PopulationCharts :selected-prefectures="selectedPrefectures" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PrefectureSelector from '~/components/PrefectureSelector.vue'
import PopulationCharts from '~/components/PopulationCharts.vue'

const selectedPrefectures = ref([])

const handleSelectedPrefectures = (newSelectedPrefectures: []) => {
  selectedPrefectures.value = newSelectedPrefectures
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}
</style>
