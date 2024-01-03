<script setup lang="ts">
import { PlotCard } from "@/base-ui/card";
import TextLInks from "@/components/text-links";
import Descriptions from "@/components/description";

import {
  technologyStacks,
  devDependencies,
  dependencies,
  GitStandard,
  FileName,
  ComponentStandard
} from "./config";
</script>

<template>
  <div class="overview">
    <plot-card title="关于">
      Molly Admin 是基于 Vue3、Pinia、VueRouter、Vite、 ElementPlus
      、TypeScript、Echart5 等后台系统解决方案。
    </plot-card>

    <plot-card title="技术栈" class="content-row">
      <TextLInks :links="technologyStacks"></TextLInks>
    </plot-card>

    <plot-card title="生产环境依赖" class="content-row">
      <Descriptions :tableDatas="dependencies" />
    </plot-card>

    <plot-card title="开发环境依赖" class="content-row">
      <Descriptions :tableDatas="devDependencies" />
    </plot-card>

    <plot-card title="项目规范" class="content-row">
      <Descriptions
        title="文件命名规范"
        isMarginBottom
        :column="1"
        :table-datas="FileName"
      />
      <Descriptions title="编写组件规范" :tableDatas="ComponentStandard" />
    </plot-card>

    <plot-card title="Git规范" class="content-row">
      <Descriptions
        :tableDatas="GitStandard"
        :column="1"
        labelAlign="left"
        align="left"
      />
    </plot-card>
  </div>
</template>

<style lang="less" scoped>
.overview {
  .el-Card {
    margin-bottom: 10px;
  }
}
.content-row {
  margin-top: 20px;
}
</style>
