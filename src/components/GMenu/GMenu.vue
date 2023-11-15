<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      :attrs="$attrs"
      v-on="$listeners"
      router
    >
      <GMenuItem v-for="(item, i) in routeData" :key="i" :routeItem="item" />
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "GMenu",
  props: {
    routeData: {
      type: Array,
      default: [],
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    // console.log("$attrs", this.$attrs);
    // console.log("$listeners", this.$listeners);
  },
};
</script>

<style>
</style>