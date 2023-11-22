<script>
import { Table } from "element-ui";

export default {
  name: "GTableWrapper",
  extends: Table,
  methods: {
    doLayout() {
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
      this.layout.updateColumnsWidth();
      setTimeout(() => {
        this.$slots.append = this.$scopedSlots?.append?.();
      }, 50);
    },
  },
};
</script>