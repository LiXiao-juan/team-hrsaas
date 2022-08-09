<template>
  <el-dialog title="策略管理" :visible="Visible" @close="$emit('closeEdit')">
    <template v-if="isShowDel">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            机器编号：{{ policyInfo.innerCode }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            策略名称：{{ policyInfo.policyName }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            策略方案：{{ policyInfo.discount }}
          </div>
        </el-col>
      </el-row>
      <center>
        <el-button
          @click="delPolicy"
          size="mini"
          style="background-color: #fbf4f0; color: #000"
          >取消策略</el-button
        >
      </center>
    </template>

    <template v-else>
      <span class="text">选择策略：</span>
      <el-select v-model="choosePolicy" placeholder="请选择" size="small">
        <el-option
          :label="item.policyName"
          :value="item.policyId"
          v-for="(item, index) in chooseList"
          :key="index"
        ></el-option>
      </el-select>
      <center>
        <el-button @click="$emit('closeEdit')">取 消</el-button>
        <el-button
          type="primary"
          @click="confirm"
          style="background-color: #ff6e29; color: #fff; border: unset"
          >确 定</el-button
        >
      </center>
    </template>
  </el-dialog>
</template>

<script>
import { delVmPolicy, setVmPolicy } from "@/api/vm";
export default {
  name: "PolicyDialog",
  components: {},
  data() {
    return {
      policyInfo: {},
      isShowDel: false,
      choosePolicy: "",
      chooseList: [],
      innerCodeList: [],
    };
  },
  props: {
    Visible: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  methods: {
    // 设置选择策略列表数据
    setChooseList(list, innerCodeList) {
      this.chooseList = list;
      this.innerCodeList = innerCodeList;
      //   console.log(list);
    },
    // 接收请求回的数据并判断显示取消策略or选择策略
    getPolicyInfo(val, bool) {
      this.policyInfo = val;
      this.isShowDel = bool;
    },

    // 取消策略
    async delPolicy() {
      await delVmPolicy(this.policyInfo.innerCode, this.policyInfo.policyId);
      this.$message.success("取消成功");
      // 关闭弹框
      this.$emit("closeEdit");
    },

    // 修改策略
    async confirm() {
      try {
        await setVmPolicy({
          innerCodeList: this.innerCodeList,
          policyId: this.choosePolicy,
        });
        this.$message.success("修改成功");
        this.$emit("closeEdit"); 
      } catch (error) {
        this.$message.warning("修改失败");
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-col-12 {
  height: 40px;
}
::v-deep .el-dialog {
  width: 630px;
  border-radius: 10px;
}
.text {
  margin-left: 50px;
}
::v-deep .el-select > .el-input {
  display: block;
  width: 200%;
}
</style>
