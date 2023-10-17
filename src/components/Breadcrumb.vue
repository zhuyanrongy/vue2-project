<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumbList"
        :key="item.path"
        :to="{ path: item.path || '/' }"
        >{{ item.meta.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  computed: {
    breadcrumbList() {
      return this.$route.matched || [];
    },
  },
};
</script>

<style lang="less" scope>
.breadcrumb {
  padding: 10px;
}
</style>