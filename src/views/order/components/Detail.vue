<template>
  <el-dialog title="订单详情" :visible="visible" @close="onClose">
    <div class="el-dialog-body">
      <!-- 未成功的显示 -->
      <div class="order-status">
        <img
          src="./assets/left.png"
          class="left"
          v-if="detailDate.status == 0"
        />
        <img src="./assets/suc.png" class="left" v-else />
        <span class="status">{{
          { 0: "未支付", 1: "支付完成", 2: "出货成功", 3: "出货失败" }[
            detailDate.status
          ]
        }}</span>
        <img
          src="./assets/fail.png"
          class="right"
          v-if="detailDate.status == 0"
        />
        <img src="./assets/success.png" class="right" v-else />
      </div>

      <!-- 详情列表 -->
      <el-row>
        <el-col :span="12">订单编号：{{ detailDate.orderNo }}</el-col>
        <el-col :span="12">商品名称：{{ detailDate.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">订单金额：{{ detailDate.amount / 100 }}</el-col>
        <el-col :span="12">设备编号：{{ detailDate.innerCode }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">创建时间：{{ detailDate.updateTime }}</el-col>
        <el-col :span="12">完成时间：{{ detailDate.createTime }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          >支付方式：{{
            { 1: "支付宝支付", 2: "微信支付" }[detailDate.payType]
          }}</el-col
        >
        <el-col :span="12">设备地址：{{ detailDate.addr }}</el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Detail",
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
      this.$emit("update:visible", false);
    },
    getRowDetail(val) {
      console.log(val);
      val.updateTime = dayjs(val.updateTime).format("YYYY-MM-DD HH:mm:ss");
      val.createTime = dayjs(val.createTime).format("YYYY-MM-DD HH:mm:ss");
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
::v-deep .left {
  margin-left: 20px;
}
::v-deep .right {
  margin-right: 40px;
}
</style>
