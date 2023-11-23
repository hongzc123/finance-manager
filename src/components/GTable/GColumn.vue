<script>
import Vue from "vue";

export default {
  name: "GColumn",
  props: {
    col: {
      type: Object,
      default: () => ({}),
    },
    conf: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    renderChildren(col, conf) {
      if (!col) return null;
      return (
        col?.children &&
        col?.children.map((child) => {
          return <GColumn col={child} conf={conf} />;
        })
      );
    },
  },
  render() {
    // console.log(
    //   "column-$scopedSlots",
    //   this.$scopedSlots,
    //   this.$scopedSlots.default && this.$scopedSlots.default()
    // );
    // console.log("$scopedSlots", $scopedSlots);

    const scopedSlots = {};
    const { conf, col, $scopedSlots } = this;
    const slot = $scopedSlots[col?.prop];
    if (slot) {
      // 当前列有插槽
      // default
      scopedSlots.default = function (scoped) {
        // return slot({
        //   ...scoped.row,
        //   ...{ prop: scoped.row[col.prop], text: "test123" }
        // });
        return slot(scoped);
      };
    } else if (col?.html) {
      scopedSlots.default = (scoped) => {
        // return this.$createElement("h3", {}, col.html(scoped));
        return <div domPropsInnerHTML={col.html(scoped)}></div>;
      };
    }

    // 多列将会被执行 col.filter
    let formatter;
    if (col?.filter) {
      // common convertDate
      let filterHandler = Vue.filter(col.filter);
      formatter = (row, column, cellValue, index) => {
        return filterHandler(row[col.prop], col.prop);
      };
    }

    return (
      <el-table-column
        attrs={conf}
        prop={col?.prop}
        label={col?.label}
        width={col?.width}
        scopedSlots={scopedSlots}
        formatter={formatter}
      >
        {this.renderChildren(col, conf)}
      </el-table-column>
    );
  },
};
</script>

<style scoped>
</style>
