<template>
  <fragment>
    <template v-for="item in menuInfoList">
      <el-submenu
        :key="item.name"
        :index="item.name"
        @click="goToUrl(item.name)"
        v-if="item.children && item.children !== 0"
        v-show="!item.meta.isHidden"
      >
        <template slot="title">
          <i class="iconfont icon-chanpinguanli"></i>
          <span>{{ item.meta.name }}</span>
        </template>
        <el-menu-item-group>
          <MenuList :menuInfoList="item.children" />
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item
        :key="item.path"
        :index="item.name"
        @click="goToUrl(item.name)"
        v-show="!item.meta.isHidden"
        v-else
      >
        <i class="el-icon-tickets"></i>
        <span slot="title">{{ item.meta.name }}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
export default {
  name: "MenuList",
  props: ["menuInfoList"],
  methods: {
    goToUrl(name) {
      this.$router
        .push({
          name,
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.el-menu-item.is-active {
  background-color: #1474c1 !important;
}
</style>
