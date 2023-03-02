<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadCrumb" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadCrumb } from '../types/index'
export default defineComponent({
  props: {
    breadCrumb: {
      type: Array as PropType<IBreadCrumb[]>,
      default: () => []
    }
  },
  setup() {}
})
</script>
<style scoped></style>
