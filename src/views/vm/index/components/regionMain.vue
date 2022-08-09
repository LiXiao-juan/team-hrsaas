<template>
  <div>
    <div class="result">
      <el-row class="operation">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          class="addBtn"
          @click.native="showAdd"
          >新建</el-button
        >

        <el-button type="primary" class="batchBtn" @click="batchAction"
          >批量操作</el-button
        >
      </el-row>
      <template>
        <el-table
          :data="regionList"
          style="width: 100%"
          highlight-current-row
          @select="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="innerCode" label="设备编号" width="210">
          </el-table-column>
          <el-table-column prop="type.name" label="设备型号" width="210">
          </el-table-column>
          <el-table-column prop="region.name" label="详细地址" width="210">
          </el-table-column
          ><el-table-column
            prop="vmStatus"
            label="设备状态"
            :formatter="statusFn"
            width="210"
          >
          </el-table-column>
          <el-table-column prop="ownerName" label="合作商" width="210">
          </el-table-column>

          <el-table-column label="操作" width="210">
            <template slot-scope="scope">
              <el-button type="primary" class="el-button--text" @click="cargo"
                >货道</el-button
              >
              <el-button
                type="primary"
                class="el-button--text"
                @click="getVmPolicy(scope.row)"
                >策略</el-button
              >
              <el-button
                type="danger"
                class="el-button--text"
                style="color: #5f84ff"
                @click="onEdit(scope.row)"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 修改点击 -->
      <Dialog
        :Visible="editVisible"
        title="修改设备"
        @closeEdit="closeEdit"
        ref="dialog"
      >
      </Dialog>
      <!-- 策略 -->
      <Policy
        :Visible="policyVisible"
        @closeEdit="closeEdit"
        ref="policy"
      ></Policy>
    </div>
  </div>
</template>

<script>
// import {delRegion} from '@/api/address'
import { editVmList, getVmPolicy, getVmPolicyList } from "@/api/vm";
import Dialog from "./dialog.vue";
import Policy from "./policy-dialog.vue";
export default {
  data() {
    return {
      editVisible: false,
      policy: {},
      policyVisible: false,
      innerCodeList: [],
      beforeDispose: [],
    };
  },
  props: {
    regionList: {
      type: Array,
    },
  },
  created() {},
  components: {
    Dialog,
    Policy,
  },
  methods: {
    // 格式化状态
    statusFn(a, b, index) {
      return { 0: "未投放", 1: "运营", 3: "撤机" }[index];
    },
    showAdd() {
      this.$emit("add");
    },
    // 修改-----
    async onEdit(val) {
      this.editVisible = true;
      const { data } = await editVmList({
        regionId: val.regionId,
      });

      this.$refs.dialog.setEditData(val, data.currentPageRecords);
    },

    // 关闭修改弹框
    closeEdit() {
      this.editVisible = false;
      this.policyVisible = false;
    },

    // 批量操作
    async batchAction() {
      // 判断用户是否勾选--没勾选直接退出
      if (!this.beforeDispose.length)
        return this.$message.warning("请勾选售货机");

      // -----勾选处理数据
      this.beforeDispose.forEach((item) =>
        // 推到新数组中
        this.innerCodeList.push(item.innerCode)
      );
      this.$refs.policy.isShowDel = false;
      const res = await getVmPolicyList();
      console.log(res);
      // 子组件传入选择策略
      this.policyVisible = true;
      this.$refs.policy.setChooseList(res.data, this.innerCodeList);
    },

    // 策略
    async getVmPolicy(val) {
      const { data } = await getVmPolicy(val.innerCode);
      this.policy = data;
      // 数据为空则选择策略
      if (!data) {
        this.$refs.policy.getPolicyInfo(data, false);
        const res = await getVmPolicyList({
          innerCodeList: val.innerCode,
        });
        // 子组件传入选择策略
        this.$refs.policy.setChooseList(res.data);
        this.policyVisible = true;
        // 不为空则取消策略
      } else {
        this.$refs.policy.getPolicyInfo(data, true);
        this.policyVisible = true;
      }
    },
    // 货道
    cargo() {},

    // 选中的数组
    handleSelectionChange(selection, row) {
      // console.log(selection, row);
      this.beforeDispose = selection;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-col-24 {
  margin-top: 20px;
  margin-left: 50px;
}
::v-deep .el-dialog__body {
  padding-top: 5px;
}
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .operation {
    margin-bottom: 20px;
    display: flex;
    .batchBtn {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      color: #000;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 80px !important;
      height: 36px;
      padding: 0;
      background: #f3e7e1 !important;
      border: none;
    }
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
    height: 44px;
    padding: 2px 0px;
    text-align: left;
    color: rgb(102, 102, 102);
  }
  .el-table::before {
    height: 0;
  }
}
</style>
