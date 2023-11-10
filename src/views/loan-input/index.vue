<template>
  <div>
    <GFormCreated :data="formConfig" @submit="onSubmit" />
    <hr />
    <GFormCreated :data="formConfig">
      <template #default="scoped">
        <div>
          {{scoped.data}}
          <el-button type="primary" @click="onSubmit2(scoped)">自定义插槽按钮提交</el-button>
          <el-button>自定义插槽按钮重置</el-button>
        </div>
      </template>
    </GFormCreated>
  </div>
</template>

<script>
import formConfig from "./formConfig";

export default {
  data() {
    return {
      formConfig
    };
  },
  methods: {
    onSubmit(data) {
      console.log("事件获取数据...", data);
    },
    onSubmit2(event) {
      console.log("通过外部获取数据...", event);
    }
  },
  created() {}
};
</script>

<style>
</style>