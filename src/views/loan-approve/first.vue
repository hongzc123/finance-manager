<template>
  <div>
    <GQuery
      style="margin-bottom: 20px"
      placeholder="请输入查询条件"
      clearable
      @change="changeQuery($event)"
    ></GQuery>

    <GTable
      :data="tableData"
      :columns="columns"
      :tableAttrs="tableAttrs"
      :pager="pager"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
      <template #operation="{ row }">
        <el-button size="mini" type="primary" @click="showView(row.id)"
          >查看</el-button
        >
        <GNotifyBtn
          size="mini"
          type="success"
          msg="是否确定结案?"
          @click="passCase(row.id)"
          >结案</GNotifyBtn
        >
        <GNotifyBtn
          size="mini"
          type="danger"
          msg="是否确定拒绝立案?"
          @click="rejectCase(row.id)"
          >拒绝立案</GNotifyBtn
        >
      </template>
    </GTable>

    <!-- 弹出编辑框 -->
    <el-dialog
      title="救助情况-查看详情"
      width="50%"
      :visible.sync="visible"
      destroy-on-close
    >
      <GFormCreated v-if="viewConf" :key="Math.random()" :conf="viewConf">
        <template #default>
          <div style="display: flex; align-items: center; width: 100%">
            <div style="margin: 0 auto">
              <el-button @click="cancel">取消</el-button>
            </div>
          </div>
        </template>
      </GFormCreated>
    </el-dialog>
  </div>
</template>

<script>
import curdMixin from "@/mixins/curdMixin";
import pagerMixin from "@/mixins/pagerMixin";
import { columns, conf } from "./conf";
import { showDetail, doPass, doReject } from "@/api";
import { getValueFormConf } from "@/utils/convert";

export default {
  mixins: [curdMixin, pagerMixin],
  data() {
    return {
      tableAttrs: {
        stripe: false,
        colType: "index",
      },
      columns,
      visible: false,
      viewConf: null,
    };
  },
  methods: {
    // 1. 覆写getOption 配置read 的url
    getOption() {
      return {
        read: {
          url: "/approve/first/list",
          method: "get",
        },
      };
    },
    async showView(id) {
      this.visible = true;
      const res = await showDetail(id);
      this.viewConf = {
        ...conf,
        items: getValueFormConf(conf.items, res.data.data),
      };
      console.log("viewConf", this.viewConf);
    },
    cancel() {
      this.visible = false;
    },
    async passCase(id) {
      await doPass(id);
      this.load();
    },
    async rejectCase(id) {
      await doReject(id);
      this.load();
    },
  },
};
</script>

<style>
</style>