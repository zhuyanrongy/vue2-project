<template>
  <div>
    <el-drawer
      title="订单详情"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :modal="false"
      :size="size"
    >
      <div class="drawer-content">
        <header>
          <el-row :gutter="20">
            <el-col :span="18">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                size="mini"
              >
                <el-form-item label="订单编号" label-width="100px">
                  <el-input
                    v-model="formInline.user"
                    placeholder="输入品牌名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="预定时间" label-width="100px">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="formInline.date1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">至</el-col>
                  <el-col :span="11">
                    <el-time-picker
                      placeholder="选择时间"
                      v-model="formInline.date2"
                      style="width: 100%"
                    ></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="下单人" label-width="100px">
                  <el-input
                    v-model="formInline.user"
                    placeholder="输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="所属单位" label-width="100px">
                  <el-input
                    v-model="formInline.user"
                    placeholder="输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="汇总状态" label-width="100px">
                  <el-select v-model="formInline.region" placeholder="全部">
                    <el-option label="全部" value="shanghai"></el-option>
                    <el-option label="未汇总" value="shanghai"></el-option>
                    <el-option label="已汇总" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="6">
              <el-button type="primary">查询</el-button>
            </el-col>
          </el-row>
        </header>
        <div class="tabel">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :cell-style="{ 'text-align': 'center' }"
            :header-cell-style="{ 'text-align': 'center', color: '#333' }"
            size="small"
          >
            <el-table-column prop="title" label="产品名称" width="180">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="180">
            </el-table-column>
            <el-table-column prop="guige" label="规格"> </el-table-column>
            <el-table-column prop="num" label="数量"> </el-table-column>
            <el-table-column prop="sum" label="小计(元)"> </el-table-column>
          </el-table>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      formInline: {},
      drawer: false,
      direction: "rtl",
      tableData: [],
      size: "",
      menu: 200,
    };
  },
  created() {
    this.gerOrderDetail();
  },
  mounted() {
    console.log();
    let width = document.documentElement.clientWidth;
    this.size = width - this.menu + 10 + "px";
  },
  watch: {
    isCollapse(val) {
      let width = document.documentElement.clientWidth;
      val ? (this.menu = 60) : 200;
      this.size = width - this.menu + 10 + "px";
    },
  },
  computed: {
    ...mapState("collapse", ["isCollapse"]),
  },
  methods: {
    async gerOrderDetail() {
      let res = await this.$api.gerOrderDetail();
      if (res.data.status === 200) {
        this.tableData = res.data.result.list;
      }
    },
    handleClose(done) {
      this.drawer = false;
    },
  },
};
</script>

<style lang="less" scope>
</style>