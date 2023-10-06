<template>
  <div class="add">
    <div class="tree">
      <h1>产品类型列表</h1>
      <div class="el-tree">
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          @node-click="nodeClick"
          :accordion="true"
        >
        </el-tree>
      </div>
    </div>
    <div class="form-content">
      <h1>商品{{ type }}</h1>
      <div class="content-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          size="small"
        >
          <el-form-item label="所属分类" prop="category">{{
            ruleForm.category
          }}</el-form-item>
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num"></el-input>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="ruleForm.sellPoint"></el-input>
          </el-form-item>
          <el-form-item label="上传图片" prop="image">
            <Upload
              ref="upload"
              @uploadSuccess="uploadSuccess"
              :fileList="fileList"
            />
          </el-form-item>
          <el-form-item label="商品描述" prop="descs">
            <WangEdit ref="wangEdit" @editChange="editChange" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              v-if="type !== '详情'"
              >保存</el-button
            >
            <el-button @click="resetForm('ruleForm')" v-if="type !== '详情'"
              >重置</el-button
            >
            <el-button @click="handelCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import WangEdit from "@/components/WangEdit.vue";
import { mapState } from "vuex";
export default {
  components: { Upload, WangEdit },
  data() {
    return {
      props: {
        label: "name",
      },
      ruleForm: {
        category: "",
        cid: 1,
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        descs: "",
        image: [],
      },
      rules: {
        category: [{ required: true }],
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, message: "长度大于1个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
      },
      type: "添加",
      fileList: [],
      currentPage: 1,
    };
  },
  mounted() {
    if (this.$route.query.type === "add") {
      this.type = "添加";
    } else if (this.$route.query.type === "edit") {
      this.type = "编辑";
      this.handelEcho();
    } else {
      this.type = "详情";
      this.handelEcho();
    }
    this.currentPage = this.$route.params.page;
  },
  computed: {
    //vuex所编辑商品数据
    editProductInfo() {
      return JSON.parse(
        JSON.stringify(this.$store.state.handelProduct.editProductInfo)
      );
    },
  },
  methods: {
    /* 加载子树数据的方法*/
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.getProductTypeListInfo(1, resolve);
      }
      if (node.level === 1) {
        this.getProductTypeListInfo(node.data.cid, resolve);
      }
      if (node.level > 1) return resolve([]);
    },
    //类目选择请求，返回格式resolve([])
    async getProductTypeListInfo(type, resolve) {
      let res = await this.$api.getProductTypeListInfo({ type });
      if (res.data.status === 200) {
        return resolve(res.data.result);
      }
    },
    //获取category和cid
    nodeClick(node) {
      this.ruleForm.category = node.name;
      this.ruleForm.cid = node.cid;
    },
    //获取decsc
    editChange(val) {
      this.ruleForm.descs = val;
    },
    //获取imageUrl
    uploadSuccess(url) {
      this.ruleForm.image.push(url);
      console.log("父组件push图片", this.ruleForm.image);
    },
    //商品添加请求
    async insertTbItem(params) {
      console.log("添加请求前的所有参数", params);
      let res = await this.$api.insertTbItem({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "商品添加成功",
          type: "success",
        });
        this.ruleForm.image = [];
        this.$router.push({ name: "List" });
      }
    },
    async updateTbItem(params) {
      console.log("编辑请求前的所有参数", params);
      let res = await this.$api.updateTbItem({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "商品编辑成功",
          type: "success",
        });
        this.ruleForm.image = [];
        this.$router.push({ name: "List" });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.image = JSON.stringify(this.ruleForm.image);
          console.log("图片请求格式已处理", this.ruleForm.image);
          if (this.type === "添加") {
            this.insertTbItem({ ...this.ruleForm });
          } else {
            this.updateTbItem({
              ...this.ruleForm,
              id: this.editProductInfo.id,
            });
          }
        } else {
          this.$message.error("商品操作失败,请检查必填项是否填写完整");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.upload.clearAll();
      this.$refs.wangEdit.html = "";
    },
    //取消操作
    handelCancel() {
      this.$router.push({ name: "List" });
      this.$store.commit("handelProduct/removeEditProductInfo");
    },
    //回显
    handelEcho() {
      let { editProductInfo } = this;
      for (let key in editProductInfo) {
        if (this.ruleForm[key] !== undefined) {
          this.ruleForm[key] = editProductInfo[key];
        }
      }
      this.ruleForm.image = JSON.parse(this.ruleForm.image);
      this.ruleForm.image.forEach((item) => {
        let obj = {};
        (obj.name = ""), (obj.url = item);
        this.fileList.push(obj);
      });
      this.$nextTick(() => {
        this.$refs.wangEdit.html = this.ruleForm.descs;
      });
    },
  },
};
</script>

<style lang="less" scope>
.add {
  display: flex;

  .tree {
    width: 200px;
    height: 500px;
    background-color: #fff;
    margin-right: 20px;
    h1 {
      font-size: 16px;
      font-weight: normal;
      background-color: #81caed;
      color: #fff;
      text-align: center;
      line-height: 50px;
    }
    .el-tree {
      padding: 10px;
    }
  }
  .form-content {
    flex: 1;
    background-color: #fff;
    h1 {
      font-size: 16px;
      background-color: #ededed;
      line-height: 40px;
      padding: 0 10px;
    }
    .content-form {
      padding: 20px;
    }
  }
}
</style>