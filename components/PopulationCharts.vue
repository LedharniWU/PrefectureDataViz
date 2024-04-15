<template>
  <div>
    <div id="populationChart"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, watchEffect } from 'vue'
import { useFetch } from '#app'
import Highcharts from 'highcharts'

const props = defineProps({
  selectedPrefectures: Array
})

const prefecturesPopulation = ref([])
const oldPrefecturesPopulation = ref([])

// 空のデータセットで初期化
const chartData = ref({
  series: []
})

const xAxisCategories = ref(['2020', '2021', '2022', '2023'])

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

const getPopulationByYear = async (prefecture) => {
  const responses = await useFetch(`/api/getPopulationByYear?prefCode=${prefecture.prefCode}`).then(res => ({
    prefName: prefecture.prefName,
    prefCode: prefecture.prefCode,
    data: res.data
  }))

  return responses
}

watchEffect(async () => {
  if (props.selectedPrefectures.length > 0) {
    const responses = await Promise.all(
      props.selectedPrefectures.map(prefecture => getPopulationByYear(prefecture))
    )

    prefecturesPopulation.value = responses

    chartData.value.series = prefecturesPopulation.value.map(prefecture => ({
      name: prefecture.prefName,
      data: prefecture.data.map(d => d.value)
    }))

    xAxisCategories.value = prefecturesPopulation.value[0].data.map(d => `${d.year}`)
  } else {
    prefecturesPopulation.value = []
    chartData.value.series = []
  }
})

watch(prefecturesPopulation, () => {
  drawChart()
})

onMounted(() => {
  drawChart()
})
</script>
