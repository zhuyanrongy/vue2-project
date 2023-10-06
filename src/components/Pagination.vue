<template>
  <!--page-size     每页显示条目个数 
    total	      总条目数
    current-page  当前页数
    layout      组件布局，子组件名用逗号分隔	String
    page-sizes	每页显示个数选择器的选项设置
    size-change	pageSize 改变时会触发
    current-change	currentPage 改变时会触发
    -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pageSize"
    layout="total,prev, pager, next, jumper"
    :total="total"
    v-if="paginationShow"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageSize", "total"],
  data() {
    return {
      currentPage: 1,
      paginationShow: true,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit("updatePage", val);
    },
  },
};
</script>

<style>
</style>