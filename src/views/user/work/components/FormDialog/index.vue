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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="" width="116"> </el-table-column>
      <el-table-column prop="name" label="总工单数" width="116">
      </el-table-column>
      <el-table-column prop="address" label="拒绝工单" width="116">
      </el-table-column>
      <el-table-column prop="address" label="完成工单" width="116">
      </el-table-column>
      <el-table-column prop="address" label="进行中工单" width="116">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      detailInfo: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dialogTableVisible: false,
    };
  },
};
</script>

<style lang="scss" scoped>
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
