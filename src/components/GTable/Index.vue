
<script>
import { deepClone } from "@/utils";
import GTableWrapper from "./GTableWrapper.vue";

export default {
  name: "GTable",
  components: {
    "el-table": GTableWrapper
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Object,
      required: true,
      default: () => ({})
    },
    tableAttrs: {
      type: Object,
      default: () => ({})
    },
    pager: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    tableConfig() {
      return Object.assign(this.tableConf, this.tableAttrs);
    },
    columnsConfig() {
      return Object.assign(this.columnsConf, this.columns.attrs);
    }
  },
  data() {
    return {
      // 以下是默认的基础配置
      tableConf: {
        stripe: true,
        border: true,
        emptyText: "暂无数据",
        rowKey: "id"
        // expandRowKeys: [],
        // reserveSelection: true,
        // highlightCurrentRow: true,
        // currentRowKey: "id",
      },
      columnsConf: {
        headerAlign: "center",
        align: "center"
      }
    };
  },
  methods: {
    // 渲染普通列
    renderColumns(colArr, childrenScopedSlots) {
      return colArr.map(col => {
        let attrs = this.columnsConfig;
        if (col.attrs) {
          attrs = Object.assign({}, this.columnsConfig, col.attrs);
        }
        // 给GColumn绑定this.$scopedSlots
        return (
          <GColumn col={col} conf={attrs} scopedSlots={childrenScopedSlots} />
        );

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
    renderPager(pager) {
      return (
        <el-pagination
          key={Math.random()}
          onSize-change={v => this.$emit("size-change", v)}
          onCurrent-change={v => this.$emit("current-change", v)}
          current-page={pager.pageNo}
          page-sizes={pager.pageSizes}
          page-size={pager.pageSize}
          layout="total, sizes, prev, pager, next, jumper"
          total={pager.rows}
        ></el-pagination>
      );
    },
    getSelection() {
      return deepClone(this.selection);
    }
  },
  render() {
    // 通过columns渲染列到el-table作为子组件
    const {
      data,
      columns: { items },
      tableConfig,
      $slots,
      $scopedSlots,
      $parent: { loading },
      pager
    } = this;

    // console.log("$slots", $slots);
    // console.log("$scopedSlots", $scopedSlots);

    // cell-click
    // vue模板中: v-on="this.$listeners"
    // console.log("$listeners", this.$listeners);
    const listeners = {
      // on: {
      //   ...this.$listeners,
      // },
      on: {
        "selection-change": e => {
          // this.$emit("selection-change", e);
          this.selection = e;
        }
      }
    };

    // JSX使用指令
    const directives = [
      { name: "drag", value: ".el-table__body-wrapper" },
      { name: "loading", value: loading }
    ];

    const childrenScopedSlots = deepClone($scopedSlots);

    return (
      <div>
        <el-table
          {...{ directives }}
          {...listeners}
          attrs={tableConfig}
          data={data}
          scopedSlots={$scopedSlots}
        >
          {this.renderSpicalColumn(tableConfig.colType)}
          {this.renderColumns(items, childrenScopedSlots)}
        </el-table>
        <div style="margin-top: 10px;">{this.renderPager(pager)}</div>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
</style>
