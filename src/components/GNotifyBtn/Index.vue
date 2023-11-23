<template>
  <el-button v-bind="$attrs" @click="doCheck">
    <slot></slot>
  </el-button>
</template>

<script>
import { confirmFn } from "@/plugin";

export default {
  name: "GNotifyBtn",
  data() {
    return {};
  },
  methods: {
    async doCheck() {
      console.log(this.$attrs);
      console.log(this.$listeners);
      let res = await confirmFn.call(this, { msg: this.$attrs.msg });
      console.log(res);
      if (!res) return;
      let { click } = this.$listeners;
      click();
    },
  },
};
</script>

<style scoped>
</style>
