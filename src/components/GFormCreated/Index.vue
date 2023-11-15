
<script>
import { deepClone } from "@/utils";

const TEXT = "text",
  DATE = "date",
  TEXTAREA = "textarea",
  PASSWORD = "password",
  SELECT = "select";

export default {
  name: "GFormCreated",
  props: {
    conf: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {}, // V2响应式: 动态添加的属性要$set
    };
  },
  created() {
    const { items, cards, rules } = this.conf;
    if (cards) {
      cards.forEach((e) => {
        this.bindProps(e.items);
      });
    } else {
      this.bindProps(items);
    }

    // 绑定validator的this指向
    for (let key in rules) {
      const valids = rules[key];
      // console.log(key, valids);
      valids.forEach((valid) => {
        if (valid.validator) {
          // console.log(valid.validator);
          // 一个函数的this只能bind一次
          valid.validator = valid.validator.bind(this);
        }
      });
    }
  },
  methods: {
    bindProps(items) {
      items.forEach((rowArr) => {
        rowArr.forEach((col) => {
          if (this.form[col.key]) throw new Error("当前key已经存在" + col.key);
          this.$set(this.form, col.key, col.value);
        });
      });
    },
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
        case PASSWORD:
        case TEXTAREA:
          return (
            <el-input
              type={item.type}
              value={this.form[item.key]}
              onInput={(val) => (this.form[item.key] = val)}
              attrs={item.attrs}
            ></el-input>
          );
        case DATE:
          return (
            <el-time-picker
              v-model={this.form[item.key]}
              attrs={item.attrs}
            ></el-time-picker>
          );
        case SELECT:
          return (
            <el-select
              v-model={this.form[item.key]}
              attrs={item.attrs}
              clearable
            >
              {item.options.map((option) => {
                return (
                  <el-option
                    label={option.text}
                    value={option.value}
                  ></el-option>
                );
              })}
            </el-select>
          );

        default:
          return <div>未知</div>;
      }
    },
    renderColumns(colArr) {
      return colArr.map((col) => {
        return (
          <el-col span={col.colspan}>
            <el-form-item label={col.label} size="normal" prop={col.key}>
              {this.renderItem(col)}
            </el-form-item>
          </el-col>
        );
      });
    },
    renderRows(items) {
      return items.map((rowArr) => {
        return <el-row>{this.renderColumns(rowArr)}</el-row>;
      });
    },
    rednerCardsRows(cards) {
      return cards.map(({ title, items }) => {
        return <el-card header={title}>{this.renderRows(items)}</el-card>;
      });
    },
    getFormData() {
      return deepClone(this.form);
    },
    onSubmit() {
      this.validate(() => {
        this.$emit("submit", deepClone(this.form));
      });
    },
    reset() {
      this.$refs.formData.resetFields();
    },
    validate(fn) {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          return fn(valid);
        } else {
          return false;
        }
      });
    },
  },
  render() {
    const {
      $scopedSlots: { default: btns },
    } = this; // $slot.default
    const { title, items, cards, rules } = this.conf;
    // ??空值合并，排除了'' 0 转换布尔值的过程 只针对null + undefined
    let attrs = {
      ...this.$attrs,
      model: this.form,
      "label-width": this.conf["label-width"] ?? "80px",
    };
    return (
      <div>
        {this.renderTitle(title)}
        <el-form ref="formData" rules={rules} attrs={attrs}>
          {cards ? this.rednerCardsRows(cards) : this.renderRows(items)}
        </el-form>

        {btns ? (
          btns(deepClone(this.form)) // <slot :data="1234"></slot>
        ) : (
          <div>
            <el-button type="primary" onClick={(e) => this.onSubmit()}>
              提交
            </el-button>
            <el-button onClick={(e) => this.reset()}>重置</el-button>
          </div>
        )}
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 10px;
}
</style>