
<script>
export default {
  name: "GTable",
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    tableAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    tableConfig() {
      return Object.assign(this.tableConf, this.tableAttrs);
    },
    columnsConfig() {
      return Object.assign(this.columnsConf, this.columns.attrs);
    },
  },
  data() {
    return {
      // 以下是默认的基础配置
      tableConf: {
        stripe: true,
        border: true,
        emptyText: "暂无数据",
        rowKey: "id",
        // expandRowKeys: [],
        // reserveSelection: true,
        // highlightCurrentRow: true,
        // currentRowKey: "id",
      },
      columnsConf: {
        headerAlign: "center",
      },
    };
  },
  methods: {
    // 渲染普通列
    renderColumns(colArr, scopedSlots) {
      return colArr.map((col) => {
        let attrs = this.columnsConfig;
        if (col.attrs) {
          attrs = Object.assign({}, this.columnsConfig, col.attrs);
        }
        // 给GColumn绑定this.$scopedSlots
        return <GColumn col={col} conf={attrs} scopedSlots={scopedSlots} />;

        return (
          <el-table-column
            prop={col.prop}
            label={col.label}
            attrs={attrs}
          ></el-table-column>
        );
      });
    },
    // 渲染特定列组件
    renderSpicalColumn(type) {
      let attrs = { type, width: "55px" };
      if (type === "selection") attrs["reserve-selection"] = true;
      return <GColumn conf={attrs} />;

      switch (type) {
        case "index":
          return <el-table-column type={type} width="55"></el-table-column>;
        case "selection":
          return (
            <el-table-column
              type={type}
              reserve-selection
              width="55"
            ></el-table-column>
          );
        default:
          return null;
      }
    },
    // 渲染分页
    renderPager() {
      return (
        <el-pagination
          key={Math.random()}
          onSize-change={() => {}}
          onCurrent-change={() => {}}
          current-page={1}
          page-sizes={[100, 200, 300, 400]}
          page-size={100}
          layout="total, sizes, prev, pager, next, jumper"
          total={400}
        ></el-pagination>
      );
    },
  },
  render() {
    // 通过columns渲染列到el-table作为子组件

    const {
      columns: { items },
      tableConfig,
      $scopedSlots,
    } = this;
    const listeners = {
      on: {
        ...this.$listeners,
      },
    };
    // cell-click
    // vue模板中: v-on="this.$listeners"
    console.log("$listeners", this.$listeners);
    console.log("$scopedSlots", $scopedSlots);

    // JSX使用指令
    const directives = [{ name: "drag", value: "" }];

    return (
      <div>
        <el-table
          {...{ directives }}
          {...listeners}
          attrs={tableConfig}
          data={this.data}
        >
          {this.renderSpicalColumn(tableConfig.colType)}
          {this.renderColumns(items, $scopedSlots)}
        </el-table>
        <div style="margin-top: 10px;">{this.renderPager()}</div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
</style>
