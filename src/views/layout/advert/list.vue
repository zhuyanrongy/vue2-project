<template>
  <div class="advert">
    <el-row :gutter="100">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <AdvertTreeVue />
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple content-r">
          <AdvertContent />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AdvertTreeVue from "./AdvertTree.vue";
import AdvertContent from "./AdvertContent.vue";
export default {
  components: { AdvertTreeVue, AdvertContent },
  data() {
    return {};
  },
};
</script>

