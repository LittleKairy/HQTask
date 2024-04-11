<template>
  <div class="app-container">
    <el-form :model="form" label-position="left">
      <el-form-item label="cusip" :label-width="formLabelWidth">
        <el-input v-model="form.cusip" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="productName" :label-width="formLabelWidth">
        <el-input v-model="form.productName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="productDescription" :label-width="formLabelWidth">
        <el-input
          v-model="form.productDescription"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="startingValue" :label-width="formLabelWidth">
        <el-input v-model="form.startingValue" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="minimumBidIncrement" :label-width="formLabelWidth">
        <el-input
          v-model="form.minimumBidIncrement"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="auctionDeadline" :label-width="formLabelWidth">
        <el-input v-model="form.auctionDeadline" autocomplete="off"></el-input
      ></el-form-item>
      <el-form-item class="btns"
        ><el-button
          @click="
            () => {
              handleReset();
              dialogFormVisible = false;
            }
          "
          >Reset</el-button
        >
        <el-button
          type="primary"
          @click="
            () => {
              handleSubmit();
              dialogFormVisible = false;
            }
          "
          >Submit</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
import { addProduct } from "@/api/product";
export default {
  data() {
    return {
      // 表单相关
      dialogFormVisible: false,
      form: {}, // form中的description为字符串
      formTitle: "ADD PRODUCT",
      formLabelWidth: "170px",
    };
  },
  methods: {
    handleReset() {
      this.form = {};
    },
    handleSubmit() {
      addProduct(this.form)
        .then((resp) => {
          console.log(resp.data);
          this.$message.success("add a product successfully");
          this.form = {};
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style scope>
.el-form {
  width: 500px;
  margin: 0 auto;
}

.btns {
  float: right;
  margin-top: 1em;
}
</style>
