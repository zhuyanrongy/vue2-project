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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderNum" label="汇总单编号"></el-table-column>
        <el-table-column
          prop="operator"
          label="汇总人"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="phone" label="联系电话"> </el-table-column>
        <el-table-column prop="time" label="汇总时间">
          <!--           <template slot-scope="scope">
            <span>{{
              dayjs(scope.row.time).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="totalPrice" label="汇总单总价格">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="cancelSummary(scope.row)"
              size="small"
              >撤销汇总</el-button
            >
          </template>
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
  </div>
</template>

<script>
import dayjs from "dayjs";
import Pagination from "@/components/Pagination.vue";
export default {
  components: { Pagination },
  data() {
    return {
      reservationNumber: "",
      time: "",
      tableData: [],
      pageSize: 1,
      total: 1,
      title: "订单列表",
      json_fields: {
        汇总单编号: "orderNum",
        汇总人: "operator",
        联系电话: "phone",
        汇总时间: "time",
        汇总单总价格: "totalPrice",
      },
      detailsForm: [],
    };
  },
  created() {
    this.getOrderCollectList();
  },
  methods: {
    dayjs,
    async getOrderCollectList() {
      let res = await this.$api.getOrderCollectList();
      if (res.data.status === 200) {
        let data = res.data.data;
        data.forEach((item) => {
          item.time = dayjs(item.time).format("YYYY-MM-DD HH:mm:ss");
        });
        this.tableData = data;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
      } else if (res.data.status === 500) {
        this.tableData = [];
        this.total = 0;
        this.pageSize = 1;
      }
    },
    //当前页改变时触发
    updatePage(page) {},
    handleSelectionChange(val) {
      this.detailsForm = val;
    },
    cancelSummary(row) {
      this.cancelSummaryById({ id: row.id });
    },
    async cancelSummaryById(params) {
      let res = await this.$api.cancelSummaryById({ ...params });
      if (res.data.status === 200) {
        this.$message({
          message: "撤销汇总成功",
          type: "success",
        });
        this.getOrderCollectList();
      }
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