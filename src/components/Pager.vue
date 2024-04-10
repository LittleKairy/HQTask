<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="total"
    layout="total, prev, pager, next, ->, sizes, jumper"
  >
  </el-pagination>
</template>

<script>
export default {
  props: ["currentPage", "pageSize", "total", "pageSizes"],
  methods: {
    handleCurrentChange(newPage) {
      this.$emit("currentChange", newPage);
    },
    handleSizeChange(newSize) {
      this.$emit("sizeChange", newSize);
    },
  },
};
</script>
