<template>
  <div>
    <GQuery style="margin-bottom: 20px" @change="changeQuery($event)">
      <template #default="{ query }">
        <el-button
          style="margin-left: 20px"
          type="primary"
          size="default"
          @click="changeQuery(query)"
          >查询</el-button
        >
      </template>
    </GQuery>

    <GTable
      ref="table"
      @cell-click="cellClick"
      :data="showList"
      :tableAttrs="tableAttrs"
      :columns="columns"
      :pager="pager"
      @size-change="sizeChange"
      @current-change="currentChange"
      @selection-change="selectionChange"
    >
      <template #operation="{ row }">
        <el-button size="mini" type="primary" @click="showEdit(row)"
          >编辑</el-button
        >
        <el-button size="mini" type="danger" @click="doDelete(row)"
          >删除</el-button
        >
        <el-button size="mini" type="success" @click="doSubmit(row)"
          >提交审核</el-button
        >
      </template>

      <!-- <template #birthday="{ row }">
        {{ row.birthday | convertDate }}
      </template> -->

      <!-- <template #status="scoped">
        <el-tag :type="scoped.row.status | statusColor">{{
          scoped.row.status | status
        }}</el-tag>
      </template> -->

      <template #status="scoped">
        <el-tag :type="scoped.row.status | common('statusColor')">{{
          scoped.row.status | common("status")
        }}</el-tag>
      </template>

      <!-- append插槽 -->
      <template #append>
        <h2
          style="display: flex; justify-content: space-between; padding: 10px"
        >
          <span>行尾</span>
          <span>合计: 123</span>
        </h2>
      </template>
    </GTable>

    <!-- 弹出编辑框 -->
    <el-dialog
      title="案件申请-编辑"
      width="30%"
      :visible.sync="visible"
      destroy-on-close
    >
      <!-- 
        切换visible的时候，会触发dom的diff，会对比原来的GFormCreator和新的GFormCreator
        如果没有给变化的key，就会就地复用元素
      -->
      <GFormCreated :key="Math.random()" :conf="editConf">
        <template #default="form">
          <div style="display: flex; align-items: center; width: 100%">
            <!-- <el-button type="primary" @click="onSave(form)">保存</el-button> -->

            <!-- 弹窗提示 2 -->
            <GNotifyBtn type="primary" @click="onSave(form)">保存</GNotifyBtn>
          </div>
        </template>
      </GFormCreated>
    </el-dialog>
  </div>
</template>

<script>
import { columns } from "./conf";
import { getPersonList } from "@/api";
import pagerMixin from "@/mixins/pagerMixin";
import curdMixin from "@/mixins/curdMixin";
import { deepClone } from "@/utils";
import { sexOptions } from "@/conf/UI_fields";
import { CONFIRM } from "@/conf";

export default {
  mixins: [pagerMixin, curdMixin],
  data() {
    return {
      tableAttrs: {
        stripe: false,
        colType: "selection",
      },
      columns,
      editConf: null,
      visible: false,
    };
  },
  computed: {
    showList() {
      return this.tableData;
    },
  },
  methods: {
    // 复写crud方法
    getOption() {
      return {
        read: {
          url: "/loan/list",
          method: "get",
        },
        del: {
          url: "/loan/list/",
          addStr: "id",
          method: "delete",
        },
        update: {
          url: "/loan/update",
          method: "put",
          loading: true,
        },
      };
    },
    handleChange(q) {
      console.log("handleChange", q);
      this.pager.name = q;
      this.pager.pageNo = 1;
      this.load();
    },
    cellClick(e) {
      console.log("cellClick", e);
    },
    showEdit(row) {
      // const selection = this.$refs.table.getSelection();
      // console.log(selection);
      console.log(row);

      this.visible = true;
      this.rowData = deepClone(row);
      this.editConf = {
        items: [
          [
            {
              label: "姓名",
              key: "name",
              value: row.name,
              type: "text",
            },
            {
              label: "性别",
              key: "sex",
              value: row.sex,
              type: "select",
              options: sexOptions,
            },
          ],
        ],
      };
    },
    async onSave(data) {
      // 弹窗提示 1
      // const result = await this[CONFIRM]({ msg: "是否确定保存" });
      // console.log(result);
      // if (!result) return;

      this.visible = false;
      Object.assign(this.rowData, data);
      console.log("data", data);
      console.log("rowData", this.rowData);
      const res = await this.update(this.rowData);
      console.log("update res", res);
    },
    doDelete(v) {
      console.log(v);
    },
    doSubmit(v) {
      console.log(v);
    },
    selectionChange(e) {
      console.log("selectionChange", e);
    },
  },
  created() {
    this.load();
  },
};
</script>

<style lang="scss" scoped>
</style>