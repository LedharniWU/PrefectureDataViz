<template>
  <div class="container">
    <h1>都道府県一覧</h1>
    <ul class="prefecture-list">
      <li v-for="prefecture in prefectures" :key="prefecture.prefCode">
        <input
          type="checkbox"
          :value="prefecture.prefCode"
          :checked="isSelected(prefecture.prefCode)"
          @change="handleCheckboxChange(prefecture)"
        />
        {{ prefecture.prefName }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, watch } from 'vue'
import { useFetch } from '#app'

const emit = defineEmits(['updateSelectedPrefectures'])
const { data, error } = useFetch('/api/getPrefectures')
const prefectures = computed(() => (data.value ? data.value.result : []))
const selectedPrefectures = ref([])

const isSelected = (prefCode) => {
  return selectedPrefectures.value.some(item => item.prefCode === prefCode)
}

const handleCheckboxChange = (prefecture) => {
  const index = selectedPrefectures.value.findIndex(
    item => item.prefCode === prefecture.prefCode
  )
  if (index > -1) {
    selectedPrefectures.value.splice(index, 1)
  } else {
    selectedPrefectures.value.push({

      prefCode: prefecture.prefCode,
      prefName: prefecture.prefName
    })
  }
}

watch(selectedPrefectures, (newVal) => {
  emit('updateSelectedPrefectures', newVal)
}, { deep: true })

</script>

<style scoped>
.container {
  text-align: center;
}

.prefecture-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
}

.prefecture-list li {
  flex: 0 0 calc(20% - 10px);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
