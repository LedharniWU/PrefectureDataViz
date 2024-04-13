<template>
  <div>
    <h1>都道府県一覧</h1>
    <ul>
      <li v-for="prefecture in prefectures" :key="prefecture.prefCode">
        <input
          type="checkbox"
          :value="prefecture.prefCode"
          @change="handleCheckboxChange(prefecture)"
          :checked="isSelected(prefecture.prefCode)"
        />
        {{ prefecture.prefName }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFetch } from "#app";

const { data, pending, error } = useFetch("/api/getPrefectures");
const prefectures = computed(() => (data.value ? data.value.result : []));
const selectedPrefectures = ref([]);

// チェックされた項目が選択されているかどうかを判定
const isSelected = (prefCode) => {
  return selectedPrefectures.value.some((item) => item.prefCode === prefCode);
};

// チェックボックスの状態が変更されたときの処理
const handleCheckboxChange = (prefecture) => {
  const index = selectedPrefectures.value.findIndex(
    (item) => item.prefCode === prefecture.prefCode,
  );
  if (index > -1) {
    // すでに配列に存在する場合は削除
    selectedPrefectures.value.splice(index, 1);
  } else {
    // 配列に存在しない場合は追加
    selectedPrefectures.value.push({
      prefCode: prefecture.prefCode,
      prefName: prefecture.prefName,
    });
  }
};
</script>
