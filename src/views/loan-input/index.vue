<template>
  <div>
    <!-- <GFormCreated :conf="formConfig" @submit="onSubmit" />
    <hr />-->
    <GFormCreated ref="form" :conf="config">
      <template #default="scoped">
        <div style="margin: 10px;">
          <el-button type="primary" @click="onSubmit2(scoped)">自定义插槽按钮提交</el-button>
          <el-button @click="reset">自定义插槽按钮重置</el-button>
        </div>
      </template>
    </GFormCreated>
  </div>
</template>

<script>
import formConfig from "./formConfig";
import formConfig2 from "./formConfig2";
import { deepClone } from "@/utils";

export default {
  data() {
    let myConfig = deepClone(formConfig2);
    return {
      // config: formConfig,
      // config: formConfig2,
      config: myConfig,
      prefix: "￥"
    };
  },
  created() {
    let fn = formConfig2.rules.income[1].validator(this.prefix);
    console.log(fn);
    this.config.rules.income[1].validator = fn;
  },
  methods: {
    onSubmit(data) {
      console.log("事件获取数据...", data);
    },
    onSubmit2(event) {
      console.log("通过外部的插槽获取数据... event", event);
      console.log(
        "通过外部的插槽获取数据... getFormData",
        this.$refs.form.getFormData()
      );
      this.$refs.form.onSubmit();
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
</style>