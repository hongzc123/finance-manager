<template>
  <div>
    <GQuery style="margin-bottom: 20px" placeholder="请输入查询条件" clearable @change="changeQuery" />

    <GTable
      :data="showList"
      :columns="columns"
      :pager="pager"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></GTable>
  </div>
</template>

<script>
import curdMixin from "@/mixins/curdMixin";
import pagerMinxin from "@/mixins/pagerMixin";
import { columns } from "./conf";

export default {
  mixins: [curdMixin, pagerMinxin],
  data() {
    const viewCount = 10;
    return {
      columns,
      start: 0,
      end: viewCount,
      viewCount,
      query: ""
    };
  },
  computed: {
    showList() {
      this.end = this.start + this.viewCount;
      if (this.query.trim() !== "") {
        // 查询
        const collection = this.tableData.filter(item => {
          return item.account.includes(this.query);
        });
        this.pager.rows = collection.length;
        return collection.slice(this.start, this.end);
      }
      // console.log(this.start, this.end, this.pager.rows);
      return this.tableData.slice(this.start, this.end);
    }
  },
  methods: {
    getOption() {
      return {
        read: {
          url: "/user/list?type=new",
          method: "get"
        }
      };
    },
    sizeChange(v) {
      this.viewCount = v;
      this.start = 0;
      this.pager.pageSize = v;
    },
    currentChange(current) {
      // 当前页
      this.start = (current - 1) * this.viewCount;
      this.pager.pageNo = current;
    },
    changeQuery(val) {
      // console.log(val);
      this.query = val;
      this.start = 0;
      this.pager.rows = this.tableData.length;
    }
  }
};
</script>

<style>
</style>