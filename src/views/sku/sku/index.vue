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
        <el-button class="secondary" @click="Upload">导入数据</el-button>
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
          <el-table-column
            prop="price"
            label="商品价格"
            width="220"
            :formatter="Price"
          >
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
        :goodsList="goodsList"
        @addSuccess="getGoodsDetail"
      ></Dialogsku>

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

      <Upload :visiableUp.sync="showUpdate"></Upload>
    </div>
  </div>
</template>

<script>
import Upload from "@/views/sku/sku/components/Upload.vue";
import Dialogsku from "@/views/sku/sku/components/Dialogsku.vue";
import { getGoodsType } from "@/api/sku";
import { getGoodsApi } from "@/api/skugoods";
import Pagination from "@/views/sku/sku/components/pagination.vue";
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
      showUpdate: false,
      nodeData: {}, //主体内容数据
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
      goodsList: [],
    };
  },
  components: {
    Dialogsku,
    Pagination,
    Upload,
  },
  created() {
    this.getGoodsDetail();
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
  methods: {
    // 商品详情
    async getGoodsDetail() {
      const res = await getGoodsType(this.params);
      console.log(res);
      this.regionList = res.data.currentPageRecords;
      this.nodeData = res.data;
    },
    // 加载下一页
    async getNextTaskService() {
      this.params.pageIndex++;
      this.getGoodsDetail();
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.getGoodsDetail();
    },
    // 展示新建弹层
    async showAdd() {
      this.dialogVisible = true;
      this.logVisible = false;
      const res = await getGoodsApi();
      // console.log(res);
      this.goodsList = res.data.currentPageRecords;
    },

    // 修改操作弹层
    async editData(val) {
      this.dialogVisible = true;
      console.log(val);
      this.logVisible = true;
      this.$refs.AddDialogsku.getGoodsType(val);
      const res = await getGoodsApi();
      // console.log(res);
      this.goodsList = res.data.currentPageRecords;
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
    Price(row, column, index) {
      return index / 100;
    },
    Upload() {
      this.showUpdate = true;
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
