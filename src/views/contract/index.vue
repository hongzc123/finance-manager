<template>
  <div>
    <GQuery style="margin-bottom: 20px;" placeholder="请输入查询条件" clearable @change="changeQuery" />

    <GTable :data="tableData" :columns="columns" :pager="pager">
      <template #status="{row}">
        <el-tag :type="row.status | statusColor" size="normal">{{ row.status | status }}</el-tag>
      </template>
      <template #operation="{row}">
        <GNotifyBtn type="primary" msg="是否确认生成备案文件？" :disabled="row.status !== 5">生成备案文件</GNotifyBtn>
        <GNotifyBtn type="success" msg="是否下载生成备案文件？" :disabled="row.status !== 7">下载备案文件</GNotifyBtn>
      </template>
    </GTable>
  </div>
</template>

<script>
import curdMixin from "@/mixins/curdMixin";
import pagerMinxin from "@/mixins/pagerMixin";
import { columns } from "./conf";

export default {
  mixins: [curdMixin, pagerMinxin],
  data() {
    return {
      columns
    };
  },
  methods: {
    getOption() {
      return {
        read: {
          url: "/contract/list",
          method: "get"
        },
        create: {
          url: "/contract/createFile",
          method: "post"
        }
      };
    }
  }
};
</script>

<style>
</style>