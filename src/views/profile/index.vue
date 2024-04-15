<template>
  <div class="app-container">
    <el-form :model="form" label-position="left">
      <el-form-item label="User Name" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="Email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="Phone Number" :label-width="formLabelWidth">
        <el-input v-model="form.phonenumber" autocomplete="off" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        phonenumber: ''
      }
    };
  },
  created() {
    getUserProfile().then(response => {
      this.form.username = response.data.username;
      this.form.email = response.data.email;
      this.form.phonenumber = response.data.phoneNumber;
    });
  }
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