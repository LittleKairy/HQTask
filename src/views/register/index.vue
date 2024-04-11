<template>
  <div class="register-container">
    <LoginForm :type="'register'" @submit="handleSubmit" />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import {register} from "@/api/user";
export default {
  components: {
    LoginForm,
  },
  methods: {
    handleSubmit(form) {
      const loginForm = {
        username: form.username.trim(),
        password: form.password.trim(),
      };
      console.log(loginForm);
     
     register(loginForm).then(resp=>{
       console.log(resp);
       this.$message.success("注册成功，请返回登录页面进行登录");
       this.$router.push({ name:"Login" || "/" });
     }).catch(err=>{
      console.log(err);
       this.$router.push({name:"Register" || "/" });
   });
    },
  },
};
</script>

<style scoped>
.register-container {
  height: 100%;
}
</style>
