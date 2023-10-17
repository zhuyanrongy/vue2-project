<template>
  <div>
    <Breadcrumb />
    <header>
      <div class="header-t">
        <div class="reservation-number" sty>
          <span>预订编号</span>
          <el-input
            v-model="reservationNumber"
            placeholder="预订编号"
            size="small"
          ></el-input>
        </div>
        <div>
          预订时间
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
            size="small"
          >
          </el-date-picker>
        </div>
        <div class="btn">
          <el-button type="primary" size="small">查询</el-button>
        </div>
      </div>
      <div class="header-b">
        <el-button type="warning" size="small" @click="orderSummary"
          >订单汇总</el-button
        >
        <download-excel
          class="export-excel-wrapper"
          :data="detailsForm"
          :fields="json_fields"
          :header="title"
          name="optionList.xls"
        >
          <el-button class="btn-r" type="warning" size="small">导出</el-button>
        </download-excel>
      </div>
    </header>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center', color: '#333' }"
        size="small"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="selectable"
        ></el-table-column>
        <el-table-column prop="code" label="订单编号">
          <template slot-scope="scope">
            <span
              :style="{ color: 'blue', cursor: 'pointer' }"
              @click="handleDetail(scope.row)"
            >
              {{ scope.row.code }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ordername"
          label="下单人"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="company" label="所属单位"> </el-table-column>
        <el-table-column prop="phone" label="联系电话"> </el-table-column>
        <el-table-column prop="yudingTime" label="预订时间">
          <!--           <template slot-scope="scope">
            <span>{{ dayjs(scope.row.yudingTime).format("YYYY-MM-DD") }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="price" label="订单总价格"> </el-table-column>
        <el-table-column prop="huizongStatus" label="汇总状态">
          <!--  <template slot-scope="scope">
            <span>{{
              scope.row.huizongStatus === 1 ? "未汇总" : "已汇总"
            }}</span>
          </template> -->
        </el-table-column>
      </el-table>
      <div class="pagination">
        <Pagination
          ref="pagination"
          :pageSize="pageSize"
          :total="total"
          @updatePage="updatePage"
        />
      </div>
    </div>
    <Drawer ref="drawerModule" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import Pagination from "@/components/Pagination.vue";
import Drawer from "@/components/Drawer.vue";
export default {
  components: { Pagination, Drawer },
  data() {
    return {
      reservationNumber: "",
      time: "",
      tableData: [],
      pageSize: 1,
      total: 1,
      tickList: [],
      currentPage: 1,
      title: "公司采购系统订单列表",
      json_fields: {
        订单编号: {
          field: "code",
          callback: (value) => {
            return "&nbsp;" + value;
          },
        },
        下单人: "ordername",
        所属单位: "company",
        联系电话: "phone",
        预订时间: "yudingTime",
        订单总价格: "price",
        汇总状态: "huizongStatus",
      },
      detailsForm: [],
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    dayjs,
    async getOrderList(page) {
      let res = await this.$api.getOrderList(page);
      if (res.data.status === 200) {
        let data = res.data.data;
        data.forEach((item) => {
          item.yudingTime = dayjs(item.yudingTime).format("YYYY-MM-DD");
          item.huizongStatus = item.huizongStatus === 1 ? "未汇总" : "已汇总";
        });
        this.tableData = data;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
      } else {
        this.tableData = [];
        this.total = 1;
        this.pageSize = 1;
      }
    },
    //当前页改变时触发
    updatePage(page) {
      this.currentPage = page;
      this.getOrderList({ page });
    },
    selectable(row, index) {
      if (row.huizongStatus === "已汇总") {
        return false;
      } else {
        return true;
      }
    },
    handleSelectionChange(val) {
      let ids = [];
      val.forEach((item) => {
        ids.push(item.id);
      });
      this.tickList = ids;
      this.detailsForm = val;
    },
    //点击订单汇总
    orderSummary() {
      if (this.tickList.length > 1) {
        this.changeStatus({ ids: this.tickList.join(",") });
      } else {
        this.$message({
          message: "汇总的订单需要两个或两个以上",
          type: "warning",
        });
      }
    },
    //订单汇总请求
    async changeStatus(params) {
      let res = await this.$api.changeStatus({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "汇总订单成功",
          type: "success",
        });
        let selectNum = this.tickList.length;
        this.orderSummaryUpdatePage(selectNum);
      }
    },
    //汇总成功后更新页面
    orderSummaryUpdatePage(selectNum) {
      let lastPage = Math.ceil(this.total / this.pageSize);
      let remainder =
        this.total % this.pageSize == 0
          ? this.pageSize
          : this.total % this.pageSize;
      if (lastPage === this.currentPage && remainder === selectNum) {
        this.currentPage = this.currentPage - 1 > 0 ? this.currentPage - 1 : 1;
        this.getOrderList({ page: this.currentPage });
        return;
      }
      this.getOrderList({ page: this.currentPage });
      return;
    },
    handleDetail(row) {
      this.$refs.drawerModule.drawer = true;
    },
  },
};
</script>

<style lang="less" scoped>
header {
  background-color: #fff;
  padding: 20px 10px;
  .header-t {
    display: flex;
    margin-bottom: 20px;
    div {
      margin-right: 5px;
    }
    .reservation-number {
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
    display: flex;
    .btn-r {
      margin-left: 10px;
    }
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