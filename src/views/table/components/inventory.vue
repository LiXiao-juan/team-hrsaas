<template>
  <el-dialog
    :title="title"
    :visible="isShowInTask"
    width="50%"
    @close="$parent.isShowInTask = false"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    isShowInTask: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "未知",
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  border-radius: 10px;
}
</style>
