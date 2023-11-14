<template>
  <div>
    <el-row :gutter="10">
      <el-col v-bind="size" v-for="(item, i) in numData" :key="i">
        <div class="grid-box" :style="{'background': item.color}">
          <p v-text="item.title"></p>
          <countTo :startVal="0" :endVal="item.val" :duration="3000"></countTo>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from "vue-count-to";

export default {
  name: "GFlipper",
  components: { countTo },
  props: ["numData"],
  data() {
    return {
      size: {
        xs: 24,
        sm: 24,
        md: 12,
        lg: Math.round(24 / this.numData.length),
        xl: Math.round(24 / this.numData.length)
      }
    };
  }
};
</script>

<style scoped lang="scss">
.grid-box {
  height: 150px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 26px;

  > p {
    color: black;
    font-size: 16px;
  }
}
</style>