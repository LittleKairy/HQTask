<template>
  <!-- 上传到api需要授权，添加:headers属性 -->
  <el-upload
    class="avatar-uploader"
    action="/api/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headerToken"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  props: ["imageUrl"],
  methods: {
    // 上传成功的回调
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(res, file);
      if (!res.code && res.data) {
        // 上传成功
        this.$emit("imgUpload", res.data);
      }
      // this.$emit("imgChange", file.row);
    },
    // 上传之前的回调
    //   beforeAvatarUpload(file) {
    //     const isJPG = file.type === "image/jpeg";
    //     const isLt2M = file.size / 1024 / 1024 < 2;

    //     if (!isJPG) {
    //       this.$message.error("上传图片只能是 JPG 格式!");
    //     }
    //     if (!isLt2M) {
    //       this.$message.error("上传图片大小不能超过 2MB!");
    //     }
    //     return isJPG && isLt2M;
    //   },
  },
  computed: {
    headerToken() {
      return {
        Authorization: "Bearer " + getToken(),
      };
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
