<template>
  <div ref="chart" :style="styles" :id="id"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "GChart",
  props: ["width", "height", "id", "option"],
  data() {
    return {
      styles: {},
    };
  },
  watch: {
    option: {
      // 如果希望option其中的属性变化也能自动刷新，可以加上这个deep: true
      handler(newVal) {
        this.initChart();
      },
    },
  },
  methods: {
    initChart() {
      // 没有在template中使用并要求响应式，可以不写在data中提升性能
      this.myChart = echarts.init(this.el);

      this.renderChart();

      // 绑定resize事件
      window.addEventListener("resize", this.resizeFn, { passive: true });
    },
    renderChart() {
      // 针对于地图相关的有些轨迹线，有时需要clear
      this.myChart.clear();

      // 渲染
      this.myChart.setOption(this.option);
    },
    resizeFn() {
      // console.log("执行resize方法");
      this.myChart.resize();
    },
  },
  created() {
    if (!this.option) throw new Error("option is required");
  },
  mounted() {
    this.el = this.$refs["chart"];

    // 如果没有传递宽高，则通过外部父容器检查获取宽高，检查外部父容器宽高做提示
    if (!this.width && !this.height) {
      //   console.log(el.parentNode);
      let parent = this.el.parentNode;
      // 如果外部不止有一个子节点，就提示
      if (parent.children.length !== 1) {
        throw new Error("GChart组件必须包裹在div中");
      }

      // 更新dom元素以后再渲染echarts
      this.styles = { width: "100%", height: "100%" };
    } else {
      // 更新dom元素以后再渲染echarts
      this.styles = { width: this.width + "px", height: this.height + "px" };
    }

    // 下次dom更新之后
    this.$nextTick(() => {
      this.initChart();
    });

    // 绑定resize事件
    // window.addEventListener("resize", this.resizeFn, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeFn);
    this.myChart.dispose();
  },
};
</script>

<style scoped>
</style>
