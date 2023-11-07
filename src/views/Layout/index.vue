<template>
  <div>
    Layout
    <hr />
    <router-view />
  </div>
</template>

<script>
import { request } from "@/utils/request";
import Axios from "axios";
import { retryResFn } from "@/utils/retry";

export default {
  data() {
    return {};
  },
  created() {
    // 测试多次的刷新token
    request.get("/user/info");
    request.get("/user/info");
    request.get("/user/info");

    let retryReq = Axios.create({
      baseURL: "/test",
      timeout: 3000
    });
    // 重连拦截器
    retryReq.interceptors.response.use(
      response => response,
      retryResFn(retryReq)
    );
    // 自动重连
    retryReq.get("/slow");
  }
};
</script>

<style lang="scss" scoped>
</style>