<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults, watchEffect } from "vue";
import useEchart from "../hooks/useEchart";

const props = withDefaults(
  defineProps<{
    options: any;
    width?: string;
    height?: string;
  }>(),
  {
    width: "100%",
    height: "360px"
  }
);

const echartDivRef = ref<HTMLElement>();
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!);
  // 当数据发生改变时重新调用
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>

<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<style scoped lang="less"></style>
