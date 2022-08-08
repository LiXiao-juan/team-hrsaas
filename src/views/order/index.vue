<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单编号:">
          <el-input
            v-model="formInline.user"
            placeholder="请输入订单编号"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="选择日期:">
          <el-date-picker
            class="picker"
            v-model="value"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 主体部分 -->
    <div class="main">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column type="index" label="序号" width="100px">
        </el-table-column>
        <el-table-column prop="orderNo" label="订单编号" width="270px">
        </el-table-column>
        <el-table-column prop="skuName" label="商品名称" width="200px">
        </el-table-column>
        <el-table-column prop="amount" label="订单金额(元)" width="200px">
        </el-table-column>
        <el-table-column prop="innerCode" label="设备编号" width="200px">
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          width="200px"
          :formatter="statusFn"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="订单日期"
          width="200px"
          :formatter="dateFn"
        >
        </el-table-column>
        <el-table-column label="操作" class="cell">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row)">
              <span>查看详情</span></el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" align="middle" class="footer">
        <el-col class="text"
          >共{{ pagedate.totalCount }}条记录 第{{ pagedate.pageIndex }}/{{
            pagedate.totalPage
          }}页</el-col
        >
        <el-col>
          <el-row type="flex" justify="end">
            <div class="left" @click="pageUp">上一页</div>
            <div class="right" @click="pageDown">下一页</div>
          </el-row>
        </el-col>
      </el-row>
      <!-- 查看详情弹窗 -->
      <Detail ref="deTail" :visible.sync="dialogTableVisible"></Detail>
    </div>
  </div>
</template>

<script>
import Detail from "@/views/order/components/Detail.vue";
import dayjs from "dayjs";
import { getSearchOrder } from "@/api/order";
export default {
  data() {
    return {
      formInline: {
        user: "",
      },
      value: "",
      tableData: [],
      pagedate: {
        pageIndex: 1,
        pageSize: 10,
        totalPage: "",
      },
      dialogTableVisible: false,
    };
  },
  components: {
    Detail,
  },
  created() {
    this.SearchOrder();
  },
  methods: {
    showDetail(val) {
      this.dialogTableVisible = true;
      // console.log(val);
      this.$refs.deTail.getRowDetail(val);
    },
    async SearchOrder() {
      const res = await getSearchOrder();
      // console.log(res);
      this.tableData = res.data.currentPageRecords;
      this.pagedate = res.data;
      console.log(this.pagedate);
    },
    statusFn(row, column, index) {
      return ["未支付", "支付完成", "出货成功", "出货失败"][index];
    },
    dateFn(row, column, index) {
      return dayjs(index).format("YYYY-MM-DD HH:mm:ss");
    },
    // 上一页
    pageUp() {},
    // 下一页
    pageDown() {},
  },
};
</script>

<style scoped lang="scss">
.search {
  display: flex;
  height: 64px;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 12px;
  background-color: #fff;
  .el-button--primary {
    color: #fff;
    background-color: #5f84ff;
    border-color: #5f84ff;
  }

  ::v-deep .el-form-item__label {
    margin-top: 20px;
    font-weight: 400;
  }
  ::v-deep .el-button {
    margin-top: 22px;
  }
  ::v-deep .el-input {
    margin-top: 22px;
  }
  ::v-deep .picker {
    margin-top: 22px;
  }
}
::v-deep .main {
  background-color: #fff;
}
::v-deep th {
  line-height: 1.15;
  padding: 10px 0px 9px;
  background: rgb(243, 246, 251);
  font-weight: 500;
  text-align: left;
  color: rgb(102, 102, 102);
}
.footer {
  padding-left: 30px;
  height: 70px;
  .text {
    color: #dbdfe5;
  }
  .left,
  .right {
    cursor: pointer;
    margin-right: 60px;
    width: 70px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #d5ddf8;
    color: #606266;
    font-size: 13px;
  }
  .left {
    margin-right: 30px;
  }
  .disabled {
    background-color: #edf0f9;
    color: #d8dde3;
    cursor: not-allowed;
  }
}
</style>
