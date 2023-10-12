<script setup lang="ts">
import loginPanel from "./c-cpns/login-panel.vue";
</script>

<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: url("../../assets/image/login-bg.svg");
}
</style>
