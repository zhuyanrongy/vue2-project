<template>
  <div>
    <el-button class="btn" size="small" @click="addAdvertisement"
      >{{ title }}广告</el-button
    >
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="pid" label="PID" width="180"> </el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="url" label="访问地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="image" label="图片地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="90px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" width="30%">
      <p class="title">新增广告内容</p>
      <el-form :model="form" size="small">
        <el-form-item label="广告名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" size="small">
        <el-form-item label="广告图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" size="small">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="form.image" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      title: "",
      dialogFormVisible: false,
      form: {
        name: "",
        url: "",
        image: "",
      },
      formLabelWidth: "aoto",
    };
  },
  computed: { ...mapState("advert", ["currentContent"]) },
  watch: {
    currentContent: {
      immediate: true,
      handler(newDate) {
        if (newDate.length === 0) {
          this.title = "";
          this.tableData = [];
          return;
        }
        this.title = newDate.name;
        this.selectTbContentAllByCategoryId({ pid: newDate.pid });
      },
    },
  },
  methods: {
    //内容查询请求 pid
    async selectTbContentAllByCategoryId(params) {
      let res = await this.$api.selectTbContentAllByCategoryId({ ...params });
      if (res.data.status === 200) {
        this.tableData = res.data.result;
      } else {
        this.tableData = [];
      }
    },
    //内容删除请求 id
    async deleteContentByIds(params) {
      let res = await this.$api.deleteContentByIds({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.dialogFormVisible = false;
        this.selectTbContentAllByCategoryId({ pid: this.currentContent.pid });
      }
    },
    //内容新增请求 pid name url image
    async insertTbContent(params) {
      let res = await this.$api.insertTbContent({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "新增广告内容成功",
          type: "success",
        });
        this.dialogFormVisible = false;
        this.selectTbContentAllByCategoryId({ pid: this.currentContent.pid });
      }
    },
    addAdvertisement() {
      if (!this.title) return;
      this.dialogFormVisible = true;
    },
    clickOk() {
      this.insertTbContent({
        pid: this.currentContent.pid,
        name: this.form.name,
        url: this.form.url,
        image: this.form.image,
      });
    },
    handleDelete(index, row) {
      this.deleteContentByIds({ id: row.id });
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin: 10px 0;
  margin-left: 50%;
  transform: translate(-50%);
}
.el-dialog__header {
  padding: 0;
}
/* .el-dialog__body {
  padding: 20px 20px 0;
} */
.title {
  text-align: center;
  color: #333;
  font-weight: bold;
  margin-bottom: 30px;
}
</style>