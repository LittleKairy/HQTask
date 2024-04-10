<template>
  <div class="register-container">
    <LoginForm :type="'register'" @submit="handleSubmit" />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  components: {
    LoginForm,
  },
  methods: {
    async handleSubmit(form) {
      const loginForm = {
        username: form.username.trim(),
        password: form.password.trim(),
      };
      try {
        const data = await this.$store.dispatch("user/register", loginForm);
        console.log(data);
        this.$message.success("注册成功，请返回登录界面进行登录");
        this.$router.push({ path: "/login" });
      } catch (err) {
        console.log(err);
        this.$message.error("发生了一些错误...请稍后再试");
        this.$router.push({ path: "/register" });
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  height: 100%;
}
</style>
