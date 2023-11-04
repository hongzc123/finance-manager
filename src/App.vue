<template>
  <div id="app">
    <!-- <el-button type="primary" size="default" @click="testProxy">测试代理</el-button>
    <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </nav>-->

    <router-view />
  </div>
</template>

<script>
import Axios from "axios";
export default {
  methods: {
    testProxy() {
      Axios.post("/jindu/user/login", {
        account: "admin",
        password: "approve123456."
      }).then(res => {
        console.log("res:", res);
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
