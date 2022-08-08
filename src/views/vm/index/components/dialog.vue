<template>
  <el-dialog
    :title="title"
    :visible="Visible"
    width="50%"
    @close="$emit('closeEdit')"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('closeEdit')">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    Visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "提示",
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">

</style>
