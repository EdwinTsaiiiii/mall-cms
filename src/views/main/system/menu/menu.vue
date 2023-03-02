<template>
  <div class="menu">
    <div class="content">
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="menu"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
export default defineComponent({
  name: 'self-menu',
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
