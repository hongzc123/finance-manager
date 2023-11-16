<script>
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
    console.log("column-$scopedSlots", this.$scopedSlots);
    return (
      <el-table-column
        attrs={this.conf}
        prop={this.col?.prop}
        label={this.col?.label}
      >
        {this.renderChildren(this.col, this.conf)}
      </el-table-column>
    );
  },
};
</script>

<style scoped>
</style>
