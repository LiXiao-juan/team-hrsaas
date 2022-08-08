<template>
  <div style="width: 100%; height: 100%">
    <el-table
      :data="taskList"
      style="width: 100%"
      :border="false"
      class="font table-box"
      :header-row-style="{ background: '#f3f6fb' }"
    >
      <el-table-column type="index" label="序号" width="50%" class="font">
      </el-table-column>
      <el-table-column prop="taskCode" label="工单编号" width="170%">
      </el-table-column>
      <el-table-column prop="innerCode" label="设备编号" width="170%">
      </el-table-column>
      <el-table-column prop="taskType.typeName" label="工单类型" width="170%">
      </el-table-column>
      <el-table-column
        :formatter="createTypeFn"
        prop="createType"
        label="工单方式"
        width="170%"
      >
      </el-table-column>
      <el-table-column
        prop="taskStatusTypeEntity.statusName"
        label="工单状态"
        width="170%"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="运营人员"
        width="170%"
        class="item-margin"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        :formatter="dateFn"
        width="170%"
      >
      </el-table-column>
      <el-table-column prop="zip" label="操作" width="170%">
        <template slot-scope="scope">
          <span class="watch-info" @click="cellClick(scope.row)">查看详情</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看详情组件 -->
    <seeInfo
      @toIndex="toIndex"
      ref="info"
      :isShowBtn="false"
      title="工单详情"
      :task_item="row_info"
      :allocationVisible="dialogInfo"
    >
      <div class="info-title">
        <!-- 左边 -->
        <div class="info-left">{{ title_info }}</div>
        <!-- 右边 -->
        <div class="info-right">
          <img src="@/assets/cancel.png" alt="" />
        </div>
      </div>

      <el-row :gutter="0">
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            设备编号：{{ row_info.innerCode }}
          </div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple-light">
            创建日期：{{ row_info.createTime }}
          </div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            取消日期；{{ row_info.updateTime }}
          </div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple-light">
            运营人员：{{ row_info.userName }}
          </div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            工单类型：{{
              { 1: "投放工单", 2: "补货工单", 3: "维修工单", 4: "撤机工单" }[
                row_info.productTypeId
              ]
            }}
          </div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple-light">补货数量：</div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple">工单方式：{{}}</div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple-light">
            备注：{{ row_info.desc }}
          </div></el-col
        >
      </el-row>
    </seeInfo>
  </div>
</template>

<script>
import seeInfo from "@/views/table/components/seeInfo.vue";
import Dialog from "@/components/Dialog/index.vue";
import dayjs from "dayjs";
export default {
  components: {
    seeInfo,
    Dialog,
  },
  data() {
    return {
      dialogInfo: false,
      row_info: {},
      title_info: "",
    };
  },
  props: {
    taskList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  created() {},
  methods: {
    // 工单方式
    createTypeFn(row, column, index) {
      return ["自动", "手动"][index];
    },
    // 时间转换
    dateFn(row, column, index) {
      return dayjs(index).format("YYYY-MM-DD HH:mm:ss");
    },
    // 获取详情
    cellClick(row) {
      this.dialogInfo = true;
      console.log(row);
      this.$store.commit("tickets/SETTASKDETAILS", row);
      this.title_info = row.taskStatusTypeEntity.statusName;
      this.row_info = row;
      this.$refs.info.showCancel(row.taskStatusTypeEntity.statusName);
    },

    // 去父组件开启新增弹框
    toIndex() {
      this.$emit("showAdd", this.row_info);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep th {
  line-height: 1.15;
  padding: 10px 0px 9px;
  background: rgb(243, 246, 251);
  font-weight: 500;
  text-align: left;
  color: rgb(102, 102, 102);
}
.watch-info {
  cursor: pointer;
  color: #5f84ff;
}
.item-margin {
  margin-left: 30px;
}
.table-box {
  overflow-x: hidden;
}
.info-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
  .info-left {
    display: flex;
    align-items: center;
    color: #000;
    font-size: 14px;
  }
}
</style>
