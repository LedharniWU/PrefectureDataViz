<template>
  <div>
    <h1>都道府県別人口構成</h1>
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

const drawChart = () => {
  if (!prefecturesPopulation.value.length) {
    Highcharts.chart('populationChart', {
      chart: {
        type: 'line'
      },
      title: {
        text: '都道府県別人口推移'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: '人口数'
        }
      },
      series: [{
        name: 'データがありません',
        data: []
      }],
      noData: {
        style: {
          fontWeight: 'bold',
          fontSize: '15px',
          color: '#303030'
        },
        text: '選択された都道府県がありません。'
      }
    })
    return
  }

  Highcharts.chart('populationChart', {
    chart: {
      type: 'line'
    },
    title: {
      text: '都道府県別人口推移'
    },
    xAxis: {
      categories: prefecturesPopulation.value[0].data.map(d => `${d.year}`),
      title: {
        text: '年度'
      }
    },
    yAxis: {
      title: {
        text: '人口数'
      }
    },
    series: prefecturesPopulation.value.map(prefecture => ({
      name: prefecture.prefName,
      data: prefecture.data.map(d => d.value)
    }))
  })
}

watchEffect(async () => {
  const responses = await Promise.all(
    props.selectedPrefectures.map(prefecture =>
      useFetch(`/api/getPopulationByYear?prefCode=${prefecture.prefCode}`).then(res => ({
        prefName: prefecture.prefName,
        prefCode: prefecture.prefCode,
        data: res.data
      }))
    )
  )

  prefecturesPopulation.value = responses
  drawChart()
})

onMounted(() => {
  drawChart()
})
</script>
