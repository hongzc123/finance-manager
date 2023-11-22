<template>
  <div>
    <GQuery>
      <template #default="{query}">
        <el-button type="primary" size="default" @click="changeQuery(query)">查询</el-button>
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
import { getPersonList } from "@/api";
import pagerMixin from "./pagerMixin";

export default {
  mixins: [pagerMixin],
  data() {
    return {
      tableAttrs: {
        stripe: false,
        colType: "selection"
      }
    };
  },
  computed: {
    showList() {
      return this.tableData;
    }
  },
  methods: {
    handleChange(q) {
      console.log("handleChange", q);
      this.pager.name = q;
      this.pager.pageNo = 1;
      this.load();
    },
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
    async load() {
      this.loading = true;
      const res = await getPersonList(this.pager);
      // console.log("getPersonList:", res);
      this.loading = false;
      this.tableData = res.data.list;
      this.pager.rows = res.data.pager.rows;
    }
  },
  created() {
    this.load();
  }
};
</script>

<style lang="scss" scoped>
</style>