<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品类型搜索:">
          <el-input
            v-model="formInline.className"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="SearchClass"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格主体内容 -->
    <div class="result">
      <el-row class="operation">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          class="addBtn"
          @click="showDialog"
          >新建</el-button
        >
      </el-row>
      <template>
        <el-table :data="regionList" style="width: 100%" highlight-current-row>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="className" label="商品类型名称" width="1350">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                type="primary"
                class="el-button--text"
                @click.native="onEdit(scope.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                class="el-button--text"
                style="color: rgb(255, 90, 90)"
                @click="onRemove(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <Dialog
      ref="AddLog"
      :visiable.sync="dialogVisible"
      :visiabledia.sync="logVisible"
      @addSuccess="getClassgoods"
    ></Dialog>

    <!-- 分页 -->
    <Pagination
      :listIsShow="this.lastDisabled && this.rightDisabled"
      :taskList="nodeData"
      v-if="nodeData.totalCount"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="getLastTaskService"
      @nextPage="getNextTaskService"
    />
  </div>
</template>

<script>
import { getGoodsApi, deleteGoods } from "@/api/skugoods";
import Dialog from "@/views/sku/class/components/Dialog.vue";
import Pagination from "@/views/sku/class/components/pagination.vue"
export default {
  data() {
    return {
      formInline: {
        pageIndex: 1,
        pageSize: 10,
        className: "",
      },
      regionList: [],
      dialogVisible: false,
      logVisible: false,
      nodeData: {}, //主体内容数据
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    Dialog,
    Pagination
  },
  computed: {
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.nodeData.pageIndex <= 1;
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return (
        this.nodeData.pageIndex == Math.ceil(this.nodeData.totalCount / 10)
      );
    },
  },

  created() {
    this.getClassgoods();
  },

  methods: {
    //获取商品类别
    async getClassgoods() {
      const res = await getGoodsApi(this.params);
      console.log(res);
      this.regionList = res.data.currentPageRecords;
      this.nodeData = res.data;
    },
    // 加载下一页
    async getNextTaskService() {
      this.params.pageIndex++;
      this.getClassgoods();
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.getClassgoods();
    },

    // 删除
    async onRemove(val) {
      try {
        await this.$confirm("此操作将永久删除该商品类别, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        //当前要删除的行数据
        // console.log(val);
        await deleteGoods(val.classId);
        this.getClassgoods();
      } catch (error) {}
    },
    // 新建显示弹框
    showDialog() {
      this.dialogVisible = true;
      this.logVisible = false;
    },
    // 修改
    onEdit(val) {
      this.dialogVisible = true;
      // console.log(val);
      this.logVisible = true;
      this.$refs.AddLog.getClass(val);
    },
    // 头部查询方法
    async SearchClass() {
      const res = await getGoodsApi(this.formInline);
      console.log(res);
      this.regionList = res.data.currentPageRecords;
    },
  },
};
</script>

<style lang="scss" scoped>
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
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;

  .operation {
    margin-bottom: 20px;
    display: flex;

    .addBtn {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 80px !important;
      height: 36px;
      padding: 0;
      background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
      border: none;
    }
  }

  ::v-deep th {
    line-height: 1.15;
    padding: 10px 0px 9px;
    background: rgb(243, 246, 251);
    font-weight: 500;
    text-align: left;
    color: rgb(102, 102, 102);
  }

  ::v-deep .el-table td,
  .el-table th {
    border: none;
  }
  ::v-deep .el-table th.is-leaf {
    border-bottom: none;
  }

  .el-button--text {
    border-color: transparent;
    color: #5f84ff;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
  }

  ::v-deep .el-button--danger-text {
    color: rgb(255, 90, 90);
  }

  ::v-deep .el-table td {
    height: 47px;
    padding: 2px 0px;
    text-align: left;
    color: rgb(102, 102, 102);
  }

  .el-table::before {
    height: 0;
  }
}
</style>
