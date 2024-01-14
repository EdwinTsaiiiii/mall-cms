<script setup lang="ts">
import loading from "@/components/loading";
</script>

<template>
  <div class="app">
    <!--    <loading></loading>-->
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  //width: 100vw;
}
</style>
