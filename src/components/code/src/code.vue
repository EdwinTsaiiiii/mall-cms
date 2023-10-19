<script setup lang="ts">
defineProps({
  sourceCode: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div class="code">
    <pre>
      <code v-html="sourceCode"></code>
    </pre>
  </div>
</template>

<style lang="less" scoped>
.code {
  pre {
    background-color: #ccc;
    padding: 0 10px;
  }
}
</style>
