<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      width="35%"
      :before-close="beforeClose"
      @close="dialogClose"
    >
      <h1 class="dialog-header" v-if="type === 1">
        新增{{ currentData.name }}分类子类名称
      </h1>
      <h1 class="dialog-header" v-else-if="type === 2">修改分类名称</h1>
      <h1 class="dialog-header" v-else>新增一级分类名称</h1>
      <el-form :model="form">
        <el-form-item label="请输入类目名称：" style="font-weight: bold">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleItemCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: ["type", "currentData"],
  computed: {},
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
      },
    };
  },
  methods: {
    dialogClose() {
      this.form.name = "";
    },
    beforeClose(done) {
      this.form.name = "";
      done();
    },
    handleItemCategory() {
      if (this.form.name.trim() == "") {
        this.$message({
          message: "输入内容不能为空",
          type: "warning",
        });
        return;
      }
      if (this.type === 1) {
        this.$emit("addItemCategory", {
          cid: this.currentData.cid,
          name: this.form.name,
        });
      } else if (this.type === 2) {
        this.$emit("updateItemCategory", {
          id: this.currentData.id,
          name: this.form.name,
        });
      } else {
        this.$emit("addCategory", {
          name: this.form.name,
        });
      }
    },
  },
};
</script>

<style lang="less" scope>
.el-dialog__header {
  padding: 0 20px;
}
.dialog-header {
  margin-bottom: 30px;
}
</style>