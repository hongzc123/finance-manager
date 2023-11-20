<template>
  <div>
    <!-- 有children的sub，nonRenderChild特殊属性处理重复的首页 -->
    <el-submenu
      :index="routeItem.path"
      v-if="routeItem.children && !routeItem.nonRenderChild"
    >
      <template #title>
        <i v-if="routeItem.meta.icon" :class="routeItem.meta.icon"></i>
        <span v-text="routeItem.meta.title"></span>
      </template>
      <template #default>
        <!-- 递归组件 -->
        <GMenuItem
          v-for="(item, i) in routeItem.children"
          :key="i"
          :routeItem="item"
        />
      </template>
    </el-submenu>

    <el-menu-item :index="routeItem.path" v-else>
      <i v-if="routeItem.meta.icon" :class="routeItem.meta.icon"></i>
      <span v-text="routeItem.meta.title"></span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "GMenuItem",
  props: {
    routeItem: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>