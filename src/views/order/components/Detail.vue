<template>
  <el-dialog title="订单详情" @close="onClose" :visible="visible">
    <div class="el-dialog-body">
      <div class="order-status">
        <img src="./assets/left.png" alt="" srcset="" />
        <span class="status">未支付</span>
        <img src="./assets/fail.png" alt="" srcset="" />
      </div>

      <el-row>
        <el-col :span="12">订单编号：{{ detailDate.orderNo }}</el-col>
        <el-col :span="12">商品名称：{{ detailDate.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">订单金额：{{ detailDate.amount }}</el-col>
        <el-col :span="12">设备编号：{{ detailDate.innerCode }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">创建时间：{{ detailDate.updateTime }}</el-col>
        <el-col :span="12">完成时间：{{ detailDate.createTime }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">支付方式：{{ detailDate.payType }}</el-col>
        <el-col :span="12">设备地址：{{ detailDate.addr }}</el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      detailDate: {},
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  created() {},

  methods: {
    onClose() {
      this.$emit("update:visiable", false);
    },
    getRowDetail(val) {
      this.detailDate = val;
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  box-sizing: border-box;
  margin-top: 15vh;
  width: 630px;
  border-radius: 10px;
}
::v-deep .order-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  margin-bottom: 30px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
  .status {
    flex: 1;
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
}
::v-deep .el-col-12 {
  height: 40px;
}
::v-deep .el-row {
  margin-left: 40px;
}
</style>
