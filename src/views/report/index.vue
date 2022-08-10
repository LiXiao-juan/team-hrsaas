<template>
  <div class="app-container">
    <!-- 对账统计 -->
    <div class="app-main">
      <!-- 统计栏 -->
      <div>
        <el-row class="statistics">
          <!-- 日销售统计 -->
          <el-col class="day">
            <div class="grid-content">
              日销售统计
              <div class="box">
                <el-col class="stats">
                  <div class="item">
                    <div class="num">{{ sales }}</div>
                    <div class="text">当日销售量（个）</div>
                  </div>
                </el-col>
                <el-col class="stats">
                  <div class="item">
                    <div class="num">{{ saleroom / 100 }}</div>
                    <div class="text">当前销售额（元）</div>
                  </div>
                </el-col>
                <el-col class="stats">
                  <div class="item">
                    <div class="num">{{ bill / 100 }}</div>
                    <div class="text">当日分成（元）</div>
                  </div>
                </el-col>
              </div>
            </div>
          </el-col>
          <!-- 月销售统计 -->
          <el-col class="month">
            <div class="grid-content">
              月销售统计
              <div class="box">
                <el-col class="stats">
                  <div class="item">
                    <div class="num">{{ salesMonth }}</div>
                    <div class="text">当月销售量（个）</div>
                  </div>
                </el-col>
                <el-col class="stats">
                  <div class="item">
                    <div class="num">
                      {{ (saleroomMonth / 1000000).toFixed(2) }}
                    </div>
                    <div class="text">当月销售额（万元）</div>
                  </div>
                </el-col>
                <el-col class="stats">
                  <div class="item">
                    <div class="num">{{ billMonth / 100 }}</div>
                    <div class="text">当月分成（元）</div>
                  </div>
                </el-col>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 主体 -->
      <div class="app">
        <!-- 查询 -->
        <div>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="合作商：" v-model="formData" class="label">
              <el-select placeholder="请选择" v-model="formData.partnerId">
                <el-option
                  v-for="item in partners"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  @click.native="paramsPage.partnerName = item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期：">
              <el-date-picker
                v-model="dataPicker"
                type="daterange"
                range-separator="~"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              >
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchFn"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 表头统计 -->
        <div class="report">
          <div class="stats">
            笔数统计：<span class="style">{{ customSales }}</span
            >个
          </div>
          <div class="stats">
            收入统计：<span class="style">{{ customSaleroom / 100 }}</span
            >元
          </div>
          <div class="stats">
            分成统计：<span class="style">{{ customBill / 100 }}</span
            >元
          </div>
        </div>
      </div>
      <el-table
        v-loading="loading"
        :data="listData.currentPageRecords"
        style="
          width: 100%;
          padding-left: 17px;
          padding-right: 17px;
          padding-top: 20px;
        "
        :cell-style="{ padding: '3px 0px ', border: 0, height: '44px' }"
        :header-cell-style="{ background: 'rgb(243, 246, 251)' }"
        empty-text="暂无数据"
        class="table"
      >
        <el-table-column prop="date" label="订单日期" width="280">
        </el-table-column>
        <el-table-column prop="ownerName" label="合作商" width="280">
        </el-table-column>
        <el-table-column prop="ratio" label="分成比例" width="280">
        </el-table-column>
        <el-table-column
          prop="orderTotalMoney"
          label="收入（元）"
          width="280"
          :formatter="orderTotalMoney"
        >
        </el-table-column>
        <el-table-column prop="orderCount" label="笔数" width="280">
        </el-table-column>
        <el-table-column
          prop="totalBill"
          label="分成金额（元）"
          width="280"
          :formatter="totalBill"
        >
        </el-table-column>
      </el-table>
      <Pagination
        :page="listData"
        v-if="listData.totalPage > 1"
        :upDisabled="upDisabled"
        :downDisabled="downDisabled"
        @pageDown="searchFn"
        @pageUp="searchFn"
      />
    </div>
  </div>
</template>

