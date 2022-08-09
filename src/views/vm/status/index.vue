<template>
  <div class="business-container">
    <div class="business-search">
      <span>设备编号:</span><InputField ref="inputContent" /><CustomButton
        class="btn"
        iconType="el-icon-search"
        @click.native="searchFn"
        >查询</CustomButton
      >
    </div>
    <el-table
      :data="vmList.currentPageRecords"
      style="
        width: 100%;
        padding-left: 17px;
        padding-right: 17px;
        padding-top: 20px;
      "
      :cell-style="{ padding: '3px 0px ', border: 0 }"
      :header-cell-style="{ background: 'rgb(243, 246, 251)' }"
      empty-text="暂无数据"
      class="table"
    >
      <el-table-column
        label="序号"
        width="80"
        type="index"
        :index="table_index"
      >
      </el-table-column>
      <el-table-column prop="innerCode" label="设备编号" width="300">
      </el-table-column>
      <el-table-column prop="type.name" label="设备型号" width="300">
      </el-table-column>
      <el-table-column prop="node.addr" label="详细地址" width="300">
      </el-table-column>
      <el-table-column
        prop="vmStatus"
        :formatter="vmStatus"
        label="运营状态"
        width="300"
      >
      </el-table-column>
      <el-table-column prop="progressTotal" label="设备状态" width="300">
        <el-tag>离线</el-tag>
        <el-tag>货道</el-tag>
        <el-tag>传动轴</el-tag>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="medium"
            style="color: #5f84ff"
            @click="viewDetails(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-if="vmList.totalPage > 1"
      :page="vmList"
      :upDisabled="upDisabled"
      :downDisabled="downDisabled"
      @pageDown="getVmList"
      @pageUp="getVmList"
    />
  </div>
</template>

<script>
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import Pagination from "@/components/Pagination";
import { getVmList } from "@/api/vm";
export default {
  components: {
    InputField,
    CustomButton,
    Pagination,
  },
  data() {
    return {
      /* 获取列表所需参数 */
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
      /* 售货机列表 */
      vmList: [],
    };
  },
  created() {
    this.getVmList();
  },
  methods: {
    table_index(index) {
      return index + (this.params.pageIndex - 1) * this.params.pageSize + 1;
    },
    /* 搜索售货机(售货机列表) */
    async getVmList(val) {
      try {
        if (val === "down") {
          this.params.pageIndex = parseInt(this.params.pageIndex) + 1;
          const res = await getVmList(this.params);
          this.vmList = res.data;
        } else if (val === "up") {
          this.params.pageIndex = parseInt(this.params.pageIndex) - 1;
          const res = await getVmList(this.params);
          this.vmList = res.data;
        } else {
          const res = await getVmList(this.params);
          this.vmList = res.data;
          // console.log(this.vmList);
        }
        if (this.params.pageIndex === parseInt(this.vmList.totalPage)) {
          this.downDisabled = true;
          this.upDisabled = false;
        } else if (this.params.pageIndex === 1) {
          this.downDisabled = false;
          this.upDisabled = true;
        } else {
          this.downDisabled = false;
          this.upDisabled = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /* 运营状态格式化 */
    vmStatus(row, column, index) {
      return ["未投放", "运营", "", "撤机"][index];
    },
    /* 查看详情 */
    viewDetails(index, row) {
      // console.log(index, row);
    },
  },
};
</script>

<style lang="scss" scoped>
.business {
  &-container {
    margin: 12px 20px 20px;
    padding-top: 20px;
    text-align: center;
  }
  &-search {
    display: flex;
    -webkit-box-align: center;
    height: 64px;
    background-color: #fff;
    line-height: 64px;
    margin-bottom: 20px;
    // align-items: center;
    span {
      padding: 0 17px;
      font-size: 14px;
      color: #606266;
    }
    .btn {
      margin-left: 10px;
    }
  }
}
</style>
