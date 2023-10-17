<template>
  <div>
    <el-tree
      :data="data"
      :props="props"
      :load="loadNode"
      lazy
      :render-content="renderContent"
      @node-click="nodeClick"
    >
    </el-tree>
    <div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="form">
          <el-form-item :label-width="formLabelWidth">
            <span>当前处于的广告位置：{{ currentClassify.name }}</span>
            <el-input
              v-model="form.name"
              autocomplete="off"
              size="small"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
      },
      dialogFormVisible: false,
      form: {
        name: "",
      },
      formLabelWidth: "auto",
      title: "",
      type: 1,
      currentClassify: {},
      level0Node: null,
      level0Resolve: null,
      data: [],
    };
  },

  methods: {
    append(data) {
      this.type = 1;
      this.title = "添加广告";
      this.dialogFormVisible = true;
    },
    update(node, data) {
      this.type = 2;
      this.title = "修改广告名称";
      this.dialogFormVisible = true;
    },
    remove(node, data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteAdvertContentCategoryById({ pid: data.pid });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // dialog点击确定
    clickOk() {
      if (this.type === 1) {
        this.insertContentCategory({
          pid: this.currentClassify.pid,
          name: this.form.name,
        });
      } else {
        this.updateContentCategory({
          pid: this.currentClassify.pid,
          name: this.form.name,
        });
      }
    },
    // 增加子导航 pid name
    async insertContentCategory(params) {
      let res = await this.$api.insertContentCategory({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.dialogFormVisible = false;
        this.form.name = "";
        this.againNewData();
      }
    },
    //刷新tree
    againNewData() {
      /* this.level0Node.childNodes = [];
      this.loadNode(this.level0Node, this.level0Resolve); */
      this.$api.getAdvertCategory().then((res) => {
        if (res.data.status === 200) {
          "http----进入组件懒加载数据", (this.data = res.data.result);
        }
      });
    },
    //修改子导航 pid name
    async updateContentCategory(params) {
      let res = await this.$api.updateContentCategory({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.dialogFormVisible = false;
        this.form.name = "";
        this.againNewData();
      }
    },
    //删除子导航 pid
    async deleteAdvertContentCategoryById(params) {
      let res = await this.$api.deleteAdvertContentCategoryById({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.againNewData();
      }
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span style="margin-left:20px">
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              增加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(node, data)}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    //获取节点请求
    async getAdvertCategory(params, resolve) {
      let res = await this.$api.getAdvertCategory({ ...params });
      if (res.data.status === 200) {
        return resolve(res.data.result);
      } else if (res.data.status === 500) {
        return resolve([]);
      }
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.level0Node = node;
        this.level0Resolve = resolve;
        return this.getAdvertCategory(1, resolve);
      } else if (node.level >= 1) {
        return this.getAdvertCategory({ id: node.data.pid }, resolve);
      }
    },
    nodeClick(data) {
      let obj = {};
      (obj.pid = data.pid), (obj.name = data.name);
      this.currentClassify = obj;
      if (data.pid === 1001) {
        this.$store.commit("advert/removeBeingClicked");
      } else {
        this.$store.commit("advert/beingClicked", data);
      }
    },
  },
};
</script>

<style less="lang" scoped >
.el-dialog__body {
  padding: 20px 20px 0;
}
</style>