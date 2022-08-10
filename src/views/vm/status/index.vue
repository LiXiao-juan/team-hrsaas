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
      <el-table-column prop="status" label="设备状态" width="300">
        <el-tag class="true">离线</el-tag>
        <el-tag class="false">货道</el-tag>
        <el-tag class="false">传动轴</el-tag>
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
    <FormDialog ref="dialog" />
  </div>
</template>

<script>
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import Pagination from "@/components/Pagination";
import FormDialog from "./components/FormDialog";
import { getVmList } from "@/api/vm";
import {
  getOrderCount,
  getOrderAmount,
  getSupplyCount,
  getRepairCount,
  getSkuCollect,
} from "@/api/vm-status";
import dayjs from "dayjs";
export default {
  components: {
    InputField,
    CustomButton,
    Pagination,
    FormDialog,
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
      /* 获取当月时间 */
      paramsMonth: {
        start: dayjs().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        end: dayjs().endOf("month").format("YYYY-MM-DD HH:mm:ss"),
      },
      /* 获取当月时间YYYY-MM-DD格式 */
      paramsMonths: {
        start: dayjs().startOf("month").format("YYYY-MM-DD"),
        end: dayjs().endOf("month").format("YYYY-MM-DD"),
      },
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
    status(row, column, index) {
      console.log(row, column, index);
      return;
    },
    /* 查看详情 */
    async viewDetails(index, row) {
      try {
        this.paramsMonth.innerCode = row.innerCode;
        this.paramsMonths.innerCode = row.innerCode;
        const res = await getOrderCount(this.paramsMonth);
        this.$refs.dialog.sales = res.data;
        const amount = await getOrderAmount(this.paramsMonth);
        this.$refs.dialog.amount = amount.data;
        const supplyCount = await getSupplyCount(this.paramsMonths);
        this.$refs.dialog.supplyCount = supplyCount.data;
        const repairCount = await getRepairCount(this.paramsMonths);
        this.$refs.dialog.repairCount = repairCount.data;
        const skuCollect = await getSkuCollect(this.paramsMonths);
        this.$refs.dialog.skuCollect = skuCollect.data;
      } catch (error) {
      } finally {
        this.$refs.dialog.dialogTableVisible = true;
      }
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
.true {
  height: 23px;
  padding: 0 12px;
  background: #ff665f linear-gradient(135deg, #ffb043, #ffc020);
  border-radius: 14px;
  text-align: center;
  color: #fff;
  line-height: 23px;
}
.false {
  height: 23px;
  padding: 0 12px;
  background: #ff665f linear-gradient(135deg, #3fc997, #4bda98);
  border-radius: 14px;
  text-align: center;
  color: #fff;
  line-height: 23px;
}
</style>
