<template>
  <div>
    <GTable
      @cell-click="cellClick"
      :data="showList"
      :tableAttrs="tableAttrs"
      :columns="columns"
    >
      <template #default="row">
        <el-button size="mini">Edit {{ row.date }} {{ row.text }}</el-button>
      </template>
    </GTable>
  </div>
</template>

<script>
import { columns } from "./conf";
import { getPersonList } from "@/api";

export default {
  async created() {
    let pager = {
      pageNo: 1,
      pageSize: 10,
      // name:''  // 查询关键字
    };
    let res = await getPersonList(pager);
    this.tableData = res.data.list;
    console.log(res, "res");
  },
  data() {
    return {
      start: 0,
      end: 10,
      pager: {},
      tableData: [],
      tableAttrs: {
        stripe: false,
        colType: "selection",
      },
      columns,
    };
  },
  computed: {
    showList() {
      return this.tableData.slice(this.start, this.end);
    },
  },
  methods: {
    cellClick(e) {
      console.log("cellClick", e);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>