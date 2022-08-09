0
<template>
  <el-dialog
    title="人员详情"
    :visible.sync="dialogTableVisible"
    :close-on-click-modal="false"
    width="630px"
  >
    <el-row>
      <el-col :span="9"
        ><div class="grid-content bg-purple">
          人员名称：{{ detailInfo.userName }}
        </div></el-col
      >
      <el-col :span="7"
        ><div class="grid-content bg-purple-light">
          角色：{{ detailInfo.roleName }}
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          联系电话：{{ detailInfo.mobile }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          负责区域：{{ detailInfo.regionName }}
        </div></el-col
      >
    </el-row>
    <el-table :data="workCount" border style="width: 100%">
      <el-table-column prop="date" label="" width="117"> </el-table-column>
      <el-table-column prop="total" label="总工单数" width="117">
      </el-table-column>
      <el-table-column prop="cancelCount" label="拒绝工单" width="117">
      </el-table-column>
      <el-table-column prop="workCount" label="完成工单" width="117">
      </el-table-column>
      <el-table-column prop="progressTotal" label="进行中工单" width="117">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      detailInfo: {},
      dialogTableVisible: false,
      workCount: [],
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
  .el-row {
    height: 43px;
    line-height: 43px;
    padding: 0 19px;
    text-align: left;
    background: #f3f6fb;
  }
}
</style>
