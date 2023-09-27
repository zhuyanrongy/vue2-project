<template>
  <div class="layout">
    <div class="menu">
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#102e52"
        text-color="#fff"
        active-text-color="#fff"
        router
        :unique-opened="true"
        :collapse="isCollapse"
      >
        <!-- unique-opened是否只保持一个子菜单的展开
           collapse 是否水平折叠收起菜单
       -->
        <el-menu-item>
          <span slot="title">生鲜采购系统</span>
        </el-menu-item>
        <el-menu-item index="/">
          <i class="iconfont icon-shouye-zhihui"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/product">
          <template slot="title">
            <i class="iconfont icon-chanpinguanli"></i>
            <span>产品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/product/list">产品列表</el-menu-item>
            <el-menu-item index="/product/classify">产品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/order">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/order/list">订单列表</el-menu-item>
            <el-menu-item index="/order/collect">汇总清单</el-menu-item>
            <el-menu-item index="/order/process">订单审核</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/advert">
          <template slot="title">
            <i class="iconfont icon-guanggao"></i>
            <span>广告分类</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/advert">广告列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/system">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/system/user">用户管理</el-menu-item>
            <el-menu-item index="/system/role">角色管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">
      <div class="header">
        <div class="control">
          <span
            class="iconfont icon-zhedie-shouqi"
            v-if="isCollapse === false"
            @click="isCollapse = !isCollapse"
          ></span>
          <span
            class="iconfont icon-zhedie-zhankai"
            v-else
            @click="isCollapse = !isCollapse"
          ></span>
        </div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>

<style lang="less" scope>
.layout {
  height: 100vh;
  display: flex;
  .menu {
    background-color: #102e52;
    color: #fff;
    .el-menu {
      border-right: 0;
    }
    .iconfont {
      font-size: 18px;
      margin-right: 5px;
      padding: 3px;
    }
  }
  .content {
    flex: 1;
    .header {
      background-color: #136ab1;
      padding: 10px;
      color: #fff;
      .iconfont {
        font-size: 18px;
      }
    }
    .main {
      padding: 10px;
    }
  }
}
.el-menu-item.is-active {
  background-color: #1474c1 !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>