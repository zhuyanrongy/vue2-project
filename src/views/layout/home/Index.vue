<template>
  <div>
    <header>
      <el-row class=".el-row" :gutter="40">
        <el-col :span="6">
          <div class="bg-purple">
            <div class="total">
              <span>总销售额</span>
              <span>55,555</span>
            </div>
            <div class="today">今日销售额<span>66,666</span></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">
            <div class="total">
              <span>总销售额</span>
              <span>55,555</span>
            </div>
            <div class="today">今日销售额<span>66,666</span></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">
            <div class="total">
              <span>总销售额</span>
              <span>55,555</span>
            </div>
            <div class="today">今日销售额<span>66,666</span></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">
            <div class="total">
              <span>总销售额</span>
              <span>55,555</span>
            </div>
            <div class="today">今日销售额<span>66,666</span></div>
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
            <div class="content">
              <div class="num">今日订单数 <span>666</span></div>
              <div class="collect">汇总确认订单<span>666</span></div>
              <div class="money">今日金额<span>666</span></div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <h1>本月订单</h1>
            <div class="content">
              <div class="num">本月订单数 <span>666</span></div>
              <div class="collect">汇总确认订单<span>666</span></div>
              <div class="money">本月金额<span>666</span></div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <h1>快捷入口</h1>
            <div class="content">
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
  mounted() {
    this.getRenderer(); //调用chart
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
          axisPointer: { type: "cross" },
        }, //提示框组件
        legend: {}, //图例组件展现了不同系列的标记(symbol)，颜色和名字
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
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
            data: [5, 20, 36, 10, 10, 20],
            smooth: true,
          },
          {
            name: "销售量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
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
        },
        legend: {
          orient: "vertical",
          left: "auto",
          top: 25,
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            right: -50,
            bottom: -50,
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
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
    height: 120px;
    h1 {
      font-size: 16px;
      padding: 10px;
      border-bottom: 2px solid #f4f4f4;
    }
    .content {
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