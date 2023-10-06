<template>
  <div>
    <!-- 需要缓存的视图组件 -->
    <!--  <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive> -->
    <!-- 不需要缓存的视图组件 -->
    <!-- <router-view v-if="!$route.meta.keepAlive"> </router-view> -->
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // include: [],
    };
  },
  /*  watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    },
  }, */
};
</script>

<style>
</style>