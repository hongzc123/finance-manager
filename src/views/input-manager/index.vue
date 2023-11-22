<template>
  <div>
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
      <template #operation="row">
        <el-button size="mini" @click="showEdit(row)">Edit</el-button>
      </template>

      <!-- append插槽 -->
      <template #append>
        <h2 style="display: flex; justify-content: space-between">
          <span>行尾</span>
          <span>合计: 123</span>
        </h2>
      </template>
    </GTable>
  </div>
</template>

<script>
import { columns, pager } from "./conf";
import { getPersonList } from "@/api";

export default {
  data() {
    return {
      pager: {
        ...pager, // pageNo:1 pageSize:10
      },
      columns,
      tableData: [],
      tableAttrs: {
        stripe: false,
        colType: "selection",
      },
    };
  },
  computed: {
    showList() {
      return this.tableData;
    },
  },
  methods: {
    cellClick(e) {
      console.log("cellClick", e);
    },
    showEdit() {
      const selection = this.$refs.table.getSelection();
      console.log(selection);
    },
    selectionChange(e) {
      console.log("selectionChange", e);
    },
    sizeChange(v) {
      // console.log("sizeChange", v);
      this.pager.pageSize = v;
      this.pager.pageNo = 1;
      this.load();
    },
    currentChange(v) {
      // console.log("currentChange", v);
      this.pager.pageNo = v;
      this.load();
    },
    async load() {
      this.loading = true;
      const res = await getPersonList(this.pager);
      // console.log("getPersonList:", res);
      this.loading = false;
      this.tableData = res.data.list;
      this.pager.rows = res.data.pager.rows;
    },
  },
  created() {
    this.load();
  },
};
</script>

<style lang="scss" scoped>
</style>