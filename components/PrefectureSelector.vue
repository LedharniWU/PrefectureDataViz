<template>
  <div>
    <h1>都道府県一覧</h1>
    <ul>
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
