<template>
  <div>
    <GTable
      @cell-click="cellClick"
      :data="showList"
      :tableAttrs="tableAttrs"
      :columns="columns"
    >
    </GTable>

    <div style="margin-top: 10px">
      <el-button @click="testReq2">测试分页 up</el-button>
      <el-button @click="testReq1">测试分页 next</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let tableData = new Array(100).fill(null).map((el, i) => {
      return {
        id: i,
        date: "2016-05-" + i,
        name: "王小虎",
        province: "上海",
        city: "普陀区",
        address: "上海市普陀区金沙江路 1518 弄",
        zip: 200333,
      };

      //   return {
      //     id: i,
      //     date: "2016-05-" + i,
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   };
    });
    return {
      start: 0,
      end: 10,
      pager: {},
      tableData,
      tableAttrs: {
        // 表格高度
        // height: "100px",
        // // 表格宽度
        width: "100%",
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
        colType: "selection",
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
            slot: "date",
          },
          {
            attrs: {
              headerAlign: "center",
            },
            prop: "name",
            label: "名称",
          },
          {
            label: "地址",
            children: [
              {
                prop: "name",
                label: "名称",
              },
              {
                label: "地址信息",
                children: [
                  {
                    prop: "province",
                    label: "省份",
                  },
                  {
                    prop: "address",
                    label: "地址",
                  },
                ],
              },
            ],
          },
        ],
      },
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
    testReq1() {
      setTimeout(() => {
        this.start = 20;
        this.end = 30;
      }, 1000);
    },
    testReq2() {
      setTimeout(() => {
        this.start = 0;
        this.end = 10;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>