<template>
  <div>
    <GTable
      @cell-click="cellClick"
      :data="tableData"
      :tableAttrs="tableAttrs"
      :columns="columns"
    >
    </GTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
      ],
      tableAttrs: {
        // 表格高度
        // height: "100px",
        // // 表格宽度
        // width: "100%",
        // // 表格边框
        // border: true,
        // // 表格列是否可排序
        // sortable: true,
        // // 表格是否可编辑
        // editable: true,
        // // 表格是否可选择
        // selectable: true,
        // // 表格是否可拖拽列宽
        // resizable: true,
        stripe: false,
      },
      columns: {
        // 覆盖原生默认属性
        attrs: {
          headerAlign: "left",
        },
        items: [
          {
            prop: "date",
            label: "日期",
          },
          {
            attrs: {
              headerAlign: "center",
            },
            prop: "name",
            label: "名称",
          },
          {
            prop: "address",
            label: "地址",
          },
        ],
      },
    };
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