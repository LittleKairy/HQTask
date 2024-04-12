<template>
  <div class="login-container">
    <LoginForm :type="'login'" @submit="handleSubmit" />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import { setUsername } from "@/utils/auth";
import {login} from "@/api/user";
export default {
  components: {
    LoginForm,
  },
  methods: {
    handleSubmit(form) {
      const loginForm = {
        username: form.username,
        password: form.password,
      };
      console.log(loginForm);
     
        login(loginForm).then(resp=>{
          console.log(resp);
          setUsername(loginForm.username);
          this.$message.success(`Welcome Dear ${loginForm.username}`);
          this.$router.push({ path: this.redirect || "/" });
        }).catch(err=>{
          // console.log("err11",err);
          // this.$message.error(err);
          this.$router.push({name:"Login" || "/" });
      });
     
      // this.$router.push({ path: this.redirect || "/" });
      // setUsername(loginForm.username);
    },
  },
};
</script>

<style scoped>
.login-container {
  height: 100%;
}
</style>
