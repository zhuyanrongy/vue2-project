<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <h1>登录页</h1>
    <el-form :model="form" size="mini">
      <el-form-item label="账号：" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码：" :label-width="formLabelWidth">
        <el-input
          type="password"
          v-model="form.pwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="padding: 12px 189px">
      <el-button type="primary" @click="logOn">登 录</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      dialogFormVisible: true,
      formLabelWidth: "60px",
      form: {
        username: "",
        pwd: "",
      },
    };
  },
  methods: {
    async logOn() {
      let res = await this.$api.login({
        user: this.form.username,
        pwd: this.form.pwd,
      });
      if (res.data.status === 200) {
        this.$store.commit("login/saveToken", {
          username: this.form.username,
          token: res.data.token,
        });
        this.$router.push("/");
      }
    },
  },
};
</script>
 
<style lang="less" scoped>
.el-dialog__header {
  padding: 0 !important;
}
.el-dialog__body {
  padding: 20px 20px 10px !important;
}
h1 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  border-bottom: 1px solid #ccc !important;
  padding: 10px 0;
}
/deep/ .el-input__inner {
  border: none;
  background-color: #e6f0fc;
  width: 80%;
}
.el-dialog__footer {
  text-align: center !important;
}
.el-input__inner {
  width: 77% !important;
}
</style>