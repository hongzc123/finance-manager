<template>
  <div>
    <GFlipper :numData="numData" />

    <div style="width: 70vw; height: 30vh; margin-top: 20px">
      <GChart id="1" :option="option1" />
    </div>

    <GChart width="800" height="300" id="2" :option="option2" style="margin-top: 20px" />
  </div>
</template>

<script>
import { option1, option2 } from "@/conf/echarts";

export default {
  // name: "dashboard",
  data() {
    return {
      option1,
      option2,
      numData: [
        { title: "报案数", val: 357931, color: "#67ca3a" },
        { title: "受害人数", val: 474122, color: "#ff6600" },
        { title: "在逃人员", val: 253252, color: "#f56c6c" },
        { title: "嫌疑人员", val: 299833, color: "#409eff" }
      ]
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.option1 = {
        ...this.option1,
        series: this.option1.series.map(el => {
          el.data.reverse();
          return el;
        })
      };
      this.option2 = {
        ...this.option2,
        series: this.option2.series.map(el => {
          el.data.reverse();
          return el;
        })
      };
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style>
</style>