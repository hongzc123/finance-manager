
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
    renderColumns(colArr) {
      return colArr.map((col) => {
        let attrs = this.columnsConfig;
        if (col.attrs) {
          attrs = Object.assign({}, this.columnsConfig, col.attrs);
        }
        return (
          <el-table-column
            prop={col.prop}
            label={col.label}
            attrs={attrs}
          ></el-table-column>
        );
      });
    },
  },
  render() {
    const {
      columns: { items },
    } = this;
    const listeners = {
      on: {
        ...this.$listeners,
      },
    };
    console.log("$listeners", this.$listeners);
    // 通过columns渲染列到el-table作为子组件
    return (
      <div>
        <el-table
          {...listeners}
          attrs={this.tableConfig}
          data={this.data}
          style="width: 100%"
        >
          {this.renderColumns(items)}
        </el-table>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
</style>
