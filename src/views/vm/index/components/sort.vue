<template>
  <el-dialog title="智能排货" :visible="visible" width="700px" @close="onClose">
    <h3>该区域属于{{ $store.state.tickets.goodsInfo }}适合销售以下商品</h3>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onClose" class="confirmBtn"
        >采纳建议</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  created() {},
  computed: {},
  methods: {
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 10px;
}
::v-deep .el-dialog__title {
  font-size: 16px;
  font-weight: 600;
}
::v-deep .el-dialog .el-dialog__body .el-form-item .el-form-item__content {
  width: 396px;
  line-height: 36px;
}
::v-deep label {
  font-weight: normal;
}
.el-dialog .el-dialog__body .el-form-item:last-child {
  margin-bottom: 0;
}
.el-dialog .el-dialog__footer .dialog-footer {
  padding-top: 0;
  text-align: center;
}
.el-dialog .el-dialog__footer .dialog-footer .el-button + .el-button {
  margin-left: 34px !important;
}
.cancleBtn {
  background-color: #fbf4f0 !important;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: none;
  color: #655b56 !important;
}

.confirmBtn {
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: none;
}
::v-deep .el-input-number {
  width: 360px;
  height: 36px;
}
::v-deep .el-input {
  width: 360px;
  height: 36px;
  margin-left: 30px;
}
</style>
