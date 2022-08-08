<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品搜索:">
          <el-input
            v-model="formInline.skuName"
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

    <!-- 中间主体 -->
    <div class="result">
      <div class="operation">
        <el-button
          class="button"
          icon="el-icon-circle-plus-outline"
          @click="showAdd"
        >
          新建</el-button
        >
        <el-button class="secondary">导入数据</el-button>
      </div>

      <!-- 表格 -->
      <template>
        <el-table :data="regionList" style="width: 100%" highlight-current-row>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="skuName" label="商品名称" width="200">
          </el-table-column>
          <el-table-column label="商品图片" width="170">
            <template slot-scope="scope">
              <img
                :src="scope.row.skuImage"
                style="width: 24px; height: 24px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="brandName" label="品牌" width="220">
          </el-table-column>
          <el-table-column prop="unit" label="规格" width="220">
          </el-table-column>
          <el-table-column prop="price" label="商品价格" width="220">
          </el-table-column>
          <el-table-column
            prop="skuClass.className"
            label="商品类型"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建日期"
            width="210"
            :formatter="Time"
          >
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="primary"
                class="el-button--text"
                @click="editData(scope.row)"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 弹窗 -->
      <Dialogsku
        ref="AddDialogsku"
        :visiable.sync="dialogVisible"
        :visiabledia.sync="logVisible"
      ></Dialogsku>
    </div>
  </div>
</template>

<script>
import Dialogsku from "@/views/sku/sku/components/Dialogsku.vue";
import { getGoodsType } from "@/api/sku";
import dayjs from "dayjs";
export default {
  data() {
    return {
      formInline: {
        pageIndex: 1,
        pageSize: 10,
        skuName: "",
      },
      regionList: [],
      dialogVisible: false,
      logVisible: false,
    };
  },
  components: {
    Dialogsku,
  },
  created() {
    this.getGoodsDetail();
  },
  methods: {
    // 商品详情
    async getGoodsDetail() {
      const res = await getGoodsType();
      console.log(res);
      this.regionList = res.data.currentPageRecords;
    },
    // 展示新建弹层
    showAdd() {
      this.dialogVisible = true;
      this.logVisible = false;
    },
    // 修改操作弹层
    editData() {
      this.dialogVisible = true;
      console.log(val);
      this.logVisible = true;
    },
    // 头部查询
    async SearchClass() {
      const res = await getGoodsType(this.formInline);
      // // console.log(res);
      this.regionList = res.data.currentPageRecords;
    },
    // 处理时间
    Time(row, column, index) {
      return dayjs(index).format("YYYY-MM-DD HH:mm:ss");
    },
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
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  width: 100%;
  .button {
    width: 80px !important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
    border: none;
    color: #fff;
    margin-bottom: 20px;
  }
  .secondary {
    background-color: #f3e7e1 !important;
    width: 80px !important;
    height: 36px;
    padding: 0;
    color: #655b56 !important;
    margin-bottom: 20px;
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
::v-deep .el-table td {
  height: 47px;
  padding: 2px 0px;
  text-align: left;
  color: rgb(102, 102, 102);
}
</style>
