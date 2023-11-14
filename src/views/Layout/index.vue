<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <GMenu :routeData="$store.getters.getMenu" />
      </el-aside>
      <el-container>
        <el-header>
          <GBreadcrumb />
          <GDropdown :dropdownList="commandArr" :title="user.account" @command="onCommand" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { request } from "@/utils/request";
import Axios from "axios";
import { retryResFn } from "@/utils/retry";
import { getTokenValue } from "@/utils";
import { resetRoute } from "@/router";

export default {
  data() {
    return {
      commandArr: [{ command: "exit", title: "退出", icon: "el-icon-plus" }],
      user: null
    };
  },
  created() {
    this.user = getTokenValue(window.sessionStorage.getItem("token"));

    // 测试多次的刷新token
    request.get("/user/info");
    // request.get("/user/info");
    // request.get("/user/info");

    // let retryReq = Axios.create({
    //   baseURL: "/test",
    //   timeout: 3000
    // });
    // // 重连拦截器
    // retryReq.interceptors.response.use(
    //   response => response,
    //   retryResFn(retryReq)
    // );
    // // 自动重连
    // retryReq.get("/slow");
  },
  methods: {
    onCommand(event) {
      switch (event) {
        case "exit":
          // 1.最简单的退出方式
          window.location.reload();
          window.sessionStorage.clear();

          // 2.通过路由跳转，清除token
          // window.sessionStorage.clear()
          // resetRoute()
          // // 清除vuex的菜单
          // this.$store.commit('setMenu', [])
          // // 路由重置
          // this.$router.replace('/login')
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  line-height: 60px;
  color: #333;
  text-align: center;
}
.el-aside .el-main {
  color: #333;
  text-align: center;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-aside {
  background-color: #ffffff;
}

.el-main {
  background-color: #e9eef3;
}
</style>