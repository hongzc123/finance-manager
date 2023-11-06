<template>
  <div>
    Layout
    <hr />
    <router-view />
  </div>
</template>

<script>
import { request } from "@/utils/request";
export default {
  data() {
    return {};
  },
  created() {
    // 测试多次的刷新token
    request.get("/user/info");
    request.get("/user/info");
  }
};
</script>

<style lang="scss" scoped>
</style>