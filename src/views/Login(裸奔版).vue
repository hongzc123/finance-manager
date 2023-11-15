<template>
  <div class="login-container">
    <div class="login-box center">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input
            prefix-icon="el-icon-user-solid"
            clearable
            placeholder="请输入用户名"
            v-model.number="ruleForm.account"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-s-order"
            show-password
            placeholder="请输入密码"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="stars-box">
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
    </div>
  </div>
</template>
<script>
/**
 * clearable
show-password
prefix-icon 
el-icon-user-solid
el-icon-s-order
 */
import { doLogin } from "@/api";

export default {
  data() {
    return {
      ruleForm: {
        account: "admin",
        password: "approve123456.",
      },
      rules: {
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        account: [{ required: true, trigger: "blur", message: "请输入用户名" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await doLogin(this.ruleForm);
          let urlParams = this.$route.query.redirect;
          console.log(this.$route.query);
          this.$router.push(urlParams || "/dashboard");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
// 深层查找
// :deep(选择器) 查找深层后续生成的元素（template上没有的）
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #040d21;
  // 后代 .login-container .login-box
  // 并集 & .login-container.login-box
  // 子代 > .login-container > .login-box(仅仅儿子)
  .login-box {
    width: 500px;
    height: 200px;
    border-radius: 6px;
    background-color: rgba(#fff, 0.3);
    padding: 20px 20px 0px 20px;
    text-align: center;
    .el-button {
      width: 100px;
    }
  }
}

// 填充满容器
.stars-box,
.star {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

// 绘制闪光点
.star {
  // 每个重复单元的展示大小
  background-size: 250px 250px;
  //                                大小          位置
  background-image: radial-gradient(2px 2px at 50px 200px, #eee, transparent),
    // 第二个点      大小
    radial-gradient(3px 4px at 40px 70px, #fff, transparent),
    // 第三个点
    radial-gradient(2px 2px at 120px 40px, #ddd, transparent);

  //   透明度0 => 80%完全展示1 => 0
  opacity: 0;
  //   角度变化5deg 但如动画      放大2倍
  // 无限制的十秒动画轮播
  animation: trans 10s infinite;
}

// 区分不同的显示效果
.star:nth-child(2) {
  background-position: 20% 50%;
  animation-delay: 0.3s;
}
// 尽量避免移动相同数字规则的比例，以免看起来有规则，目标就是看起来乱
.star:nth-child(3) {
  background-position: 40% -80%;
  transform: rotate(80deg);
  animation-delay: 1.2s;
}
.star:nth-child(4) {
  background-position: -20% -30%;
  transform: rotate(60deg);
  animation-delay: 2.5s;
}
.star:nth-child(5) {
  background-position: 80% 30%;
  transform: rotate(80deg);
  animation-delay: 4s;
}
.star:nth-child(6) {
  background-position: 50% 20%;
  animation-delay: 6s;
}

//   透明度0 => 80%完全展示1 => 0
//   角度变化5deg 但如动画      放大2倍
@keyframes trans {
  0% {
    opacity: 0;
    // 抵消放大带来的视觉旋转
    transform: rotate(5deg);
    animation-timing-function: ease-in;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
    // 近大远小
    transform: scale(2.2);
  }
}
</style>