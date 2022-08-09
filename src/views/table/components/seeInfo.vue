<template>
  <el-dialog
    :title="title"
    :visible="allocationVisible"
    width="50%"
    center
    @close="$parent.dialogInfo = false"
  >
    <slot></slot>
    <br />
    <center>
      <el-button type="info" @click="confirm" size="mini" v-if="isCancel"
        >取消工单</el-button
      >
      <el-button type="info" size="mini" v-else @click="createAgain"
        >重新创建</el-button
      >
    </center>
  </el-dialog>
</template>

<script>
import { delTask } from "@/api/tickets";
export default {
  components: {},
  data() {
    return {
      centerDialogVisible: false,
      isCancel: true,
    };
  },
  created() {},
  methods: {
    cancel() {},
    // 取消工单
    confirm() {
      this.$confirm("取消工单后，将不能恢复，是否确认取消", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "danger",
      }).then(async () => {
        await delTask({
          desc: "",
          taskId: this.task_item.taskId,
        });
        this.$parent.dialogInfo = false;
        this.$message({
          type: "success",
          message: "取消成功!",
        });
      });
    },

    // 每次进入判断类型 --取消or待办
    showCancel(val) {
      if (val === "取消") {
        this.isCancel = false;
      } else {
        this.isCancel = true;
      }
    },

    // 重新创建
    createAgain() {
      this.$emit("toIndex");
    },
  },
  props: {
    title: {
      type: String,
      default: "提示",
    },
    allocationVisible: {
      type: Boolean,
      default: false,
    },
    // 工单对象数据
    task_item: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  border-radius: 10px;
  width: 630px;
}
</style>