<script>
import {
  getOrderCount,
  getPartnerList,
  getOrderAmount,
  getTotalBill,
  getPartnerCollect,
} from "@/api/vm-status";
import dayjs from "dayjs";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      loading: false,
      formData: {
        partnerId: "",
        start: "",
        end: "",
      },
      /* 选择的起始日期 */
      dataPicker: [
        dayjs().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      ],
      partners: [], // 合作商
      /* 当天时间起始 */
      paramsDay: {
        start: dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        end: dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      },
      /* 当月起始 */
      paramsMonth: {
        start: dayjs().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        end: dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      },
      /* 当天销售量 */
      sales: "",
      /* 当天销售额 */
      saleroom: "",
      /* 当日分成 */
      bill: "",
      /* 当月销售量 */
      salesMonth: "",
      /* 当月销售额 */
      saleroomMonth: "",
      /* 当月分成 */
      billMonth: "",
      /* 自定义时间销售量 */
      customSales: "",
      /* 自定义时间销售额 */
      customSaleroom: "",
      /* 自定义时间分成 */
      customBill: "",
      paramsPage: {
        pageIndex: 1,
        pageSize: 10,
        start: "",
        end: "",
        partnerName: "",
      },
      /* 查询列表 */
      listData: {},
    };
  },
  created() {
    this.getPartnerList();
    /* 获取日 */
    this.getOrderCount(this.paramsDay);
    this.getOrderAmount(this.paramsDay);
    this.getTotalBill(this.paramsDay);
    /* 获取月 */
    this.getOrderCount(this.paramsMonth, "check");
    this.getOrderAmount(this.paramsMonth, "check");
    this.getTotalBill(this.paramsMonth, "check");
    this.searchFn();
  },
  methods: {
    /* 获取合作商列表 */
    async getPartnerList() {
      try {
        const res = await getPartnerList();
        this.partners = res.data.currentPageRecords;
      } catch (error) {}
    },
    /* 获取销售量 */
    async getOrderCount(val, check) {
      try {
        const res = await getOrderCount(val);
        if (check) {
          this.salesMonth = res.data;
        } else {
          this.sales = res.data;
        }
      } catch (error) {}
    },
    /* 获取销售额 */
    async getOrderAmount(val, check) {
      try {
        const res = await getOrderAmount(val);
        if (check) {
          this.saleroomMonth = res.data;
        } else {
          this.saleroom = res.data;
        }
      } catch {}
    },
    /* 获取分成 */
    async getTotalBill(val, check) {
      try {
        const res = await getTotalBill(val);
        if (check) {
          this.billMonth = res.data;
        } else {
          this.bill = res.data;
        }
      } catch (error) {}
    },
    /* 查询任意时间的账单信息 */
    async searchFn(val) {
      try {
        this.loading = true;
        this.formData.start = this.dataPicker[0];
        this.formData.end = this.dataPicker[1];
        this.paramsPage.start = this.dataPicker[0].substring(0, 10);
        this.paramsPage.end = this.dataPicker[1].substring(0, 10);
        const sales = await getOrderCount(this.formData);
        this.customSales = sales.data;
        const saleroom = await getOrderAmount(this.formData);
        this.customSaleroom = saleroom.data;
        const bill = await getTotalBill(this.formData);
        this.customBill = bill.data;
        if (val === "down") {
          this.paramsPage.pageIndex = parseInt(this.paramsPage.pageIndex) + 1;
          const listData = await getPartnerCollect(this.paramsPage);
          this.listData = listData.data;
        } else if (val === "up") {
          this.paramsPage.pageIndex = parseInt(this.paramsPage.pageIndex) - 1;
          const listData = await getPartnerCollect(this.paramsPage);
          this.listData = listData.data;
        } else {
          const listData = await getPartnerCollect(this.paramsPage);
          this.listData = listData.data;
        }
        if (this.paramsPage.pageIndex === parseInt(this.listData.totalPage)) {
          this.downDisabled = true;
          this.upDisabled = false;
        } else if (this.paramsPage.pageIndex === 1) {
          this.downDisabled = false;
          this.upDisabled = true;
        } else {
          this.downDisabled = false;
          this.upDisabled = false;
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    /* 格式化收入 */
    orderTotalMoney(row, column, index) {
      return index / 100;
    },
    /* 格式化分成金额 */
    totalBill(row, column, index) {
      return index / 100;
    },
  },
};
</script>

<style lang="scss">
.app-container {
  padding: 20px;
  margin-top: 15px;
}
.app-main {
  // 统计栏
  .statistics {
    // 日销售统计
    display: flex;
    .day {
      background: #e9f3ff;
      background-image: url(./assets/day.png), url(./assets/day1.png);
      background-repeat: no-repeat, no-repeat;
      background-position: 0 0, calc(100% - 12px) 100%;
      border-radius: 20px;
      margin-right: 10px;
    }
    // 月销售统计
    .month {
      background: #fbefe8 url(./assets/mon.png) no-repeat calc(100% - 12px) 100%;
      border-radius: 20px;
      margin-left: 10px;
    }
    .grid-content {
      height: calc(25vh - 30px);
      min-height: 166px;
      padding: 20px;
      border-radius: 20px;
      .box {
        display: flex;
        // justify-content: center;
        height: 100%;
        align-items: center;
        .stats {
          padding: 0 0;
          .item {
            .num {
              color: #072074;
              height: 50px;
              font-size: 36px;
              font-weight: 600;
              line-height: 50px;
              margin-left: 50px;
              text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
            }
            .text {
              height: 17px;
              margin-top: 3px;
              font-size: 12px;
              font-weight: 400;
              color: #91a7dc;
              line-height: 17px;
              margin-left: 50px;
            }
          }
        }
      }
    }
  }
  .app-main .statistics .month .grid-content .box .stats .item .num {
    color: #ff5757;
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
  }
  .app-main .statistics .month .grid-content .box .stats .text {
    color: #de9690;
  }
  .app-main .app {
    background-color: #fff;
    margin-top: 20px;
  }
  .report {
    display: flex;
    div {
      margin-right: 50px;
    }
  }
  .el-button--primary {
    color: #fff;
    background-color: #5f84ff;
    border-color: #5f84ff;
    margin-top: 20px;
  }
  .el-range-editor.el-input__inner {
    margin-top: 20px;
  }
  .el-input--suffix .el-input__inner {
    margin-top: 20px;
  }
  .el-select .el-input .el-select__caret {
    margin-top: 10px;
  }
  .el-form--inline .el-form-item__label {
    margin-top: 20px;
    margin-left: 10px;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
  }
  .style {
    font-size: 20px;
    color: #ff5757;
    font-weight: 500;
  }
  .stats {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
  .report {
    margin-left: 20px;
  }
  .label {
    margin-left: 18px;
  }
}
</style>
