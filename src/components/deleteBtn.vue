<template>
  <el-popover placement="top" width="160" v-model="visible">
    <p>Are you sure？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">no</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="
          () => {
            handleClick();
            visible = false;
          }
        "
        >yes</el-button
      >
    </div>
    <el-button plain slot="reference">Cancle</el-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleClick() {
      this.$emit("deleteBtnClick");
    },
  },
};
</script>
