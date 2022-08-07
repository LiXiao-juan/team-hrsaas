<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="策略搜索:">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格主体内容 -->
    <div class="main">
      <!-- 新建按钮 -->
      <el-button
        class="button"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="showAdd"
        >新建</el-button
      >
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column type="index" label="序号" width="100px">
        </el-table-column>
        <el-table-column prop="policyName" label="策略名称" width="200px">
        </el-table-column>
        <el-table-column prop="discount" label="策略方案" width="200px">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="300px"
          :formatter="creatTime"
        >
        </el-table-column>
        <el-table-column label="操作" class="cell">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row)">
              <span>查看详情</span></el-button
            >
            <el-button type="text" @click="showUpdate(scope.row)">
              <span>修改</span></el-button
            >
            <el-button type="text" @click="onRemove(scope.row)"
              ><span class="del">删除</span></el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增修改弹窗组件 -->
    <Adddialog
      ref="AddLog"
      :visiable.sync="dialogVisible"
      @addSuccess="getPolicy"
    ></Adddialog>
    <!-- 查看详情弹窗组件 -->
    <Detaildialog :visiable.sync="disVisible" :rowList="rowList"></Detaildialog>
  </div>
</template>

<script>
import { getPolicyApi, DeletePolicyApi } from "@/api/policy";
import dayjs from "dayjs";
import Adddialog from "@/views/policy/components/Adddialog.vue";
import Detaildialog from "@/views/policy/components/Detaildialog.vue";
export default {
  data() {
    return {
      formInline: {
        user: "",
      },
      tableData: [],
      dialogVisible: false,
      disVisible: false,
      // 要修改的一行数据
      rowList: {},
    };
  },
  created() {
    this.getPolicy();
  },
  methods: {
    async getPolicy() {
      const res = await getPolicyApi();
      console.log(res);
      this.tableData = res.data.currentPageRecords;
    },
    creatTime(row, column, index) {
      return dayjs(index).format("YYYY-MM-DD HH:mm:ss");
    },
    // 展示添加弹层
    showAdd() {
      this.dialogVisible = true;
    },
    // 展示修改弹层
    showUpdate(val) {
      this.dialogVisible = true;
      // console.log(val);
      this.rowList = val;
      console.log(this.rowList);
    },
    // 展示查看详情弹层
    showDetail() {
      this.disVisible = true;
    },
    async onRemove(val) {
      try {
        await this.$confirm("此操作将永久删除该策略, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        //当前要删除的行数据
        // console.log(val);
        await DeletePolicyApi(val.policyId);
        this.getPolicy();
      } catch (error) {}
    },
  },
  components: {
    Adddialog,
    Detaildialog,
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
}
.main {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px !important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
    border: none;
  }
  .table {
    margin-top: 10px;
  }
  .del {
    color: #ff5a5a;
  }
}
</style>
