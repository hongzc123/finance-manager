<template>
  <div>
    <el-dropdown @command="$emit('command', $event)">
      <span class="el-dropdown-link">
        {{title}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item,i) in dropdownList"
          :key="i"
          :command="item.command"
          :icon="item.icon"
        >{{item.title}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "GDropdown",
  props: {
    dropdownList: Array,
    title: String
  }
};
</script>

<style>
</style>