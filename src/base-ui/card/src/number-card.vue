<script setup lang="ts">
const props = defineProps<{
  title: String;
  subtitle: String;
  tip: String;
}>();
</script>

<template>
  <el-card>
    <div class="card-header">
      <span>{{ title }}</span>
      <el-tooltip class="box-item" effect="dark" :content="tip" placement="top">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="number">
      <slot></slot>
    </div>
    <div class="desc">
      <span class="subtitle">{{ subtitle }}</span>
      <slot></slot>
    </div>
  </el-card>
</template>

<style scoped lang="less">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  font-size: 14px;
  color: var(--el-color-info-light-3);
}
.number {
  font-size: 27px;
  border-bottom: 1px solid var(--el-border-color);
  padding: 0 0 4px 0;
}
.desc {
  padding: 8px 0;
  font-size: 15px;
}
.subtitle {
  margin-right: 5px;
}
</style>
