<template>
  <div class="process">
    <Breadcrumb />
    订单合同：
    <el-button @click="viewContract">查看合同</el-button>
    <el-dialog
      title="查看合同内容"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <VuePdf></VuePdf>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VuePdf from "./VuePdf.vue";
export default {
  components: {
    VuePdf,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },

  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    viewContract() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.process {
  background: #fff;
  padding: 10px 0;
  width: 100%;
}
.el-dialog__body {
  padding: 0 20px 30px;
}
</style>