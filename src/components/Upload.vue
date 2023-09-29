<template>
  <div>
    <el-upload
      :action="imgUploadUrl"
      list-type="picture-card"
      :on-success="onSuccess"
      ref="upload"
      :file-list="fileList"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { imgUploadUrl, baseUrl } from "@/api/base.js";
export default {
  props: ["fileList"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      imgUploadUrl, //图片上传地址
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /*handleRemove(file) {
      //删除添加的图片
      this.$refs.upload.handleRemove(file);
    }, */
    onSuccess(response, node) {
      let imgUrl = `${baseUrl}/${response.url.slice(7)}`;
      console.log("图片上传成功", response);
      this.$emit("uploadSuccess", imgUrl);
    },
    clearAll() {
      this.$refs.upload.clearFiles();
    },
  },
};
</script>

<style>
</style>