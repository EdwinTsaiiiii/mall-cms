<script setup lang="ts">
defineProps({
  links: {
    type: Array<any>,
    default: () => []
  }
});
</script>

<template>
  <div class="text-links">
    <template v-for="(item, index) in links" :key="index">
      <div class="item">
        <span class="title">{{ item.title }} :</span>
        <el-link>{{ item.desp }}</el-link>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.text-links {
  padding: 0 15px;
  text-align: left;
  .title {
    position: relative;
    display: inline-block;
    margin-right: 20px;
  }

  .item {
    margin: 5px;
  }
  .title::before {
    position: absolute;
    top: 40%;
    left: -15px;
    width: 5px;
    height: 5px;
    background: black;
    border-radius: 100%;
    content: "";
  }
}
</style>
