<template>
  <div>
    <!-- <GFormCreated :conf="formConfig" @submit="onSubmit" />
    <hr />-->
    <GFormCreated ref="form" :conf="config">
      <template #default="scoped">
        <div style="margin: 10px">
          <el-button type="primary" @click="onSubmit2(scoped)"
            >自定义插槽按钮提交</el-button
          >
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
import { createUser } from "@/api";
import { SUCCESS } from "@/conf/req_fields";
import { CONFIRM } from "@/conf";

let mockData = {
  name: "",
  birthday: "2023-11-13",
  sex: "0",
  identity_card: "123",
  marriage: "已婚",
  education: "本科",
  address1: "武汉",
  address2: "武汉",
  phone: "15800000000",
  mobile_phone: "15800000000",
  company: "金渡教育",
  trade: "IT",
  position: "教育合伙人",
  address3: "光古",
  company_type: "教育",
  company_email: "jindu@qq.com",
  company_phone: "123",
  income: "$10000",
  contact: "4",
  contact_name: "5",
  contact_phone: "6",
  contact2: "7",
  contact2_name: "8",
  contact2_phone: "9",
  contact2_dep: "10",
  contact2_pos: "11",
  remark: "12",
};

export default {
  data() {
    let myConfig = deepClone(formConfig2);
    return {
      // config: formConfig,
      // config: formConfig2,
      config: myConfig,
      prefix: "￥",
    };
  },
  created() {
    // 附加验证器参数
    let fn = formConfig2.rules.income[1].validator(this.prefix);
    this.config.rules.income[1].validator = fn;
  },
  methods: {
    onSubmit(data) {
      console.log("事件获取数据...", data);
    },
    async onSubmit2(event) {
      console.log("通过插槽获取表单数据... event", event);
      // console.log(
      //   "通过$refs获取表单数据... getFormData",
      //   this.$refs.form.getFormData()
      // );

      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     console.log("验证通过...", valid);
      //   } else {
      //     console.log(111);
      //   }
      // });

      if (await this[CONFIRM]({ msg: "是否确定添加" })) {
        console.log("确定添加");
        const { data } = await createUser(mockData);
        console.log(data);
        if (data.code === SUCCESS) {
          // 提示是否去列表查看
          console.log("跳转列表...");
          // todo:现实列表页面
          // this.$router.push("/列表");
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>