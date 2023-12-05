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
          {{nameTags}}
          <el-tag
            style="margin-bottom: 20px;margin-right: 5px;"
            v-for="(tag, i) in tags"
            :key="i"
            size="normal"
            closable
            @close="closeTag(tag)"
            @click="goTag(tag)"
          >{{tag.meta.title}}</el-tag>

          <transition mode="out-in" name="fade">
            <keep-alive :include="nameTags">
              <router-view />
            </keep-alive>
          </transition>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Axios from "axios";
import { request } from "@/utils/request";
import { retryResFn } from "@/utils/intercepts/retry";
import { getTokenValue } from "@/utils";
import { resetRoute } from "@/router";
import { logout } from "@/api";

export default {
  computed: {
    tags() {
      return this.$store.getters.getTags;
    },
    nameTags() {
      return this.tags.map(tag => tag.name);
    }
  },
  data() {
    return {
      commandArr: [{ command: "exit", title: "退出", icon: "el-icon-plus" }],
      user: null
    };
  },
  created() {
    this.user = getTokenValue(window.sessionStorage.getItem("token"));

    // 测试多次的刷新token
    // request.get("/user/info", { loading: true });
    // request.get("/user/info", { loading: true });
    // request.get("/user/info", { loading: true });
    // request.get("/slow", { loading: true });

    // let retryReq = Axios.create({
    //   baseURL: "/test",
    //   timeout: 3000,
    // });
    // // 重连拦截器
    // retryReq.interceptors.response.use(
    //   (response) => response,
    //   retryResFn(retryReq)
    // );
    // // 自动重连
    // retryReq.get("/slow");
  },
  methods: {
    async onCommand(event) {
      switch (event) {
        case "exit":
          await logout();

          // 1.最简单的退出方式
          // window.location.reload();
          // window.sessionStorage.clear();

          // 2.通过路由跳转，清除token
          window.sessionStorage.clear();
          resetRoute();
          // 清除vuex的菜单
          this.$store.commit("setMenu", []);
          // 路由重置
          this.$router.replace("/login");
          break;
      }
    },
    closeTag(tag) {
      this.$store.commit("removeTag", tag);
    },
    goTag(tag) {
      console.log(tag);
      this.$router.push(tag);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>