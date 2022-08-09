0
<template>
  <el-dialog
    title="人员详情"
    :visible.sync="dialogTableVisible"
    :close-on-click-modal="false"
    width="630px"
  >
    <el-row class="el-title">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          销售量：<span class="current">{{ sales }}</span
          >个
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">
          销售额：<span class="current">{{ amount / 100 }}</span
          >元
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          补货次数：<span class="current">{{ supplyCount }}</span
          >次
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          维修次数：<span class="current">{{ repairCount }}</span
          >次
        </div></el-col
      >
    </el-row>
    <div class="sku-title">商品销量（月）</div>
    <el-row class="list">
      <el-col :span="6" v-for="item in skuCollect" :key="item.skuName"
        >{{ item.skuName }}:{{ item.count }}
        <div class="grid-content bg-purple"></div
      ></el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      detailInfo: {},
      dialogTableVisible: false,
      sales: "",
      amount: "",
      supplyCount: "",
      repairCount: "",
      skuCollect: [],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 10px;
}
::v-deep .el-dialog__header {
  border-bottom: none !important;
  padding: 20px;
  padding-bottom: 10px;
  text-align: left;
  .el-dialog__title {
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
}
::v-deep .el-dialog__body {
  padding: 20px 20px 30px;
  color: #666;
  .el-title .el-row {
    height: 43px;
    line-height: 43px;
    padding: 0 19px;
    text-align: left;
    background: #f3f6fb;
  }
}
.sku-title {
  margin: 20px 0 12px 6px;
  font-size: 14px;
  word-break: break-all;
  color: #666;
  text-align: left;
}
.list > .el-col {
  padding: 0 10px;
  line-height: 40px;
  border-right: 1px solid #d8dde3;
  border-bottom: 1px solid #d8dde3;
}
.current {
  color: #5f84ff;
}
</style>
