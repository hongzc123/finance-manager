<template>
  <el-row>
    <el-col :span="hasBtn ? 18 : 24">
      <el-input
        type="text"
        v-model="query"
        v-bind="$attrs"
        @input="onChange"
      ></el-input>
    </el-col>

    <el-col v-if="hasBtn" :span="6">
      <slot name="default" :query="query"></slot>
    </el-col>
  </el-row>
</template>

<script>
import { debounce } from "@/utils";

export default {
  name: "GQuery",
  computed: {
    hasBtn() {
      return this.$scopedSlots.default;
    },
  },
  data() {
    return {
      query: "",
    };
  },
  methods: {
    // onChange() {
    //   this.$emit("change", this.query);
    // },
    onChange: debounce(function () {
      this.$emit("change", this.query);
    }, 500),
  },
};
</script>

<style>
</style>