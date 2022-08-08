<template>
  <el-dialog
    :title="title"
    :visible="allocationVisible"
    width="30%"
    @close="$parent.allocation = false"
  >
    <!-- 插槽 -->
    <slot></slot>
    <br />
    <center v-if="isShowBtn">
      <el-button size="small" @click="$parent.allocation = false"
        >取 消</el-button
      >
      <el-button type="primary" size="small" @click="confirm">确 定</el-button>
    </center>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "提示",
    },
    allocationVisible: {
      type: Boolean,
    },
    isShowBtn: {
      type: Boolean,
      default: true,
    },
  },
  created() {},
  methods: {
    confirm() {
      this.$parent.allocation = false;
      this.$emit("setAllocation");
    },
  },
};
</script>

<style scoped lang="scss"></style>
