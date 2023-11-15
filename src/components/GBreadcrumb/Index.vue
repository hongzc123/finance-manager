<template>
  <div class="breadcrumb-wrap">
    <el-breadcrumb separator="/" :attrs="$attrs" v-on="$listeners">
      <el-breadcrumb-item
        v-for="(route, index) in matchedPaths"
        :key="index"
        :to="{ path: route.path }"
      >
        <span v-text="route.meta.title"></span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "GBreadcrumb",
  data() {
    return {};
  },
  computed: {
    // matchedPaths() {
    //   return this.$route.matched;
    // }
    matchedPaths() {
      let existTitle = [];
      return this.$route.matched.filter((route) => {
        if (!existTitle.includes(route.meta.title)) {
          existTitle.push(route.meta.title);
          return true;
        } else {
          return false;
        }
      });
    },
  },
  created() {
    // console.log(this.$route.matched);
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-wrap {
  :deep(.el-breadcrumb__separator) {
    color: white !important;
  }
}
</style>