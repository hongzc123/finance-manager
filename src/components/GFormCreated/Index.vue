
<script>
const TEXT = "text",
  TIMEPICKER = "timepicker",
  TEXTAREA = "textarea",
  PASSWORD = "password";

export default {
  name: "GFormCreated",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    renderTitle(t) {
      return (
        t && (
          <div>
            <h2>{t}</h2>
            <hr />
          </div>
        )
      );
    },
    renderItem(item) {
      switch (item.type) {
        case TEXT:
          return <el-input attrs={item.attrs}></el-input>;
        case TIMEPICKER:
          return <el-time-picker attrs={item.attrs}></el-time-picker>;
        default:
          return <div>未知</div>;
      }
    },
    renderColumns(colArr) {
      return colArr.map(col => {
        return (
          <el-col span={col.colspan}>
            <el-form-item label={col.label} size="normal">
              {this.renderItem(col)}
            </el-form-item>
          </el-col>
        );
      });
    },
    renderRows(items) {
      return items.map(rowArr => {
        return <el-row>{this.renderColumns(rowArr)}</el-row>;
      });
    }
  },
  render() {
    const {
      $scopedSlots: { default: btns }
    } = this; // $slot.default
    const { title, items } = this.data;
    return (
      <div>
        {this.renderTitle(title)}
        <el-form ref="form" label-width="80px">
          {this.renderRows(items)}

          {btns ? (
            btns({ data: "1234" }) // <slot :data="1234"></slot>
          ) : (
            <div>
              <el-button type="primary">提交</el-button>
              <el-button>重置</el-button>
            </div>
          )}
        </el-form>
      </div>
    );
  },
  created() {
    console.log(this.data);
  }
};
</script>

<style>
</style>