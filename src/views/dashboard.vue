<template>
  <div>
    <GFlipper :numData="numData" />
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      numData: [
        { title: "报案数", val: 357931, color: "#67ca3a" },
        { title: "受害人数", val: 474122, color: "#ff6600" },
        { title: "在逃人员", val: 253252, color: "#f56c6c" },
        { title: "嫌疑人员", val: 299833, color: "#409eff" }
      ]
    };
  }
};
</script>

<style>
</style>