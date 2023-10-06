<template>
  <div>
    <header>
      <el-row class=".el-row" :gutter="40">
        <el-col :span="6">
          <div class="bg-purple">
            <div class="total">
              <span>总销售额</span>
              <span>{{ dataCount.saleTotal }}</span>
            </div>
            <div class="today">
              今日销售额：<span>{{ dataCount.sale }}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">
            <div class="total">
              <span>总访问量</span>
              <span>{{ dataCount.viewsTotal }}</span>
            </div>
            <div class="today">
              今日访问量：<span>{{ dataCount.views }}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">
            <div class="total">
              <span>总收藏量</span>
              <span>{{ dataCount.collectTotal }}</span>
            </div>
            <div class="today">
              今日收藏量：<span>{{ dataCount.collect }}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">
            <div class="total">
              <span>总支付量</span>
              <span>{{ dataCount.payTotal }}</span>
            </div>
            <div class="today">
              今日支付量：<span>{{ dataCount.pay }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- gutter	栅格间隔	number -->
    </header>
    <section>
      <div class="left">
        <div ref="monthlySales" style="height: 350px"></div>
      </div>
      <div class="right">
        <div ref="salesRatio" style="height: 350px"></div>
      </div>
    </section>
    <footer>
      <el-row :gutter="26">
        <el-col :span="8">
          <div class="grid-content">
            <h1>今日订单</h1>
            <div class="home-content">
              <div class="num">
                今日订单数 <span>{{ homeOrderInfo.curOrderCount }}</span>
              </div>
              <div class="collect">
                汇总确认订单<span>{{ homeOrderInfo.curCollect }}</span>
              </div>
              <div class="money">
                今日金额<span>{{ homeOrderInfo.curMoney }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <h1>本月订单</h1>
            <div class="home-content">
              <div class="num">
                本月订单数 <span>{{ homeOrderInfo.orderCount }}</span>
              </div>
              <div class="collect">
                汇总确认订单<span>{{ homeOrderInfo.collect }}</span>
              </div>
              <div class="money">
                本月金额<span>{{ homeOrderInfo.money }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <h1>快捷入口</h1>
            <div class="home-content">
              <el-button type="primary" @click="goToUrl('product-list')"
                >产品管理</el-button
              >
              <el-button type="primary" @click="goToUrl('order-list')"
                >订单管理</el-button
              >
              <el-button type="primary" @click="goToUrl('advert')"
                >广告分类</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </footer>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      dataCount: {},
      nameList: [],
      numList: [],
      totalList: [],
      pieData: [],
      homeOrderInfo: {},
    };
  },
  async created() {
    /* 获取销量额等数据统计-------------- */
    let countRes = await this.$api.getDataCount();
    if (countRes.status === 200) {
      this.dataCount = this.numFormat(countRes.data.data.list);
    }
    /* 获取首页折线图数据统计 月销量、月销售额-------------- */
    let monthlyRes = await this.$api.getMonthlySalesData();
    if (countRes.status === 200) {
      let arr = monthlyRes.data.result.data.sale_money;
      arr.forEach((item) => {
        this.nameList.push(item.name);
        this.numList.push(item.num);
        this.totalList.push(item.total_amount);
        let obj = {};
        obj.name = item.name;
        obj.value = item.num;
        this.pieData.push(obj);
      });
      this.getRenderer();
    }
    /* 获取首页今日订单统计-------------------- */
    let orderRes = await this.$api.getHomeOrderInfo();
    if (orderRes.status === 200) {
      this.homeOrderInfo = orderRes.data.list;
    }
  },
  methods: {
    getRenderer() {
      //line、bar
      const myChart = echarts.init(this.$refs.monthlySales);
      myChart.setOption({
        title: {
          text: "月销售额",
        },
        tooltip: {
          //提示框组件
          trigger: "axis",
          axisPointer: { type: "cross" },
        },
        legend: {}, //图例组件展现了不同系列的标记(symbol)，颜色和名字
        xAxis: {
          data: this.nameList,
          axisLine: {
            lineStyle: {
              color: "#7f8189",
            },
          },
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "line",
            data: this.totalList,
            smooth: true,
          },
          {
            name: "销售量",
            type: "bar",
            data: this.numList,
          },
        ],
      });
      // ------------------------------------pie
      const myChartPie = echarts.init(this.$refs.salesRatio);
      let option = {
        title: {
          text: "产品销售比例",
          left: "left",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "auto",
          top: 25,
        },
        series: [
          {
            name: "产品销售量",
            type: "pie",
            radius: "50%",
            right: -50,
            bottom: -50,
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChartPie.setOption(option);
    },
    goToUrl(name) {
      //快捷入口路由跳转
      this.$router.push({ name });
    },
    numFormat(obj) {
      //格式化数字toLocaleString
      let newObj = {};
      for (let key in obj) {
        newObj[key] = obj[key].toLocaleString();
      }
      return newObj;
    },
  },
};
</script>

<style lang="less" scope>
header {
  padding: 0 15px;
  .bg-purple {
    box-shadow: 0 4px 6px 1px rgba(0, 0, 0, 0.4);
    border-radius: 16px;
    height: 90px;
    color: #fff;
    padding: 10px 0;
    .total {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      padding: 0 10px;
      span:nth-child(2) {
        font-size: 20px;
        padding: 10px;
      }
    }
    .today {
      border-top: 1px solid #fff;
      padding: 8px 20px;
      font-size: 14px;
    }
  }
  .el-col {
    &:nth-child(1) .bg-purple {
      background-color: #db8879;
    }
    &:nth-child(2) .bg-purple {
      background-color: #3493f7;
    }
    &:nth-child(3) .bg-purple {
      background-color: #b25ba0;
    }
    &:nth-child(4) .bg-purple {
      background-color: #11b3e4;
    }
  }
}
section {
  margin: 20px 15px;
  display: flex;

  .left,
  .right {
    background-color: #fff;
    padding: 10px;
  }
  .left {
    flex: 2;
  }
  .right {
    margin-left: 20px;
    flex: 1;
  }
}
footer {
  padding: 0 15px;
  .grid-content {
    box-shadow: 0 4px 6px -3px rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    background-color: #e3f2f8;
    height: 110px;
    h1 {
      font-size: 16px;
      padding: 10px;
      border-bottom: 2px solid #f4f4f4;
    }
    .home-content {
      font-size: 14px;
      display: flex;
      padding: 10px;
      justify-content: space-between;
      color: #333;
      .num,
      .collect,
      .money {
        flex: 33.33%;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
      }
      .num {
        background-color: skyblue;
      }
      .collect {
        background-color: #87b2eb;
      }
      .money {
        background-color: #8796eb;
      }
    }
  }
  &:nth-child(3) .content {
    justify-content: space-around;
  }
}
</style>