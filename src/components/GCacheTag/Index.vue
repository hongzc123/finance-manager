<template>
  <div>
    <el-tag
      style="margin-bottom: 20px;margin-right: 5px;"
      v-for="(tag, i) in tags"
      :key="i"
      size="normal"
      closable
      @close="removeTag(tag)"
      @click="goTag(tag)"
    >{{tag.meta.title}}</el-tag>
  </div>
</template>

<script>
export default {
  name: "GCacheTag",
  props: ["value"],
  data() {
    return {
      tags: []
    };
  },
  watch: {
    $route: {
      handler(newRoute) {
        this.addTag(newRoute);
      }
    }
  },
  created() {
    // 初始获取路由
    this.addTag(this.$route);
  },
  methods: {
    syncPropByName() {
      // 同步父组件的值
      this.$emit(
        "input",
        this.tags.map(tag => {
          return tag.name;
        })
      );
    },
    goTag(tag) {
      this.$router.push(tag);
    },
    addTag(tag) {
      console.log(tag);
      if (this.tags.some(t => t.path === tag.path)) return;
      this.tags.push(tag);
      this.syncPropByName();
    },
    removeTag(tag) {
      let index = this.tags.findIndex(t => t.path === tag.path);
      this.tags.splice(index, 1);
      this.syncPropByName();
      // 如果只剩一个的时候，就显示dashboard
      if (this.tags.length === 0) return this.$router.push("/dashboard");
      // 关闭的是当前页签 tag.path === current.path
      // 左右移动
      // 优先左边
      if (this.$router.currentRoute.path !== tag.path) return;
      // 关闭的是自己
      let nextTag = this.tags[index - 1] || this.tags[index];
      this.$router.push(nextTag);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>