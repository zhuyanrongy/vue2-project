<template>
  <div>
    <el-button
      type="primary"
      plain
      style="margin-bottom: 10px"
      @click="printPdf"
      >打印</el-button
    >
    <hr />
    <Pagination :pageSize="pageSize" :total="total" @updatePage="updatePage" />
    <pdf ref="pdf" :src="src" :page="page"></pdf>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import pdf from "vue-pdf";
var loadingTask = pdf.createLoadingTask(
  "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"
);
export default {
  components: {
    pdf,
    Pagination,
  },
  data() {
    return {
      src: loadingTask,
      numPages: undefined,
      page: 1,
      pageSize: 1,
      total: 1,
    };
  },
  mounted() {
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
      this.total = pdf.numPages;
    });
  },
  methods: {
    updatePage(page) {
      this.page = page;
    },
    printPdf() {
      this.$refs.pdf.print();
    },
  },
};
</script>

<style>
</style>