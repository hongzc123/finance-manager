<template>
  <div>
    <GQuery
      style="margin-bottom: 20px"
      placeholder="请输入查询条件"
      clearable
      @change="changeQuery"
    />

    <GTable
      :data="tableData"
      :columns="columns"
      :pager="pager"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
      <template #status="{ row }">
        <el-tag :type="row.status | statusColor" size="normal">{{
          row.status | status
        }}</el-tag>
      </template>
      <template #operation="{ row }">
        <GNotifyBtn
          type="primary"
          msg="是否确认生成备案文件？"
          :disabled="row.status !== 5"
          @click="doCreate(row.id)"
          >生成备案文件</GNotifyBtn
        >
        <GNotifyBtn
          type="success"
          msg="是否下载生成备案文件？"
          :disabled="row.status !== 7"
          @click="doDownload(row.id)"
          >下载备案文件</GNotifyBtn
        >
      </template>
    </GTable>
  </div>
</template>

<script>
import curdMixin from "@/mixins/curdMixin";
import pagerMinxin from "@/mixins/pagerMixin";
import { columns } from "./conf";
import { downloadFile, downloadFileByUrl } from "@/api";
import { downloadByUrl, downloadByTag } from "@/utils";
import { BASEURL } from "@/conf";

export default {
  mixins: [curdMixin, pagerMinxin],
  data() {
    return {
      columns,
    };
  },
  methods: {
    getOption() {
      return {
        read: {
          url: "/contract/list",
          method: "get",
        },
        create: {
          url: "/contract/createFile",
          method: "post",
        },
      };
    },
    doCreate(id) {
      const res = this.create(id);
      console.log(res);
    },
    async doDownload(id) {
      const { data } = await downloadFile(id);
      console.log(data.data.url, BASEURL + data.data.url);
      downloadByUrl(BASEURL + data.data.url);
    },
    async doDownload2(id) {
      const { data } = await downloadFile(id);
      console.log(data.data.url, BASEURL + data.data.url);
      const res = await downloadFileByUrl(data.data.url.replace("/api", ""));
      console.log(res);
      downloadByTag(res.data, "备案文件" + id + ".docx");
    },
  },
};
</script>

<style>
</style>