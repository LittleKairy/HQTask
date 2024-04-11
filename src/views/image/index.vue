<template>
  <div class="app-container">
    <div class="images">
      <el-image :src="url" :preview-src-list="srcList" fit="fill"> </el-image>
    </div>
  </div>
</template>

<script>
import image1 from "@/assets/images/1.png";
import image2 from "@/assets/images/2.png";
import image3 from "@/assets/images/3.png";
import image4 from "@/assets/images/4.png";
import image5 from "@/assets/images/5.png";
import image6 from "@/assets/images/6.png";
export default {
  data() {
    return {
      // url: "image1",
      // srcList: [
      //   "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      //   "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      // ],
    };
  },
  computed: {
    srcList() {
      return [image1, image2, image3, image4, image5, image6];
    },
    url() {
      return image5;
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: calc(100vh - 50px);
  position: relative;
}
.images {
  width: 800px;
  height: 500px;
  overflow: hidden;
}
</style>
