<template>
  <div class="app-container">
    <el-form :model="form" label-position="left">
      <el-form-item label="CUSIP" :label-width="formLabelWidth">
        <el-input v-model="form.cusip" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Product Name" :label-width="formLabelWidth">
        <el-input v-model="form.productname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Product Description" :label-width="formLabelWidth">
        <el-input
          v-model="form.productdescription"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Positions" :label-width="formLabelWidth">
        <el-input v-model="form.position" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Start Value" :label-width="formLabelWidth">
        <el-input v-model="form.startingvalue" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Minimum Bid Increment" :label-width="formLabelWidth">
        <el-input
          v-model="form.minimumbidincrement"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Deadline" :label-width="formLabelWidth">
        <el-date-picker style="width: 320px;" v-model="date" type="date" placeholder="Pick a day" ></el-date-picker>
        <!-- <el-input v-model="auctiondeadline" autocomplete="off"></el-input> -->
      </el-form-item>
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
      formLabelWidth: "180px",
      date: null,
    };
  },
  methods: {
    handleReset() {
      this.form = {};
      this.date = null;
    },
    formatDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      return year + '-' + month + '-' + day;
    },
    handleSubmit() {
      this.form.auctiondeadline = this.formatDate(this.date);
      console.log(this.form);
      addProduct(this.form).then((resp) => {
        console.log(resp.data);
        this.$message.success("add a product successfully");
        this.form = {};
        this.date = null;
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
