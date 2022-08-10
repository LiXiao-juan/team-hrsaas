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
                    <div class="num">0</div>
                    <div class="text">当日销售量（个）</div>
                  </div>
                </el-col>
                <el-col class="stats">
                  <div class="item">
                    <div class="num">0</div>
                    <div class="text">当前销售额（元）</div>
                  </div>
                </el-col>
                <el-col class="stats">
                  <div class="item">
                    <div class="num">0</div>
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
                    <div class="num">4053</div>
                    <div class="text">当月销售量（个）</div>
                  </div>
                </el-col>
                <el-col class="stats">
                  <div class="item">
                    <div class="num">2.82</div>
                    <div class="text">当月销售额（万元）</div>
                  </div>
                </el-col>
                <el-col class="stats">
                  <div class="item">
                    <div class="num">38.64</div>
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
                <el-option></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期：">
              <el-date-picker
                v-model="formData.dateArr"
                type="daterange"
                range-separator="~"
                :start-placeholder="start"
                :end-placeholder="end"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                :picker-options="pickerOptions"
              >
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表头统计 -->
        <div class="report">
          <div class="stats">笔数统计：<span class="style">4053</span>个</div>
          <div class="stats">
            收入统计：<span class="style">28207.49</span>元
          </div>
          <div class="stats">分成统计：<span class="style">38.64</span>元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        partnerId: "",
        dateArr: [],
      },
      partners: [], // 合作商
    };
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
  .label{
    margin-left: 18px;
  }
}
</style>
