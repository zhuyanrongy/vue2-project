<template>
  <div>
    <header>
      <div class="header-t">
        <div class="product-name" sty>
          <span>产品名称</span>
          <el-input
            v-model="productName"
            placeholder="产品名称"
            size="small"
            @change="productNameChange"
          ></el-input>
        </div>
        <div>
          添加时间
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
            size="small"
          >
          </el-date-picker>
        </div>
        <div class="btn">
          <el-button type="primary" size="small" @click="SearchProductName"
            >查询</el-button
          >
        </div>
      </div>
      <div class="header-b">
        <el-button
          class="el-icon-plus"
          type="warning"
          size="small"
          @click="goToAddProduct"
          >添加商品</el-button
        >
        <el-button
          class="el-icon-delete"
          type="danger"
          size="small"
          @click="deleteProducts"
          >批量删除</el-button
        >
      </div>
    </header>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        :cell-style="cellStyle"
        :header-cell-style="cellStyle"
        size="small"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="id"
          label="商品编号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              :style="{ color: 'blue', cursor: 'pointer' }"
              @click="handleDetail(scope.row)"
            >
              {{ scope.row.title }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="category" label="商品类目" width="100">
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间"> </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="descs"
          label="商品描述"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="el-icon-edit"
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              class="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <Pagination
          :pageSize="pageSize"
          :total="total"
          @updatePage="updatePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { formatDescs } from "@/utils/index.js";
import Pagination from "@/components/Pagination.vue";
export default {
  components: { Pagination },
  data() {
    return {
      productName: "",
      time: "",
      tableData: [],
      pageSize: 1,
      total: 1,
      currentPage: 1,
      isSearch: false,
      deleteIds: [],
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    //获取productList pageSize total数据请求
    async getProductList(page) {
      let res = await this.$api.getProductList({ page });
      if (res.data.status === 200) {
        console.log(res.data);
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        let arr = res.data.data;
        arr.forEach((item) => {
          item.create_time = dayjs(item.create_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          item.descs = formatDescs(item.descs);
        });
        this.tableData = arr;
      }
    },
    //当前页改变时触发
    updatePage(page) {
      this.currentPage = page;
      this.getProductList(page);
    },
    //商品查询数据请求
    async getProductSearch(search) {
      let res = await this.$api.getProductSearch({ search });
      if (res.data.status === 200) {
        this.isSearch = true;
        let allDateList = res.data.result;
        allDateList.forEach((item) => {
          item.create_time = dayjs(item.create_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          item.descs = formatDescs(item.descs);
        });
        this.currentPage = 1;
        this.pageSize = res.data.result.length;
        this.total = res.data.result.length;
        this.tableData = allDateList;
      } else if (res.data.status == 500) {
        this.$message({
          message: "暂无数据",
          type: "warning",
        });
      }
    },
    //搜索商品名称触发
    SearchProductName() {
      if (this.productName.trim() == "") {
        this.$message({
          message: "请输入正确的产品名称",
          type: "warning",
        });
        return;
      }
      this.getProductSearch(this.productName.trim());
    },
    //搜索框失去焦点触发
    productNameChange() {
      if (this.productName.trim() == "") {
        this.getProductList(this.currentPage);
        this.isSearch = false;
      }
      return;
    },
    //勾选按钮变化
    handleSelectionChange(val) {
      let arr = [];
      val.forEach((item) => arr.push(item.id));
      this.deleteIds = arr;
    },
    //批量删除请求
    async batchDelete(params) {
      console.log("发起批量删除请求");
      let res = await this.$api.batchDelete({ ids: params });
      if (res.data.status === 200) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        let selectNum = this.deleteIds.length;
        this.deleteUpdatePage(selectNum);
      }
    },
    //删除操作后更新页面
    deleteUpdatePage(selectNum) {
      let lastPage = Math.ceil(this.total / this.pageSize);
      let remainder = this.total % this.pageSize;
      if (this.isSearch && this.total > selectNum) {
        this.getProductSearch(this.productName.trim());
        return;
      } else if (this.isSearch && this.total === selectNum) {
        this.isSearch = false;
        this.productName = "";
        this.getProductList(1);
        return;
      }

      if (lastPage === this.currentPage && remainder === selectNum) {
        this.getProductList(this.currentPage - 1);
        return;
      }
      this.getProductList(this.currentPage);
    },
    deleteProducts() {
      if (this.deleteIds.length === 0) {
        this.$message({
          message: "请勾选需要删除的商品",
          type: "warning",
        });
        return;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.batchDelete(this.deleteIds.join(","));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //商品删除操作
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteProductList(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除请求
    async deleteProductList(id) {
      let res = await this.$api.deleteProductList({ id });
      if (res.data.status === 200) {
        this.$message({
          message: "删除商品成功",
          type: "success",
        });
        let selectNum = 1;
        this.deleteUpdatePage(selectNum);
      }
    },
    cellStyle() {
      return "text-align:center";
    },
    goToAddProduct() {
      this.$router.push({
        name: "handel-product",
        query: {
          type: "add",
        },
      });
    },
    handleEdit(index, row) {
      console.log("编辑操作", row);
      this.$store.commit("handelProduct/setEditProductInfo", row);
      this.$router.push({
        name: "handel-product",
        query: { type: "edit" },
      });
    },
    handleDetail(row) {
      console.log("详情操作", row);
      this.$store.commit("handelProduct/setEditProductInfo", row);
      this.$router.push({
        name: "handel-product",
        query: { type: "detail" },
      });
    },
  },
  watch: {
    isSearch(val) {
      console.log("isSearch变化", val);
    },
  },
};
</script>

<style lang="less" scope>
header {
  background-color: #fff;
  padding: 20px 10px;
  .header-t {
    display: flex;
    margin-bottom: 20px;
    div {
      margin-right: 5px;
    }
    .product-name {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 100px;
      }
    }
  }
  .header-b {
    border: 1px solid #ccc;
    padding: 10px;
  }
}
.table {
  background-color: #fff;
  padding: 20px 10px 0;
  margin-top: 20px;
  .pagination {
    padding: 10px;
  }
}
</style>