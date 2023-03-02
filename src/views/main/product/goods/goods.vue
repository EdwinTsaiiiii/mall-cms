<template>
  <div class="goods">
    <div class="content">
      <page-content :contentTableConfig="contentTableConfig" pageName="goods">
        <!-- 页面特有的插槽放在对应页面的vue中 -->
        <!-- 这里涉及跨组件插槽 -->
        <template #image="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
            fit="cover"
          />
        </template>
        <template #oldPrice="scope">
          {{ '￥' + (+scope.row.oldPrice).toFixed(2) }}
        </template>
        <template #newPrice="scope">
          {{ '￥' + (+scope.row.newPrice).toFixed(2) }}
        </template>
        <template #status="scope">
          <el-tag
            class="ml-2"
            :type="scope.row.status === 1 ? 'success' : 'danger'"
          >
            {{ scope.row.status === 1 ? '已上架' : '已下架' }}
          </el-tag>
        </template>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped>
.content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
