<template>
  <div>
    <header>
      <h1>产品类目管理</h1>
    </header>
    <div class="classify-tree">
      <el-button
        type="warning"
        size="small"
        style="margin-bottom: 20px"
        @click="firstLevelAddition"
        >新增一级导航类目</el-button
      >
      <el-tree
        :data="data"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      >
      </el-tree>
    </div>
    <Dialog
      ref="dialog"
      :type="type"
      :currentData="currentData"
      @addItemCategory="insertItemCategory"
      @updateItemCategory="updateCategory"
      @addCategory="insertCategory"
    />
  </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
export default {
  components: { Dialog },
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      type: 1, //1:新增 2：修改 3：1级分类新增
      currentData: {},
    };
  },
  created() {
    this.itemCategory();
  },
  methods: {
    firstLevelAddition() {
      this.$refs.dialog.dialogFormVisible = true;
      this.type = 3;
    },
    append(data) {
      this.$refs.dialog.dialogFormVisible = true;
      this.type = 1;
      this.currentData = { cid: data.cid, name: data.name };
    },

    remove(node, data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteContentCategoryById({ id: data.id });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    update(node, data) {
      this.$refs.dialog.dialogFormVisible = true;
      this.type = 2;
      this.currentData = { id: data.id };
    },
    //增加一级导航请求
    async insertCategory(params) {
      let res = await this.$api.insertCategory({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "新增一级类目成功",
          type: "success",
        });
      }
      this.$refs.dialog.dialogFormVisible = false;
      this.$refs.dialog.form.name = "";
      this.itemCategory();
    },
    //增加子导航请求
    async insertItemCategory(params) {
      let res = await this.$api.insertItemCategory({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "新增类目成功",
          type: "success",
        });
      }
      this.$refs.dialog.dialogFormVisible = false;
      this.$refs.dialog.form.name = "";
      this.itemCategory();
    },
    //修改导航请求
    async updateCategory(params) {
      let res = await this.$api.updateCategory({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "修改类目成功",
          type: "success",
        });
      }
      this.$refs.dialog.dialogFormVisible = false;
      this.$refs.dialog.form.name = "";
      this.itemCategory();
    },
    //删除导航请求
    async deleteContentCategoryById(params) {
      let res = await this.$api.deleteContentCategoryById({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "删除类目成功",
          type: "success",
        });
      }
      this.itemCategory();
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center;  justify-content: space-between;  font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          {node.level !== 1 ? (
            <span style="margin-right:55vw; padding-top:5px;padding-bottom:5px">
              <el-button
                style="font-size: 12px; padding-top:5px;padding-bottom:5px"
                size="mini"
                class="el-icon-edit"
                on-click={() => this.update(node, data)}
              >
                修改
              </el-button>
              <el-button
                style="font-size: 12px; padding-top:5px;padding-bottom:5px"
                type="danger"
                size="mini"
                class="el-icon-delete"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          ) : (
            <span style="margin-right:55vw; padding-top:5px;padding-bottom:5px">
              <el-button
                style="font-size: 12px; padding-top:5px;padding-bottom:5px"
                size="mini"
                class="el-icon-plus"
                on-click={() => this.append(data)}
              >
                新增
              </el-button>
              <el-button
                style="font-size: 12px; padding-top:5px;padding-bottom:5px"
                size="mini"
                class="el-icon-edit"
                on-click={() => this.update(node, data)}
              >
                修改
              </el-button>
              <el-button
                style="font-size: 12px; padding-top:5px;padding-bottom:5px"
                type="danger"
                size="mini"
                class="el-icon-delete"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          )}
        </span>
      );
    },
    async itemCategory() {
      let res = await this.$api.itemCategory();
      if (res.data.status === 200) {
        let classifyData = res.data.result;
        let newClassifyData = classifyData.filter((item) => item.type === 1);
        classifyData.forEach((item) => {
          newClassifyData.forEach((ele) => {
            if (item.type === ele.cid) {
              if (!ele.children) {
                let children = [];
                children.push(item);
                ele.children = children;
              } else {
                ele.children.push(item);
              }
            }
          });
        });
        console.log(newClassifyData);
        this.data = newClassifyData;
      }
    },
  },
};
</script>

<style lang="less" scope>
header {
  h1 {
    font-size: 22px;
    background-color: #f6f6f6;
    padding: 10px;
  }
}
.classify-tree {
  background-color: #fff;
  padding: 0 20px;
}
</style>