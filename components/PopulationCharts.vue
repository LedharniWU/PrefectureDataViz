<template>
  <div>
    <div id="populationChart"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, watchEffect } from 'vue'
import { useFetch } from '#app'
import Highcharts from 'highcharts'

// コンポーネントの親から受け取る選択された都道府県のリスト
const props = defineProps({
  selectedPrefectures: Array
})

// Highchartsに渡すための空のデータセット
const chartData = ref({
  series: []
})

// X軸に表示するカテゴリ（年度）
const xAxisCategories = ref(['2020', '2021', '2022', '2023'])

// Highchartsを使ってチャートを描画する関数
const drawChart = () => {
  Highcharts.chart('populationChart', {
    chart: {
      type: 'line'
    },
    title: {
      text: '都道府県別人口推移'
    },
    xAxis: {
      categories: xAxisCategories.value,
      title: {
        text: '年度'
      }
    },
    yAxis: {
      title: {
        text: '人口数'
      }
    },
    series: chartData.value.series
  })
}

// 特定の都道府県の人口データをAPIから取得する関数
const getPopulationByYear = async (prefecture) => {
  const responses = await useFetch(`/api/getPopulationByYear?prefCode=${prefecture.prefCode}`).then(res => ({
    prefName: prefecture.prefName,
    prefCode: prefecture.prefCode,
    data: res.data
  }))

  return responses
}

// APIから取得した都道府県ごとの人口データを保持
const prefecturesPopulation = ref([])

// 前回のレンダリング時の都道府県データを記録
const oldPrefecturesPopulation = ref([])

watchEffect(async () => {
  // 新しく追加された都道府県を特定
  const newPrefectures = props.selectedPrefectures.filter(
    p => !oldPrefecturesPopulation.value.some(oldP => oldP.prefCode === p.prefCode)
  )

  // 削除された都道府県を特定
  const removedPrefectures = oldPrefecturesPopulation.value.filter(
    oldP => !props.selectedPrefectures.some(p => p.prefCode === oldP.prefCode)
  )

  // 新しい都道府県に対してAPIを呼び出す
  if (newPrefectures.length > 0) {
    const responses = await Promise.all(
      newPrefectures.map(prefecture => getPopulationByYear(prefecture))
    )
    prefecturesPopulation.value = [...prefecturesPopulation.value, ...responses]
  }

  // チャートから削除された都道府県のデータを削除
  if (removedPrefectures.length > 0) {
    prefecturesPopulation.value = prefecturesPopulation.value.filter(
      p => !removedPrefectures.some(removed => removed.prefCode === p.prefCode)
    )
  }

  // チャートデータを更新
  chartData.value.series = prefecturesPopulation.value.map(prefecture => ({
    name: prefecture.prefName,
    data: prefecture.data.map(d => d.value)
  }))

  // X軸カテゴリを更新
  if (prefecturesPopulation.value.length > 0) {
    xAxisCategories.value = prefecturesPopulation.value[0].data.map(d => `${d.year}`)
  }

  // 現在の都道府県選択状態を記録
  oldPrefecturesPopulation.value = [...props.selectedPrefectures]
})

watch(prefecturesPopulation, () => {
  drawChart()
})

onMounted(() => {
  drawChart()
})
</script>
