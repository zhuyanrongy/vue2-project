<template>
  <div class="layout">
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#102e52"
        text-color="#fff"
        active-text-color="#fff"
        :unique-opened="true"
        :collapse="isCollapse"
      >
        <!-- unique-opened是否只保持一个子菜单的展开
           collapse 是否水平折叠收起菜单
       -->
        <el-menu-item>
          <span slot="title">生鲜采购系统</span>
        </el-menu-item>
        <el-menu-item index="home" @click="goToUrl('home')">
          <i class="iconfont icon-shouye-zhihui"></i>
          <span slot="title">{{ $t("menu.homePage") }}</span>
        </el-menu-item>
        <MenuList :menuInfoList="menuInfoList" />
        <!-- <el-submenu index="/product">
          <template slot="title">
            <i class="iconfont icon-chanpinguanli"></i>
            <span>{{ $t("menu.productManagement") }}</span>
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
            <el-menu-item index="/advert/list">广告列表</el-menu-item>
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
        </el-submenu> -->
      </el-menu>
    </div>
    <div class="content" :class="{ 'content-m60': isCollapse }">
      <div class="header">
        <div class="control">
          <span
            class="iconfont icon-zhedie-shouqi"
            v-if="isCollapse === false"
            @click="changeisCollapse"
          ></span>
          <span
            class="iconfont icon-zhedie-zhankai"
            v-else
            @click="changeisCollapse"
          ></span>
        </div>
        <div class="other">
          <div class="time">{{ time }}</div>
          <p>|</p>
          <el-dropdown size="small" @command="selectLanguage">
            <span class="el-dropdown-link">
              语言环境<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p>|</p>
          <span>欢迎{{ userInfo.username }}</span>
          <p>|</p>
          <span class="iconfont icon-tuichu" @click="sighOut"></span>
          <div class="line"></div>
        </div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import MenuList from "./MenuList.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: { MenuList },
  data() {
    return {};
  },

  computed: {
    ...mapState("collapse", ["isCollapse"]),
    ...mapState("login", ["userInfo"]),
    ...mapState("menu", ["menuInfoList"]),
    defaultActive() {
      if (this.$route.meta.index) {
        return this.$route.meta.index;
      } else {
        return this.$route.name;
      }
    },
    time() {
      return dayjs().format("YYYY年MM月DD日 HH:mm:ss");
    },
  },
  methods: {
    ...mapMutations("collapse", { changeisCollapse: "changeisCollapse" }),
    selectLanguage(language) {
      this.$store.commit("lang/changeLanguage", language);
    },
    sighOut() {
      this.$router.push("/login");
      this.$store.commit("login/removeToken");
      this.$store.commit("menu/removeMenuInfoList");
      localStorage.removeItem("VueDate");
      localStorage.removeItem("login");
      localStorage.removeItem("menu");
    },
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
.layout {
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #102e52;
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
    padding-left: 200px;
    transition: all 0.6s linear;
    .header {
      background-color: #136ab1;
      padding: 10px;
      color: #fff;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 10;
      display: flex;
      .control {
        flex: 1;
      }
      .iconfont {
        font-size: 18px;
      }
      .other {
        width: 620px;
        display: flex;
        font-size: 14px;
        color: #fff;
        p {
          padding: 0 10px;
        }
        .icon {
          font-size: 14px;
        }
        .el-dropdown {
          color: #fff;
        }
      }
    }
    .main {
      padding: 10px;
      padding-top: 50px;
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

.content-m60 {
  padding-left: 60px !important;
}
</style>