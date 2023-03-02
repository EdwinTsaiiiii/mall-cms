<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'
// 定义props 在泛型里面的属性默认是必传的
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)
const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  // 当数据发生改变时重新调用
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
