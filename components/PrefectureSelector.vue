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

// 都道府県データをAPIから取得
const { data, error } = useFetch('/api/getPrefectures')

// 取得したデータをcomputedプロパティで管理
const prefectures = computed(() => (data.value ? data.value.result : []))

// 選択された都道府県を管理するref
const selectedPrefectures = ref([])

// 特定の都道府県が選択されているかどうかを判定する関数
const isSelected = (prefCode) => {
  return selectedPrefectures.value.some(item => item.prefCode === prefCode)
}

// チェックボックスの変更をハンドルする関数
const handleCheckboxChange = (prefecture) => {
  const index = selectedPrefectures.value.findIndex(
    item => item.prefCode === prefecture.prefCode
  )
  if (index > -1) {
    // すでに選択されている場合は削除
    selectedPrefectures.value.splice(index, 1)
  } else {
    // 選択されていない場合は追加
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

/* 都道府県リストのスタイリング */
.prefecture-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
}

/* 各リストアイテムのスタイリング */
.prefecture-list li {
  flex: 0 0 calc(20% - 10px);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
